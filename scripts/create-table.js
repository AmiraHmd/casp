const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating book_otp_codes table if it does not exist...');
  
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "book_otp_codes" (
      "id" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "code_hash" TEXT NOT NULL,
      "expires_at" TIMESTAMP(3) NOT NULL,
      "used" BOOLEAN NOT NULL DEFAULT false,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "book_otp_codes_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "book_otp_codes_email_idx" ON "book_otp_codes"("email");
  `);

  console.log('Successfully created table and index.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
