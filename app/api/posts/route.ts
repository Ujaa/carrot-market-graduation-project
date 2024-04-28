import { firestore } from "@/config/firebase/firebase";
import {
  COLLECTION_NAME_POSTS,
  COLLECTION_NAME_PROFILE,
} from "@/lib/constants";
import { postConverter } from "@/model/post";
import { profileConverter } from "@/model/profile";
import { IPostsReponse } from "@/model/reponses";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  Query,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const postsDocSnap = await getDocs(
      query(
        collection(firestore, COLLECTION_NAME_POSTS),
        orderBy("createdAt", "desc")
      )
    );
    const posts = [];

    for (const post of postsDocSnap.docs) {
      const convertedPost = postConverter.fromFirestore(post);
      const profileDocSnap = await getDoc(
        doc(
          firestore,
          COLLECTION_NAME_PROFILE,
          convertedPost.authorId.toString()
        )
      );
      const profile = profileConverter.fromFirestore(profileDocSnap);
      const postWithProfile = {
        ...convertedPost,
        profile,
      };
      posts.push(postWithProfile);
    }

    return NextResponse.json({ status: 200, posts });
  } catch (error) {
    console.error("[ERROR] Error white fetching posts: ", error);
    return NextResponse.json({ status: 500 });
  }
}
export const dynamic = "force-dynamic";
