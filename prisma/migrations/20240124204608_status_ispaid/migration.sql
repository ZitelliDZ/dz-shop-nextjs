/*
  Warnings:

  - The values [pending] on the enum `StatusIsPaid` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusIsPaid_new" AS ENUM ('aproved', 'pendingConfirm', 'rejected', 'pendingPayment');
ALTER TABLE "Order" ALTER COLUMN "isPaid" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "isPaid" TYPE "StatusIsPaid_new" USING ("isPaid"::text::"StatusIsPaid_new");
ALTER TYPE "StatusIsPaid" RENAME TO "StatusIsPaid_old";
ALTER TYPE "StatusIsPaid_new" RENAME TO "StatusIsPaid";
DROP TYPE "StatusIsPaid_old";
ALTER TABLE "Order" ALTER COLUMN "isPaid" SET DEFAULT 'pendingPayment';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isPaid" SET DEFAULT 'pendingPayment';
