'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod';


const studentSchema = z.object(
    {
        first_name: z.string().min(3),
        last_name: z.string().min(3),
        middle_name: z.nullable(z.string().min(3)),
        gender:z.enum(['male','female']),
        birthdate:z.preprocess((arg) => {
            if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
          }, z.date())
    }
)
interface StudentState {
    errors: {
        first_name?: string[];
        last_name?: string[];
        middle_name?: string[];
        gender?: string[];
        birthdate?: string[];
        _form?: string[];
    }
}




export async function addStudentAction(studentId: string | null, formState: StudentState, formData: FormData): Promise<StudentState> {
    const result = studentSchema.safeParse({ 
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        middle_name: formData.get('middle_name'),
        gender: formData.get('gender'),
        birthdate: formData.get('birthdate'),
    });

    if (!result.success) {
        console.log(formData.get('birthdate'));
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }
    if (studentId) {
        console.log(studentId)
        try {
            await db.student.update({
                where: { id: studentId },
                data: {
                    firstName: result.data.first_name,
                    lastName: result.data.last_name,
                    middleName: result.data.middle_name || null,
                    gender: result.data.gender,
                    birthdata: result.data.birthdate,
                },
            });
            revalidatePath('/students');
            redirect('/students');
        } catch (error) {
            if (error instanceof Error) {
                return {
                    errors: {
                        _form: [error.message],
                    },
                }
                
            }
        }
        return {
            errors: {},
        };
    }
    try {
        const year = new Date().getFullYear().toString(); // Get the current year as a string

        let studentCount = await db.student.count({
            where: {
                studentId: {
                    startsWith: year, // Filter for students starting with the year
                },
            },
        });

        const generateStudentId = () => {
            const uniqueSuffix = (studentCount + 1).toString().padStart(4, '0'); // Ensure 4-digit suffix
            return `${year}${uniqueSuffix}`;
        };

        let studentId = generateStudentId();

        // Ensure the generated studentId is unique
        while (await db.student.findUnique({ where: { studentId } })) {
            studentCount++;
            studentId = generateStudentId();
        }

        // Parse the birthdate string to Date
        const birthdate = result.data.birthdate ? new Date(result.data.birthdate) : null;

        // Create the new student
        await db.student.create({
            data: {
                firstName: result.data.first_name,
                lastName: result.data.last_name,
                middleName: result.data.middle_name || null,
                studentId: studentId,
                gender: result.data.gender,
                birthdata: birthdate,
            },
        });

        revalidatePath('/students');
        revalidatePath('/');
        redirect('/students');

    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        }

        return {
            errors: {
                _form: ['An error occurred'],
            },
        };
    }

    return {
        errors: {},
    };
}

