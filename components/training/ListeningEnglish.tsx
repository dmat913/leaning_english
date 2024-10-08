import { handlePlayAudio } from "@/common/utils";
import { testDataState } from "@/states/trainingState";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import DMATButton from "../elements/DMATButton";
import { Status } from "@/types/types";

const ListeningEnglish = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // 停止判定
  // const [isPaused, setIsPaused] = useState(false);
  // 再生中判定
  const [isPlaying, setIsPlaying] = useState(false);

  const testData = useRecoilValue(testDataState);

  // 音声再生関数
  const playAudio = (currentIndex: number) => {
    if (testData.length > 0 && currentIndex < testData.length) {
      setIsPlaying(true);
      const { word, wordMeaning, sentence, sentenceMeaning } =
        testData[currentIndex];
      handlePlayAudio(word, "en-US", () => {
        handlePlayAudio(wordMeaning, "ja-JP", () => {
          handlePlayAudio(sentence, "en-US", () => {
            handlePlayAudio(sentenceMeaning, "ja-JP", () => {
              playAudio(currentIndex + 1);
            });
          });
        });
      });
    } else {
      setIsPlaying(false);
    }
  };

  // // 一時停止ボタン押下時
  // const pausedAudio = () => {
  //   setIsPaused(true);
  //   window.speechSynthesis.pause();
  // };

  // // 再開ボタン押下時
  // const resumeAudio = () => {
  //   window.speechSynthesis.resume();
  //   setIsPaused(false);
  // };

  // 終了するボタン押下時
  const stopAudio = () => {
    window.speechSynthesis.cancel();
    // setIsPaused(false);
    setIsPlaying(false);
    handleChangeStatus("setting_training");
  };

  return (
    <div>
      <DMATButton
        title="再生開始"
        handleClick={() => playAudio(0)}
        disabled={isPlaying}
      />
      {/* <DMATButton title="一時停止" handleClick={pausedAudio} />
      <DMATButton
        title="再開する"
        handleClick={resumeAudio}
        disabled={!isPaused}
      /> */}
      <DMATButton title="終了する" handleClick={stopAudio} />
    </div>
  );
};

export default ListeningEnglish;
