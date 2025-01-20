/*
  Warnings:

  - You are about to drop the column `quarterlyAssess` on the `Grade` table. All the data in the column will be lost.
  - Added the required column `quarterlyAssessment` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "quarterlyAssess",
ADD COLUMN     "quarterlyAssessment" DOUBLE PRECISION NOT NULL;
