"use server";
import { auth } from "@/lib/auth";
// import { TSignupFormSchema } from "@/lib/zod_schemas/signup.zod";
import { TLoginFormSchema } from "@/lib/zod_schemas/login.zod";

export const signIn = async (SigninData: TLoginFormSchema) => {
  try {
    const { email, password } = SigninData;
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });
    const resdata = await response.json();
    return { resdata, ok: response.ok, status: response.status };
  } catch (error) {
    console.log(error);
    return { resdata: null, ok: false, status: 500 };
  }
};
