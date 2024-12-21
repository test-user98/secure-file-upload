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

        // Check if email and password are provided
        if (!email || !password) {
            return NextResponse.json({
                message: "Email and password are required"
            }, {
                status: 400
            });
        }

        // Fetch user from database based on email using findFirst
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({
                message: "Invalid email or password"
            }, {
                status: 401
            });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Store OTP in Redis with a 5-minute expiration
        await redis.set(`OTP:${user.id}`, otp.toString(), 'EX', 300);

        await transporter.sendMail({
            to: email,
            from: process.env.ADMIN_EMAIL,
            subject: "Your Login OTP at File Secure Share APP",
            text: `Your OTP is: ${otp}, valid for 5 minutes`
        });

        return NextResponse.json({
            message: "Success",
            userId: user.id
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            message: "An error occurred during login"
        }, {
            status: 500
        });
    }
}
