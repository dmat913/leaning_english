"use client";
import { playEnglish } from "@/common/audioPlayer";
import { TextRevealCard } from "@/components/aceternity/TextRevealCard";
import {
  TrainingResultState,
  testDataState,
  statusState,
  trainingDisplayTypeState,
} from "@/states/trainingState";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import useAudio from "@/hooks/useAudio";
import { EnglishData } from "@/types/types";
import { usePathname } from "next/navigation";
import { userState } from "@/states/userState";
import { TestData } from "@/models/userModel";
import DMATLoading from "../elements/DMATLoading";
import DMATDialog from "../elements/DMATDialog";
import DMATCloseButton from "../elements/DMATCloseButton";
import {
  MdVolumeUp,
  MdCheck,
  MdClose,
  MdStar,
  MdStarBorder,
  MdArrowForward,
  MdQuiz,
  MdRecordVoiceOver,
} from "react-icons/md";

interface ProgressTrainingProps {
  setOriginalTestData: (testData: TestData[]) => void;
}

function ProgressTraining({ setOriginalTestData }: ProgressTrainingProps) {
  const { playInterrupt } = useAudio();
  const pathname = usePathname();

  // user info
  const user = useRecoilValue(userState);

  // テスト対象
  const [testData, setTestData] = useRecoilState(testDataState);

  // 問題番号
  const [problemNumber, setProblemNumber] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // 面接中断ダイアログ 表示flag
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  // テスト結果画面表示flag
  const [isVisibleResult, setIsVisibleResult] = useState(false);

  // test種類 日本語→英語or英語→日本語
  const [trainingDisplayType, setTrainingDisplayType] = useRecoilState(
    trainingDisplayTypeState
  );
  // status,setter
  const setStatus = useSetRecoilState(statusState);
  //正解不正解,set
  const [trainingResult, setTrainingResult] =
    useRecoilState(TrainingResultState);

  // 問題表示判定
  const CheckCurrentProblem = () => {
    setIsVisibleResult(false);
    playInterrupt();
    if (testData.length > problemNumber + 1) {
      setProblemNumber((problemNumber) => problemNumber + 1);
    } else {
      setStatus("completed");
    }
  };

  // テスト結果データ更新
  const updateTrainingResult = (result: boolean) => {
    if (
      trainingResult.some(
        (item) => item.data._id === testData[problemNumber]._id
      )
    ) {
      const updateList: {
        data: EnglishData;
        result: boolean;
      }[] = trainingResult.map((item) => {
        if (item.data._id === testData[problemNumber]._id) {
          return { ...item, result: !item.result };
        }
        return item;
      });
      setTrainingResult(updateList);
    } else {
      setTrainingResult((trainingResult) => [
        ...trainingResult,
        { data: testData[problemNumber], result: result },
      ]);
    }
  };

  // わかるorわからないボタン押下
  const handleClickDisplayResult = useCallback(
    (displayResultFlag: boolean) => {
      updateTrainingResult(displayResultFlag);
      playInterrupt();
      setIsCorrect(displayResultFlag);
      setIsVisibleResult(true);
    },
    // eslint-disable-next-line
    [testData, problemNumber, trainingResult]
  );

  // 単語意味,カンマで分割
  const wordSplit: string[] = useMemo(() => {
    return testData[problemNumber].wordMeaning.split(",");
    // eslint-disable-next-line
  }, [problemNumber]);

  // 更新対象テスト結果取得
  const getUpdateTargetData = (data: any) => {
    switch (pathname) {
      case "/level600":
        return data.user.level600_data;
      case "/level730":
        return data.user.level730_data;
      case "/level860":
        return data.user.level860_data;
      case "/level990":
        return data.user.level990_data;
      case "/part1_essentialWord100":
        return data.user.part1_essentialWord100;
      case "/phrase120":
        return data.user.phrase120_data;
      case "/prepositions":
        return data.user.prepositions_data;
      case "/conjunctions":
        return data.user.conjunctions_data;
      case "/conjunctiveAdverbs":
        return data.user.conjunctiveAdverbs_data;
      default:
        return [];
    }
  };

  // Api呼び出し時ローディング判定
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 星押下時
  const handleClickStar = async (isCompleted: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/update-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          word_id: testData[problemNumber].word_id,
          isCompleted: isCompleted,
          levelKey:
            pathname === "/part1_essentialWord100"
              ? "part1_essentialWord100"
              : `${pathname.slice(1)}_data`,
        }),
      });
      // 更新後データ
      const data = await response.json();
      // 更新成功時
      if (response.ok) {
        sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setTestData((testData) =>
          testData.map((data) => {
            if (data.word_id === testData[problemNumber].word_id) {
              return { ...data, isCompleted: isCompleted };
            } else {
              return data;
            }
          })
        );
        setOriginalTestData(getUpdateTargetData(data));
      }
    } catch (error) {
      alert("更新失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full h-full p-4 space-y-6"
    >
      <DMATCloseButton handleClick={() => setIsOpenDialog(true)} />

      {/* Progress Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <MdQuiz size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white-1">
            問題 {problemNumber + 1} / {testData.length}
          </h2>
          <div className="w-32 h-1 bg-white-1/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((problemNumber + 1) / testData.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Audio Controls */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-end gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            playEnglish(testData[problemNumber].word, { quality: "high" })
          }
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 group"
        >
          <MdVolumeUp
            size={40}
            className="text-white group-hover:scale-110 transition-transform duration-200"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white shadow-lg">
            <MdRecordVoiceOver size={14} className="text-white" />
          </div>
        </motion.button>

        {testData[problemNumber].sentence !== "" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              playEnglish(testData[problemNumber].sentence, { quality: "high" })
            }
            className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 group"
          >
            <MdVolumeUp
              size={28}
              className="text-white group-hover:scale-110 transition-transform duration-200"
            />
          </motion.button>
        )}
      </motion.div>

      {/* Question Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-md bg-white-1/10 backdrop-blur-md rounded-2xl p-6 border border-white-1/20 shadow-xl space-y-4"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white-1/20 text-sm font-bold text-white-1 flex-shrink-0 mt-1">
            {problemNumber + 1}
          </span>
          <div className="flex-1">
            {trainingDisplayType === "englishToJapanese" ? (
              <TextRevealCard
                displayText={testData[problemNumber].word}
                bgText={testData[problemNumber].wordMeaning}
                className="flex flex-1"
              />
            ) : (
              <TextRevealCard
                displayText={testData[problemNumber].wordMeaning}
                bgText={testData[problemNumber].word}
                className="flex flex-1"
              />
            )}
          </div>
        </div>

        {testData[problemNumber].sentence !== "" && (
          <div className="pl-11">
            {trainingDisplayType === "englishToJapanese" ? (
              <TextRevealCard
                displayText={testData[problemNumber].sentence}
                bgText={testData[problemNumber].sentenceMeaning}
                className="flex flex-1"
                size="small"
              />
            ) : (
              <TextRevealCard
                displayText={testData[problemNumber].sentenceMeaning}
                bgText={testData[problemNumber].sentence}
                className="flex flex-1"
                size="small"
              />
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-2">
            {testData[problemNumber].portOfSpeech.map((item, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
            onClick={() =>
              handleClickStar(!testData[problemNumber].isCompleted)
            }
            className="w-10 h-10 rounded-xl bg-white-1/10 border border-white-1/30 flex items-center justify-center hover:bg-white-1/20 transition-colors duration-200"
          >
            {isLoading ? (
              <DMATLoading otherClass="h-5 w-5" />
            ) : (
              <>
                {testData[problemNumber].isCompleted ? (
                  <MdStar size={20} className="text-yellow-400" />
                ) : (
                  <MdStarBorder size={20} className="text-yellow-400" />
                )}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Answer Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="w-full max-w-md space-y-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickDisplayResult(false)}
          disabled={isVisibleResult}
          className="w-full h-12 rounded-xl bg-white-1/90 hover:bg-white-1 text-black-1 font-semibold border-2 border-white-1/50 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <MdClose size={20} />
          わからない
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickDisplayResult(true)}
          disabled={isVisibleResult}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <MdCheck size={20} />
          わかる
        </motion.button>
      </motion.div>
      {/* Dialog */}
      <AnimatePresence>
        {isOpenDialog && (
          <DMATDialog
            mainText="Trainingを中断しますか？"
            leftButtonText="キャンセル"
            rightButtonText="中断"
            handleClickLeftButton={() => setIsOpenDialog(false)}
            handleClickRightButton={() => {
              setIsOpenDialog(false);
              setTestData([]);
              setStatus("not_started");
              setTrainingDisplayType("englishToJapanese");
            }}
          />
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {isVisibleResult && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div
              className={cn(
                "p-6 rounded-t-3xl shadow-2xl border-t-2 backdrop-blur-md",
                isCorrect
                  ? "bg-green-400/90 border-green-300"
                  : "bg-red-400/90 border-red-300"
              )}
            >
              {/* Result Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
                      isCorrect ? "bg-green-500" : "bg-red-500"
                    )}
                  >
                    {isCorrect ? (
                      <MdCheck size={24} className="text-white" />
                    ) : (
                      <MdClose size={24} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isCorrect ? "正解！" : "不正解"}
                    </h3>
                    <p className="text-sm text-white/80">
                      {isCorrect ? "よくできました" : "もう一度確認しましょう"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleClickDisplayResult(!isCorrect)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200",
                    isCorrect
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  )}
                >
                  {isCorrect ? (
                    <MdClose size={20} className="text-white" />
                  ) : (
                    <MdCheck size={20} className="text-white" />
                  )}
                </motion.button>
              </div>

              {/* Answer Content */}
              <div className="mb-6 p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                <div className="space-y-2 text-white">
                  {trainingDisplayType === "englishToJapanese" ? (
                    <div className="space-y-2">
                      {wordSplit.map((word, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          {testData[problemNumber].portOfSpeech.length > 0 && (
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border",
                                isCorrect
                                  ? "bg-green-600 border-green-500 text-white"
                                  : "bg-red-600 border-red-500 text-white"
                              )}
                            >
                              {testData[problemNumber].portOfSpeech[index]}
                            </span>
                          )}
                          <span className="font-medium">{word}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-medium">
                      {testData[problemNumber].word}
                    </span>
                  )}

                  {testData[problemNumber].sentence !== "" && (
                    <div className="pt-2 mt-2 border-t border-white/30">
                      <p className="text-sm text-white/90">
                        {trainingDisplayType === "englishToJapanese"
                          ? testData[problemNumber].sentenceMeaning
                          : testData[problemNumber].sentence}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={CheckCurrentProblem}
                className={cn(
                  "w-full h-12 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-colors duration-200",
                  isCorrect
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                )}
              >
                次の問題へ
                <MdArrowForward size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(ProgressTraining);
