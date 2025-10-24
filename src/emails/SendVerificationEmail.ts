import { resend } from "@/lib/resend";

const url = process.env.NEXT_AUTH_URL;

export const SendSignUpVerificationEmail = async (email: string, token: string) => {

  const confirmationLink = `${url}/auth/new-verification?token=${token}&email=${encodeURIComponent(email)}`;

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
};
