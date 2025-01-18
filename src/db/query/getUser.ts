import { verifySession } from "@/lib/dal";
import { cache } from "react";
import { db } from "@/db";


export const getUser = cache(async()=>{
    const session = await verifySession();
    if(!session){
        return null;
    }
    const user = await db.user.findUnique({
        where:{
            id:session.userId,
        }});
    return user;
})