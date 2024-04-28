"use server";
import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_PROFILE } from "@/lib/constants";
import getSession from "@/lib/session";
import { usernameSchema } from "@/lib/validation";
import { postConverter } from "@/model/post";
import { IAvatar } from "@/model/profile";
import { setDoc, doc } from "firebase/firestore";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function createProfile(
  avatar: IAvatar,
  prev: any,
  formData: FormData
) {
  const username = formData.get("username");
  const result = await usernameSchema.spa(username);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const id = session.id?.toString();
    try {
      await setDoc(doc(firestore, COLLECTION_NAME_PROFILE, id!), {
        avatar,
        username,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      redirect("/");
    } catch (error) {
      console.error("[ERROR] Error while creating Profile: ", error);
    }
  }
}
