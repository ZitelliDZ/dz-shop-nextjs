/*
  Warnings:

  - The `isPaid` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusIsPaid" AS ENUM ('aproved', 'pending', 'rejected');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPaid",
ADD COLUMN     "isPaid" "StatusIsPaid" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "Status";
