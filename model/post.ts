import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

export interface IPostFireStore {
  id?: string;
  authorId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface IComments {
  id: string;
  userId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface IPostWithCommentsFireStore extends IPostFireStore {
  comments: IComments[];
}

export const commentConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot): IComments => {
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
    comments: IComments[]
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
