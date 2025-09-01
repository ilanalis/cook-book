import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/dashboard"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const token = request.cookies.get("authjs.session-token")?.value;
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
