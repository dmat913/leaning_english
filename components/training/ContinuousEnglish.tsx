import { handlePlayAudio } from "@/common/utils";
import { statusState, testDataState } from "@/states/trainingState";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import DMATDialog from "../elements/DMATDialog";

const ContinuousEnglish = () => {
  const [testData, setTestData] = useRecoilState(testDataState);
  const setStatus = useSetRecoilState(statusState);

  // true → id再生
  const [isPlayId, setIsPlayId] = useState<boolean>(false);
  // true → word再生
  const [isPlayWord, setIsPlayWord] = useState<boolean>(false);
  // true → word意味再生
  const [isPlayWordMeaning, setIsPlayWordMeaning] = useState<boolean>(false);
  // true → sentence再生
  const [isPlaySentence, setIsPlaySentence] = useState<boolean>(false);
  // true → sentence意味再生
  const [isPlaySentenceMeaning, setIsPlaySentenceMeaning] =
    useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  //再生スタート
  useEffect(() => {
    setCurrentIndex(0);
    setIsPlayId(true);
    // eslint-disable-next-line
  }, []);

  // id再生
  useEffect(() => {
    if (isPlayId) {
      console.log("id再生");
      handlePlayAudio(
        `Number${testData[currentIndex]._id.replace(/^0+/, "")}`,
        "en-US",
        () => {
          setIsPlayWord(true);
          setIsPlayId(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [isPlayId]);

  // word再生
  useEffect(() => {
    if (isPlayWord) {
      console.log("word再生");
      handlePlayAudio(testData[currentIndex].word, "en-US", () => {
        setIsPlayWordMeaning(true);
        setIsPlayWord(false);
      });
    }
    // eslint-disable-next-line
  }, [isPlayWord]);

  // word意味再生
  useEffect(() => {
    if (isPlayWordMeaning) {
      console.log("word意味再生");
      handlePlayAudio(testData[currentIndex].wordMeaning, "ja-JP", () => {
        setIsPlaySentence(true);
        setIsPlayWordMeaning(false);
      });
    }
    // eslint-disable-next-line
  }, [isPlayWordMeaning]);

  // sentence再生
  useEffect(() => {
    if (isPlaySentence) {
      console.log("sentence再生");
      handlePlayAudio(testData[currentIndex].sentence, "en-US", () => {
        setIsPlaySentenceMeaning(true);
        setIsPlaySentence(false);
      });
    }
    // eslint-disable-next-line
  }, [isPlaySentence]);

  // sentence意味再生
  useEffect(() => {
    if (isPlaySentenceMeaning) {
      console.log("sentence意味再生");
      handlePlayAudio(testData[currentIndex].sentenceMeaning, "ja-JP", () => {
        setIsPlaySentenceMeaning(false);
        CheckLastData();
      });
    }
    // eslint-disable-next-line
  }, [isPlaySentenceMeaning]);

  const [isFinish, setIsFinish] = useState<boolean>(false);

  // 最後の問題の場合、ダイアログ表示
  const CheckLastData = () => {
    if (currentIndex + 1 === testData.length) {
      setIsFinish(true);
    } else {
      setTimeout(() => {
        setCurrentIndex((currentIndex) => currentIndex + 1);
        setIsPlayId(true);
      }, 500);
    }
  };

  return (
    <div>
      {isFinish && (
        <DMATDialog
          mainText="トレーニングを終了します。"
          leftButtonText="押しても何も起こらないよ☺️"
          rightButtonText="終了"
          handleClickLeftButton={() => {}}
          handleClickRightButton={() => {
            setIsFinish(false);
            setTestData([]);
            setStatus("not_started");
          }}
        />
      )}
    </div>
  );
};

export default ContinuousEnglish;
