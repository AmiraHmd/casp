/**
 * Simple obfuscation utilities for asset URLs.
 * This is meant to prevent casual discovery of original URLs in the browser.
 */

/**
 * Encodes a URL string using Base64.
 */
export function encodeAssetUrl(url: string): string {
  if (!url) return '';
  try {
    return btoa(url);
  } catch (e) {
    console.error('Failed to encode URL:', e);
    return url;
  }
}

/**
 * Decodes a Base64 encoded URL string.
 */
export function decodeAssetUrl(encoded: string): string {
  if (!encoded) return '';
  try {
    return atob(encoded);
  } catch (e) {
    console.error('Failed to decode URL:', e);
    return encoded;
  }
}
