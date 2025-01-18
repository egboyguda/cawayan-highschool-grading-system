/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT NOT NULL;
