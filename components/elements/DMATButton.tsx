import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const DMATButton = ({
  title,
  handleClick,
  otherClasses,
  disabled = false,
}: {
  title: string;
  handleClick?: () => void;
  otherClasses?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={handleClick}
      className="relative inline-flex overflow-hidden rounded-lg p-[1px] max-w-[240px] h-10 focus:outline-none disabled:opacity-[0.5]"
      disabled={disabled}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] z-[1]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg  px-3 py-1 text-sm font-medium text-white-1 bg-[#0D0D0D] gap-2 z-[2] ${otherClasses}`}
      >
        {title}
        <FaLocationArrow />
      </span>
    </button>
  );
};

export default DMATButton;
