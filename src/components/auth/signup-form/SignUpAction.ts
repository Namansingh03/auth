"use server"

import z from "zod";
import { SignUpSchema } from "@/schemas/auth-schema";
import { createResponse } from "@/helper/createResponse";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";
import { SendOtpViaEmail } from "@/helper/SendOtp";

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

    await prisma.user.create({
        data : {
            email,
            createdAt : new Date,
            password : hashedPassword
        }
    })

    const res = await SendOtpViaEmail(email)

    return createResponse(res.success, res.data, res.message, res.errorResponse)
}