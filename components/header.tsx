import getSession from "@/lib/session";
import Link from "next/link";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_PROFILE } from "@/lib/constants";
import Avatar from "./avatar";
import { headers } from "next/headers";
import { IProfileReponse } from "@/model/reponses";
import HeaderAvatar from "./header-avatar";

const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/log-in");
};

export async function Header() {
  const id = (await getSession()).id;
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const result = await fetch(`${protocol}://${host}/api/user/${id}`);
  const json: IProfileReponse = await result.json();

  if (json.status === 400) {
    redirect("/create-profile");
  }

  return (
    <header className="px-6 py-2 flex items-center justify-between w-screen z-10 bg-white fixed">
      <Link href={"/"} className="text-base font-bold text-pink-500">
        PRAISEBOX
      </Link>

      <div className="flex gap-4 items-center flex-nowrap">
        <form action={logOut}>
          <button className="px-4 py-2 bg-pink-100 text-pink-400 rounded-full font-medium text-sm">
            Sign out
          </button>
        </form>
        <Link href={"/profile"}>
          <HeaderAvatar
            bodyType={json.profile.avatar.bodyType}
            eyeType={json.profile.avatar.eyeType}
            eyeColor={json.profile.avatar.eyeColor}
          />
        </Link>
      </div>
    </header>
  );
}
