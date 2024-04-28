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
    <div className="w-screen h-screen ">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p
          className="text-2xl w-96 max-h-80 break-words bg-slate-50 text-darkblue 
              p-6 rounded-2xl transition-all text-ellipsis overflow-y-scroll "
        >
          {json.post.content}
        </p>
        <button>heart</button>
        <ul>
          {json.post.comments.map((comment) => (
            <li className="text-darkblue text-xl" key={comment.id}>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
