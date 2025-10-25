import { createResponse } from "@/helpers/createResponse"
import redis from "@/lib/redis"

const EXPIRY_TOKEN = 30 * 60 // 30 minutes
const EXPIRY_OTP = 5 * 60 // 5 minutes

export async function setEmailToken(sessionId: string, email: string, accessToken: string) {
  try {
    const value = JSON.stringify({ email, accessToken })
    await redis.setex(`session:${sessionId}`, EXPIRY_TOKEN, value)
    return createResponse(true, null, "Email token setSuccessfull", false)
  } catch (error) {
    console.log(error)
    return createResponse(false, null, "Email token not set", false)
  }
}

export async function setEmailOTP(sessionId: string, email: string, accessToken: string) {
  try {
    const value = JSON.stringify({ email, accessToken })
    await redis.setex(`session:${sessionId}`, EXPIRY_OTP, value)
    return createResponse(true, null, "Email OTP setSuccessfully", false)
  } catch (error) {
    console.log(error)
    return createResponse(false, null, "Email OTP not set", false)
  }
}

export async function getUserSession(sessionId: string) {
  const data = await redis.get(`session:${sessionId}`)
  if (!data){
    return createResponse(false, null , "Session access not successfull", false)
  }
  else{
    return createResponse(true, data , "Session access successfull", false)
  }
}

export async function deleteEmailToken(sessionId: string) {
  await redis.del(`session:${sessionId}`)
}
