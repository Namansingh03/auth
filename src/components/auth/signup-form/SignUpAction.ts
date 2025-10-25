"use server";

import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/schemas/authSchema";
import { createResponse } from "@/helpers/createResponse";
import { generatedVerificationToken } from "@/utils/GenerateToken";
import bcrypt from "bcrypt";
import * as z from "zod";
import { GenerateSessionId } from "@/utils/GenerateSessionId";
import { setEmailToken } from "@/utils/redisUtils";
import { SendSignUpVerificationEmail } from "@/emails/SendVerificationEmail";

export async function SignUpAction(data: z.infer<typeof SignUpSchema>) {
  if (!data) {
    return createResponse(false, null, "Fields are empty");
  }

  const { email, password } = data;

  const existingEmail = await prisma.user.findUnique({ where: { email } });

  if (existingEmail) {
    return createResponse(false, null, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generatedVerificationToken(email);
  const sessionId = await GenerateSessionId();

  const RedisResponse = await setEmailToken(
    sessionId,
    verificationToken.email,
    verificationToken.token
  );

  if (!RedisResponse.success) {
    return createResponse(false, null, RedisResponse.message, false);
  }

  const emailResponse = await SendSignUpVerificationEmail(email, sessionId);
  return createResponse(
    emailResponse.success,
    null,
    emailResponse.message,
    emailResponse.errorResponse
  );
}
