"use client";

import React from "react";
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

const VerificationForm = () => {
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
        <Button className="text-blue-700" variant={"link"}></Button>
        <Button className="text-blue-700" variant={"link"}></Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
