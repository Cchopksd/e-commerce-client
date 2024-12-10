import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptToken } from "./app/utils/token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("user-token")?.value || "";
  const decodedToken = await decryptToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    decodedToken.role !== "admin" &&
    pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (decodedToken.role === "admin" && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/profile/:path*", "/cart"],
};
