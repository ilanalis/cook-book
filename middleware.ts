import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {auth} from "./auth";

const protectedRoutes = ["/dashboard"]

export default async function middleware(request: NextRequest){
    const session = await auth();

    const {pathname} = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => 
        pathname.startsWith(route)
    )

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static")
    ) {
        return NextResponse.next();
    }

    if(isProtected && !session){
        return NextResponse.redirect(new URL("/api/auth/signin", request.url))
    }

    if(session && pathname === "/auth"){
        return NextResponse.redirect(new URL("/", request.url))
    }
    
    return NextResponse.next();
}