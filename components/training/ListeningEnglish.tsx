import { handlePlayAudio } from "@/common/utils";
import { testDataState } from "@/states/trainingState";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import DMATButton from "../elements/DMATButton";
import { Status } from "@/types/types";
import DMATProgressBar from "../elements/DMATProgressBar";

const ListeningEnglish = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  // 停止判定
  // const [isPaused, setIsPaused] = useState(false);
  // 再生中判定
  const [isPlaying, setIsPlaying] = useState(false);
  // 再生中問題
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const testData = useRecoilValue(testDataState);

  // 音声再生関数
  const playAudio = (targetIndex: number) => {
    if (testData.length > 0 && targetIndex < testData.length) {
      setCurrentIndex(targetIndex + 1);
      setIsPlaying(true);
      const { word, wordMeaning, sentence, sentenceMeaning } =
        testData[targetIndex];
      handlePlayAudio(word, "en-US", () => {
        handlePlayAudio(wordMeaning, "ja-JP", () => {
          handlePlayAudio(sentence, "en-US", () => {
            handlePlayAudio(sentenceMeaning, "ja-JP", () => {
              playAudio(targetIndex + 1);
            });
          });
        });
      });
    } else {
      setIsPlaying(false);
      setCurrentIndex(0);
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
    setCurrentIndex(0);
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="w-full flex flex-col gap-1">
        <span className="text-white-1">
          {Math.floor((currentIndex / testData.length) * 100)}%
        </span>
        <DMATProgressBar
          totalQuestions={testData.length}
          completedQuestions={currentIndex}
          showIcon={false}
        />
      </div>
      {currentIndex !== 0 && (
        <div className="flex flex-col text-white-1">
          <span className="text-lg">{testData[currentIndex - 1].word}</span>
          <span>{testData[currentIndex - 1].wordMeaning}</span>
          {testData[currentIndex - 1].sentence !== "" && (
            <>
              <span className="text-lg">
                {testData[currentIndex - 1].sentence}
              </span>
              <span>{testData[currentIndex - 1].sentenceMeaning}</span>
            </>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <DMATButton
          title="再生開始"
          handleClick={() => playAudio(0)}
          disabled={isPlaying}
        />
        <DMATButton title="終了する" handleClick={stopAudio} />
      </div>
      {/* <DMATButton title="一時停止" handleClick={pausedAudio} />
      <DMATButton
        title="再開する"
        handleClick={resumeAudio}
        disabled={!isPaused}
      /> */}
    </div>
  );
};

export default ListeningEnglish;
