import { firestore } from "@/config/firebase/firebase";
import {
  COLLECTION_NAME_POSTS,
  COLLECTION_NAME_PROFILE,
} from "@/lib/constants";
import { commentConverter, postConverter } from "@/model/post";
import { profileConverter } from "@/model/profile";
import { IPostReponse, IPostsReponse } from "@/model/reponses";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";

interface PostParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: PostParams) {
  const postId = params.id;
  try {
    const postDocSnap = await getDoc(
      doc(firestore, COLLECTION_NAME_POSTS, postId!)
    );

    const commentDocsSnap = await getDocs(
      collection(firestore, COLLECTION_NAME_POSTS, postId!, "comments")
    );
    const comments = [];

    for (const comment of commentDocsSnap.docs) {
      comments.push(commentConverter.fromFirestore(comment));
    }

    const post = postConverter.fromFirestoreWithComments(postDocSnap, comments);
    return NextResponse.json({ status: 200, post });
  } catch (error) {
    console.error("[ERROR] Error white fetching posts: ", error);
    return NextResponse.json({ status: 500 });
  }
}
