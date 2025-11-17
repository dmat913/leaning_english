import React, { memo, useState } from "react";
import { Status } from "@/types/types";
import { handlePlayAudio } from "@/common/utils";
import DMATButton from "@/components/elements/DMATButton";
import { cn } from "@/lib/utils";
import DMATCloseButton from "../elements/DMATCloseButton";
import useAudio from "@/hooks/useAudio";
import { TestData } from "@/types/types";
import DMATProgressBar from "../elements/DMATProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdPlayArrow,
  MdCheck,
  MdList,
  MdRecordVoiceOver,
  MdTranslate,
  MdLibraryBooks,
} from "react-icons/md";

const DisplayList = ({
  handleChangeStatus,
  displayData,
  totalQuestions,
}: {
  handleChangeStatus: (status: Status) => void;
  displayData: TestData[];
  totalQuestions: number;
}) => {
  const { playInterrupt } = useAudio();

  // selected word
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 閉じるボタン押下時
  const handleClickCloseButton = () => {
    handleChangeStatus("not_started");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full h-full p-4 md:p-6 lg:p-8 max-w-7xl mx-auto"
    >
      <DMATCloseButton handleClick={handleClickCloseButton} />

      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
            <MdList size={24} className="text-white md:w-7 md:h-7" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white-1">
              単語一覧
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {displayData.length}語中{" "}
              {displayData.filter((data) => data.isCompleted).length}語 完了
            </p>
          </div>
        </div>
        <DMATProgressBar
          totalQuestions={totalQuestions}
          completedQuestions={
            displayData.filter((data) => data.isCompleted).length
          }
        />
      </motion.div>

      {/* Word List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-1 overflow-hidden"
      >
        <div className="h-full overflow-y-auto space-y-2 md:space-y-3 pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 auto-rows-min">
          {displayData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedIndex(index);
                playInterrupt();
              }}
              className={cn(
                "group relative p-4 md:p-5 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg",
                item.isCompleted
                  ? "bg-green-400/10 border-green-400/30 hover:bg-green-400/15"
                  : "bg-white-1/10 border-white-1/20 hover:bg-white-1/15"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white-1/20 text-xs font-bold text-white-1 flex-shrink-0">
                      {item.word_id.slice(-3)}
                    </span>
                    <span className="text-lg md:text-xl font-semibold text-white-1 group-hover:text-blue-300 transition-colors duration-200 truncate">
                      {item.word}
                    </span>
                    {item.isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-green-400 shadow-lg flex-shrink-0"
                      >
                        <MdCheck size={16} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-gray-300 group-hover:text-gray-200 transition-colors duration-200 line-clamp-2">
                    {item.wordMeaning}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <MdLibraryBooks size={16} className="text-blue-400" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black-2/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white-1/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white-1/30 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative p-6 md:p-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white-1/20">
                <div className="absolute top-4 right-4">
                  <DMATCloseButton handleClick={() => setSelectedIndex(null)} />
                </div>
                <div className="flex items-center gap-3 pr-12">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <MdTranslate
                      size={24}
                      className="text-white md:w-7 md:h-7"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-black-1">
                      単語詳細
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                      #{displayData[selectedIndex].word_id.slice(-3)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Word Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handlePlayAudio(displayData[selectedIndex].word)
                      }
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition-colors duration-200"
                    >
                      <MdPlayArrow
                        size={20}
                        className="text-blue-600 md:w-6 md:h-6"
                      />
                    </motion.button>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-black-1">
                        {displayData[selectedIndex].word}
                      </h3>
                      <p className="text-gray-600 md:text-lg">
                        {displayData[selectedIndex].wordMeaning}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sentence Section */}
                {displayData[selectedIndex].sentence !== "" && (
                  <div className="p-4 md:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/50 space-y-3">
                    <div className="flex items-start gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handlePlayAudio(displayData[selectedIndex].sentence)
                        }
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors duration-200 mt-1"
                      >
                        <MdRecordVoiceOver
                          size={20}
                          className="text-green-600 md:w-6 md:h-6"
                        />
                      </motion.button>
                      <div className="flex-1">
                        <p className="text-black-1 font-medium mb-1 md:text-lg">
                          {displayData[selectedIndex].sentence}
                        </p>
                        <p className="text-gray-600 text-sm md:text-base">
                          {displayData[selectedIndex].sentenceMeaning}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Parts of Speech */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">品詞</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayData[selectedIndex].portOfSpeech.map(
                      (item, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 text-xs font-medium border border-purple-500/30"
                        >
                          {item}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>

                {/* Remarks */}
                {displayData[selectedIndex].remarks &&
                  displayData[selectedIndex].remarks !== "" && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">
                        備考
                      </h4>
                      <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {displayData[selectedIndex].remarks}
                        </p>
                      </div>
                    </div>
                  )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-200/50 flex items-center gap-3">
                <DMATButton
                  title="前へ"
                  icon={<MdNavigateBefore size={20} />}
                  handleClick={() => setSelectedIndex(selectedIndex - 1)}
                  disabled={selectedIndex === 0}
                />
                <DMATButton
                  title="次へ"
                  icon={<MdNavigateNext size={20} />}
                  handleClick={() => setSelectedIndex(selectedIndex + 1)}
                  disabled={selectedIndex === displayData.length - 1}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(DisplayList);
