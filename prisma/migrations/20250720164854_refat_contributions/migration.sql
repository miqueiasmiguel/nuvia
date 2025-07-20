/*
  Warnings:

  - You are about to drop the column `confirmedAt` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `contributorEmail` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `contributorName` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `contributorPhone` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `pixKey` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `pixKeyType` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `proofFileName` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `proofImageUrl` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `qrCodeData` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `userConfirmed` on the `contributions` table. All the data in the column will be lost.
  - You are about to drop the column `weddingListId` on the `contributions` table. All the data in the column will be lost.
  - Added the required column `name` to the `contributions` table without a default value. This is not possible if the table is not empty.
  - Made the column `giftId` on table `contributions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contributions" DROP CONSTRAINT "contributions_giftId_fkey";

-- DropForeignKey
ALTER TABLE "contributions" DROP CONSTRAINT "contributions_weddingListId_fkey";

-- AlterTable
ALTER TABLE "contributions" DROP COLUMN "confirmedAt",
DROP COLUMN "contributorEmail",
DROP COLUMN "contributorName",
DROP COLUMN "contributorPhone",
DROP COLUMN "pixKey",
DROP COLUMN "pixKeyType",
DROP COLUMN "proofFileName",
DROP COLUMN "proofImageUrl",
DROP COLUMN "qrCodeData",
DROP COLUMN "userConfirmed",
DROP COLUMN "weddingListId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "giftId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "gifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
