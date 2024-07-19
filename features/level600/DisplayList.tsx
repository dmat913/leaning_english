import React from "react";
import { level600Data } from "@/data/level600";
import { IoMdCloseCircle } from "react-icons/io";
import { Status } from "@/types/types";

const DisplayList = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <IoMdCloseCircle
        onClick={() => handleChangeStatus("not_started")}
        color="#FAF0E6"
        className="absolute top-4 right-4"
        size={32}
      />
      {level600Data.map((item) => (
        <div key={item.id}>
          <span className="text-white-1">{`${item.id} ${item.word}`}</span>
        </div>
      ))}
    </div>
  );
};

export default DisplayList;
