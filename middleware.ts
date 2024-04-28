import { NextRequest, NextResponse } from "next/server";
import {
  COLLECTION_NAME_PROFILE,
  COOKIE_NAME_USER_LOGIN,
} from "./lib/constants";
import getSession from "./lib/session";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./config/firebase/firebase";

async function hasProfile(id: number) {
  try {
    console.log("여깄습니다!!");
    const docsSnap = await getDocs(
      query(
        collection(firestore, COLLECTION_NAME_PROFILE),
        where("userId", "==", id)
      )
    );
    console.log(docsSnap.empty);
    return docsSnap.empty;
  } catch (error) {
    console.error("[ERROR] Error while checking username is unique: ", error);
  }
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/create-account" &&
    request.nextUrl.pathname !== "/log-in"
  ) {
    const session = await getSession();
    const id = session.id;
    if (!id) {
      return Response.redirect(new URL("/log-in", request.url));
    } else {
      console.log("아 미들웨어에서 firestore 못 쓰는 거였냐고~~!!");
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
