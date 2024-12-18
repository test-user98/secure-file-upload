import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient();
export const GET = async () => {
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const filesToDelete = await prisma.file.findMany({
        where: {
            createdAt: {
                lt: cutoffTime,
            },
        },
    });

    for (const file of filesToDelete) {
        await prisma.file.delete({
            where: {
                id: file.id,
            },
        });
        console.log(`File with ID ${file.id} deleted.`);
    }
}