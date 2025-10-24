"use client";

import React, { useCallback, useEffect, useTransition } from "react";
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

const VerificationForm = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const formatedDateAndTime = getFormattedDateTime()

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error("misssing token", { description : formatedDateAndTime} )
      return;
    }

    newVerifiactionAction(token)
      .then((res) => {
        if(res.success){
          toast.success(res.message, { description : formatedDateAndTime})
        }
        else{
          toast.error(res.message, { description : formatedDateAndTime })
        }
      })
      .catch(() => {
        toast.error("something went wrong while confirm email", {description : formatedDateAndTime})
      });
  }, [token, formatedDateAndTime]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-lg h-auto p-5 items-center">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="font-semibold">App logo</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          Verifiaction Email Sent
        </CardDescription>
        <p className="text-muted-foreground">
          We have sent a Verifiaction email link to your email
        </p>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-y-5">
        <p className="text-center w-full">
          check your email and click on the verify email button to verify your
          account
        </p>
        <MdMarkEmailRead className="w-10 h-10 text-blue-600" />
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <Button className="text-blue-700" variant={"link"}>
          Resend
        </Button>
        <Button className="text-blue-700" variant={"link"}>
          verify using otp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
