import getSession from "@/lib/session";
import Link from "next/link";

async function getUser() {
  const session = await getSession();
}

export function Header() {
  return (
    <header className="px-6 py-2 flex items-center justify-between w-screen z-10 bg-white bg-opacity-95 fixed">
      <Link href={"/"} className="text-base font-bold text-pink-500">
        PRAISEBOX
      </Link>

      <div className="flex gap-4 items-center flex-nowrap">
        <button className="px-4 py-2 bg-pink-100 text-pink-400 rounded-full font-medium text-sm">
          Sign out
        </button>
        <Link href={"/profile"}>
          <div className="bg-slate-50 w-9 h-9 rounded-full"></div>
        </Link>
      </div>
    </header>
  );
}
