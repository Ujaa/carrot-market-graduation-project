"use client";

import { COLLECTION_NAME_POSTS } from "@/lib/constants";
import firestore from "@/lib/firebase/firestore";
import { IPost, postConverter } from "@/model/post";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const addPost = async () => {
    const data: IPost = {
      authorId: 123,
      content: "이건 제가 테스트를 하기 위해",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await addDoc(collection(firestore, COLLECTION_NAME_POSTS), data);
  };

  const getPosts = async () => {
    try {
      const docsSnap = await getDocs(
        collection(firestore, COLLECTION_NAME_POSTS)
      );

      const convertedPosts = docsSnap.docs.map((doc) =>
        postConverter.fromFirestore(doc)
      );

      setPosts(convertedPosts);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="">
      <button onClick={addPost}>add Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </main>
  );
}
