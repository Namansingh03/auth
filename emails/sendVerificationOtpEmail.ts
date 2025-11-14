import resend from "@/lib/resend";
import { createResponse } from "@/helper/createResponse";

export const SendUpVerificationOtpEmail = async (email: string, otp: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="text-align: center; color: #111;">Verify Your Email</h2>
          <p>Hi there,</p>
          <p>Welcome to our app! Use the following one-time password (OTP) to verify your email address:</p>
  
          <div style="text-align: center; margin: 20px 0;">
            <p style="
              display: inline-block;
              background-color: #f3f4f6;
              color: #111827;
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 6px;
              padding: 12px 24px;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
            ">
              ${otp}
            </p>
          </div>
  
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,<br/>The YourApp Team</p>
  
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            © ${new Date().getFullYear()} YourApp Inc. All rights reserved.
          </p>
        </div>
      `,
    });

    return createResponse(true, null, "Verification otp sent successfully")

  } catch (error) {
    return createResponse(false , null, "Something went wrong while sending otp")
    console.log(error)
  }
};