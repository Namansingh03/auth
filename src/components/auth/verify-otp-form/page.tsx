"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyOtpForm = () => {
  return (
    <Card className="w-md h-auto p-10 items-center">
      <CardHeader className="w-full flex flex-col items-center justify-center gap-y-3">
        <CardTitle className="font-semibold">App logo</CardTitle>
        <CardDescription className="text-xl font-medium text-black">
          Verify Your Otp
        </CardDescription>
        <p className="text-centre text-xs text-slate-600">
          Enter the 6 digit otp sent to your email address to verify your
          account
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-y-2">
        <InputOTP maxLength={6} className="px-5">
          <InputOTPGroup className="">
            <InputOTPSlot
              index={0}
              className="w-10 h-10 border border-slate-400"
            />
            <InputOTPSlot
              index={1}
              className="w-10 h-10 border border-slate-400"
            />
            <InputOTPSlot
              index={2}
              className="w-10 h-10 border border-slate-400"
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className="w-10 h-10 border border-slate-400"
            />
            <InputOTPSlot
              index={4}
              className="w-10 h-10 border border-slate-400"
            />
            <InputOTPSlot
              index={5}
              className="w-10 h-10 border border-slate-400"
            />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-md text-slate-800">Enter the 6 digit otp</p>
      </CardContent>
      <CardFooter className="w-full flex items-center flex-col gap-y-2">
        <Button type="submit" className="w-40 p-3 text-md">
          Verify
        </Button>
        <CardDescription>
          Didn&apos;t receive the code?
        <Button className="text-blue-500" variant={"link"}>Resend</Button>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtpForm;
