import { Header } from "@/components/header";
import { firestore } from "@/config/firebase/firebase";
import getSession from "@/lib/session";
import { ILikesReponse, IPostReponse } from "@/model/reponses";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import useSWR from "swr";

interface PostDetailParams {
  params: {
    id: string;
  };
}

async function getIsLiked(postId: string) {
  const session = await getSession();
  const querySnapshot = await getDocs(
    query(
      collection(firestore, `posts/${postId}/likes`),
      where("userId", "==", session.id)
    )
  );
  return !querySnapshot.empty;
}

export default async function PostDetail({ params: { id } }: PostDetailParams) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const postData: IPostReponse = await (
    await fetch(`${protocol}://${host}/api/post/${id}`)
  ).json();

  const likesData: ILikesReponse = await (
    await fetch(`${protocol}://${host}/api/like/${id}`)
  ).json();

  const isLiked = await getIsLiked(id);

  const likePost = async () => {
    "use server";
    const session = await getSession();
    try {
      await setDoc(
        doc(firestore, `posts/${id}/likes`, session.id!.toString()),
        {
          userId: session.id,
          createdAt: Date.now(),
        }
      );
      revalidatePath(`/post/${id}`);
    } catch (e) {}
  };
  const dislikePost = async () => {
    "use server";
    try {
      const session = await getSession();
      await deleteDoc(
        doc(firestore, `posts/${id}/likes`, session.id!.toString())
      );
      revalidatePath(`/post/${id}`);
    } catch (e) {}
  };
  return (
    <div className="w-screen h-screen ">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p
          className="text-2xl w-96 max-h-80 break-words bg-slate-50 text-darkblue 
              p-6 rounded-2xl transition-all text-ellipsis overflow-y-scroll "
        >
          {postData.post.content}
        </p>
        <form action={isLiked ? dislikePost : likePost}>
          <button>heart</button>
        </form>

        <ul>
          {likesData.likes.map((like) => (
            <li className="text-darkblue text-xl" key={like.id}>
              {like.userId}
            </li>
          ))}
        </ul>
        <ul>
          {postData.post.comments.map((comment) => (
            <li className="text-darkblue text-xl" key={comment.id}>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
