import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isMatch = (paths: string[]) =>
    paths.some((path) => request.nextUrl.pathname.startsWith(path));

  const protectedRoutes = ["/dashboard", "/profile", "/admin"];

  const authRoutes = ["/signin", "/signup"];

  const isRoot = request.nextUrl.pathname === "/";

  if (sessionCookie) {
    if (isMatch(authRoutes) || isRoot) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (isMatch(protectedRoutes)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  const response = NextResponse.next();

  if (sessionCookie && isMatch(protectedRoutes)) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/signin",
    "/signup",
  ],
};
