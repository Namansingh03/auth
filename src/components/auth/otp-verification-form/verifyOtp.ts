"use server"

import { createResponse } from "@/helper/createResponse"
import { checkOtpRateLimit, resetOtpRateLimit } from "@/helper/rateLimiter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function VerifyOtp(otp : string, email : string | null) {
    if(!otp){
        return createResponse(false, null, "Enter a valid otp", false)
    }
    
    if(!email){
      return createResponse(false, null, "email not found")
    }
   
    const rateLimit = await checkOtpRateLimit(email)

     if (!rateLimit.allowed) {
    return createResponse(
      false,
      null,
      `Too many attempts. Please try again after sometime`,
      true
    );
  }

    const record = await prisma.verificationOtp.findFirst({
        where : { email }
    })

    if(!record){
        return createResponse(false, null, "Otp not found", false)
    }

    if (new Date() > record.expires) {
      await prisma.verificationOtp.delete({
        where: { id: record.id },
      });

      return createResponse(false, null, "Otp expired", false)
    }

    const isMatch = await bcrypt.compare(otp, record.otp);
    if (!isMatch) {
      return createResponse(false, null, "Incorrect otp", false)
    }
   
    await resetOtpRateLimit(email);

    await prisma.verificationOtp.delete({
      where: { id: record.id },
    });

    await prisma.user.update({
        where : {email},
        data : {
            emailVerified : new Date()
        }
    })

    return createResponse(true, null, "Email verified successfully", true)
}