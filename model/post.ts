import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { IAvatar } from "./profile";

export interface IPostFireStore {
  id?: string;
  authorId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface IComment {
  id: string;
  userId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface ILike {
  id: string;
  userId: string;
  avatar: IAvatar;
  createdAt: number;
}

export interface IPostWithCommentsFireStore extends IPostFireStore {
  comments: IComment[];
}

export const likeConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot): ILike => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      id,
      avatar: data.avatar,
      userId: data.userId,
      createdAt: data.createdAt,
    };
  },
};

export const commentConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot): IComment => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      id,
      userId: data.userId,
      content: data.content,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

export const postConverter = {
  toFirestore: (post: IPostFireStore) => {
    return {
      authorId: post.authorId,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  },
  fromFirestoreWithComments: (
    snapshot: DocumentSnapshot,
    comments: IComment[]
  ): IPostWithCommentsFireStore => {
    const id = snapshot.id;
    const data = snapshot.data();

    return {
      id,
      authorId: data?.authorId,
      content: data?.content,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      comments,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): IPostFireStore => {
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
