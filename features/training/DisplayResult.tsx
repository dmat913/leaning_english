import { handlePlayAudio } from "@/common/utils";
import CloseButton from "@/components/elements/CloseButton";
import { cn } from "@/lib/utils";
import { TestData } from "@/models/userModel";
import React, { useMemo, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";

const DisplayResult = ({
  correctData,
  incorrectData,
  setIsOpen,
}: {
  correctData: TestData[];
  incorrectData: TestData[];
  setIsOpen: (isOpen: boolean) => void;
}) => {
  // 表示するlistType
  const [displayType, setIsDisplayType] = useState<string>("correct");

  // 画面表示データ
  const displayData: TestData[] = useMemo(() => {
    switch (displayType) {
      case "correct":
        return correctData;
      case "incorrect":
        return incorrectData;
      default:
        return correctData;
    }
  }, [displayType]);

  const handleClickButton = (type: string) => {
    setIsDisplayType(type);
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full z-50 bg-[rgba(173,216,230,0.3)] flex flex-col">
      <CloseButton handleClick={() => setIsOpen(false)} />
      <div className="flex flex-col flex-1 overflow-auto">
        {displayData.map((item, index) => (
          <div
            key={item._id}
            className={cn(
              "flex flex-col text-white-1 p-2 bg-[rgba(173,216,230,0.3)]",
              `${index % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"}`
            )}
          >
            <div className="text-md flex items-center gap-2">
              <span>{item.word_id}</span>
              <IoPlayCircleOutline
                size={30}
                onClick={() => handlePlayAudio(item.word)}
              />
              <span>{item.word}</span>
            </div>
            <span>{item.wordMeaning}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-10 flex">
        <button
          onClick={() => handleClickButton("correct")}
          className={cn("w-[50%] h-full text-black-1 text-sm")}
          style={{
            backgroundColor: "#f58787",
            opacity: displayType === "correct" ? "1" : "0.3",
          }}
        >
          わかる
        </button>
        <button
          onClick={() => handleClickButton("incorrect")}
          className="w-[50%] h-full text-black-1 text-sm"
          style={{
            backgroundColor: "#aaa2f5",
            opacity: displayType === "incorrect" ? "1" : "0.3",
          }}
        >
          わからない
        </button>
      </div>
    </div>
  );
};

export default DisplayResult;
