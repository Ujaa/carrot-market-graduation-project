import { NextRequest, NextResponse } from "next/server";
import {
  COLLECTION_NAME_PROFILE,
  COOKIE_NAME_USER_LOGIN,
} from "./lib/constants";
import getSession from "./lib/session";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./config/firebase/firebase";

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/create-profile" ||
    request.nextUrl.pathname === "/profile" ||
    request.nextUrl.pathname.includes("/tweet")
  ) {
    const session = await getSession();
    const id = session.id;
    if (!id) {
      return Response.redirect(new URL("/log-in", request.url));
    }
  }

  /*
  if (!(await hasProfile(id))) {
    return Response.redirect(new URL("/create-profile", request.url));
  }*/
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
