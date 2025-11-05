import { motion } from "framer-motion";
import {
  listeningTestDataState,
  currentQuestionIndexState,
  userAnswersState,
  isTestCompletedState,
  showQuestionTextState,
  showSubQuestionJapaneseState,
} from "@/states/listeningTestDataState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect, useRef } from "react";
import {
  MdVolumeUp,
  MdNavigateNext,
  MdCheckCircle,
  MdPause,
  MdStop,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { ListeningAudioPlayer } from "@/common/audioListening";

interface ListeningTestProps {
  onComplete: () => void;
}

const ListeningTest = ({ onComplete }: ListeningTestProps) => {
  const testData = useRecoilValue(listeningTestDataState);
  const [currentIndex, setCurrentIndex] = useRecoilState(
    currentQuestionIndexState
  );
  const [userAnswers, setUserAnswers] = useRecoilState(userAnswersState);
  const [isTestCompleted, setIsTestCompleted] =
    useRecoilState(isTestCompletedState);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  // 問題文と設問の日本語訳の表示/非表示の状態
  const [showQuestionText, setShowQuestionText] = useRecoilState(
    showQuestionTextState
  );
  const [showSubQuestionJapanese, setShowSubQuestionJapanese] = useRecoilState(
    showSubQuestionJapaneseState
  );

  // 音声プレーヤー
  const audioPlayerRef = useRef<ListeningAudioPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion = testData[currentIndex];
  const totalQuestions = testData.length;

  // コンポーネントマウント時に音声プレーヤーを初期化
  useEffect(() => {
    audioPlayerRef.current = new ListeningAudioPlayer();

    return () => {
      // クリーンアップ
      if (audioPlayerRef.current) {
        audioPlayerRef.current.cleanup();
      }
    };
  }, []);

  // 問題が変わったら音声を停止
  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [currentIndex]);

  // 音声再生
  const handlePlayAudio = () => {
    if (!audioPlayerRef.current || !currentQuestion) return;

    if (isPlaying && !isPaused) {
      // 一時停止
      audioPlayerRef.current.pause();
      setIsPaused(true);
    } else if (isPaused) {
      // 再開
      audioPlayerRef.current.resume();
      setIsPaused(false);
    } else {
      // 新規再生
      audioPlayerRef.current.play(
        currentQuestion,
        () => {
          setIsPlaying(true);
          setIsPaused(false);
        },
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      );
    }
  };

  // 音声停止
  const handleStopAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  // 回答選択
  const handleSelectAnswer = (subQuestionIndex: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [subQuestionIndex]: answer,
    });
  };

  // 次の問題へ
  const handleNext = () => {
    // 現在の問題の回答を保存
    currentQuestion.questions.forEach((_, subIndex) => {
      if (selectedAnswers[subIndex]) {
        setUserAnswers((prev) => {
          // 既に同じ問題の回答があれば削除
          const filtered = prev.filter(
            (a) =>
              !(
                a.questionIndex === currentIndex &&
                a.subQuestionIndex === subIndex
              )
          );
          return [
            ...filtered,
            {
              questionIndex: currentIndex,
              subQuestionIndex: subIndex,
              answer: selectedAnswers[subIndex],
            },
          ];
        });
      }
    });

    // 次の問題へ
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswers({});
    } else {
      // テスト完了
      setIsTestCompleted(true);
      onComplete();
    }
  };

  // 進捗率を計算
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // すべての質問に回答済みかチェック
  const allAnswered = currentQuestion.questions.every(
    (_, index) => selectedAnswers[index]
  );

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-white-1 text-xl">問題を読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-8">
      {/* プログレスバー */}
      {/* <div className="mb-6">
        <div className="bg-white-1/10 backdrop-blur-sm rounded-lg p-4 border border-white-1/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white-1 font-semibold">進捗状況</span>
            <span className="text-white-1/80">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className="h-2 bg-white-1/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
            />
          </div>
        </div>
      </div> */}

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto"
      >
        {/* 質問セクション */}
        <div className="space-y-6">
          {currentQuestion.questions.map((question, subIndex) => (
            <div
              key={subIndex}
              className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
            >
              <h3 className="text-lg font-semibold text-white-1 mb-2">
                問題 {subIndex + 1}
              </h3>
              <p className="text-white-1 mb-2">
                {question.questionEnglishText}
              </p>
              {showSubQuestionJapanese && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-white-1/70 text-sm mb-4"
                >
                  {question.questionJapaneseText}
                </motion.p>
              )}

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected =
                    selectedAnswers[subIndex] === option.optionEnglishText;

                  return (
                    <motion.button
                      key={optionIndex}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() =>
                        handleSelectAnswer(subIndex, option.optionEnglishText)
                      }
                      className={cn(
                        "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                        isSelected
                          ? "border-green-400 bg-green-400/20 text-green-100"
                          : "border-white-1/30 bg-white-1/5 text-white-1 hover:border-white-1/50 hover:bg-white-1/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected && (
                          <MdCheckCircle
                            className="text-green-400 flex-shrink-0"
                            size={20}
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-1">
                            {option.optionEnglishText}
                          </p>
                          {showSubQuestionJapanese && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm opacity-80"
                            >
                              {option.optionJapaneseText}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* 会話文セクション */}
        <div className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 my-6 border border-white-1/20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white-1 flex items-center gap-2">
              <MdVolumeUp className="text-orange-400" size={28} />
              会話文 {currentIndex + 1} / {totalQuestions}
            </h2>
            {/* 問題文表示トグル */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuestionText(!showQuestionText)}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 border border-blue-400/30"
            >
              {showQuestionText ? (
                <>
                  <MdVisibilityOff size={18} />
                  非表示
                </>
              ) : (
                <>
                  <MdVisibility size={18} />
                  表示
                </>
              )}
            </motion.button>
          </div>

          {/* 音声再生中のインジケーター */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 text-orange-400"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MdVolumeUp size={20} />
              </motion.div>
              <span className="text-sm font-medium">
                {isPaused ? "音声を一時停止中..." : "音声を再生中..."}
              </span>
            </motion.div>
          )}

          {/* 英語の会話文 */}
          {showQuestionText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="bg-white-1/5 rounded-lg p-4">
                <p className="text-white-1 leading-relaxed whitespace-pre-line">
                  {currentQuestion.questionEnglishText}
                </p>
              </div>

              {/* 日本語の会話文 */}
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/30">
                <p className="text-white-1/90 leading-relaxed">
                  {currentQuestion.questionJapaneseText}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 次へボタン */}
      <div className="flex justify-center gap-1 pt-4 border-t border-white-1/20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAudio}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-200 shadow-md",
            isPlaying && !isPaused
              ? "bg-yellow-500 hover:bg-yellow-600"
              : isPaused
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-orange-500 hover:bg-orange-600"
          )}
        >
          {isPlaying && !isPaused ? (
            <>
              <MdPause size={20} />
              一時停止
            </>
          ) : isPaused ? (
            <>
              <MdVolumeUp size={20} />
              再開
            </>
          ) : (
            <>
              <MdVolumeUp size={20} />
              再生
            </>
          )}
        </motion.button>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStopAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-md"
          >
            <MdStop size={20} />
            停止
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSubQuestionJapanese(!showSubQuestionJapanese)}
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200 border border-purple-400/30"
        >
          {showSubQuestionJapanese ? (
            <>
              <MdVisibilityOff size={18} />
              英文
            </>
          ) : (
            <>
              <MdVisibility size={18} />
              翻訳
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!allAnswered}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg text-sm",
            allAnswered
              ? "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 hover:shadow-xl"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          )}
        >
          {currentIndex < totalQuestions - 1 ? "次の問題へ" : "完了"}
          <MdNavigateNext size={28} />
        </motion.button>
      </div>
    </div>
  );
};

export default ListeningTest;
