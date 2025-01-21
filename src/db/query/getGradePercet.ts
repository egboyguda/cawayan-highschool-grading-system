 import { verifySession } from "@/lib/dal";
import { db } from "@/db";
export const getAllGradesPercent = async () => {
    const session = await verifySession();
    if (!session) return null;
    try{
        const grades = await db.gradePercent.findMany({
            select: {
                id: true,
                writtenWork: true,
                performanceTask: true,
                quarterlyAssessment: true,
                createdBy: true,
            },
        });
        
        const renamedGrades = grades.map(grade => ({
            ...grade,
            name: grade.createdBy || '',
     // Optionally remove the original field
        }));
        
        return renamedGrades;
       
    }catch(error){

        console.error('Error fetching students:', error);
        return []
    }
}