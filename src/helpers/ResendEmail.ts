"use server"

import { createResponse } from "./createResponse"
import { getUserSession, setEmailToken } from "@/utils/redisUtils"
import { generatedVerificationToken } from "@/utils/GenerateToken"
import { GenerateSessionId } from "@/utils/GenerateSessionId"
import { SendSignUpVerificationEmail } from "@/emails/SendVerificationEmail"

export async function ResendSignUpEmail(sessionID : string) {
    const session = await getUserSession(sessionID)
   
    if(!session.data){
        return createResponse(false , null, "Session not found", false)
    }
    else{
        const { email } = JSON.parse(session.data)
        const verificationToken = await generatedVerificationToken(email)
        const sessionId = await GenerateSessionId()
        await setEmailToken(sessionId, verificationToken.email, verificationToken.token)

        const emailRes = await SendSignUpVerificationEmail(email, sessionID)
        
        return createResponse(emailRes.success, null, emailRes.message , false)
    }
    
}