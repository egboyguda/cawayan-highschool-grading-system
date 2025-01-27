'use server'
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteStudentAction(studentId: string) {
    await db.student.delete({
        where: {
            studentId: studentId
        }
    })
    revalidatePath('/students')
    redirect('/students')
}