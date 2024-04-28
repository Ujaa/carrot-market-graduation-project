import { Header } from "@/components/header";
import { IPostReponse } from "@/model/reponses";
import { headers } from "next/headers";
import useSWR from "swr";

interface PostDetailParams {
  params: {
    id: string;
  };
}

export default async function PostDetail({ params: { id } }: PostDetailParams) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const result = await fetch(`${protocol}://${host}/api/post/${id}`);
  const json: IPostReponse = await result.json();

  return (
    <div>
      <Header />
      <p>{json.post.content}</p>
      <ul>
        {json.post.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <button>heart</button>
    </div>
  );
}
