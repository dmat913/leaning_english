import React from "react";
import useSound from "use-sound";
import Sound from "@/public/audio/clickCancelAudio.mp3";

const useCloseAudio = () => {
  const [playInterrupt] = useSound(Sound, {
    interrupt: true,
    volume: 0.2,
  });
  return { playInterrupt };
};

export default useCloseAudio;
