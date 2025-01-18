/*
  Warnings:

  - Added the required column `licenseNum` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "licenseNum" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ADD COLUMN     "rank" TEXT NOT NULL;
