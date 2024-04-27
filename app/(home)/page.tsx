import { COLLECTION_NAME_POSTS } from "@/lib/constants";
import { firestore } from "@/config/firebase/firebase";
import { IPost, postConverter } from "@/model/post";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IPostsReponse } from "@/model/reponses";

export default async function Home() {
  const result: IPostsReponse = await (
    await fetch(`${process.env.API_URL}/api/posts`)
  ).json();

  return (
    <main className="">
      <ul>
        {result.posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </main>
  );
}
