import React, { memo } from "react";
import { Status, WordData } from "@/types/types";
import { cn } from "@/lib/utils";
import CloseButton from "@/components/elements/CloseButton";
import { IoPlayCircleOutline } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";

const DisplayList = ({
  handleChangeStatus,
  displayData,
}: {
  handleChangeStatus: (status: Status) => void;
  displayData: {
    title: string;
    data: WordData[];
  }[];
}) => {
  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full overflow-auto">
      <CloseButton handleClick={handleClickCloseButton} />
      {displayData.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div
            className="w-full p-2"
            style={{ backgroundColor: "rgba(100, 149, 237, 0.6)" }}
          >
            <span className="text-white-1 text-xl">{item.title}</span>
          </div>
          {item.data.map((data, dataIndex) => (
            <div
              key={dataIndex}
              className={cn(
                "flex flex-col gap-1 p-2 bg-[rgba(173,216,230,0.3)] text-white-1 text-md",
                `${dataIndex % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
              )}
            >
              <div className="flex items-center gap-2">
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
      ))}
    </div>
  );
};

export default memo(DisplayList);
