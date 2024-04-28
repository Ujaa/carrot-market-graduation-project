/* eslint-disable @next/next/no-img-element */

import { AvatarColorType, BodyType, EyeType } from "@/lib/enum";
import { MovingEye } from "./moving-eye";

interface AvatarProps {
  bodyType: BodyType;
  eyeType: EyeType;
  eyeColor: AvatarColorType;
}

export default function HeaderAvatar({
  bodyType,
  eyeType,
  eyeColor,
}: AvatarProps) {
  return (
    <div className="bg-slate-50 w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center ">
        <img
          className="object-fit"
          src={`/images/${bodyType}.png`}
          width={80}
          height={80}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
