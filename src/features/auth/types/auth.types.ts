export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  user: AdminUser;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'RATE_LIMITED'
  | 'INVALID_INPUT'
  | 'ACCOUNT_DISABLED'
  | 'INTERNAL_ERROR';

export interface AuthActionResult {
  success: boolean;
  error?: string;
  errorCode?: AuthErrorCode;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
}

