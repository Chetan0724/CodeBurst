import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Extend the user type to include the role field from our database
export type ExtendedUser = typeof authClient.$Infer.Session.user & {
  role: string;
};