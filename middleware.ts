import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/dashboard", "/recipes/new"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
