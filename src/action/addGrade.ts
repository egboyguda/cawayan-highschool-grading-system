'use server';
import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

const gradeSchema = z.object({
    grade: z.number({ message: 'Grade must be a number.' }),
    type: z.enum(['performanceTask', 'writtenWork', 'quarterlyAssessment'], { message: 'Type must be one of the allowed options.' }),
    grading:z.enum(['1','2','3','4'],{message:'Grading must be one of the allowed options.'})
});

interface GradeState {
    errors: {
        grade?: string[];
        type?: string[];
        grading?:string[]
        _form?: string[];
    };
}

export async function addGrade(
    subjectId: string,
    studentId: string,
    formState: GradeState,
    formData: FormData
): Promise<GradeState> {
    // Parse form data and validate using Zod schema
    const result = gradeSchema.safeParse({
        grade: parseFloat(formData.get('grade') as string),
        type: formData.get('type'),
        grading:formData.get('grading')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { grade, type } = result.data;
    console.log(grade, type,studentId,subjectId,result.data.grading);
    try {
        // Upsert the grade in the database
        await db.grade.upsert({
            where: {
                studentId_subjectId_gradingPeriod: {
                    studentId,
                    subjectId,
                    gradingPeriod: parseInt(result.data.grading),
                },
            },
            update: {
                [type]: grade,
            },
            create: {
                studentId,
                subjectId,
                gradingPeriod:parseInt(result.data.grading),
                [type]: grade,
            },
        });
        revalidatePath('/subject/[id]/student');
        return { errors: {} }; // Return empty errors on success
    } catch (error) {
        console.error('Error while adding grade:', error);
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
            
        }

        return {
            errors: {
                _form: ['An unexpected error occurred. Please try again.'],
            },
        };
    }
}
