import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { redis } from '@/lib/redis';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD,
    },
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;
        const otp = Math.floor(100000 + Math.random() * 900000); 

        const check = await prisma.user.findFirst({
            where: {
                email: email
            }
        });   

        if (check) {
            return NextResponse.json({
                message: "User Already Exists"
            }, {
                status: 409
            });
        }

        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
                role: 2,
            },
        });

        await redis.set(`OTP:${user?.id}`, otp, 'EX', 300); // Set OTP with 5 minutes expiry

        await transporter.sendMail({
            to: email,
            from: process.env.ADMIN_EMAIL,
            subject: "Your OTP for registration at File Secure Share Application",
            text: `Your OTP is: ${otp} , valid for 5 minutes`
        });

        return NextResponse.json({
            message: "Success"
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({
            message: "An error occurred during registration"
        }, {
            status: 500
        });
    }
}

