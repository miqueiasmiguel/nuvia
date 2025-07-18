import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";

import { auth } from "./lib/auth";

const publicRoutes = ["/", "/login", "/list/:slug"];

function isPublicRoute(pathname: string) {
  return publicRoutes.some((pattern) => {
    const matcher = match(pattern);
    return matcher(pathname) !== false;
  });
}

export async function middleware(request: NextRequest) {
  if (isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      let callbackUrl = request.nextUrl.pathname;
      if (request.nextUrl.search) {
        callbackUrl += request.nextUrl.search;
      }
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(loginUrl);
    }

    if (!session.user.weddingListId && request.nextUrl.pathname !== "/dashboard/settings") {
      const weddingListUrl = new URL("/dashboard/settings", request.url);
      weddingListUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(weddingListUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro no middleware:", error);
    const loginUrl = new URL("/login", request.url);
    if (request.nextUrl.pathname !== "/login") {
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    }
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /.next (Next.js internals)
     * 4. /static (static files)
     * 5. /images (image files)
     * 6. All files in public directory (favicon.ico, robots.txt, manifest.json, etc.)
     * 7. All static files (png, jpg, jpeg, gif, svg, ico, webp, js, css, pdf, txt, etc.)
     */
    "/((?!api|_next|static|images|.*\\..*$).*)",
  ],
};
