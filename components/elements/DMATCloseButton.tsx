import useCloseAudio from "@/hooks/useCloseAudio";
import { IoMdCloseCircle } from "react-icons/io";

const DMATCloseButton = ({ handleClick }: { handleClick: () => void }) => {
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

export default DMATCloseButton;
