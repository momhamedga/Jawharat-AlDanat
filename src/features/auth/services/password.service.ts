import 'server-only';
import { hash, verify } from '@node-rs/argon2';

/**
 * OWASP Recommended Argon2id parameters:
 * - memoryCost: 19456 KiB (19 MiB)
 * - timeCost: 2 iterations
 * - parallelism: 1 lane
 * - outputLen: 32 bytes
 */
const ARGON2_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
  outputLen: 32,
};

// Pre-computed dummy Argon2id hash used to mitigate timing attacks when a user is not found
const DUMMY_HASH = '$argon2id$v=19$m=19456,t=2,p=1$ZGFuYXRfZHVtbXlfc2FsdA$g9Xn2bQv0L4Qf7W5X1P3Y9R8T7K6M5J4H3G2F1E0D9C';

/**
 * Hashes a plaintext password using Argon2id.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, ARGON2_OPTIONS);
}

/**
 * Verifies a password against an Argon2id hash.
 */
export async function verifyPassword(hashString: string, candidate: string): Promise<boolean> {
  try {
    return await verify(hashString, candidate);
  } catch (err) {
    console.error('[PasswordService] Error verifying hash:', err);
    return false;
  }
}

/**
 * Runs a dummy verification cycle to equalize execution timing when an account is not found.
 */
export async function verifyDummyPassword(candidate: string): Promise<boolean> {
  try {
    await verify(DUMMY_HASH, candidate);
  } catch {
    // Expected to fail safely
  }
  return false;
}

