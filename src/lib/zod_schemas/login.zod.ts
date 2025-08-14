import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid Email").trim(),
  password: z.string().min(6, "Invalid Password").trim(),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
