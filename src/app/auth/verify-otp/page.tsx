"use client";

import React from "react";
import VerifyOtpForm from "@/components/auth/verify-otp-form/page";
import AnimatedBlobsBackground from "@/utils/animatedBlobs";

const SignUpPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <div className="relative z-10 w-full max-w-md px-4">
      <AnimatedBlobsBackground />
        <VerifyOtpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
