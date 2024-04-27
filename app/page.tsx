import { COLLECTION_NAME_POSTS } from "@/lib/constants";
import { firestore } from "@/config/firebase/firebase";
import { IPost, postConverter } from "@/model/post";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IPostsReponse } from "@/model/reponses";
import { headers } from "next/headers";

export default async function Home() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const result: IPostsReponse = await (
    await fetch(`${protocol}://${host}/api/posts`)
  ).json();
  console.log(result);

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
