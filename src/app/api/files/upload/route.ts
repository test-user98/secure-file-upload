import { auth } from "@/auth";
import { encryptFile } from "@/utils/encrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 10 })
const prisma = new PrismaClient();



export const POST = async (req: NextRequest) => {
    const session: any = await auth();
    const body = await req.formData();
    const file = body.get("file") as File;
    const arrayBuffer = await file?.arrayBuffer();
    const encryptedData = await encryptFile(new Uint8Array(arrayBuffer))
    const slug = uid?.randomUUID();
    await prisma.file.create({
        data: {
            content: encryptedData.encryptedContent,
            iv: encryptedData.iv,
            name: file?.name,
            slug: slug,
            type: file?.type,
            encrypted: true,
            ownerId: session?._id,
            ownerEmail: session?.email
        },
    })
    return NextResponse.json({
        data: {
            url: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/download/${slug}`
        }
    })
}