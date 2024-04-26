"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="min-w-[9rem] px-7 py-4 bg-pink-500 text-white rounded-full font-semibold text-base"
    >
      {pending ? "loading..." : text}
    </button>
  );
}
