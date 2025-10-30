import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const precisaAuth =
        pathname.startsWith("/clientes") ||
        pathname.startsWith("/conta") ||
        pathname.startsWith("/teladoproduto") ||
        pathname.startsWith("/usuario");


    if (precisaAuth && !token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    /*
    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/login", req.url));
        if (token.role !== "admin")
            return NextResponse.redirect(new URL("/nao-autorizado", req.url));
    }
    */
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/clientes/:path*",
        "/conta/:path*",
        "/teladoproduto/:path*",
        "/usuario/:path*",
    ],
};