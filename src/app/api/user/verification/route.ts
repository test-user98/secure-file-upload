import { PrismaClient } from '@prisma/client';
import redis from 'ioredis'
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'
const redisClient = new redis({
    host: 'redis-16657.c9.us-east-1-4.ec2.redns.redis-cloud.com',
    password: 'aaCEXLVpWhzwd8cwyb0MOFy8SdEtdvOJ',
    port: 16657
})
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD,
    },
});

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { email, password } = body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });
    if (!user || user?.password != password)
        return NextResponse.json({
            message: "Invalid Email Password"
        }, {
            status: 400
        })
    await redisClient.set(`OTP:${user?.id}`, otp);
    await transporter.sendMail({
        to: email,
        from: process.env.ADMIN_EMAIL,
        text: `Your OTP is: ${otp} , valid for 5 minutes`
    });

    return NextResponse.json({
        message: "Sucess"
    })

}