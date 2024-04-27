import { QueryDocumentSnapshot } from "firebase/firestore";

export interface IPost {
  id?: string;
  authorId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export const postConverter = {
  toFirestore: (post: IPost) => {
    return {
      authorId: post.authorId,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      id,
      authorId: data.authorId,
      content: data.content,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};
