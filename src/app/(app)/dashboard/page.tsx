"use client";

import React from "react";
import AnimatedBlobsBackground from "@/utils/animatedBobs";

const SignUpPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background z-1">
      <div className="relative z-10 w-full max-w-md px-4">
      <AnimatedBlobsBackground />
      <h1 className="text-8xl text-black ">Welcome</h1>
      </div>
    </div>
  );
};

export default SignUpPage;