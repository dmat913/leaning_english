import DMATButton from "@/components/elements/DMATButton";
import useCloseAudio from "@/hooks/useCloseAudio";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RiSortNumberAsc } from "react-icons/ri";

const NotStarted = ({
  handleChangeStatus,
  title,
  description,
}: {
  handleChangeStatus: (status: Status) => void;
  title: string;
  description: string;
}) => {
  const router = useRouter();
  const { playInterrupt } = useCloseAudio();

  return (
    <>
      <IoMdCloseCircle
        size={32}
        onClick={() => {
          playInterrupt();
          router.push("/");
        }}
        color="#FAF0E6"
        className="absolute top-2 right-2 z-50"
      />
      <div className="relative w-full h-full flex items-center justify-center flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-white-1 text-3xl">{title}</span>
          <span className="text-white-1 text-sm">{description}</span>
        </div>
        <div className="flex items-center gap-3">
          <DMATButton
            title="一覧"
            handleClick={() => handleChangeStatus("display_list")}
            icon={<RiSortNumberAsc color="#0B0B0B" />}
            type="white"
          />
          <DMATButton
            title="Training"
            handleClick={() => handleChangeStatus("setting_training")}
          />
        </div>
      </div>
    </>
  );
};

export default memo(NotStarted);
