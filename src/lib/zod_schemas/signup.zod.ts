import { z } from "zod";

export const SignupFormSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(3, "Please choose a fullname of at least 3 characters"),
    email: z.email("Invalid Email").trim(),
    password: z
      .string()
      .trim()
      .min(6, "Please choose a password of at least 6 characters"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;
