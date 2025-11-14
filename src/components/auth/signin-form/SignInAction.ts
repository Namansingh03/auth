"use server"

import { createResponse } from "@/helper/createResponse";
import { prisma } from "@/lib/prisma";
import { SignInSchema } from "@/schemas/auth-schema";
import z from "zod";
import bcrypt from "bcrypt"
import { isEmailVerificationExpired } from "@/helper/checkEmailVerified";
import { SendOtpViaEmail } from "@/helper/SendOtp";

export async function SignInAction(data : z.infer<typeof SignInSchema>) {
    if(!data){
        return createResponse(false, null, "Fields are empty", false)
    }

    const { email, password } = data

    const existingUser = await prisma.user.findUnique({
        where : {email}
    })

    if(!existingUser){
        return createResponse(false, null, "User not found", true)
    }
    
    if(!existingUser.emailVerified || !isEmailVerificationExpired(existingUser.emailVerified)){

        await SendOtpViaEmail(email)

        return createResponse(false,  501, "Your email is not verified, we have sent a verification otp to this email")
    }

    const hashedPassword = existingUser.password
    const comparedPassword = await bcrypt.compare(password, hashedPassword!) // check this

    if(!comparedPassword){
        return createResponse(false, null, "Incorrect password", false)
    }

    return createResponse(true, null, "user signed in successfully")
} 