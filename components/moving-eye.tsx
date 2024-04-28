"use client";

import { EyeType } from "@/lib/enum";
import { useState, useEffect, useRef } from "react";

interface MovingEyeProps {
  color: string;
  size?: number;
  type?: EyeType;
}

export function MovingEye({
  color,
  size = 3,
  type = EyeType.NORMAL,
}: MovingEyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [eyeRotation, setEyeRotation] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (eyeRef.current) {
        const x =
          eyeRef.current.getBoundingClientRect().left +
          eyeRef.current.clientWidth / 2;
        const y =
          eyeRef.current.getBoundingClientRect().top +
          eyeRef.current.clientHeight / 2;

        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotation = radian * (180 / Math.PI) * -1 + 270;
        setEyeRotation(rotation);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [eyeRef]);

  return (
    <div className="relative">
      <div
        ref={eyeRef}
        style={{
          transform: `rotate(${eyeRotation}deg)`,
          width: `${size}rem`,
          height: `${size}rem`,
        }}
        className={`p-1 overflow-hidden bg-white rounded-full flex flex-col justify-center`}
      >
        <div
          style={{
            width: `${size * 0.66}rem`,
            height: `${size * 0.66}rem`,
            backgroundColor: `var(${color})`,
          }}
          className={`rounded-full`}
        ></div>
      </div>

      {type == EyeType.HALF_CLOSED && (
        <div
          style={{
            width: `${size}rem`,
            height: `${size / 2}rem`,
          }}
          className={`absolute top-0 bg-pink-500 rounded-t-full`}
        ></div>
      )}
    </div>
  );
}
