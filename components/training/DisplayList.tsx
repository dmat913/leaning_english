import React, { memo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { EnglishData, Status } from "@/types/types";
import { WordDetailCard } from "@/components/aceternity/WordDetailCard";
import { IoPlayCircleSharp } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";

const DisplayList = ({
  handleChangeStatus,
  displayData,
}: {
  handleChangeStatus: (status: Status) => void;
  displayData: EnglishData[];
}) => {
  // selected word
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <IoMdCloseCircle
        onClick={() => handleChangeStatus("not_started")}
        color="#FAF0E6"
        className="absolute top-4 right-4"
        size={32}
      />
      {displayData.map((item, index) => (
        <div
          key={item.id}
          onClick={() => setSelectedIndex(index)}
          className={cn(
            "flex items-center p-2 bg-[rgba(173,216,230,0.3)]",
            `${index % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
          )}
        >
          <span className="text-white-1 text-md">{`${item.id} ${item.word}`}</span>
        </div>
      ))}

      {selectedIndex !== null && (
        <div
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{ width: "90vw" }}
        >
          <WordDetailCard className="p-3 gap-2 flex flex-col">
            <div className="absolute" style={{ right: "4px", top: "4px" }}>
              <IoMdCloseCircle
                size={30}
                onClick={() => setSelectedIndex(null)}
              />
            </div>
            <p className="text-black-1 flex flex-col">
              <span className="flex items-center gap-2">
                <IoPlayCircleSharp
                  onClick={() =>
                    handlePlayAudio(displayData[selectedIndex].word)
                  }
                  size={24}
                />
                {`${displayData[selectedIndex].id} ${displayData[selectedIndex].word}`}
              </span>
              <span>{displayData[selectedIndex].wordMeaning}</span>
            </p>
            <p className="flex flex-col">
              <span className="flex gap-2">
                <IoPlayCircleSharp
                  size={24}
                  onClick={() =>
                    handlePlayAudio(displayData[selectedIndex].sentence)
                  }
                />
                {displayData[selectedIndex].sentence}
              </span>
              <span>{displayData[selectedIndex].sentenceMeaning}</span>
            </p>
            <p className="flex gap-2">
              {displayData[selectedIndex].portOfSpeech.map((item, index) => (
                <div
                  key={index}
                  className="border text-sm"
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    borderColor: "black",
                  }}
                >
                  {item}
                </div>
              ))}
            </p>
            <div className="flex items-center gap-2">
              <DMATButton
                title="前へ"
                icon={<MdNavigateBefore size={24} />}
                handleClick={() => setSelectedIndex(selectedIndex - 1)}
                disabled={selectedIndex === 0}
              />
              <DMATButton
                title="次へ"
                icon={<MdNavigateNext size={24} />}
                handleClick={() => setSelectedIndex(selectedIndex + 1)}
                disabled={selectedIndex === displayData.length - 1}
              />
            </div>
          </WordDetailCard>
        </div>
      )}
    </div>
  );
};

export default memo(DisplayList);
