import { firestore } from "@/config/firebase/firebase";
import { COLLECTION_NAME_POSTS } from "@/lib/constants";
import { postConverter } from "@/model/post";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const docsSnap = await getDocs(
      collection(firestore, COLLECTION_NAME_POSTS)
    );

    const posts = docsSnap.docs.map((doc) => postConverter.fromFirestore(doc));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[ERROR] Error white fetching posts: ", error);
  }
}