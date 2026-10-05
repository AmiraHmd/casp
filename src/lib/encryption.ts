import crypto from 'crypto';
import { ENCRYPTION_KEY, IS_ENCRYPTION_ENABLED } from './env';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM

/**
 * Gets the encryption key as a Buffer.
 * Returns null if the key is invalid or missing.
 */
function getEncryptionKey(overrideKey?: string): Buffer | null {
  const keyStr = overrideKey || ENCRYPTION_KEY;
  if (!keyStr) return null;
  
  try {
    return Buffer.from(keyStr, 'hex');
  } catch (error) {
    console.error('[ENCRYPTION] Failed to parse key as hex:', error);
    return null;
  }
}

/**
 * Encrypts a string using AES-256-GCM
 * Returns the original text if encryption fails or key is missing.
 */
export function encrypt(text: string, overrideKey?: string): string {
  if (!IS_ENCRYPTION_ENABLED && !overrideKey) {
    console.error('[ENCRYPTION] Missing ENCRYPTION_KEY. Returning raw text.');
    return text;
  }

  const keyBuffer = getEncryptionKey(overrideKey);
  if (!keyBuffer || keyBuffer.length !== 32) {
    console.error('[ENCRYPTION] Invalid key length. Expected 32 bytes.');
    return text;
  }

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Combine IV + AuthTag + EncryptedText
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('[ENCRYPTION] Encryption failed:', error);
    return text;
  }
}

/**
 * Decrypts a string using AES-256-GCM
 * Returns the original encrypted string if decryption fails.
 */
export function decrypt(encryptedText: string, overrideKey?: string): string {
  if (!IS_ENCRYPTION_ENABLED && !overrideKey) {
    // Possibly legacy or missing key
    return encryptedText;
  }

  const keyBuffer = getEncryptionKey(overrideKey);
  if (!keyBuffer || keyBuffer.length !== 32) {
    return encryptedText;
  }

  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      // Not in the expected encrypted format
      return encryptedText;
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.warn('[ENCRYPTION] Decryption failed, returning original text:', error);
    return encryptedText; 
  }
}
