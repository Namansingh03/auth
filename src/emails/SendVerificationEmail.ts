import { resend } from "@/lib/resend";
import { CreateResponse } from "@/utils/createResponse";

const url = process.env.NEXT_AUTH_URL;

export const SendSignUpVerificationEmail = async (email: string, sessionId: string) => {

  const confirmationLink = `${url}/auth/new-verification?sid=${sessionId}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `
        <p>Hi there,</p>
        <p>Wecome to our app , Here's your confirmation link click on it to verify your email.</p>
        <p>
          <a href="${confirmationLink}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
            Confirm Email
          </a>
        </p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,<br/>The Your Company Team</p>
      `,
    });

    return CreateResponse(true , null, "successfully sent verification email")

  } catch (error) {
    return CreateResponse(false, null , "Something went wrong while resending verifiaction email")
    console.log(error)
  }
};
