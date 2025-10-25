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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getFormattedDateTime } from "@/helpers/getFormattedDateandTime";
import { NewVerificationAction } from "@/app/api/auth/new-verification/route";
import { ResendSignUpEmail } from "@/helpers/ResendEmail";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sid");
  const formattedDateAndTime = getFormattedDateTime();
  const router = useRouter();

  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const onSubmit = useCallback(() => {
    if (!sessionId) {
      toast.error("SessionId is missing");
      return;
    }

    NewVerificationAction(sessionId)
      .then((res) => {
        if(res.success){
          toast.success(res.message, { description : formattedDateAndTime })
        }
        else{
          toast.error(res.message , { description : formattedDateAndTime })
        }
      })
      .catch(() => {
        toast.error("something went wrong while confirming user email");
      }); 
  }, [sessionId, formattedDateAndTime]);

  useEffect(() => {
     
    onSubmit();
  }, [onSubmit]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setResendDisabled(false);
            clearInterval(interval!);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendDisabled]);

  const handleResend = () => {
    setResendDisabled(true);
    setTimer(60);
   
    if(!sessionId){
      toast.error("Session id not found", { description : formattedDateAndTime})
    }
    else{
      ResendSignUpEmail(sessionId)
      .then((res) => {
        if(res.success){
          toast.success(res.message, { description : formattedDateAndTime})
        }
        else{
          toast.error(res.message, { description : formattedDateAndTime})
        }
      })
    }
  };

  const handleVerifyWithOtp = () => {
    router.push(`/verify-otp?sid=${sessionId}`);
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
        <span className="flex items-center gap-2 text-blue-600 font-medium">
          <MdMarkEmailRead className="w-6 h-6" />
        </span>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <Button
          className="text-blue-700"
          variant="link"
          onClick={handleResend}
          disabled={resendDisabled}
        >
          {resendDisabled ? `Resend (${timer}s)` : "Resend"}
        </Button>

        <Button
          className="text-blue-700"
          variant="link"
          onClick={handleVerifyWithOtp}
          disabled={resendDisabled} 
        >
          {resendDisabled ? `Verify using OTP (${timer}s)` : "Verify using OTP"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
