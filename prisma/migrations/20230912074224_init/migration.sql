/*
  Warnings:

  - Added the required column `email` to the `Tutor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_userId_fkey";

-- AlterTable
ALTER TABLE "Tutor" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
