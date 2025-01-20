/*
  Warnings:

  - You are about to drop the column `totalGrade` on the `Grade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "totalGrade",
ALTER COLUMN "writtenWork" DROP NOT NULL,
ALTER COLUMN "performanceTask" DROP NOT NULL,
ALTER COLUMN "quarterlyAssessment" DROP NOT NULL;
