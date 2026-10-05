import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Load encryption logic (simplified version of src/lib/encryption.ts for node environment)
const ALGORITHM = "aes-256-gcm";
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY ||
  "647b545a604c33374ffc5a7ff476b260d727f7224704e706586643716f5c3ad0";
const KEY = Buffer.from(ENCRYPTION_KEY, "hex");

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

async function verify() {
  console.log("--- Database Encryption Verification ---");

  try {
    const codes = await prisma.accessCode.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    if (codes.length === 0) {
      console.log("No access codes found in database.");
      return;
    }

    console.log(`Found ${codes.length} recent codes. Checking encryption...`);

    let allEncrypted = true;
    for (const ac of codes) {
      const isEncrypted = ac.code && ac.code.includes(":");
      const decryptedCode = ac.code ? decrypt(ac.code) : "N/A";

      console.log(`ID: ${ac.id}`);
      console.log(`Stored Code: ${ac.code}`);
      console.log(`Is Encrypted (contains ':'): ${isEncrypted}`);
      console.log(`Decrypted: ${decryptedCode}`);

      const expectedHash = crypto
        .createHash("sha256")
        .update(decryptedCode)
        .digest("hex");
      const hashMatches = expectedHash === ac.codeHash;
      console.log(`Hash Matches: ${hashMatches}`);

      if (!isEncrypted || !hashMatches) allEncrypted = false;
      console.log("---");
    }

    if (allEncrypted) {
      console.log("SUCCESS: All checked codes are encrypted and hashes match!");
    } else {
      console.log(
        "WARNING: Some codes might not be encrypted or hashes do not match.",
      );
    }
  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
