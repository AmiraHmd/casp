/**
 * Centralized Environment Variable Validation
 * 
 * This module ensures that all required environment variables are present
 * and meet security requirements at runtime.
 */

const isServer = typeof window === 'undefined';

function getOptionalEnv(key: string): string | undefined {
  if (!isServer) return undefined;
  return process.env[key];
}

function validateKey(key: string | undefined, name: string): string | undefined {
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      console.error(`[SECURITY WARNING] ${name} is not defined in production. Fallback strategies will be used.`);
      return undefined;
    }
    // In development, we can be more strict but still allow the app to boot
    console.warn(`[DEVELOPER WARNING] ${name} is missing. Admin features relying on encryption will be disabled.`);
    return undefined;
  }

  if (key.length < 32) {
    const errorMsg = `[SECURITY ERROR] ${name} must be at least 32 characters long.`;
    if (process.env.NODE_ENV === 'production') {
      console.error(errorMsg);
      return undefined;
    }
    console.warn(errorMsg);
  }

  return key;
}

// In Next.js, process.env is populated at build time and runtime.
// We only want to export validated constants to ensure consistent behavior.
export const ENCRYPTION_KEY = validateKey(getOptionalEnv('ENCRYPTION_KEY'), 'ENCRYPTION_KEY');
export const JWT_SECRET = validateKey(getOptionalEnv('JWT_SECRET'), 'JWT_SECRET') || 'fallback-secret-for-dev-only';

// Helper to check if configuration is complete
export const IS_ENCRYPTION_ENABLED = !!ENCRYPTION_KEY;
export const IS_AUTH_CONFIGURED = !!process.env.JWT_SECRET;

/**
 * Instructions for Vercel:
 * This variable must be defined in Vercel Environment Variables (Settings > Environment Variables).
 * Ensure it is added to Production, Preview, and Development environments.
 */
