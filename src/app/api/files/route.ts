import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prismaClient = new PrismaClient();


export const GET = async (req: NextRequest) => {
    const session: any = await auth();
    if (!session)
        return NextResponse.json({
            message: "Error"
        }, {
            status: 400
        });
    if (session?.role == 1) {
        const files = await prismaClient.file.findMany({
            select: {
                name: true,
                slug: true,
                type: true,
                createdAt: true,
                id:true,
                ownerEmail:true
            }
        });

        return NextResponse.json({
            data: files,
            message: "Sucess"
        });
    }
    else if (session?.role == 2) {
        const files = await prismaClient.file.findMany({
            select: {
                name: true,
                slug: true,
                type: true,
                createdAt: true,
                id:true,
            },
            where: {
                ownerId: session?._id
            }
        });

        return NextResponse.json({
            data: files,
            message: "Sucess"
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    const session: any = await auth();
    if (!session || !id)
        return NextResponse.json({
            message: "Error"
        }, {
            status: 400
        });        
    await prismaClient.file.delete({
        where: {
            id: parseInt(id)
        },
    });

    return NextResponse.json({
        data: null,
        message: "Sucess"
    });
}