import { Pool } from '@neondatabase/serverless';
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

const connectionString = getDbUrl();
if (!connectionString) {
  console.error('ERROR: DATABASE_URL not found.');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function createNeonBackup() {
  console.log('=== NEON DATABASE SNAPSHOT & BACKUP (PRE-PHASE-17) ===');
  const client = await pool.connect();

  try {
    const urlObj = new URL(connectionString);
    const dbHost = urlObj.hostname;
    const dbName = urlObj.pathname.replace('/', '') || 'neondb';

    // 1. Verify live counts
    const postRes = await client.query('SELECT COUNT(*)::int as count FROM blog_posts;');
    const commentRes = await client.query('SELECT COUNT(*)::int as count FROM comments;');
    const userRes = await client.query('SELECT COUNT(*)::int as count FROM admin_users;');
    const sessionRes = await client.query('SELECT COUNT(*)::int as count FROM admin_sessions;');

    const postCount = postRes.rows[0].count;
    const commentCount = commentRes.rows[0].count;
    const userCount = userRes.rows[0].count;
    const sessionCount = sessionRes.rows[0].count;

    console.log('Source Database: ', dbName);
    console.log('Database Host:   ', dbHost);
    console.log('Row Counts:');
    console.log('  blog_posts:    ', postCount);
    console.log('  comments:      ', commentCount);
    console.log('  admin_users:   ', userCount);
    console.log('  admin_sessions:', sessionCount);

    // 2. Create in-database SQL backup tables on Neon
    await client.query('CREATE TABLE IF NOT EXISTS blog_posts_backup_phase17 AS SELECT * FROM blog_posts;');
    await client.query('CREATE TABLE IF NOT EXISTS comments_backup_phase17 AS SELECT * FROM comments;');

    const backupPostRes = await client.query('SELECT COUNT(*)::int as count FROM blog_posts_backup_phase17;');
    const backupCommentRes = await client.query('SELECT COUNT(*)::int as count FROM comments_backup_phase17;');

    console.log('\nIn-DB Snapshot Tables Created on Neon:');
    console.log('  blog_posts_backup_phase17 count: ', backupPostRes.rows[0].count);
    console.log('  comments_backup_phase17 count:   ', backupCommentRes.rows[0].count);

    if (backupPostRes.rows[0].count !== postCount || backupCommentRes.rows[0].count !== commentCount) {
      throw new Error('Backup snapshot count mismatch with live database!');
    }

    // 3. Export JSON backup artifact
    const allPosts = await client.query('SELECT * FROM blog_posts ORDER BY id ASC;');
    const allComments = await client.query('SELECT * FROM comments ORDER BY id ASC;');
    const allUsers = await client.query('SELECT id, email, full_name, role, is_active, created_at FROM admin_users ORDER BY id ASC;');

    const backupDir = path.resolve(process.cwd(), 'prisma/backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupData = {
      timestamp: new Date().toISOString(),
      sourceDatabase: dbName,
      sourceHost: dbHost,
      inDbBackupTables: ['blog_posts_backup_phase17', 'comments_backup_phase17'],
      counts: {
        blog_posts: postCount,
        comments: commentCount,
        admin_users: userCount,
        admin_sessions: sessionCount,
      },
      data: {
        blog_posts: allPosts.rows,
        comments: allComments.rows,
        admin_users: allUsers.rows,
      }
    };

    const backupFile = path.join(backupDir, 'pre-phase17-neon-backup.json');
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
    console.log('\nFile Backup Written: ', backupFile);
    console.log('✅ PRE-PHASE-17 BACKUP VERIFIED SUCCESSFULLY!\n');

  } finally {
    client.release();
    await pool.end();
  }
}

createNeonBackup().catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});

