"use client";

import React from "react";
import SignInForm from "@/components/auth/signin-form/page";
import AnimatedBlobsBackground from "@/utils/animatedBobs";

const SignInPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <div className="relative z-10 w-full max-w-md px-4">
      <AnimatedBlobsBackground />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;