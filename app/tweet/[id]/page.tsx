import { Header } from "@/components/header";
import { firestore } from "@/config/firebase/firebase";
import getSession from "@/lib/session";
import { ILikesReponse, IPostReponse, IProfileReponse } from "@/model/reponses";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import heartFilled from "@/public/images/heart_filled.png";
import heartUnfilled from "@/public/images/heart_unfilled.png";
import Avatar from "@/components/avatar";

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

  const likesCollectionRef = collection(firestore, `posts/${id}/likes`);
  const unsubscribe = onSnapshot(likesCollectionRef, (snapshot) => {
    // console.log("Likes data has changed:", snapshot.docs);
  });

  const likesData: ILikesReponse = await (
    await fetch(`${protocol}://${host}/api/like/${id}`)
  ).json();

  const isLiked = await getIsLiked(id);

  const likePost = async () => {
    "use server";
    const session = await getSession();
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const profile: IProfileReponse = await (
      await fetch(`${protocol}://${host}/api/user/${session.id}`)
    ).json();

    console.log(profile);
    try {
      await setDoc(
        doc(firestore, `posts/${id}/likes`, session.id!.toString()),
        {
          userId: session.id,
          createdAt: Date.now(),
          avatar: profile.profile.avatar,
          username: profile.profile.username,
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
      <div className="w-full h-full flex flex-col items-center py-40">
        <form className="mb-4" action={isLiked ? dislikePost : likePost}>
          <button>
            <img
              width={30}
              src={isLiked ? heartFilled.src : heartUnfilled.src}
            />
          </button>
        </form>
        <p
          className="text-2xl w-96 max-h-80 break-words bg-slate-50 text-darkblue 
              p-6 rounded-2xl transition-all text-ellipsis overflow-y-scroll "
        >
          {postData.post.content}
        </p>

        <ul className="mt-12 gap-2">
          {likesData.likes.map((like) => (
            <li className="flex flex-col items-center gap-2" key={like.id}>
              <Avatar
                bodyType={like.avatar.bodyType}
                eyeType={like.avatar.eyeType}
                eyeColor={like.avatar.eyeColor}
                size={100}
              />
              <p className="text-darkblue text-sm font-medium">
                {like.username}
              </p>
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
