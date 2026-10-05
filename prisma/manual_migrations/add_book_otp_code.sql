-- Migration: add_book_otp_code
-- Run this SQL in your PostgreSQL database if prisma migrate dev fails due to disk space.

CREATE TABLE IF NOT EXISTS "book_otp_codes" (
  "id"         TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "email"      TEXT NOT NULL,
  "code_hash"  TEXT NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "used"       BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "book_otp_codes_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "book_otp_codes_email_idx" ON "book_otp_codes"("email");
