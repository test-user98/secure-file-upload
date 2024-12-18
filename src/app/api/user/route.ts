import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prismaClient = new PrismaClient();



export const GET = async () => {
    const session: any = await auth();
    if (!session || session?.role != 1)
        return NextResponse.json({
            mesaage: "Error"
        }, {
            status: 400
        });
    const users = await prismaClient.user.findMany({
        select: {
            email: true,
            id: true,
            role: true
        }
    });

    return NextResponse.json({
        data: users,
        message: "Sucess"
    });
}