"use server"

import { CreateResponse } from "@/utils/createResponse"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import z from "zod"
import { SignUpSchema } from "@/schemas/authSchema"
import { generatedVerificationToken } from "@/utils/getGenratedToken"
import { SendSignUpVerificationEmail } from "@/emails/SendVerificationEmail"

export default async function SignUpAction(formData : z.infer<typeof SignUpSchema>) {
    const validatedFields = await SignUpSchema.safeParse(formData)

    if(!validatedFields.success){
        return CreateResponse(
            false,
            null,
            "Invalid fields"
        )
    }

    const { email , password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password , 10)

    const existingUser = await prisma.user.findUnique({
        where : {email}
    })

    if(existingUser){
        return CreateResponse(false , null , "Email already exists")
    }

    await prisma.user.create({
        data : {
            email,
            password : hashedPassword,
        }
    })

    const verifiactionToken = await generatedVerificationToken(email)
    await SendSignUpVerificationEmail(verifiactionToken.email , verifiactionToken.token);
 
    return CreateResponse(true , null , "Verification email sent successfully")
}