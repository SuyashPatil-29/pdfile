/*
  Warnings:

  - You are about to drop the column `codeGeneratorId` on the `Generation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_codeGeneratorId_fkey";

-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "codeGeneratorId";
