/* eslint-disable @next/next/no-img-element */

import { AvatarColorType, BodyType, EyeType } from "@/lib/enum";
import { MovingEye } from "./moving-eye";

interface AvatarProps {
  bodyType: BodyType;
  eyeType: EyeType;
  eyeColor: AvatarColorType;
  size?: number;
}

export default function Avatar({
  bodyType,
  eyeType,
  eyeColor,
  size = 175,
}: AvatarProps) {
  return (
    <div className="relative flex flex-col items-center justify-center ">
      <img
        className="object-fit"
        src={`/images/${bodyType}.png`}
        width={size}
        height={size}
        alt="Picture of the author"
      />
      <div className="flex absolute top-1/3">
        <MovingEye
          color={eyeColor}
          size={size * 0.016}
          type={
            eyeType === EyeType.NORMAL ? EyeType.NORMAL : EyeType.HALF_CLOSED
          }
        />
        <MovingEye
          color={eyeColor}
          size={size * 0.016}
          type={
            eyeType === EyeType.NORMAL ? EyeType.NORMAL : EyeType.HALF_CLOSED
          }
        />
      </div>
    </div>
  );
}
