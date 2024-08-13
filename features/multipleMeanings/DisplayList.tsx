import React, { memo } from "react";
import { cn } from "@/lib/utils";
import CloseButton from "@/components/elements/CloseButton";
import { IoPlayCircleOutline } from "react-icons/io5";
import { handlePlayAudio } from "@/common/utils";
import { multipleMeaningsData } from "@/data/multipleMeanings";
import { useRouter } from "next/navigation";

const DisplayList = () => {
  const router = useRouter();

  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    // handleChangeStatus("not_started");
    router.push("/home");
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full overflow-auto">
      <CloseButton handleClick={handleClickCloseButton} />
      {multipleMeaningsData.map((data) => (
        <div key={data.id} className={cn("flex flex-col text-white-1 text-md")}>
          <div
            className="p-2"
            style={{ backgroundColor: "rgba(100, 149, 237, 0.6)" }}
          >
            <div className="flex items-center gap-2">
              <span>{data.id}</span>
              <IoPlayCircleOutline
                onClick={() => handlePlayAudio(data.word)}
                size={32}
                color="#FAF0E6"
              />
              <span>{`${data.word}`}</span>
            </div>
            <span>{data.wordMeaning}</span>
          </div>
          {data.meanings.map((meaning, meaningIndex) => (
            <div
              key={meaningIndex}
              className={cn(
                "flex flex-col gap-1 p-2 bg-[rgba(173,216,230,0.3)] text-white-1 text-md",
                `${meaningIndex % 2 === 0 && "bg-[rgba(240,248,255,0.3)]"} `
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {meaning.portOfSpeech.map((item, index) => (
                    <div
                      key={index}
                      className="border text-sm text-black-1 bg-white-1"
                      style={{
                        padding: "4px 10px",
                        borderColor: "#FAF0E6",
                        borderRadius: "4px",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <span>{meaning.meaning}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoPlayCircleOutline
                  onClick={() => handlePlayAudio(meaning.sentence)}
                  size={32}
                  color="#FAF0E6"
                />
                <span>{meaning.sentence}</span>
              </div>
              <span>{meaning.sentenceMeaning}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(DisplayList);
