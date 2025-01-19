/*
  Warnings:

  - Added the required column `subjectId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectId" TEXT NOT NULL;
