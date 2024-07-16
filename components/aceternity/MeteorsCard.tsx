import React from "react";
import { Meteors } from "./Meteors";

export function MeteorsCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className=" w-full relative max-w-xs">
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            {description}
          </p>
          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Training
          </button>
          <div className="absolute top-4 right-4">
            <div className="h-5 w-5 rounded-[50%] shadow-[-1px_1px_4px_yellow] bg-[yellow] relative  opacity-[0.8]  before:content-[''] before:h-5 before:w-5 before:rounded-[50%] before:bg-gray-900 before:absolute before:top-[-2px] before:left-[4px]" />
          </div>
          <Meteors  />
        </div>
      </div>
    </div>
  );
}
