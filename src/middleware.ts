import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { logger } from "./logger";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // Nextjs目前中间件只支持在Edge Runtime下使用，所以Nodejs的path模块无法使用，因此这里的logger.info会报错
  // logger.info(
  //   `Request path: ${req.nextUrl.pathname} with method: ${req.method} and query: `
  // );

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path.includes("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (session && (path === "/auth/login" || path === "/auth/register")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
