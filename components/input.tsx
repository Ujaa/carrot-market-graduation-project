import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors: string[];
}

export default function Input({
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        className=" w-full text-2xl py-2 border-b-2 border-slate-200 bg-transparent
       text-darkblue 
       focus:outline-none focus:border-b-darkblue
       placeholder:text-slate-400"
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <p key={index} className="text-pink-400 font-medium">
          {error}
        </p>
      ))}
    </>
  );
}
