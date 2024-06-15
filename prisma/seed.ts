import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newCourator = await prisma.courator.create({
        data:{
            name: 'Maftuna',
            login: 'Maftuna2',
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
            login: 'Komila2',
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
            studentId: 7,
            couratorId: 9,
            reason: 'For the project',
            isApproved: false
        }
    })
}
async function parent(){
    const newParent = await prisma.parent.create({
        data:{
            name: 'Dilfuza',
            login: 'Dilfuza2',
            password: '123456'
        }
    })
}
async function homework(){
    const newHomework = await prisma.homework.create({
        data:{
            title: 'Math',
            deadline: new Date(),
            groupId: 1,
            item:{
                create:{
                    title: 'Math',
                    fileUrl: 'https://www.google.com',
                }
            }

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
parent().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})
homework().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})