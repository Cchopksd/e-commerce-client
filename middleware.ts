import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("user-token");

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/cart" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname === "/profile") {
      return NextResponse.redirect(new URL("/profile/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/back-office/:path*"],
};
