import { v4 as uuid } from "uuid"
import { prisma } from "@/lib/prisma";
import { GetVerificationTokenByEamil } from "./getVerificationToken";

export const generatedVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exisitingToken = await GetVerificationTokenByEamil(email);

  if (exisitingToken) {
    await prisma.verificationToken.delete({
      where: { id: exisitingToken.id },
    });
  }

  const verifiactionToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verifiactionToken
};