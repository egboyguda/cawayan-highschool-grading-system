import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt-ts';
const prisma = new PrismaClient();

async function main() {
    try{
        await prisma.user.create({
            data: {
                username: 'admin',
                password: hashSync('admin'),
            }})
        console.log('Admin user created')
    }catch(e){
        console.error(e)
    }finally{
        console.log('Seeder finished')
    }
}
main()