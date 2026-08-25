import { Pool } from '@neondatabase/serverless';
import { hash, Algorithm } from '@node-rs/argon2';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import fs from 'fs';
import path from 'path';

function getDbUrl() {
  for (const file of ['.env.local', '.env']) {
    const p = path.resolve(process.cwd(), file);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*DATABASE_URL\s*=\s*["']?([^"'\r\n]+)["']?/);
        if (match) return match[1];
      }
    }
  }
  return process.env.DATABASE_URL;
}

function validatePasswordPolicy(password) {
  if (password.length < 12) {
    return 'كلمة المرور يجب أن تكون 12 حرفاً على الأقل';
  }
  if (!/[A-Z]/.test(password)) {
    return 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل (A-Z)';
  }
  if (!/[a-z]/.test(password)) {
    return 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل (a-z)';
  }
  if (!/[0-9]/.test(password)) {
    return 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل (0-9)';
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%...)';
  }
  return null;
}

async function setAdminPassword() {
  const rl = readline.createInterface({ input, output });

  console.log('\n=====================================================');
  console.log('   JAWHARAT AL DANAT — SECURE ADMIN PASSWORD RESET   ');
  console.log('=====================================================\n');

  try {
    const dbUrl = getDbUrl();
    if (!dbUrl) {
      console.error('❌ خطأ: لم يتم العثور على متغير DATABASE_URL');
      process.exit(1);
    }

    const pool = new Pool({ connectionString: dbUrl });
    const client = await pool.connect();

    try {
      // 1. Get user email
      const emailInput = await rl.question('أدخل البريد الإلكتروني للمدير: ');
      const email = emailInput.trim().toLowerCase();
      if (!email) {
        console.error('❌ يجب إدخال البريد الإلكتروني للمدير.');
        process.exit(1);
      }

      // 2. Check if user exists
      const userRes = await client.query(
        'SELECT id, email, full_name, role, is_active FROM admin_users WHERE email = $1;',
        [email]
      );

      if (userRes.rows.length === 0) {
        console.error(`\n❌ خطأ: لم يتم العثور على مستخدم مسجل بالبريد: ${email}`);
        process.exit(1);
      }

      const user = userRes.rows[0];
      console.log(`\nتم العثور على الحساب: ${user.full_name} (${user.role})`);

      // 3. Prompt for new password
      const newPassword = await rl.question('أدخل كلمة المرور الجديدة (12+ حرفاً، مع رمز ورقم وحرف كبير): ');
      const policyError = validatePasswordPolicy(newPassword);
      if (policyError) {
        console.error(`\n❌ رفضت كلمة المرور: ${policyError}`);
        process.exit(1);
      }

      // 4. Confirm password
      const confirmPassword = await rl.question('أعد إدخال كلمة المرور للتأكيد: ');
      if (newPassword !== confirmPassword) {
        console.error('\n❌ خطأ: كلمتا المرور غير متطابقتين.');
        process.exit(1);
      }

      // 5. Hash with Argon2id (OWASP recommended parameters)
      const passwordHash = await hash(newPassword, {
        memoryCost: 19456, // 19 MiB
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
        algorithm: Algorithm.Argon2id,
      });

      // 6. Update DB & Revoke Sessions
      await client.query(
        'UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2;',
        [passwordHash, user.id]
      );

      const deleteSessionsRes = await client.query(
        'DELETE FROM admin_sessions WHERE user_id = $1;',
        [user.id]
      );

      console.log('\n=====================================================');
      console.log('✅ تم تحديث كلمة مرور المدير بنجاح وبأمان تام!');
      console.log(`- الحساب: ${user.email} (${user.full_name})`);
      console.log(`- الجلسات القديمة الملغاة: ${deleteSessionsRes.rowCount || 0}`);
      console.log('- خوارزمية التشفير: Argon2id (OWASP Verified)');
      console.log('=====================================================\n');

    } finally {
      client.release();
      await pool.end();
    }
  } finally {
    rl.close();
  }
}

setAdminPassword().catch((err) => {
  console.error('\n❌ فشل تعيين كلمة المرور:', err.message);
  process.exit(1);
});

