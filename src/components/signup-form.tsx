"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type TSignupFormSchema,
  SignupFormSchema,
} from "@/lib/zod_schemas/signup.zod";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signUp } from "../../server/users";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import OAuth from "./OAuth";

export default function SignupForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignupFormSchema>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit = async (data: TSignupFormSchema) => {
    try {
      const { resdata, ok } = await signUp(data);
      if (ok) {
        toast.success("User registered successfully!");
      } else {
        toast.error(resdata.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (
      errors.fullname ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      toast.error(
        errors.fullname?.message ||
          errors.email?.message ||
          errors.password?.message ||
          errors.confirmPassword?.message
      );
    }
  }, [errors]);

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-primarytwo">
      <Image
        src="/logo_light.svg"
        alt="CodeBurst_logo"
        width={150}
        height={150}
      />
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Create your account to start learning.
      </p>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            {...register("fullname")}
            id="fullname"
            placeholder="your full name"
            type="text"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="your@email.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          disabled={isSubmitting}
          className="disabled:bg-red-600 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <OAuth />
          <p className="text-neutral-800 dark:text-neutral-200">
            Already have an account?
            <Button asChild variant={"link"}>
              <Link href={"/signin"}>Sign in</Link>
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
