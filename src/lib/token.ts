import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env';

/**
 * Payload structure for the PDF access token
 */
export interface PdfAccessPayload {
  email: string;
  blobPath: string; // The path to the PDF in Vercel Blob
  watermark?: boolean;
}

/**
 * Generates a signed JWT for PDF access.
 * Expires in 24 hours.
 * 
 * @param payload The data to include in the token
 * @returns The signed JWT string
 */
export function generatePdfAccessToken(payload: PdfAccessPayload): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '3h',
  });
}

/**
 * Verifies and decodes a PDF access token.
 * 
 * @param token The JWT string to verify
 * @returns The decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export function verifyPdfAccessToken(token: string): PdfAccessPayload {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as PdfAccessPayload;
    return decoded;
  } catch {
    throw new Error('Invalid or expired token');
  }
}
