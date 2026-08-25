'use server';

import { redirect } from 'next/navigation';
import {
  getAdminSessionTokenFromCookies,
  hashSessionToken,
  clearAdminSessionCookie,
} from '../services/session.service';
import { deleteAdminSessionByTokenHash, findAdminSessionByTokenHash } from '../data/auth.queries';
import { recordAuditLog } from '@/features/admin/services/audit.service';

export async function logoutAction(): Promise<void> {
  try {
    const rawToken = await getAdminSessionTokenFromCookies();
    if (rawToken) {
      const tokenHash = hashSessionToken(rawToken);
      const session = await findAdminSessionByTokenHash(tokenHash);
      if (session) {
        await recordAuditLog({
          adminUserId: session.userId,
          action: 'LOGOUT',
          entityType: 'ADMIN_SESSION',
          entityId: session.id,
        });
      }
      await deleteAdminSessionByTokenHash(tokenHash);
    }
  } catch (error) {
    console.error('[LogoutAction] Error deleting session:', error);
  } finally {
    await clearAdminSessionCookie();
    redirect('/admin/login');
  }
}
