import useAudio from "@/hooks/useAudio";
import React, { CSSProperties, ReactElement } from "react";
import { FaLocationArrow } from "react-icons/fa";

const DMATButton = ({
  title,
  handleClick,
  otherClassesSpan,
  otherClassesButton,
  disabled = false,
  icon,
  type = "black",
}: {
  title: string;
  handleClick?: () => void;
  otherClassesSpan?: CSSProperties;
  otherClassesButton?: CSSProperties;
  disabled?: boolean;
  icon?: ReactElement<any, any>;
  type?: string;
}) => {
  const { playInterrupt } = useAudio();
  //ボタン押下時
  const handleClickButton = () => {
    playInterrupt();
    if (handleClick) handleClick();
  };

  return (
    <>
      {type === "black" && (
        <button
          onClick={handleClickButton}
          className={`relative inline-flex overflow-hidden rounded-lg p-[1px]  h-10 focus:outline-none disabled:opacity-[0.5] active:opacity-[0.7] active:scale-105`}
          style={otherClassesButton}
          disabled={disabled}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] z-[1]" />
          <span
            className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg  px-3 py-1 text-sm font-medium text-white-1 bg-[#0D0D0D] gap-2 z-[2]`}
            style={otherClassesSpan}
          >
            {title}
            {icon ?? <FaLocationArrow />}
          </span>
        </button>
      )}
      {type === "white" && (
        <button
          onClick={handleClickButton}
          className={`relative inline-flex overflow-hidden rounded-lg p-[1px]  h-10 focus:outline-none disabled:opacity-[0.5] active:opacity-[0.7] active:scale-105`}
          style={otherClassesButton}
          disabled={disabled}
        >
          <span
            className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg  px-3 py-1 text-sm font-medium text-black-1 bg-white-1 gap-2 z-[2]`}
            style={otherClassesSpan}
          >
            {title}
            {icon ?? <FaLocationArrow />}
          </span>
        </button>
      )}
    </>
  );
};

export default DMATButton;
