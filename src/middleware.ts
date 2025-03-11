import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, req) => {
    const url = req.nextUrl.pathname;
    const { userId } = await auth();

    // If the user is not signed in and tries to access a protected route
    if (!userId && !isPublicRoute(req) && url.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    /*if (url.startsWith("/dashboard/")) {
        const pathUserId = url.split("/")[2]; // Extract user ID from path

        if (pathUserId !== userId) {
            return NextResponse.redirect(new URL("/not-found", req.url)); // Redirect invalid users
        }
    }*/
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
