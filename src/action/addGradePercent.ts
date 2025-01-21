'use server'
import {z} from 'zod';
import { db } from '@/db';

const gradePercentSchema =z.object({
    performanceTask: z.number({message:'Performance task must be a number.'}),
    writtenWork: z.number({message:'Written work must be a number.'}),
    quarterlyAssessment: z.number({message:'Quarterly assessment must be a number.'}),
    name: z.string().min(3),
    
})

interface gradePercentState{
   errors:{
    performanceTask?:string[];
    writtenWork?:string[];
    quarterlyAssessment?:string[];
    name?:string[];
    _form?:string[];
   }
}

export async function addGradePercent(formState:gradePercentState,formData:FormData):Promise<gradePercentState>{
    const result = gradePercentSchema.safeParse({
       performanceTask: parseFloat(formData.get('performanceTask') as string),
       writtenWork: parseFloat(formData.get('writtenWork') as string),
       quarterlyAssessment: parseFloat(formData.get('quarterlyAssessment') as string),
       name: formData.get('name'),  

    });
    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors,
        }
    }
    try {
        console.log(result.data)
        await db.gradePercent.create({
            data:{
                createdBy:result.data.name,
                performanceTask:result.data.performanceTask,
                writtenWork:result.data.writtenWork,
                quarterlyAssessment:result.data.quarterlyAssessment

            }
        })
    } catch (error) {
        if(error instanceof Error){
            return{
                errors:{
                    _form:[error.message],
                }
            }
        }
        return{
            errors:{
                _form:['Something went wrong'],
            }
        }
    }


    return{
        errors:{

        }
    }
}