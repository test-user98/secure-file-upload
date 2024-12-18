"use server"

import { signIn, signOut } from "@/auth"
import { NextAuthCredsAuthorizeParamsType } from "@/types/types";
import { CredentialsSignin } from "next-auth";


export const credsLoginHandler = async (data: NextAuthCredsAuthorizeParamsType) => {
    try {
        const signInData = await signIn("credentials", {
            ...data,
            redirectTo: "/",
        });
        return data;
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
    }
}

export const googleLoginHandler = async () => {
    await signIn("google", {
        redirectTo: "/admin"
    });
}

export const signOutHandler = async () => {
    signOut({
        redirect: false
    })

}