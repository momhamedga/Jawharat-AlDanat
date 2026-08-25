// src/lib/db.ts
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in your environment variables.');
}

// Global augmentation for strict typing without any/as unknown casts
declare global {
  var __neon_pool__: Pool | undefined;
}

export const db =
  globalThis.__neon_pool__ ??
  new Pool({
    connectionString,
    max: 10, // الحد الأقصى للاتصالات المتزامنة
    idleTimeoutMillis: 30000,
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__neon_pool__ = db;
}

// دالة مساعدة معالجة وآمنة تماماً للاستعلامات
export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
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