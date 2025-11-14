"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import { formatCooldown } from "@/helper/formatCooldown";
import { VerifyOtp } from "./verifyOtp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getFormattedDateTime } from "@/helper/fromatedDateAndTime";
import { SendOtpViaEmail } from "@/helper/SendOtp";

export default function OTPForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const formatedDateAndTime = getFormattedDateTime();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const intervalId = setInterval(() => {
      setCooldown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;

    setError("");
    setCooldown(60);

    startTransition(async () => {
      await SendOtpViaEmail(email).then((res) => {
        if (!res.success) {
          if (!res.errorResponse) {
            setError(res.message);
          } else {
            toast.error(res.message, { description: formatedDateAndTime });
          }
        } else {
          toast.success(res.message, { description: formatedDateAndTime });
        }
      });
    });
  };

  const handleSubmit = () => {
    if (cooldown > 0) return;
    setError("");
    startTransition(async () => {
      await VerifyOtp(otp, email).then((res) => {
        if (!res.success) {
          if (!res.errorResponse) {
            setError(res.message);
            setOtp("");
            setCooldown(10);
          } else {
            toast(res.message, { description: formatedDateAndTime });
            setCooldown(600);
          }
        } else {
          toast(res.message, { description: formatedDateAndTime });
          router.push("/dashboard");
        }
      });
    });
  };

  const isButtonDisabled = isPending || cooldown > 0 || otp.length !== 6;
  const canResend = cooldown === 0;

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
        <CardDescription>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardDescription>
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
          Didn&apos;t receive the code?
          <p
            onClick={canResend ? handleResend : undefined}
            className={
              canResend
                ? "text-blue-400 items-start cursor-pointer hover:text-blue-700"
                : "text-slate-400 items-start cursor-not-allowed"
            }
          >
            {canResend ? " Resend" : ` Resend in ${formatCooldown(cooldown)}`}
          </p>
        </CardDescription>

        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className="w-3/6"
        >
          {cooldown > 0
            ? `Wait ${formatCooldown(cooldown)}`
            : isPending
            ? "Verifying..."
            : "Verify OTP"}
        </Button>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center">
        <p className="text-center *:not-first:cursor-pointer text-slate-600 text-sm">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline text-blue-700 cursor-pointer">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="underline text-blue-700 cursor-pointer" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
