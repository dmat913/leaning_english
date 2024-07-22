import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Status } from "@/types/types";
import { WordDetailCard } from "@/components/aceternity/WordDetailCard";
import { IoPlayCircleSharp } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { level730Data } from "@/data/level730";

const DisplayList = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
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
      {level730Data.map((item, index) => (
        <div
          key={item.id}
          onClick={() => setSelectedIndex(index)}
          className="flex items-center"
        >
          <span className="text-white-1">{`${item.id} ${item.word}`}</span>
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
                    handlePlayAudio(level730Data[selectedIndex].word)
                  }
                  size={24}
                />
                {`${level730Data[selectedIndex].id} ${level730Data[selectedIndex].word}`}
              </span>
              <span>{level730Data[selectedIndex].wordMeaning}</span>
            </p>
            <p className="flex flex-col">
              <span className="flex gap-2">
                <IoPlayCircleSharp
                  size={24}
                  onClick={() =>
                    handlePlayAudio(level730Data[selectedIndex].sentence)
                  }
                />
                {level730Data[selectedIndex].sentence}
              </span>
              <span>{level730Data[selectedIndex].sentenceMeaning}</span>
            </p>
            <p className="flex gap-2">
              {level730Data[selectedIndex].portOfSpeech.map((item, index) => (
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
                disabled={selectedIndex === level730Data.length - 1}
              />
            </div>
          </WordDetailCard>
        </div>
      )}
    </div>
  );
};

export default DisplayList;
