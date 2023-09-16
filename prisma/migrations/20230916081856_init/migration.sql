/*
  Warnings:

  - You are about to drop the column `description` on the `CodeGenerator` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCode` on the `CodeGenerator` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CodeGenerator` table. All the data in the column will be lost.
  - Added the required column `language` to the `CodeGenerator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeGenerator" DROP COLUMN "description",
DROP COLUMN "sourceCode",
DROP COLUMN "title",
ADD COLUMN     "language" TEXT NOT NULL;
