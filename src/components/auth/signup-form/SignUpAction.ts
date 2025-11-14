"use server"

import z from "zod";
import { SignUpSchema } from "@/schemas/auth-schema";
import { createResponse } from "@/helper/createResponse";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";
import { generateOtp } from "@/helper/generateOtp";
import { SendUpVerificationOtpEmail } from "../../../../emails/sendVerificationOtpEmail";

export async function SignUpAction(data : z.infer<typeof SignUpSchema>) {
    if(!data){
        return createResponse(false, null, "Fiels are empty", false)
    }

    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({
        where : { email }
    })

    if(existingUser){
        return createResponse(false, null, "The user already exists with this email", true)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const otp = await generateOtp()
    const hashedOtp = await bcrypt.hash(otp, 10)

    await prisma.user.create({
        data : {
            email,
            createdAt : new Date,
            password : hashedPassword
        }
    })

    await prisma.verificationOtp.create({
        data : {
            email,
            otp : hashedOtp,
            expires : new Date(Date.now() + 10 * 60 * 1000)
        }
    })

    const response = await SendUpVerificationOtpEmail(email, otp)

    return createResponse(response.success, response.data, response.message, true)
}