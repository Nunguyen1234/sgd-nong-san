// import { NextRequest, NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import { locales, defaultLocale } from "./i18n";

// function getLocale(request: NextRequest): string {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => {
//     negotiatorHeaders[key] = value;
//   });

//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
//   return matchLocale(languages, locales, defaultLocale);
// }

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const pathnameIsMissingLocale = locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     const url = request.nextUrl.clone();
//     url.pathname = `/${locale}${pathname}`;
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|api).*)"],
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
