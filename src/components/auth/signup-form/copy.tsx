// "use client";

// import React, { useTransition } from "react";
// import CardWrapper from "@/components/CardWrapper/page";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { SignUpSchema } from "@/schemas/authSchema";
// import * as z from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import { useRouter } from "next/navigation";

// const SignUpForm = () => {

//   // const router = useRouter();
//   // const [error, setError] = React.useState("");
//   // const [success, setSuccess] = React.useState("");
//   // const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof SignUpSchema>>({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword : ""
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
//      console.log(data)
//   }

//   return (
//     <CardWrapper
//       headerLabel="Welcome to our platform"
//       backButtonHref="/auth/signIn"
//       backButtonLabel="Already have an account?"
//       showSocials={true}
//     >
//       <Form {...form}>
//         <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-normal">Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       // disabled={isPending}
//                       placeholder="username"
//                       type="text"
//                       className="border border-accent-foreground"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             ></FormField>

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-normal">Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       // disabled={isPending}
//                       placeholder="********"
//                       type="password"
//                       className="border border-accent-foreground"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             ></FormField>

//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-normal">Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       // disabled={isPending}
//                       placeholder="********"
//                       type="password"
//                       className="border border-accent-foreground"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             ></FormField>
//           </div>
//           <Button
//             type="submit"
//             // disabled={isPending}
//             className="w-full text-md font-semibold"
//           >
//             Sign up
//           </Button>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// };

// export default SignUpForm;