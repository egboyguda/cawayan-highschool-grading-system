/*
  Warnings:

  - Added the required column `school_year` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "school_year" TEXT NOT NULL;
