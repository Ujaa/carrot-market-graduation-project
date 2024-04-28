"use client";

import FormButton from "@/components/form-button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createProfile } from "./actions";
import { AvatarColorType, EyeType, BodyType } from "@/lib/enum";
import { useEffect, useState } from "react";
import Avatar from "@/components/avatar";
import { IAvatar } from "@/model/profile";

function getRandomValueWith<T>(list: Array<T>) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

const generateRandomAvatar = (): IAvatar => {
  const eyeColor = getRandomValueWith(Object.values(AvatarColorType));
  const eyeType = getRandomValueWith(Object.values(EyeType));
  const bodyType = getRandomValueWith(Object.values(BodyType));

  return {
    bodyType,
    eyeType,
    eyeColor,
  };
};

export default function CreateProfile() {
  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const createProfileWithAvatar = createProfile.bind(null, avatar!);
  const [state, dispatch] = useFormState(createProfileWithAvatar, null);

  useEffect(() => {
    setAvatar(generateRandomAvatar());
  }, []);

  const handleGenerateNewAvatar = () => {
    setAvatar(generateRandomAvatar());
  };

  return (
    <main className="w-screen h-screen flex flex-col gap-14 px-4 justify-center md:flex-row md:gap-6">
      {avatar && (
        <>
          <div className=" flex flex-col justify-center items-center gap-4 md:grow">
            <div className="flex flex-col items-center justify-center w-64 h-64 bg-slate-50 p-5 rounded-full overflow-hidden">
              <Avatar
                bodyType={avatar.bodyType}
                eyeType={avatar.eyeType}
                eyeColor={avatar.eyeColor}
              />
            </div>
            <button
              onClick={handleGenerateNewAvatar}
              className="px-4 py-2 bg-pink-100 text-pink-400 rounded-full font-medium text-sm"
            >
              Generate new avatar
            </button>
          </div>
          <form
            action={dispatch}
            className="flex flex-col items-center justify-center gap-12 md:grow md:items-start md:gap-16 "
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-darkblue font-medium text-4xl text-center md:text-start">
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
        </>
      )}
    </main>
  );
}
