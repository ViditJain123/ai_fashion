import { resend } from "@/lib/resend";
import verificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "AI fashion Verification Code",
      react: verificationEmail({ otp: verifyCode }),
    });
    return { sucess: true, message: "Verification Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { sucess: false, message: "Failed to send verification email" };
  }
}
