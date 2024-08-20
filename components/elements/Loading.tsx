import { cn } from "@/lib/utils";
import React from "react";

const Loading = ({ otherClass }: { otherClass?: string }) => {
  return (
    <div
      className={cn(
        `animate-spin h-10 w-10 border-4 border-[#FFD700] rounded-full border-t-transparent`,
        otherClass
      )}
    ></div>
  );
};

export default Loading;
