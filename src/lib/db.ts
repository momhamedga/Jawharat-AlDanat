// src/lib/db.ts
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in your environment variables.');
}

// نمط الـ Singleton لمنع تكرار إنشاء الـ Pool أثناء الـ Hot Reload في التطوير
const globalForDb = globalThis as unknown as { db: Pool | undefined };

export const db = globalForDb.db ?? new Pool({ 
  connectionString,
  max: 10, // الحد الأقصى للاتصالات المتزامنة
  idleTimeoutMillis: 30000 
});

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

// دالة مساعدة معالجة وآمنة تماماً للاستعلامات
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await db.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } catch (error) {
    console.error('🔴 Database Query Error:', error);
    throw error;
  } finally {
    client.release(); // تحرير العميل فوراً للحفاظ على موارد Neon
  }
}