import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href={"/Signin"}>
      <Button variant={"outline"}>
        Login
      </Button>
      </Link>
    </div>
  );
}
