"use client";

import React from "react";
import AnimatedBlobsBackground from "@/utils/animatedBlobs";
import VerificationForm from "@/components/auth/new-verification-Form/page";

const SignUpPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <div className="relative z-10 w-full max-w-md px-4">
      <AnimatedBlobsBackground />
        <VerificationForm />
      </div>
    </div>
  );
};

export default SignUpPage;
