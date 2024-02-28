"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/server-actions/login";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await loginAction(values);
    const { error } = JSON.parse(res);
    if (error) {
      form.reset();

      setError(error.message);
    } else {
      router.replace("/dashboard");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[400px] flex flex-col sm:justify-center space-y-8"
          onChange={() => {
            if (error) setError("");
          }}
        >
          <div className="space-y-2">
            <Link
              href={"/"}
              className="w-full flex items-center justify-start sm:justify-center "
            >
              <Image
                src="/logo.svg"
                alt="quilllab logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-4xl font-semibold text-white">
                quilllab.
              </span>
            </Link>
            <FormDescription className="text-foreground/60 sm:text-center">
              An all-in-one collaboration and productivity platform.
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. johnwick@gmail.com"
                    {...field}
                    disabled={isLoading}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    {...field}
                    disabled={isLoading}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" className="" disabled={isLoading}>
            {!isLoading ? (
              "Login"
            ) : (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
          </Button>
          <span className="text-white">
            Don&apos; have an account?{" "}
            <Link href="/register" className="text-brand/brand-primary-purple">
              Sign up
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
