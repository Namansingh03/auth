"use server"

import { prisma } from "@/lib/prisma";
import { GetVerificationTokenByToken } from "@/utils/getVerificationToken";
import { CreateResponse } from "@/utils/createResponse";
import { NextResponse } from "next/server";

export const newVerifiactionAction = async (token : string) => {
   const existingToken = await GetVerificationTokenByToken(token);

   if(!existingToken){
    return CreateResponse(false , "verification token not found")
   }

   const hasExpired = new Date(existingToken.expires) < new Date();

   if(hasExpired){
    return CreateResponse(false , "verification token has expired")
   }

   const existingUser = await prisma.user.findUnique({where : {email : existingToken.email}});

   if(!existingUser){
    return CreateResponse(false , "User not found")
   }

   await prisma.user.update({
    where : { id : existingUser.id},
    data : {
       emailVerified : new Date(),
       email : existingToken.email
    }
   })

   await prisma.verificationToken.delete({
    where : { id : existingToken.id }
   })

   return CreateResponse(true ,null, "Email verified successfully")

}