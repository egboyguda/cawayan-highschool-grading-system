/*
  Warnings:

  - You are about to drop the column `age` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "age",
ADD COLUMN     "birthdata" TIMESTAMP(3);
