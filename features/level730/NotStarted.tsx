import DMATButton from "@/components/elements/DMATButton";
import Dialog from "@/components/elements/Dialog";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RiSortNumberAsc } from "react-icons/ri";

const NotStarted = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  const router = useRouter();
  return (
    <>
      <IoMdCloseCircle
        size={32}
        onClick={() => router.push("/")}
        color="#FAF0E6"
        className="absolute top-4 right-4"
      />
      <div className="relative w-full h-full flex items-center justify-center flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-white-1 text-3xl">730点レベル</span>
          <span className="text-white-1 text-sm">加速の300語</span>
        </div>
        <div className="flex items-center gap-3">
          <DMATButton
            title="一覧"
            handleClick={() => handleChangeStatus("display_list")}
            otherClassesSpan={{ color: "#0B0B0B", backgroundColor: "#FAF0E6" }}
            icon={<RiSortNumberAsc color="#0B0B0B" />}
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

export default NotStarted;
