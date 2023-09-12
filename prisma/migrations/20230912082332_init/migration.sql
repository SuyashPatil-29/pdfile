-- DropForeignKey
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_email_fkey";

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
