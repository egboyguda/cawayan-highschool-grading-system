'use server';

import { db } from '@/db';
import {z} from 'zod';
import { compareSync } from 'bcrypt-ts';
import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation';


const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
});

interface LoginState {
    errors:{
        username?:string[];
        password?:string[];   
        _form?:string[];
    }
}


export async function loginAction(formState:LoginState,formData:FormData):Promise<LoginState>{
    const result = loginSchema.safeParse({
        username:formData.get('username') ,
        password:formData.get('password'),
    })
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors,
        };
    }

    const user= await db.user.findUnique({
        where:{
            username:result.data.username,
        },
    });

    if(!user){
        return {
            errors:{
                _form:['Invalid credentials'],
            },
        };
    }

    if(!compareSync(result.data.password,user.password)){
        return {
            errors:{
                _form:['Invalid credentials'],
            },
        };
    
    }
    const userId = user.id.toString();

    await createSession(userId)
    redirect('/');

}