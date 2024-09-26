import React, { memo, useState } from "react";
import { Status } from "@/types/types";
import { WordDetailCard } from "@/components/aceternity/WordDetailCard";
import { IoPlayCircleOutline } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";
import DMATCloseButton from "../elements/DMATCloseButton";
import useAudio from "@/hooks/useAudio";
import { TestData } from "@/models/userModel";
import { FaStar } from "react-icons/fa";
import DMATProgressBar from "../elements/DMATProgressBar";

const DisplayList = ({
  handleChangeStatus,
  displayData,
  totalQuestions,
}: {
  handleChangeStatus: (status: Status) => void;
  displayData: TestData[];
  totalQuestions: number;
}) => {
  const { playInterrupt } = useAudio();

  // selected word
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <DMATCloseButton handleClick={handleClickCloseButton} />
      <DMATProgressBar
        totalQuestions={totalQuestions}
        completedQuestions={
          displayData.filter((data) => data.isCompleted).length
        }
      />
      <div className="flex flex-col overflow-auto">
        {displayData.map((item, index) => (
          <div
            key={item._id}
            onClick={() => {
              setSelectedIndex(index);
              playInterrupt();
            }}
            className={cn(
              "flex flex-col gap-2 text-white-1 text-md p-2 bg-[rgba(173,216,230,0.3)]",
              `${index % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
            )}
          >
            <span className="flex items-center gap-2">
              {`${item.word_id} ${item.word}`}
              {item.isCompleted && <FaStar color="#FFD700" size={20} />}
            </span>
            <span>{item.wordMeaning}</span>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{ width: "90vw" }}
        >
          <WordDetailCard className="p-3 gap-2 flex flex-col">
            <div className="absolute" style={{ right: "4px", top: "4px" }}>
              <DMATCloseButton handleClick={() => setSelectedIndex(null)} />
            </div>
            <p className="text-black-1 flex flex-col">
              <span className="flex items-center gap-2">
                <IoPlayCircleOutline
                  onClick={() =>
                    handlePlayAudio(displayData[selectedIndex].word)
                  }
                  size={32}
                />
                {`${displayData[selectedIndex].word_id} ${displayData[selectedIndex].word}`}
              </span>
              <span>{displayData[selectedIndex].wordMeaning}</span>
            </p>
            {displayData[selectedIndex].sentence !== "" && (
              <p className="flex flex-col">
                <span className="flex gap-2 items-center">
                  <IoPlayCircleOutline
                    size={32}
                    onClick={() =>
                      handlePlayAudio(displayData[selectedIndex].sentence)
                    }
                  />
                  {displayData[selectedIndex].sentence}
                </span>
                <span>{displayData[selectedIndex].sentenceMeaning}</span>
              </p>
            )}
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
