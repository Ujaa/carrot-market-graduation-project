import { IPost } from "./post";

export interface IPostsReponse {
  status: number;
  posts: IPost[];
}
