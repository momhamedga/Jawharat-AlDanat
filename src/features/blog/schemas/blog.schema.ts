import { z } from 'zod';

export const addCommentSchema = z.object({
  postId: z.coerce.number().int().positive({ message: 'invalid_post' }),
  userName: z
    .string()
    .trim()
    .min(2, { message: 'name_min' })
    .max(60, { message: 'name_max' }),
  text: z
    .string()
    .trim()
    .min(3, { message: 'comment_min' })
    .max(1000, { message: 'comment_max' }),
  honeypot: z.string().max(0, { message: 'bot_detected' }).optional().or(z.literal('')),
});

export const likePostSchema = z.object({
  postId: z.coerce.number().int().positive({ message: 'invalid_post' }),
});

export const recordViewSchema = z.object({
  postId: z.coerce.number().int().positive({ message: 'invalid_post' }),
});

export type AddCommentInput = z.infer<typeof addCommentSchema>;
export type LikePostInput = z.infer<typeof likePostSchema>;

