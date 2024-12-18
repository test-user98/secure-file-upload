import { decryptFile } from "@/utils/encrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();



export const GET = async (req: NextRequest) => {
    const slug = req.nextUrl.searchParams.get("slug");
    const file = await prisma.file.findFirst({
        where: {
            slug: slug as string
        }
    })
    if (!file?.content || !file?.iv)
        return;
    const decryptedData = await decryptFile(file?.content, file?.iv);
    const decryptedBlob = new Blob([decryptedData], { type: file.type });
    return new NextResponse(decryptedBlob, {
        status: 200,
        headers: {
            'Content-Type': file.type,
            'Content-Disposition': `attachment; filename="${file.name}"`,
        }
    });;
}