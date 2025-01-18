/*
  Warnings:

  - The primary key for the `Classroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_StudentSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "_StudentSubjects" DROP CONSTRAINT "_StudentSubjects_B_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Classroom_id_seq";

-- AlterTable
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Grade_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Grade_id_seq";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "classroomId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subject_id_seq";

-- AlterTable
ALTER TABLE "_StudentSubjects" DROP CONSTRAINT "_StudentSubjects_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_StudentSubjects_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
