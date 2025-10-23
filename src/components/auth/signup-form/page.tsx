"use client"

import React from 'react'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { 
    FieldSet,
    FieldSeparator 
} from '@/components/ui/field'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignUpSchema } from '@/schemas/authSchema'
import SocialsForm from '../Socials/page'

const SignUpForm = () => {

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password : "",
      confirmPassword : ""
    },
  })

   function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values.email, values.password, values.confirmPassword)
  }

  return (
    <Card className='w-md h-auto p-3 items-center' >
     <CardHeader className='w-full flex flex-col items-center justify-center'>
        <CardTitle className='text-2xl font-semibold'>App name</CardTitle>
        <CardDescription className='text-md'>create your account using your email or password</CardDescription>
     </CardHeader>
     <CardContent className='w-full'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" className='bg-slate-50' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" className='bg-slate-50' {...field} />
              </FormControl>
              <FormDescription>
                Your password must be 6 digits long
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="" className='bg-slate-50' {...field} />
              </FormControl>
              <FormDescription>
                both password needs to be same
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'sm'}>Submit</Button>
      </form>
    </Form>
     </CardContent>
     <FieldSet>
        <FieldSeparator className='bg-slate-500 h-0.5'>or continue with</FieldSeparator>
     </FieldSet>
     <CardFooter className='flex flex-col gap-y-3'>
      <SocialsForm/>
      <p className='text-sm text-slate-600'>Already have an account? <a href="/auth/signin">
        <span className='text-blue-500'>Sign in</span></a></p>
     </CardFooter>
    </Card>
  )
}

export default SignUpForm