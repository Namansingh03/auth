"use server"

import { prisma } from "@/lib/prisma"
import { CreateResponse } from "@/utils/createResponse"
import { generateOtp } from "@/utils/getGeneratedOtp";
import { SendSignUpVerificationOtp } from "@/emails/SendVerificationOtp";

export async function SendVerificationOtp(email : string) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if(!user){
        return CreateResponse(false , null, "User Nort found")
    }

    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.create({
        data : {
            code : otp,
            expiresAt,
            createdAt : new Date(Date.now()),
            userId : user.id
        }
    })

    const oTpSent = await SendSignUpVerificationOtp(email , otp)

    return CreateResponse(oTpSent.success, null, oTpSent.message)

}