'use server'
import { db } from "@/db";
import { revalidatePath } from "next/cache";


export async function deleteStudentAction(studentId: string) {
    await db.student.delete({
        where: {
            studentId: studentId
        }
    })
    revalidatePath('/students')
    
}
export async function deleteTeacherAction(teacherId: string) {
    console.log(teacherId)
    try{
        await db.teacher.delete({
            where: {
                teacherId: teacherId
            }
        })
    }catch(err){
        console.log(err)
    }
    revalidatePath('/teachers')
    
}