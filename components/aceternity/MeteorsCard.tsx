"use client";
import React from "react";
import { Meteors } from "./Meteors";
import { useRouter } from "next/navigation";
import DMATButton from "../elements/DMATButton";

export function MeteorsCard({
  title,
  description,
  path,
  className,
  disabled = false,
  meteorsNumber = 10,
}: {
  title: string;
  description?: string;
  path?: string;
  className?: string;
  disabled?: boolean;
  meteorsNumber?: number;
}) {
  const router = useRouter();

  // trainingボタン押下時
  const handleClickButton = () => {
    if ("vibrate" in navigator) {
      window.requestAnimationFrame(() => navigator.vibrate(200));
    }
    if (path) router.push(`/${path}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className={`w-full relative max-w-x ${className}`}>
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-white-1 mb-4 relative z-30">
            {title}
          </h1>
          {description && (
            <p className="font-normal text-base text-slate-500 mb-4 relative z-30">
              {description}
            </p>
          )}
          <DMATButton title="Training" handleClick={handleClickButton} />
          <div className="absolute top-4 right-4">
            {/* 星 */}
            <div
              className={`h-5 w-5 rounded-[50%] shadow-[0px_0px_4px_#FFFACD] bg-yellow-1 relative ${
                disabled &&
                "before:content-[''] before:h-5 before:w-5 before:rounded-[50%] before:bg-gray-900 before:absolute before:top-[-2px] before:left-[4px]"
              } `}
            />
          </div>
          <Meteors disabled={disabled} number={meteorsNumber} />
        </div>
        {disabled && (
          <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl text-white z-50">
            Coming soon
          </p>
        )}
      </div>
    </div>
  );
}
