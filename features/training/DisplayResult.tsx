import { playEnglish } from "@/common/audioPlayer";
import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { cn } from "@/lib/utils";
import { TestData } from "@/types/types";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheck, MdClose, MdVolumeUp, MdLibraryBooks } from "react-icons/md";

const DisplayResult = ({
  correctData,
  incorrectData,
  setIsOpen,
}: {
  correctData: TestData[];
  incorrectData: TestData[];
  setIsOpen: (isOpen: boolean) => void;
}) => {
  // 表示するlistType
  const [displayType, setIsDisplayType] = useState<string>("correct");

  // 画面表示データ
  const displayData: TestData[] = useMemo(() => {
    switch (displayType) {
      case "correct":
        return correctData;
      case "incorrect":
        return incorrectData;
      default:
        return correctData;
    }
  }, [displayType, correctData, incorrectData]);

  const handleClickButton = (type: string) => {
    setIsDisplayType(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-full overflow-hidden bg-black-2/50 backdrop-blur-sm z-50 p-4"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full flex flex-col bg-white-1/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white-1/30"
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white-1/20">
          <div className="absolute top-4 right-4">
            <DMATCloseButton handleClick={() => setIsOpen(false)} />
          </div>
          <div className="flex items-center gap-3 pr-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <MdLibraryBooks size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black-1">結果詳細</h2>
              <p className="text-sm text-gray-600">
                正解: {correctData.length}問 / 不正解: {incorrectData.length}問
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-50/80">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClickButton("correct")}
            className={cn(
              "flex-1 py-4 px-6 font-semibold transition-all duration-200 flex items-center justify-center gap-2",
              displayType === "correct"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-transparent text-gray-600 hover:bg-green-100"
            )}
          >
            <MdCheck size={20} />
            正解 ({correctData.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClickButton("incorrect")}
            className={cn(
              "flex-1 py-4 px-6 font-semibold transition-all duration-200 flex items-center justify-center gap-2",
              displayType === "incorrect"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-transparent text-gray-600 hover:bg-red-100"
            )}
          >
            <MdClose size={20} />
            不正解 ({incorrectData.length})
          </motion.button>
        </div>

        {/* Content List */}
        <div className="flex-1 py-2 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 pt-2 space-y-3"
            >
              {displayData.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <MdLibraryBooks size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {displayType === "correct"
                      ? "正解した問題がありません"
                      : "不正解の問題がありません"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {displayType === "correct"
                      ? "もう少し頑張りましょう！"
                      : "素晴らしい結果です！"}
                  </p>
                </motion.div>
              ) : (
                displayData.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={cn(
                      "p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 group",
                      displayType === "correct"
                        ? "bg-green-50/80 border-green-200/50 hover:bg-green-50"
                        : "bg-red-50/80 border-red-200/50 hover:bg-red-50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/80 text-xs font-bold text-gray-700 border border-gray-200">
                        {item.word_id.slice(-3)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          playEnglish(item.word, { quality: "high" })
                        }
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm",
                          displayType === "correct"
                            ? "bg-green-500/20 hover:bg-green-500/30 text-green-600"
                            : "bg-red-500/20 hover:bg-red-500/30 text-red-600"
                        )}
                      >
                        <MdVolumeUp size={20} />
                      </motion.button>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                          {item.word}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.wordMeaning}
                        </p>
                      </div>
                    </div>

                    {item.sentence && (
                      <div className="pl-11 mt-2 pt-2 border-t border-gray-200/50">
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          {item.sentence}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.sentenceMeaning}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <div className="p-4 bg-gray-50/80 border-t rounded-3xl border-gray-200/50">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">
                正解: {correctData.length}問
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">
                不正解: {incorrectData.length}問
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DisplayResult;
