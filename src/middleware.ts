import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = !request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/auth",
    "/dashboard",
    "/elevator",
    "/elevator/:id",
    "/employees",
    "/region",
    "/region/:id",
  ],
};
