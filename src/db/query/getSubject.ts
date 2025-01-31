import { db } from "@/db";
import { verifySession } from "@/lib/dal";



interface Subject{
    id: string;
    name: string;
    teacherName: string;
    year_level: string;
    subjectId: string;
    school_year: string;
}
interface SubjectWithStudent{
    id: string;
    name: string;
    teacherName: string;
    year_level: string;
    subjectId: string;
    school_year: string;
    students: {
        id: string;
        studentId: string
        name: string;
        grades: {
            id: string;
            gradingPeriod: number;
            writtenWork: number;
            quarterlyAssess: number;
            performanceTask: number;
        }[];
    }[];

}
export const getAllSubjects = async (): Promise<Subject[] | null> => {
    const session = await verifySession();
    if (!session) {
        return null;
    }

    try {
        const subjects = await db.subject.findMany({
            select: {
                id: true,
                name: true,
                teacher: {
                    select: {
                        name: true,
                    },
                },
                year_level: true,
                subjectId: true ,
                school_year: true,
            },
        });

        return subjects.map((subject) => ({
            id: subject.id,
            name: subject.name,
            teacherName: subject?.teacher?.name || 'no teacher',
            year_level: subject.year_level,
            subjectId: subject?.subjectId || '',
            school_year: subject.school_year,
        }));
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }
}

export const getSubject = async (id: string): Promise<SubjectWithStudent | null> => {
    const session = await verifySession();
    if (!session) {
        return null;
    }

    try {
        const subject = await db.subject.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                teacher: {
                    select: {
                        name: true,
                    },
                },
                year_level: true,
                subjectId: true,
                school_year: true,
                students: {
                    select: {
                        id: true,
                        studentId:true,
                        firstName: true,
                        lastName: true,
                        grades: {
                            where:{
                                subjectId: id
                            },
                            select: {
                                id: true,
                                gradingPeriod: true,
                                writtenWork: true,
                                 quarterlyAssessment: true,
                              performanceTask: true,
 
                            },
                        },
                    },
                },
            },
        });

        if (!subject) {
            return null;
        }
       // revalidatePath('/subject/[id]/student')
        return {
            id: subject.id,
            name: subject.name,
            teacherName: subject?.teacher?.name || '',
            year_level: subject.year_level,
            subjectId: subject.subjectId || '',
            school_year: subject.school_year,
            students: subject.students.map((student) => ({
                id: student.id,
                studentId:student.studentId,
                name: `${student.firstName} ${student.lastName}`,
                grades: student.grades.map((grade) => ({
                    id: grade.id,
                    gradingPeriod: grade.gradingPeriod || 1,
                    writtenWork: grade.writtenWork || 0,
                    quarterlyAssess: grade.quarterlyAssessment || 0,
                    performanceTask: grade.performanceTask || 0,
                })),
            })),
        };
    } catch (error) {
        console.error('Error fetching subject:', error);
        return null;
    }
}