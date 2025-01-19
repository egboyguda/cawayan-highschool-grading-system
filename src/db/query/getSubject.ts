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
                subjectId: true,
                school_year: true,
            },
        });

        return subjects.map((subject) => ({
            id: subject.id,
            name: subject.name,
            teacherName: subject.teacher.name,
            year_level: subject.year_level,
            subjectId: subject.subjectId,
            school_year: subject.school_year,
        }));
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }
}