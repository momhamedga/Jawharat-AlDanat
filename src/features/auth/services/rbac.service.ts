import { AdminRole, AdminUser } from '../types/auth.types';

const ROLE_HIERARCHY: Record<AdminRole, number> = {
  SUPER_ADMIN: 30,
  ADMIN: 20,
  EDITOR: 10,
};

/**
 * Checks if a user's role satisfies the required minimum role in the hierarchy.
 */
export function hasRole(userRole: AdminRole, requiredRole: AdminRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Checks if user has Super Admin privileges.
 */
export function isSuperAdmin(user: AdminUser): boolean {
  return user.role === 'SUPER_ADMIN';
}

/**
 * Checks if user can manage content (EDITOR, ADMIN, SUPER_ADMIN).
 */
export function canManageContent(user: AdminUser): boolean {
  return hasRole(user.role, 'EDITOR');
}

/**
 * Checks if user can manage admin operations (ADMIN, SUPER_ADMIN).
 */
export function canManageAdminOps(user: AdminUser): boolean {
  return hasRole(user.role, 'ADMIN');
}

