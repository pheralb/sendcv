import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "lucia-auth";

export async function middleware(req: NextRequest) {
  
  let sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage) {
    if (sessionId) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return null;
  }

  if (!sessionId) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/auth?from=${encodeURIComponent(from)}`, req.url)
    );
  }
}

export const config = {
  matcher: ["/profile/:path*", "/auth"],
};
