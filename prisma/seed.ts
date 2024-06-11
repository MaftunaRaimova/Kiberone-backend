import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newCourator = await prisma.courator.create({
        data:{
            name: 'Maftuna'
        }
    })
    
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})