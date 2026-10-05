import crypto from "crypto";

// Mock process.env
process.env.ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY ||
  "647b545a604c33374ffc5a7ff476b260d727f7224704e706586643716f5c3ad0";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

function decrypt(encryptedText: string): string {
  try {
    const [ivHex, authTagHex, encryptedHex] = encryptedText.split(":");
    if (!ivHex || !authTagHex || !encryptedHex) return encryptedText;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return encryptedText;
  }
}

const originalCode = "ABC123XYZ";
const encrypted = encrypt(originalCode);
const decrypted = decrypt(encrypted);

console.log("Original:", originalCode);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);

if (originalCode === decrypted) {
  console.log("SUCCESS: Encryption/Decryption works!");
} else {
  console.log("FAILURE: Decryption result does not match original.");
  process.exit(1);
}

const legacyCode = "LEGACY_TEXT";
const decryptedLegacy = decrypt(legacyCode);
console.log("Legacy (Original):", legacyCode);
console.log("Legacy (Decrypted):", decryptedLegacy);

if (legacyCode === decryptedLegacy) {
  console.log("SUCCESS: Legacy handling works!");
} else {
  console.log("FAILURE: Legacy handling failed.");
  process.exit(1);
}
