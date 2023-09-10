/*
  Warnings:

  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flashcard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlashcardSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codeGeneratorId` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_setId_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_userId_fkey";

-- DropForeignKey
ALTER TABLE "FlashcardSet" DROP CONSTRAINT "FlashcardSet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "codeGeneratorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updateAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Attempt";

-- DropTable
DROP TABLE "Flashcard";

-- DropTable
DROP TABLE "FlashcardSet";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "CodeGenerator" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeGenerator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeGeneratorMessage" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "codeGeneratorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeGeneratorMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_codeGeneratorId_fkey" FOREIGN KEY ("codeGeneratorId") REFERENCES "CodeGenerator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeGenerator" ADD CONSTRAINT "CodeGenerator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeGeneratorMessage" ADD CONSTRAINT "CodeGeneratorMessage_codeGeneratorId_fkey" FOREIGN KEY ("codeGeneratorId") REFERENCES "CodeGenerator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeGeneratorMessage" ADD CONSTRAINT "CodeGeneratorMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
