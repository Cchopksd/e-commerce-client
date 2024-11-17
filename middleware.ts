import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("user-token");

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/cart" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/back-office/:path*"],
};
