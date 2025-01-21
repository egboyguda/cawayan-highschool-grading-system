-- CreateTable
CREATE TABLE "GradePercent" (
    "id" TEXT NOT NULL,
    "writtenWork" DOUBLE PRECISION NOT NULL,
    "performanceTask" DOUBLE PRECISION NOT NULL,
    "quarterlyAssessment" DOUBLE PRECISION NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "GradePercent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GradePercent_writtenWork_performanceTask_quarterlyAssessmen_key" ON "GradePercent"("writtenWork", "performanceTask", "quarterlyAssessment");
