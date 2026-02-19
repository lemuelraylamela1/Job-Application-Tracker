import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await getSession();

  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isSignInPage = request.nextUrl.pathname === "/sign-in";
  const isSignUpPage = request.nextUrl.pathname === "/sign-up";

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
