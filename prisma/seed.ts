import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newCourator = await prisma.courator.create({
        data:{
            name: 'Maftuna',
            password: '123456'
        }
    })
    return newCourator;
}
async function student(){
    const newStudent = await prisma.student.create({
        data:{
            name: 'Komila',
            age: 21,
            login: 'Komila',
            password: '123456',
            isActive: true,
            couratorId: 1,
            groupId: 1
        }
    })
    return newStudent;
}
async function group(){
    const newGroup = await prisma.group.create({
        data:{
            name : 'A',
            description: 'This is group A',
            couratorId: 1 
        }
    })
}
async function kiberone(){
    const newKiberone = await prisma.kiberone.create({
        data:{
            amount: 100,
            studentId: 1,
            couratorId: 1,
            reason: 'For the project',
            isApproved: false
        }
    })
}






main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})

student().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})

group().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})

kiberone().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})