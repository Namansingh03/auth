"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { MdMarkEmailRead } from "react-icons/md";
import { toast } from "sonner";
import { newVerifiactionAction } from "@/app/api/auth/new-verification/route";
import { useRouter, useSearchParams } from "next/navigation";
import { getFormattedDateTime } from "@/utils/getFormattedDateandTime";
import { ResendSignUpVerificationEmail } from "./resndSignUpVerificationEmail";
import { SendVerifiactionOtp } from "./SendVerificationOtp";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const formatedDateAndTime = getFormattedDateTime();
  const router = useRouter();

  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error("Missing token", { description: formatedDateAndTime });
      return;
    }

    newVerifiactionAction(token)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, { description: formatedDateAndTime });
          router.push("/dashboard");
        } else {
          toast.error(res.message, { description: formatedDateAndTime });
        }
      })
      .catch(() => {
        toast.error("Something went wrong while confirming email", {
          description: formatedDateAndTime,
        });
      });
  }, [token, formatedDateAndTime, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const handleActionClick = async (type: "resend" | "otp") => {
    if (cooldown > 0) return;

    if (type === "resend") {
      if (!email) {
        toast.error("Missing Email", { description: formatedDateAndTime });
        return;
      }

      await ResendSignUpVerificationEmail(email)
        .then((res) => {
          if (res.success) {
            toast.success(res.message, { description: formatedDateAndTime });
            setCooldown(60);
          } else {
            toast.error("Something went wrong while resending email", {
              description: formatedDateAndTime,
            });
            setCooldown(60)
          }
        })
        .catch(() => {
          toast.error("Something went wrong while resending email", {
            description: formatedDateAndTime,
          });
          setCooldown(60)
        });
    } else if (type === "otp") {
      if (!email) {
        toast.error("Email doen't exist", { description: formatedDateAndTime });
      } else {
        if(!email){
          toast.error("Email not found", { description : formatedDateAndTime })
          setCooldown(60)
        } else{
          await SendVerifiactionOtp(email)
          router.push(`/auth/verify-otp/${encodeURIComponent(email)}`)
        }
      }
    }
  };

  return (
    <Card className="w-lg h-auto p-5 items-center">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="font-semibold">App logo</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          Verification Email Sent
        </CardDescription>
        <p className="text-muted-foreground">
          We have sent a verification email link to your email
        </p>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-y-5">
        <p className="text-center w-full">
          Check your email and click on the verify email button to verify your
          account
        </p>
        <MdMarkEmailRead className="w-10 h-10 text-blue-600" />
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <Button
          onClick={() => handleActionClick("resend")}
          className="text-blue-700"
          variant={"link"}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Resend (${cooldown}s)` : "Resend"}
        </Button>
        <Button
          onClick={() => handleActionClick("otp")}
          className="text-blue-700"
          variant={"link"}
          disabled={cooldown > 0}
        >
          {cooldown > 0
            ? `Verify using OTP (${cooldown}s)`
            : "Verify using OTP"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
