"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-950">
    <Button variant={"secondary"}>
      <Link href={"/auth/signup"}>
      sign up
      </Link>
    </Button>
    </div>
  );
}