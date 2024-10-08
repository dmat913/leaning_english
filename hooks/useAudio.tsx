import React from "react";
import useSound from "use-sound";
import Sound from "@/public/audio/clickButtonAudio.mp3";

const useAudio = () => {
  const [playInterrupt] = useSound(Sound, {
    interrupt: true,
  });
  return { playInterrupt };
};

export default useAudio;
