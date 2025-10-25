"use server";

import crypto from "crypto"
import { CreateResponse } from "@/utils/createResponse";
import { SendUpVerificationOtpEmail } from "@/emails/SendVerificationOtpEmail";
import redis from "@/lib/redis";

export async function SendVerifiactionOtp(email: string) {
  // 1. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
 
  await redis.set(`otp:${email}`, otp , `EX` , 300)

  // send email to user with otp
  await SendUpVerificationOtpEmail(email, otp)
  .then((res) => {
    if(res.success){
      return CreateResponse(res.success, null , res.message)
    }
    else{
      return CreateResponse(res.success, null, res.message)
    }
  })
}
