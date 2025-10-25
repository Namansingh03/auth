"use client";

import React from "react";
import AnimatedBlobsBackground from "@/utils/animatedBlobs";
import OTPForm from "@/components/auth/otp-form/page";

const SignUpPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <AnimatedBlobsBackground />
        <OTPForm />
    </div>
  );
};

export default SignUpPage;
