import { getIronSession } from "iron-session";
import { COOKIE_NAME_USER_LOGIN } from "./constants";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: COOKIE_NAME_USER_LOGIN,
    password: process.env.COOKIE_PASSWORD!,
  });
}
