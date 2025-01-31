'use server';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {z} from 'zod';

const teacherSchema = z.object(
    {
        name: z.string().min(3),
        username: z.string().min(3),
        licenseNumber: z.string().min(3),
        rank: z.string().min(3),
        major: z.string().min(3),
        password: z.string().min(3),
        password1: z.string().min(3),

    }
)
interface TeacherState {
    errors: {
        name?: string[];
        username?: string[];
        licenseNumber?: string[];
        rank?: string[];
        major?: string[];
        password?: string[];
        password1?: string[];
        _form?: string[];
    }
}

export async function addTeacherAction(formState: TeacherState, formData: FormData): Promise<TeacherState> {
    const result = teacherSchema.safeParse({
        name: formData.get('name'),
        username: formData.get('username'),
        licenseNumber: formData.get('licenseNumber'),
        rank: formData.get('rank'),
        major: formData.get('major'),
        password: formData.get('password'),
        password1: formData.get('password1'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    if (result.data.password !== result.data.password1) {
        return {
            errors: {
                password1: ['Password does not match'],
            },
        };
    }

    try {
        const year = new Date().getFullYear().toString(); // Get the current year as a string
        let teacherCount = await db.teacher.count({
            where: {
                teacherId: {
                    startsWith: year, // Filter for teachers starting with the year
                },
            },
        });

        const generateTeacherId = () => {
            const uniqueSuffix = (teacherCount + 2).toString().padStart(4, '0'); // Ensure 4-digit suffix
            return `T${year}${uniqueSuffix}`;
        };

        let teacherId = generateTeacherId();
        
        // Ensure that the teacherId is unique
        while (await db.teacher.findUnique({ where: { teacherId } })) {
            teacherCount++;
            teacherId = generateTeacherId();
        }

        const teacher = await db.teacher.create({
            data: {
                name: result.data.name,
                licenseNum: result.data.licenseNumber,
                rank: result.data.rank,
                major: result.data.major,
                teacherId: teacherId,
            },
        });

        await db.user.create({
            data: {
                username: result.data.username,
                password: result.data.password,
                teacherId: teacher.id,
            },
        });

        revalidatePath('/teachers');
        revalidatePath('/');

    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        }
    }
    redirect('/teachers');
    return { errors: {} };
}
