'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const subjectSchema = z.object({
    subjectName: z.string().min(3,{message:'Subject name must be at least 3 characters long'}),
    teacherId: z.string().min(3,{message:'Teacher ID must be at least 3 characters long'}),
    grade_level: z.enum(['7', '8', '9', '10'], { message: 'Grade level must be 7, 8, 9, or 10' }),
    school_year: z.string().min(3,{message:'School year must be at least 3 characters long'}),
});

interface SubjectState {
    errors: {
        subjectName?: string[];
        teacherId?: string[];
        grade_level?: string[];
        school_year?: string[];
        _form?: string[];
    };
}

export async function addSubjectAction(formState: SubjectState, formData: FormData): Promise<SubjectState> {
    const result = subjectSchema.safeParse({
        subjectName: formData.get('subjectName'),
        teacherId: formData.get('teacherId'),
        grade_level: formData.get('grade_level'),
        school_year: formData.get('school_year'),
    });
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const teacher = await db.teacher.findUnique({
        where: {
            teacherId: result.data.teacherId,
        },
    });
    if (!teacher) {
        return {
            errors: {
                teacherId: ['Teacher not found'],
            },
        };
    }
    const year = new Date().getFullYear().toString();
    const subjectCount = await db.subject.count({
        where: {
            subjectId: {
                startsWith: year,
            },
        },
    });
    const uniqueSuffix = (subjectCount + 1).toString().padStart(4, '0');
    const subjectId = `S${year}${uniqueSuffix}`;
    try {
        await db.subject.create({
            data: {
                name: result.data.subjectName,
                teacherId: teacher.id,
                year_level: result.data.grade_level,
                subjectId: subjectId,
                school_year: result.data.school_year,
            },
        });
        revalidatePath('/subject')
    } catch (error) {
        if (error instanceof Error) {
            
            return {
                errors: {
                    _form: [error.message],
                },
            };
        }
    
    }
    return { errors: {} };
}


const studentIdSchema = z.object({
    studentId: z.string().min(8),
});

interface StudentState {
    errors: {
        studentId?: string[];
        _form?: string[];
    };
}

export async function addStudent(
    subjectId: string,
    formState: StudentState,
    formData: FormData
): Promise<StudentState> {
    // Validate the `studentId` input
    const result = studentIdSchema.safeParse({
        studentId: formData.get('studentId'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    if (!subjectId) {
        return {
            errors: {
                _form: ['Subject ID is required.'],
            },
        };
    }

    const studentId = result.data.studentId;

    try {
        // Find the subject and its students
        await db.student.update({
            where:{studentId:studentId},
            data:{
                subjects:{
                    connect:{
                        id:subjectId
                    }
                }
            }
        })
        revalidatePath(`/subject/${subjectId}/student`)
       
    } catch (error) {
      if(error instanceof Error){
        return {
            errors:{
                _form:[error.message]
            }
        }
      }
        return {
            errors: {
                _form: ['An unexpected error occurred. Please try again later.'],
            },
        };
    }
    redirect(`/subject/${subjectId}/student`)
    return {
        errors:{}
    }
}
