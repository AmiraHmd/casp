/**
 * Server-side utility for creating and verifying short-lived, encrypted book tokens.
 *
 * The PDF path is AES-GCM encrypted + authenticated on the server so the browser
 * NEVER sees the real /book-office/... path in any network request.
 *
 * Required env var:
 *   BOOK_TOKEN_SECRET  – 64 hex characters (32 bytes). Generate with:
 *                        openssl rand -hex 32
 *
 * Token format (URL-safe Base64):
 *   <12-byte IV> | <ciphertext> | <16-byte auth tag>
 *   All concatenated, then base64url-encoded.
 *
 * Payload JSON: { path: string; exp: number }
 */

// Node.js built-in — only runs in the server runtime, never in the browser.
import { createDecipheriv, createCipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;
const TAG_BYTES = 16;
/** Token validity window — 60 minutes */
const TOKEN_TTL_MS = 60 * 60 * 1000;

function getKey(): Buffer {
  const secret = process.env.BOOK_TOKEN_SECRET;
  if (!secret || secret.length !== 64) {
    throw new Error(
      "[bookToken] BOOK_TOKEN_SECRET must be a 64-character hex string (32 bytes). " +
        "Generate one with: openssl rand -hex 32"
    );
  }
  return Buffer.from(secret, "hex");
}

/** Encode a Buffer as URL-safe Base64 (no padding). */
function toBase64Url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/** Decode a URL-safe Base64 string to a Buffer. */
function fromBase64Url(str: string): Buffer {
  // Re-add stripped padding
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64");
}

/**
 * Creates a signed, encrypted token embedding the PDF path.
 * Call this in a Server Component (page.tsx) — it uses Node.js crypto.
 */
export function createBookToken(pdfPath: string): string {
  const key = getKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const payload = JSON.stringify({ path: pdfPath, exp: Date.now() + TOKEN_TTL_MS });
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Concatenate: IV || ciphertext || tag
  const token = Buffer.concat([iv, encrypted, tag]);
  return toBase64Url(token);
}

/**
 * Verifies and decrypts a book token.
 * Returns the PDF path, or throws on invalid/expired token.
 * Call this in the API route handler (server-side only).
 */
export function verifyBookToken(token: string): string {
  const key = getKey();
  const raw = fromBase64Url(token);

  if (raw.length < IV_BYTES + TAG_BYTES + 1) {
    throw new Error("Token too short");
  }

  const iv = raw.subarray(0, IV_BYTES);
  const tag = raw.subarray(raw.length - TAG_BYTES);
  const ciphertext = raw.subarray(IV_BYTES, raw.length - TAG_BYTES);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  const payload = JSON.parse(decrypted) as { path: string; exp: number };

  if (Date.now() > payload.exp) {
    throw new Error("Token expired");
  }

  return payload.path;
}
