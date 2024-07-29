import React, { memo, useMemo, useState } from "react";
import { Status, WordData } from "@/types/types";
import { WordDetailCard } from "@/components/aceternity/WordDetailCard";
import DMATButton from "@/components/elements/DMATButton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";
import useAudio from "@/hooks/useAudio";
import CloseButton from "@/components/elements/CloseButton";
import {
  technicalOccupationsData,
  medicalRelatedOccupationsData,
  storesEtcOccupationsData,
  scholarsAndOthersOccupationsData,
  massMediaOccupationsData,
  travelEtcOccupationsData,
  artOccupationsData,
  othersOccupationsData,
  academicNameOccupationsData,
} from "@/data/occupations";
import { departmentData } from "@/data/departments";
import { IoPlayCircleOutline } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";

const DisplayList = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  const { playInterrupt } = useAudio();

  // selected word
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  const displayData: WordData[] = useMemo(() => {
    return [
      ...departmentData,
      ...technicalOccupationsData,
      ...medicalRelatedOccupationsData,
      ...storesEtcOccupationsData,
      ...scholarsAndOthersOccupationsData,
      ...massMediaOccupationsData,
      ...travelEtcOccupationsData,
      ...artOccupationsData,
      ...othersOccupationsData,
      ...academicNameOccupationsData,
    ];
  }, []);

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <CloseButton handleClick={handleClickCloseButton} />
      {displayData.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectedIndex(index);
            playInterrupt();
          }}
          className={cn(
            "flex items-center p-2 bg-[rgba(173,216,230,0.3)]",
            `${index % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
          )}
        >
          <span className="text-white-1 text-md">{`${item.word}`}</span>
        </div>
      ))}

      {selectedIndex !== null && (
        <div
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          style={{ width: "90vw" }}
        >
          <WordDetailCard className="p-3 gap-2 flex flex-col">
            <div className="absolute" style={{ right: "4px", top: "4px" }}>
              <CloseButton handleClick={() => setSelectedIndex(null)} />
            </div>
            <p className="text-black-1 flex flex-col">
              <div className="flex items-center gap-2">
                <IoPlayCircleOutline
                  onClick={() =>
                    handlePlayAudio(displayData[selectedIndex].word)
                  }
                  size={32}
                />
                <span>{displayData[selectedIndex].word}</span>
              </div>
              <span>{displayData[selectedIndex].wordMeaning}</span>
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
