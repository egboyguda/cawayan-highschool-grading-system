'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import {z} from 'zod';


const studentSchema = z.object(
    {
        first_name: z.string().min(3),
        last_name: z.string().min(3),
        middle_name: z.nullable(z.string().min(3)),
    }
)
interface StudentState {
    errors: {
        first_name?: string[];
        last_name?: string[];
        middle_name?: string[];
        _form?: string[];
    }
}




export async function addStudentAction(formState: StudentState, formData: FormData): Promise<StudentState> {
    const result = studentSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        middle_name: formData.get('middle_name'),
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }
    try {
        const year = new Date().getFullYear().toString(); // Get the current year as a string

        const studentCount = await db.student.count({
            where: {
              studentId: {
                startsWith: year, // Filter for students starting with the year
              },
            },
          });
        
          const uniqueSuffix = (studentCount + 1).toString().padStart(4, '0'); // Ensure 4-digit suffix
          const studentId = `${year}${uniqueSuffix}`;
       await db.student.create({
              data: {
                firstName: result.data.first_name,
                lastName: result.data.last_name,
                middleName: result.data.middle_name||null, 
                studentId:studentId
              }
         }) 
         revalidatePath('/students')
         revalidatePath('/')

    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                }
            }
        }return {
            errors: {
                _form: ['An error occurred'],
            }
        }
    }
    return {
        errors: {},
    };
}

