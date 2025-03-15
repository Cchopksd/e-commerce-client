import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptToken } from "./app/utils/token";
import { fetchCartByID } from "./app/checkout/components/action";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("user-token")?.value;

  // Handle OAuth token callback
  if (pathname.startsWith("/oauth")) {
    const oAuthToken = request.nextUrl.searchParams.get("token");

    if (oAuthToken) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set("user-token", oAuthToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: "/",
      });
      return response;
    }
    return NextResponse.next();
  }

  // If accessing checkout, verify cart has items
  if (pathname.startsWith("/checkout")) {
    try {
      const cartItem = await fetchCartByID(); // Optionally pass token if needed: fetchCartByID(token)
      if (!cartItem || cartItem.cart?.length === 0) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      console.error("Cart fetch failed:", err);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // No token — redirect to home for protected routes
  if (!token) {
    return NextResponse.next(); // Allow public access unless below conditions match
  }

  try {
    const decodedToken = await decryptToken(token.toString());

    if (!decodedToken) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("user-token");
      return response;
    }

    // Role-based redirects
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
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user-token");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
