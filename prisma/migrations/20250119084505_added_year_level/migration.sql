/*
  Warnings:

  - You are about to drop the column `gradeYear` on the `Classroom` table. All the data in the column will be lost.
  - Added the required column `year_level` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_level` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "gradeYear",
ADD COLUMN     "year_level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "year_level" TEXT NOT NULL DEFAULT '7';

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "year_level" TEXT NOT NULL;
