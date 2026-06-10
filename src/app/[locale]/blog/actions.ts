// src/app/[locale]/blog/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

// 1. زيادة عدد المشاهدات عند فتح المقال
export async function incrementViews(postId: number) {
  try {
    await query('UPDATE blog_posts SET views = views + 1 WHERE id = $1', [postId]);
    revalidatePath('/[locale]/blog', 'page');
  } catch (error) {
    console.error('Failed to increment views:', error);
  }
}

// 2. زيادة الإعجابات وإرجاع الرقم الجديد
export async function incrementLikes(postId: number) {
  try {
    const res = await query(
      'UPDATE blog_posts SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [postId]
    );
    revalidatePath('/[locale]/blog', 'page');
    return { success: true, likes: res[0].likes };
  } catch (error) {
    console.error('Failed to increment likes:', error);
    return { success: false };
  }
}

// 3. حفظ تعليق جديد في قاعدة بيانات Neon
export async function createComment(postId: number, userName: string, text: string) {
  try {
    const res = await query(
      'INSERT INTO comments (post_id, user_name, text) VALUES ($1, $2, $3) RETURNING id, user_name, text, created_at',
      [postId, userName, text]
    );
    revalidatePath('/[locale]/blog', 'page');
    return { success: true, comment: res[0] };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false };
  }
}