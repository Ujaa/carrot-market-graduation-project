"use server";
import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_POSTS } from "@/lib/constants";
import getSession from "@/lib/session";
import { postSchema } from "@/lib/validation";
import { IPostFireStore, postConverter } from "@/model/post";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function uploadPost(prev: any, formData: FormData) {
  const postContent = formData.get("post");
  const result = await postSchema.spa(postContent);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const id = session.id;
    try {
      const data: IPostFireStore = {
        authorId: id!,
        content: result.data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await addDoc(collection(firestore, COLLECTION_NAME_POSTS), data);
    } catch (error) {
      console.error("[ERROR] Error while creating Profile: ", error);
    }

    revalidatePath("/");
  }
}
