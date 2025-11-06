"use server";
import { auth } from "@/lib/auth";
import { TSignupFormSchema } from "@/lib/zod_schemas/signup.zod";
import { TLoginFormSchema } from "@/lib/zod_schemas/login.zod";
import { headers } from "next/headers";

export const signIn = async (SigninData: TLoginFormSchema) => {
  try {
    const { email, password } = SigninData;
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      },
      asResponse: true,
    });
    const resdata = await response.json();
    return { resdata, ok: response.ok };
  } catch (error) {
    console.log(error);
    return { resdata: null, ok: false };
  }
};

export const signUp = async (SignupData: TSignupFormSchema) => {
  try {
    const { fullname, email, password } = SignupData;
    const response = await auth.api.signUpEmail({
      body: {
        name: fullname,
        email,
        password,
      },
      asResponse: true,
    });

    const resdata = await response.json();

    return { resdata, ok: response.ok };
  } catch (error) {
    console.log(error);
    return { resdata: null, ok: false };
  }
};

export const signOut = async () => {
  try {
    const value = await auth.api.signOut({
      headers: await headers(),
    });
    console.log("Value Server", value);
  } catch (error) {
    console.log(error);
  }
};
