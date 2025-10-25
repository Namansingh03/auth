"use server";

import redis from "@/lib/redis";
import { CreateResponse } from "@/utils/createResponse";

export async function VerifyOtp(email: string, otp: string) {
  if (!email || !otp) {
    return CreateResponse(false, null, "Otp field is empty");
  }

  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) {
    return CreateResponse(false, null, "OTP expired or not found");
  }

  if(storedOtp !== otp){
    return CreateResponse(false , null, "Invalid Otp")
  }

  await redis.del(`otp:${email}`);

  return CreateResponse(true, null , "Otp Verified")

}
