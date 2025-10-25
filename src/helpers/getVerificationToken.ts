import { prisma } from "@/lib/prisma";

export const GetVerificationTokenByToken = async (token: string) => {
  try {
    const verifiactionToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verifiactionToken;
  } catch (error) {
    console.log("verification token by token : " , error)
    return null
  }
};

export const GetVerificationTokenByEamil = async (email: string) => {
  try {
    const verifiactionEmail = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verifiactionEmail;
  } catch (error) {
    console.log("verification token by email : " , error)
    return null
  }
};