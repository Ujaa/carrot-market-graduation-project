import { IPostsReponse, IProfileReponse } from "@/model/reponses";
import { headers } from "next/headers";
import Avatar from "@/components/avatar";
import { Header } from "@/components/header";
import getSession from "@/lib/session";
import Input from "@/components/input";
import FormButton from "@/components/form-button";
import CreatePostForm from "@/components/create-post-form";
import Link from "next/link";

export default async function Home() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const posts: IPostsReponse = await (
    await fetch(`${protocol}://${host}/api/posts`)
  ).json();

  return (
    <main className="flex flex-col items-center m-auto px-5">
      <Header />
      <ul className="max-w-7xl grid gap-x-4 gap-y-28 py-40 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <CreatePostForm />
        {posts.posts.map((post) => {
          return (
            <li
              key={post.id}
              className="group relative flex flex-col items-center "
            >
              <p
                className="opacity-0 invisible translate-y-[3rem] group-hover:translate-y-0 
              group-hover:opacity-100 group-hover:visible text-2xl w-112 max-h-40
              absolute bottom-72 break-words bg-slate-50 text-darkblue 
              p-6 z-20 rounded-2xl transition-all text-ellipsis overflow-y-scroll "
              >
                {post.content}
              </p>
              <Link
                href={`/tweet/${post.id}`}
                className="text-base font-bold text-pink-500"
              >
                <div className="peer w-96 h-96 flex flex-col gap-4 items-center justify-end">
                  <Avatar
                    bodyType={post.profile.avatar.bodyType}
                    eyeType={post.profile.avatar.eyeType}
                    eyeColor={post.profile.avatar.eyeColor}
                    size={200}
                  />
                  <p className="text-lg text-slate-500">
                    {post.profile.username}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
