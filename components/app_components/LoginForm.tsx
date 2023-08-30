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
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import UseGoogleButton from "./UseGoogleButton";
import UseGithubButton from "./UseGithubButton";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters"),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(data.email);
  }

  return (
    <Card className="bg-black border mt-12 border-white w-[600px] p-12">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl text-white">
          Login to your account
        </CardTitle>
        <CardDescription className="text-white">
          Enter your credentials below to login
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
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
          </div>
          <Button className="w-full mt-6" type="submit">
            Login
          </Button>
        </form>
      </Form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-white bg-black">
            Or login with
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
        <Link href="signup">Dont have an account? Signup.</Link>
      </Button>
    </Card>
  );
}
