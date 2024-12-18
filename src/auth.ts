import NextAuth, { CredentialsSignin } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials'; 
import redis from 'ioredis'
const prisma = new PrismaClient();
const redisClient = new redis({
    host: 'redis-16657.c9.us-east-1-4.ec2.redns.redis-cloud.com',
    password: 'aaCEXLVpWhzwd8cwyb0MOFy8SdEtdvOJ',
    port: 16657
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "crendentials",
            credentials: {
                email: {
                    type: "email",
                    label: "Email"
                },
                password: {
                    type: "text",
                    label: "Password"
                }
            },
            authorize: async (cred, req) => {
                const { email, password } = cred;
                if (!email || !password)
                    throw new CredentialsSignin({
                        cause: "otp is required"
                    })


                const user = await prisma.user.findFirst({
                    where: {
                        email: email as string
                    }
                });
                if (!user)
                    throw new CredentialsSignin({
                        cause: "invalid otp"
                    });
                const otp = await redisClient.get(`OTP:${user?.id}`);
                const verifyPassword = otp === password;
                if (!verifyPassword)
                    throw new CredentialsSignin({
                        cause: "invalid otp"
                    });
                return {
                    email: user?.email,
                    role: user?.role,
                    _id: user?.id,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findFirst({
                  where: {
                    email: user?.email as string,
                  },
                });
        
                if (dbUser) {
                  token.email = dbUser.email;
                  token.role = dbUser.role;
                  token.id=dbUser?.id
                }
              }
            return { ...token, ...user }
        },
        async session({ token, session }) {
            return {
                ...session,
                ...token
            };
        },
        async signIn({ account, profile }) {
            const emailId = profile?.email as string;
            if (account?.provider == 'credentials') return true;

            if (account?.provider == 'google') {
                const existingUser = await prisma.user.findFirst({
                    where: { email: emailId },
                });
                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: emailId,
                            role: 2,
                            password: account?.access_token as string
                        },
                    });
                }

                return true;
            }

            return false;
        },
    },
    pages: {
        signIn: '/auth/login',
    },
    trustHost: true,
});