"use server"

import { prisma } from "@/lib/prisma"
import { createResponse } from "./createResponse"
import { generateOtp } from "./generateOtp"
import bcrypt from "bcrypt"
import { SendUpVerificationOtpEmail } from "../../emails/sendVerificationOtpEmail"

export async function SendOtpViaEmail(email : string | null) {
    if(!email){
        return createResponse(false, null, "Email not found", false)
    }

    const otp = await generateOtp()
    const hashedOtp = await bcrypt.hash(otp, 10)
    const expiry = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.verificationOtp.deleteMany()

    await prisma.verificationOtp.create({
        data : {
            email,
            otp : hashedOtp,
            expires : expiry
        }
    })

    const response = await SendUpVerificationOtpEmail(email, otp)

    return createResponse(response.success, response.data, response.message, response.errorResponse)
}