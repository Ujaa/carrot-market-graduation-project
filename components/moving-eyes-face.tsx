"use client";

import { MovingEye } from "./moving-eye";

export function MovingEyesFace() {
  return (
    <div
      className="
        w-44 h-16 bg-pink-300 rounded-full flex items-center justify-center
        "
    >
      <MovingEye />
      <MovingEye />
    </div>
  );
}
