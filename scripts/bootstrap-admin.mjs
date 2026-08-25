import { Pool } from '@neondatabase/serverless';
import { hash } from '@node-rs/argon2';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

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

const connectionString = getDbUrl();
if (!connectionString) {
  console.error('ERROR: DATABASE_URL not found.');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function bootstrap() {
  console.log('=== JAWHARAT AL DANAT — FIRST ADMIN BOOTSTRAP ===');
  const client = await pool.connect();

  try {
    // Check if super admin already exists
    const superAdminRes = await client.query(
      `SELECT id, email, full_name, role FROM admin_users WHERE role = 'SUPER_ADMIN' LIMIT 1;`
    );

    if (superAdminRes.rows.length > 0) {
      console.log('ℹ️ A SUPER_ADMIN user already exists:', superAdminRes.rows[0].email);
      const proceed = await prompt('Do you want to create an additional ADMIN user? (y/N): ');
      if (proceed.toLowerCase() !== 'y') {
        console.log('Bootstrap aborted safely.');
        return;
      }
    }

    const email = (process.env.BOOTSTRAP_ADMIN_EMAIL || await prompt('Admin Email: ')).toLowerCase().trim();
    if (!email || !email.includes('@')) {
      console.error('Invalid email.');
      return;
    }

    const fullName = process.env.BOOTSTRAP_ADMIN_NAME || await prompt('Full Name (e.g. Dr. Hamama Al Qubaisi): ');
    if (!fullName) {
      console.error('Full name is required.');
      return;
    }

    const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || await prompt('Password (minimum 12 characters): ');
    if (!password || password.length < 12) {
      console.error('Password must be at least 12 characters.');
      return;
    }

    // Hash with Argon2id
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
      outputLen: 32,
    });

    const isFirst = superAdminRes.rows.length === 0;
    const role = isFirst ? 'SUPER_ADMIN' : 'ADMIN';

    const insertRes = await client.query(
      `
      INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
      VALUES ($1, $2, $3, $4, true)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, full_name, role;
      `,
      [email, passwordHash, fullName, role]
    );

    if (insertRes.rows.length === 0) {
      console.error('User with this email already exists.');
      return;
    }

    console.log('\n✅ Admin user provisioned successfully:');
    console.log('  ID:       ', insertRes.rows[0].id);
    console.log('  Email:    ', insertRes.rows[0].email);
    console.log('  Name:     ', insertRes.rows[0].full_name);
    console.log('  Role:     ', insertRes.rows[0].role);
    console.log('  Security:  Argon2id Hash Stored (No raw password logged)\n');

  } finally {
    client.release();
    await pool.end();
  }
}

bootstrap().catch(console.error);

