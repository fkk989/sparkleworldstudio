import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const param = request.nextUrl.searchParams;
  const cookie = request.cookies.get("sparkle-admin-token")?.value;
  const isPrivate = path.startsWith("/dashboard");
  if (!cookie && isPrivate) {
    return NextResponse.redirect("/");
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/dashboard/:path*"],
};
