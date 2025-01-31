-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_adviserId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "adviserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_adviserId_fkey" FOREIGN KEY ("adviserId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
