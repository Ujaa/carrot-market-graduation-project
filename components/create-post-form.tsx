"use client";

import { uploadPost } from "@/app/actions";
import { useFormState } from "react-dom";
import FormButton from "./form-button";

export default function CreatePostForm() {
  const [state, dispatch] = useFormState(uploadPost, null);

  return (
    <form
      action={dispatch}
      className="w-112 h-full flex flex-col items-center gap-4 "
    >
      <div className="w-full h-full flex flex-col items-center">
        <textarea
          className="w-full h-full text-2xl bg-slate-50 text-darkblue 
              p-6 rounded-2xl overflow-y-scroll focus:outline-none placeholder:text-slate-400"
          name="post"
          rows={6}
          placeholder="Share your stories..."
          required
        ></textarea>
        {state?.formErrors.map((error, index) => (
          <p
            key={index}
            className="w-full text-pink-400 font-medium text-sm mt-1"
          >
            {error}
          </p>
        ))}
      </div>

      <FormButton text="Post"></FormButton>
    </form>
  );
}
