import { GalleryVerticalEnd } from "lucide-react"

import { SigninForm } from "@/components/SigninForm/signin-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-b from-zinc-900 via-slate-500 to-zinc-900">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-white">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          App Name
        </a>
        <SigninForm />
      </div>
    </div>
  )
}
