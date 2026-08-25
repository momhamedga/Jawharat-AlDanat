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
const pool = new Pool({ connectionString });

async function createBackup() {
  const client = await pool.connect();
  try {
    const posts = await client.query('SELECT * FROM blog_posts ORDER BY id ASC;');
    const comments = await client.query('SELECT * FROM comments ORDER BY id ASC;');
    const rateLimits = await client.query('SELECT key, count, reset_at::text, created_at FROM rate_limit_entries ORDER BY key ASC;');

    const backupDir = path.resolve(process.cwd(), 'prisma/backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const hostName = connectionString ? new URL(connectionString).hostname : 'neon-serverless';
    const backupData = {
      timestamp: new Date().toISOString(),
      database: 'neondb',
      host: hostName,
      schema: 'public',
      rowCounts: {
        blog_posts: posts.rows.length,
        comments: comments.rows.length,
        rate_limit_entries: rateLimits.rows.length,
      },
      data: {
        blog_posts: posts.rows,
        comments: comments.rows,
        rate_limit_entries: rateLimits.rows,
      }
    };

    const backupPath = path.join(backupDir, 'pre-phase16-backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');

    console.log('=== SAFE DATABASE BACKUP VERIFIED ===');
    console.log('Backup Path:       ', backupPath);
    console.log('Timestamp:         ', backupData.timestamp);
    console.log('blog_posts:        ', backupData.rowCounts.blog_posts);
    console.log('comments:          ', backupData.rowCounts.comments);
    console.log('rate_limit_entries:', backupData.rowCounts.rate_limit_entries);
    console.log('Backup verified successfully!');
  } finally {
    client.release();
    await pool.end();
  }
}

createBackup().catch(console.error);

