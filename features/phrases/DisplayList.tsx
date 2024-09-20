import React, { memo } from "react";
import { Status } from "@/types/types";
import { cn } from "@/lib/utils";
import { IoPlayCircleOutline } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";
import { phrasesData } from "@/data/120SetPhrases";
import DMATCloseButton from "@/components/elements/DMATCloseButton";

const DisplayList = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <DMATCloseButton handleClick={handleClickCloseButton} />
      {phrasesData.map((data, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col gap-1 p-2 bg-[rgba(173,216,230,0.3)] text-white-1 text-md",
            `${index % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
          )}
        >
          <div className="flex items-center gap-2">
            <span>{index + 1}</span>
            <IoPlayCircleOutline
              onClick={() => handlePlayAudio(data.word)}
              size={32}
              color="#FAF0E6"
            />
            <span>{`${data.word}`}</span>
          </div>
          <span>{data.wordMeaning}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(DisplayList);
