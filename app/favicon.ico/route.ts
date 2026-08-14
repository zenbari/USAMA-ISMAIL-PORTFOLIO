import { NextResponse, type NextRequest } from "next/server";

/**
 * Browsers request /favicon.ico directly regardless of the generated <link
 * rel="icon"> from app/icon.tsx (a long-standing convention, independent of
 * any <link> tag) — unrelated to the hydration/chunk issues in this fix,
 * but a real 404 in the console all the same. Redirect to the generated icon.
 */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/icon", request.url));
}
