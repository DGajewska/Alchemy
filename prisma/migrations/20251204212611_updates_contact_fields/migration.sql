/*
  Warnings:

  - You are about to drop the column `displayName` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `Practitioner` table. All the data in the column will be lost.
  - You are about to drop the column `aka` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "displayName",
DROP COLUMN "userId",
ADD COLUMN     "socialMedia" JSONB;

-- AlterTable
ALTER TABLE "Practitioner" DROP COLUMN "socialMedia",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "aka";
