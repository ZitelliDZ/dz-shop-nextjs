/*
  Warnings:

  - The `isPaid` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('aproved', 'pending', 'rejected');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPaid",
ADD COLUMN     "isPaid" "Status" NOT NULL DEFAULT 'pending';
