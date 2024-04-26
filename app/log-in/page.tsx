"use client";

import FormButton from "@/components/form-button";
import { MovingEyesFace } from "@/components/moving-eyes-face";
import Input from "@/components/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <main className=" flex flex-col justify-center items-center">
      <div className=" min-w-[32rem] h-screen flex flex-col items-center justify-center gap-16">
        <MovingEyesFace />
        <form action={dispatch} className="w-full  flex flex-col items-center">
          <div className="flex flex-col items-center gap-3 mb-24">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              errors={state?.fieldErrors.email ?? []}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              minLength={PASSWORD_MIN_LENGTH}
              errors={state?.fieldErrors.password ?? []}
            />
          </div>

          <FormButton text="Sign in" />
          <p className="mt-6">
            <Link href="/create-account" className="text-base text-slate-400">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
