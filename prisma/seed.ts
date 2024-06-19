import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// async function main() {
//     const newCourator = await prisma.courator.create({
//         data:{
//             name: 'Dilfuza',
//             login: 'Dilfuza1',
//             password: '123456'
//         }
//     })
//     return newCourator;
// }

// async function student(){
//     const newStudent = await prisma.student.create({
//         data:{
//             name: 'Komila',
//             age: 21,
//             login: 'Komila1',
//             password: '123456',
//             isActive: true,
//             groupId: 1,
//             parentId: 1
//         }
//     })
//     return newStudent;
// }

// async function group(){
//     const newGroup = await prisma.group.create({
//         data:{
//             name : 'A',
//             description: 'This is group A',       
//         }
//     })
// }

// async function kiberone(){
//     const newKiberone = await prisma.kiberone.create({
//         data:{
//             amount: 100,
//             studentId: 1,
//             couratorId: 1,
//             reason: 'For the project',
//             isApproved: true
//         }
//     })
//     return newKiberone;
// }

// async function parent(){
//     const newParent = await prisma.parent.create({
//         data:{
//             name: 'Dilfuza',
//             login: 'Dilfuza2',
//             password: '123456'
//         }
//     })
// }

// async function homework(){
//     const newHomework = await prisma.homework.create({
//         data:{
//             title: 'Math',
//             deadline: new Date(),
//             groupId: 1,
//             item:{
//                 create:{
//                     title: 'Math',
//                     fileUrl: 'https://www.google.com',
//                 }
//             }

//         }
//     })
//     return newHomework;
// }





// main().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })

// student().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })

// group().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })

// kiberone().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })

// parent().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })

// homework().catch(e => {
//     console.log(e);
//     process.exit(1);
// }).finally(() => {
//     prisma.$disconnect();
// })