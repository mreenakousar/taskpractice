
import { NextResponse } from "next/server";
import { verifyToken } from "./components/lib/verifyToken";
import jwt from "jsonwebtoken";

const REFRESH_TIME = 60 * 60;
export async function proxy(request) {

    const token = request.cookies.get("token")?.value;

    if (!token) {
        console.log(" Token nahi mila");
        return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
        const decoded = await verifyToken();

        const timeLeft = decoded.exp - Math.floor(Date.now() / 1000);
        console.log("Token seconds left:", timeLeft);
        console.log("Token  minutes left:", Math.floor(timeLeft / 60));
        console.log("Token  hours left:", Math.floor(timeLeft / 3600));

        if (timeLeft <= REFRESH_TIME) {
            const newToken = jwt.sign(
                {
                    id: decoded.id,
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.role,
                },
                process.env.JWT_SECRET, {
                expiresIn: "24h",
            }
            );
            const response = NextResponse.next();
            response.cookies.set("token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
            return response;
        }
// nextUrl.pathname current route check krne ke liye use krte hain.
        if (request.nextUrl.pathname === "/admin") {

            if (decoded.role !== "admin") {
                return NextResponse.redirect(
                    new URL("/about", request.url)
                );
            }

        }

        console.log("Decoded Token:", decoded);
        return NextResponse.next();
    }
    catch {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

}
// ....

export const config = {
    matcher: [
        "/about",
        "/admin",
    ],
};