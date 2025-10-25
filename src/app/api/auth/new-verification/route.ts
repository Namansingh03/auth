"use server";

import { prisma } from "@/lib/prisma";
import { createResponse } from "@/helpers/createResponse";
import { deleteEmailToken, getUserSession } from "@/utils/redisUtils";
import { GetVerificationTokenByToken } from "@/helpers/getVerificationToken";

export async function NewVerificationAction(sessionId: string) {

  const session = await getUserSession(sessionId);

  if (!session.success || !session.data) {
    return createResponse(false, null, "Session not found or expired", false);
  }

  const { accessToken} = JSON.parse(session.data);
  
  const verificationToken = await GetVerificationTokenByToken(accessToken)
  
  if(!verificationToken?.token){
    return createResponse(false, null , "token not found", false)
  }

  const now = new Date();
    if (verificationToken.expires < now) {
      return createResponse(false, null, "Token expired", false);
    }
  
   await Promise.all([
    deleteEmailToken(sessionId),
    prisma.verificationToken.delete({ where : { token : verificationToken.token}})
   ])

   return createResponse(true, null, "Email verified successfully", false);

}
