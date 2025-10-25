"use client";

import React, { useTransition } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { VerifyOtp } from "@/app/api/auth/verify-otp/route";
import { toast } from "sonner";
import { getFormattedDateTime } from "@/utils/getFormattedDateandTime";

export default function OTPForm() {

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = React.useState("");
  const [isPending , startTransition] = useTransition()
  const FormattedDateandTime = getFormattedDateTime()  

  const handleChange = (value: string) => {
    setOtp(value);
  };

  // Handle submit
  const handleSubmit = () => {
    if(email){
      startTransition(() => {
         VerifyOtp(email, otp)
         .then((res) => {
          if(res.success){
            toast.success(res.message, { description : FormattedDateandTime })
          }
          else{
            toast.error(res.message, { description : FormattedDateandTime })
          }
         })
      })
    }
    else{
      toast.error("Email not found", { description : FormattedDateandTime })
    }
  };

  return (
    <Card className="w-lg flex flex-col items-center justify-center p-10">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="text-4xl font-bold">
          Enter verification code
        </CardTitle>
        <CardDescription>
          We sent a 6-digit code to your email address
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center justify-center gap-y-3">
        <InputOTP maxLength={6} value={otp} onChange={handleChange}>
          <InputOTPGroup className="*:border *:border-slate-400 *:w-13 *:h-15">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className="*:border *:border-slate-400 *:w-13 *:h-15">
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <CardDescription className="w-full flex justify-center items-center gap-x-1">
          Didn&apos;t receive the code? <p className="text-blue-400 items-start cursor-pointer hover:text-blue-700"> Resend</p>
        </CardDescription>
        <Button
        disabled={isPending} 
        onClick={handleSubmit} 
        className="w-3/6">
          Verify OTP
        </Button>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center">
         <p className="text-center *:not-first:cursor-pointer text-slate-600 text-sm">By clicking continue, you agree to our <a href="#" className="underline text-blue-700 cursor-pointer">Terms of Service</a>{" "}
        and <a className="underline text-blue-700 cursor-pointer" href="#">Privacy Policy</a>.</p>
      </CardFooter>
    </Card>
  );
}
