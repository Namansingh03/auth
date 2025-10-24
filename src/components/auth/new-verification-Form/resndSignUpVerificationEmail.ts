"use server"

import { SendSignUpVerificationEmail } from "@/emails/SendVerificationEmail"
import { CreateResponse } from "@/utils/createResponse"
import { generatedVerificationToken } from "@/utils/getGenratedToken"

export async function ResendSignUpVerificationEmail(email : string) {
    const verifiactionToken = await generatedVerificationToken(email)
    const emailSent = await SendSignUpVerificationEmail(verifiactionToken.email , verifiactionToken.token)

    return CreateResponse(emailSent.success , null , emailSent.message)
}