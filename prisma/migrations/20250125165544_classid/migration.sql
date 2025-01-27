/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "classId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classId_key" ON "Classroom"("classId");
