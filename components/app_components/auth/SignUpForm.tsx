"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import Link from "next/link";
import UseGithubButton from "./UseGithubButton";
import UseGoogleButton from "./UseGoogleButton";
import { useRouter } from "next/navigation"
import { useToast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters"),
  confirmPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters"),
})
.refine((data)=> data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match"
})

export default function SignUpForm() {
  const router = useRouter()
  const {toast} = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    })
    if(response.ok){
      router.push("/dashboard")
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message;

      toast({
        title: "Error!",
        description: errorMessage,
        variant: "destructive",
        action: <ToastAction altText="Login"><Link href="/signin">Login</Link></ToastAction>,
      });
    }
  }

  return (
    <Card className="bg-black mt-12 border border-white w-[600px] p-12 md:scale-90">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl text-white">
          Create a new account to get started
        </CardTitle>
        <CardDescription className="text-white">
          Enter your credentials below to create a new account
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-white bg-black">
            Or signup with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <UseGithubButton>Github</UseGithubButton>
        <UseGoogleButton>Google</UseGoogleButton>
      </div>

      <Button
        className="text-white w-full flex justify-center mt-4 -mb-6 items-center"
        variant="link"
      >
        <Link href="login">Already have an account? Login.</Link>
      </Button>
    </Card>
  );
}
