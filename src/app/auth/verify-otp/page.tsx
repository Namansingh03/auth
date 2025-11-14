"use client";

import React from "react";
import OTPForm from "@/components/auth/otp-verification-form/page";
import AnimatedBlobsBackground from "@/utils/animatedBobs";

const VerifyOtp = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <div className="relative z-10 w-full max-w-md px-4">
      <AnimatedBlobsBackground />
        <OTPForm />
      </div>
    </div>
  );
};

export default VerifyOtp;