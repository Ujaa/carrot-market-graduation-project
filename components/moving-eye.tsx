"use client";

import { useState, useEffect, useRef } from "react";

export function MovingEye() {
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
    <div
      ref={eyeRef}
      style={{
        transform: `rotate(${eyeRotation}deg)`,
      }}
      className="p-1 overflow-hidden w-12 h-12 bg-white rounded-full flex flex-col  justify-center"
    >
      <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
    </div>
  );
}
