import { useFormState } from "react-dom";
import { updateProfile } from "./actions";

import { MovingEye } from "@/components/moving-eye";
import { EyeType } from "@/lib/enum";
import { Header } from "@/components/header";

export default function Profile() {
  //  const [state, dispatch] = useFormState(updateProfile, null);

  return (
    <main className=" flex flex-col justify-center items-center">
      <p className="text-4xl">공사 중</p>
    </main>
  );
}
