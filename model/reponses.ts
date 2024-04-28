import { IPostFireStore } from "./post";
import { IAvatar, IProfile } from "./profile";

interface IPost {
  profile: IProfile;
  id?: string;
  authorId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface IPostsReponse {
  status: number;
  posts: IPost[];
}

export interface IProfileReponse {
  status: number;
  profile: IProfile;
}
