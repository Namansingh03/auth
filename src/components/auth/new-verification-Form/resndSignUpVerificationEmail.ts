"use server"

import { SendSignUpVerificationEmail } from "@/emails/SendVerificationEmail"
import { CreateResponse } from "@/utils/createResponse"
import { generatedVerificationToken } from "@/utils/getGenratedToken"

export async function ResendSignUpVerificationEmail(email : string) {
    const verifiactionToken = await generatedVerificationToken(email)
    await SendSignUpVerificationEmail(verifiactionToken.email , verifiactionToken.token)

    return CreateResponse(true , "Email sent successfully")
}