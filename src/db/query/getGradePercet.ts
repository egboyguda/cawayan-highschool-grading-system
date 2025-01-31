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



export async function findSubjectsAndGrades(studentId: string) {
  try {
    // Fetch student details
    const student = await db.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        studentId: true,
        year_level: true,
        gender: true,
        birthdata: true, // This can be null
        classroom: {
          select: {
            section: true
          }
        }
      },
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    // Calculate age only if birthdata is not null
    let age: number | null = null;
    if (student.birthdata) {
      const birthDate = new Date(student.birthdata); // Ensure birthdata is a valid Date object
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();

      // Adjust age if the birthday hasn't occurred yet this year
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
    }

    // Fetch grades and related subject information for the given studentId
    const grades = await db.grade.findMany({
      where: { studentId },
      include: {
        subject: true, // Include subject details
      },
    });

    // Transform the data into the desired format
    const result: Record<string, Record<string, number[]>> = {};

    grades.forEach((grade) => {
      const schoolYear = grade.subject.school_year;
      const subjectName = grade.subject.name;

      // Initialize the school year if it doesn't exist
      if (!result[schoolYear]) {
        result[schoolYear] = {};
      }

      // Initialize the subject if it doesn't exist
      if (!result[schoolYear][subjectName]) {
        result[schoolYear][subjectName] = [];
      }

      // Calculate the total grade for the grading period
      const totalGrade =
        (grade.writtenWork ?? 0) +
        (grade.performanceTask ?? 0) +
        (grade.quarterlyAssessment ?? 0);

      // Add the grade to the corresponding subject
      result[schoolYear][subjectName][grade.gradingPeriod - 1] = totalGrade;
    });

    // Ensure all grading periods (1st to 4th) are present for each subject
    Object.keys(result).forEach((schoolYear) => {
      Object.keys(result[schoolYear]).forEach((subject) => {
        const gradesArray = result[schoolYear][subject];
        for (let i = 0; i < 4; i++) {
          if (gradesArray[i] === undefined) {
            gradesArray[i] = 0; // Fill missing periods with 0
          }
        }
      });
    });

    console.log("result", result);
    return {
      studentId: student.id,
      lrn: student.studentId,
      name: student.firstName + " " + student.lastName,
      gradesData: result,
      gender: student.gender,
      year_level: student.year_level,
      age: age, // age will be null if birthdata is null
      section: student.classroom?.section
    };
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
}