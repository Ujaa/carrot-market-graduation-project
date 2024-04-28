import { firestore } from "@/config/firebase/firebase";
import {
  COLLECTION_NAME_POSTS,
  COLLECTION_NAME_PROFILE,
} from "@/lib/constants";
import { likeConverter, postConverter } from "@/model/post";
import { profileConverter } from "@/model/profile";
import { IPostReponse, IPostsReponse } from "@/model/reponses";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";

interface LikeParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: LikeParams) {
  const postId = params.id;
  try {
    const likeDocsSnap = await getDocs(
      collection(firestore, COLLECTION_NAME_POSTS, postId!, "likes")
    );
    const likes = [];

    for (const like of likeDocsSnap.docs) {
      likes.push(likeConverter.fromFirestore(like));
    }

    return NextResponse.json({ status: 200, likes });
  } catch (error) {
    console.error("[ERROR] Error white fetching likes: ", error);
    return NextResponse.json({ status: 500 });
  }
}
