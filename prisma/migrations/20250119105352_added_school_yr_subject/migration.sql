/*
  Warnings:

  - Added the required column `school_year` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "school_year" TEXT NOT NULL;
