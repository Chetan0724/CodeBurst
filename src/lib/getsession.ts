"use server";
import { headers } from "next/headers";
import { auth } from "./auth";

const getsession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export default getsession;
