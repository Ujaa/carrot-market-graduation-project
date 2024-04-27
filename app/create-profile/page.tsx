"use client";

import FormButton from "@/components/form-button";
import { MovingEyesFace } from "@/components/moving-eyes-face";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createProfile } from "./actions";

export default function CreateProfile() {
  const [state, dispatch] = useFormState(createProfile, null);

  return (
    <main className="w-screen h-screen flex gap-4">
      <div className="grow">
        <button className="px-4 py-2 bg-pink-100 text-pink-400 rounded-full font-medium text-sm">
          Generate new avatar
        </button>
      </div>
      <form
        action={dispatch}
        className="grow flex flex-col items-start justify-center gap-16"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-darkblue font-medium text-4xl">
            What is
            <br />
            your name?
          </h1>
          <Input
            type="text"
            name="username"
            placeholder="Enter yout name"
            required={true}
            errors={state?.formErrors ?? []}
          />
        </div>
        <FormButton text={"This is me"}></FormButton>
      </form>
    </main>
  );
}
