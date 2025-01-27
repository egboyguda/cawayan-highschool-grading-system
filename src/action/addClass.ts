'use server'
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const classSchema = z.object(
    {
        section: z.string().min(3),
        adviser: z.string().min(3),
        schoolYear: z.string().min(3),
        gradeYear: z.enum(['7', '8', '9', '10']),
    }
)
interface classState{
    errors:{
        section?:string[],
        adviser?:string[],
        schoolYear?:string[],
        gradeYear?:string[],
        _form?:string[]
    }
}
export async function addClassAction(formState:classState,formData:FormData):Promise<classState>{
    const result = classSchema.safeParse({ 
        section: formData.get('section'),
        adviser: formData.get('adviser'),
        schoolYear: formData.get('schoolYear'),
        gradeYear: formData.get('gradeYear'),
    })

    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }
    const teacher = await db.teacher.findUnique({
        where: {
            teacherId: result.data.adviser,
        },
    })
    if(!teacher){
        return{
            errors: {
                adviser: ['Teacher not found'],
            }
        }
    }
    const year = new Date().getFullYear().toString();
    const classCount = await db.classroom.count({
        where: {
            classId: {
                startsWith: year,
            },
        },
    });

    const uniqueSuffix = (classCount + 2).toString().padStart(4, '0'); // Ensure 4-digit suffix
    const classId = `C${year}${uniqueSuffix}`;
    try{
        await db.classroom.create({
            data: {
                section: result.data.section,
                adviserId: teacher.id,
                year_level: result.data.gradeYear,
                school_year:result.data.schoolYear    ,
                classId: classId,           
          
            },
        })
    }catch(error){
        if(error instanceof Error){
            return{
                errors: {
                    _form: [error.message],
                }
            }
        }
    }
    return {
        errors: {},
    }
}

const studentIdSch = z.object({
    studentId: z.string().min(3),
})

interface studentIdState{
    errors:{
        studentId?:string[],
        _form?:string[]
    }
}
export async function addStudentAction(classId:string,formState:studentIdState,formData:FormData):Promise<studentIdState>{
    const result = studentIdSch.safeParse({ 
        studentId: formData.get('studentId'),
    })

    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors,
        }
    }
 
  
    try{
      await db.classroom.update({
            where:{
                id:classId
            },
            data:{
                students:{
                    connect:{
                        studentId:result.data.studentId
                    }
                }
            }
        })
       
        revalidatePath( `/class/${classId}/students`)
    }catch(error){
        if(error instanceof Error){
            return{
                errors: {
                    _form: [error.message],
                }
            }
        }
    }
    return {
        errors: {},
    }


}