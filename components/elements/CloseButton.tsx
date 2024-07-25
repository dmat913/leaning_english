import useCloseAudio from "@/hooks/useCloseAudio";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const CloseButton = ({ handleClick }: { handleClick: () => void }) => {
  const { playInterrupt } = useCloseAudio();
  return (
    <IoMdCloseCircle
      onClick={() => {
        playInterrupt();
        handleClick();
      }}
      color="#FAF0E6"
      className="absolute top-2 right-2"
      size={32}
    />
  );
};

export default CloseButton;
