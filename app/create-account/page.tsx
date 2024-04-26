"use client";

import FormButton from "@/components/form-button";
import { MovingEyesFace } from "@/components/moving-eyes-face";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

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
              minLength={PASSWORD_MIN_LENGTH}
              required={true}
              errors={state?.fieldErrors.password ?? []}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              minLength={PASSWORD_MIN_LENGTH}
              required={true}
              errors={state?.fieldErrors.confirmPassword ?? []}
            />
          </div>

          <FormButton text="Sign up" />
        </form>
      </div>
    </main>
  );
}
