import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptToken } from "./app/utils/token";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const referer = request.headers.get("referer");

  // Handle public routes that don't need authentication
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Retrieve the token from cookies
  const token = request.cookies.get("user-token")?.value;

  // Special handling for OAuth routes
  if (pathname.startsWith("/oauth")) {
    const oAuthToken = request.nextUrl.searchParams.get("token");

    if (oAuthToken) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set("user-token", oAuthToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: "/",
      });
      return response;
    }
    return NextResponse.next();
  }

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify and decode token
  try {
    const decodedToken = await decryptToken(token);

    if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Role-based access control
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
  } catch (error) {
    console.error("Token decryption failed:", error);
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user-token");
    return response;
  }
}

export const config = {
  matcher: [
    "/login",
    "/oauth",
    "/admin-dashboard/:path*",
    "/profile/:path*",
    "/cart",
  ],
};
