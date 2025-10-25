"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldSet, FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUpSchema } from "@/schemas/authSchema";
import SocialsForm from "../Socials/page";
import SignUpAction from "./SignUpAction";
import { getFormattedDateTime } from "@/utils/getFormattedDateandTime";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  
  const [isPending, startTransition] = useTransition();
  const DateAndTime = getFormattedDateTime()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(formData: z.infer<typeof SignUpSchema>) {
    console.log(formData);
    startTransition(() => {
       SignUpAction(formData)
       .then((res) => {
        if(!res.success){
          toast.error(res.message, { description : DateAndTime})
        }
        else{
          toast.success(res.message, { description : DateAndTime})
          form.reset()
        }
       })
    })
  }

  return (
    <Card className="w-md h-auto p-5 items-center">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="font-semibold">App logo</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          Welcome to App name
        </CardDescription>
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/auth/signin">
            <span className="text-blue-500">Sign in</span>
          </a>
        </p>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="bg-slate-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className="bg-slate-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      className="bg-slate-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
            disabled={isPending} 
            type="submit" 
            size={"sm"}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <FieldSet>
        <FieldSeparator className="bg-slate-500 h-0.5">
          or continue with
        </FieldSeparator>
      </FieldSet>
      <CardFooter className="flex flex-col gap-y-5">
        <SocialsForm />
        <p className="text-xs text-slate-700 text-center px-5">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
