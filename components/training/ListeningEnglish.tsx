import { playJapanese, playEnglish, stopAudio } from "@/common/audioPlayer";
import { testDataState } from "@/states/trainingState";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Status } from "@/types/types";
import DMATProgressBar from "../elements/DMATProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdPlayArrow,
  MdStop,
  MdHeadset,
  MdVolumeUp,
  MdTranslate,
  MdRecordVoiceOver,
} from "react-icons/md";

const ListeningEnglish = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const testData = useRecoilValue(testDataState);

  // 音声再生関数（新しいAPIを使用）
  const playAudio = async (targetIndex: number) => {
    if (testData.length > 0 && targetIndex < testData.length) {
      try {
        setCurrentIndex(targetIndex + 1);
        setIsPlaying(true);

        const { word, wordMeaning, sentence, sentenceMeaning } =
          testData[targetIndex];

        // 順番に音声を再生（新しいAPIは既にPromiseを返す）
        await playEnglish(word, { rate: 0.8, quality: "high" });
        await playJapanese(wordMeaning, { rate: 0.8 });

        if (sentence) {
          await playEnglish(sentence, { rate: 0.8, quality: "high" });
        }

        if (sentenceMeaning) {
          await playJapanese(sentenceMeaning, { rate: 0.8 });
        }

        // 次のアイテムを再生
        playAudio(targetIndex + 1);
      } catch (error) {
        console.error("音声再生エラー:", error);
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
      setCurrentIndex(0);
    }
  };

  // 終了するボタン押下時
  const stopAudioPlayback = () => {
    stopAudio();
    setIsPlaying(false);
    handleChangeStatus("setting_training");
    setCurrentIndex(0);
  };

  const progressPercentage = Math.floor((currentIndex / testData.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col items-center justify-center p-6 space-y-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg"
        >
          <MdHeadset size={40} className="text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white-1 mb-2">リスニング学習</h1>
        <p className="text-gray-300 text-sm">
          音声を聞いて英語を学習しましょう
        </p>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-md bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-white-1 font-semibold">進捗</span>
          <span className="text-2xl font-bold text-blue-400">
            {progressPercentage}%
          </span>
        </div>
        <DMATProgressBar
          totalQuestions={testData.length}
          completedQuestions={currentIndex}
          showIcon={false}
        />
        <div className="mt-3 flex justify-between text-sm text-gray-300">
          <span>
            {currentIndex} / {testData.length} 問
          </span>
          <span>完了済み</span>
        </div>
      </motion.div>

      {/* Current Word Display */}
      <AnimatePresence mode="wait">
        {currentIndex !== 0 && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white-1/15 backdrop-blur-md rounded-3xl p-6 border border-white-1/30 shadow-2xl"
          >
            <div className="text-center space-y-4">
              {/* English Word */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <MdVolumeUp size={20} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white-1">
                    {testData[currentIndex - 1].word}
                  </h2>
                </div>
              </div>

              {/* Japanese Translation */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <MdTranslate size={20} className="text-green-400" />
                </div>
                <p className="text-lg text-gray-200">
                  {testData[currentIndex - 1].wordMeaning}
                </p>
              </div>

              {/* Sentence (if exists) */}
              {testData[currentIndex - 1].sentence !== "" && (
                <div className="mt-6 p-4 rounded-2xl bg-white-1/10 border border-white-1/20 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mt-1">
                      <MdRecordVoiceOver
                        size={16}
                        className="text-purple-400"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white-1 font-medium mb-2">
                        {testData[currentIndex - 1].sentence}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {testData[currentIndex - 1].sentenceMeaning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex gap-4 w-full max-w-md"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => playAudio(0)}
          disabled={isPlaying}
          className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
        >
          <MdPlayArrow size={24} />
          {isPlaying ? "再生中..." : "再生開始"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={stopAudioPlayback}
          className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
        >
          <MdStop size={24} />
          終了する
        </motion.button>
      </motion.div>

      {/* Playing Indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 rounded-full border-2 border-green-400 border-t-transparent"
            />
            <span className="text-green-300 text-sm font-medium">
              音声再生中...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ListeningEnglish;
