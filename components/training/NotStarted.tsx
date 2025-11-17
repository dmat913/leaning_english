import useCloseAudio from "@/hooks/useCloseAudio";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  MdClose,
  MdList,
  MdPlayArrow,
  MdSchool,
  MdTrendingUp,
  MdAutoStories,
} from "react-icons/md";
import { PATHS } from "@/lib/paths";
import useAudio from "@/hooks/useAudio";

const NotStarted = ({
  handleChangeStatus,
  title,
  description,
}: {
  handleChangeStatus: (status: Status) => void;
  title: string;
  description: string;
}) => {
  const router = useRouter();
  const { playInterrupt } = useCloseAudio();
  const { playInterrupt: playButtonSound } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full flex items-center justify-center p-6"
    >
      {/* Modern Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{
          scale: 1.1,
          rotate: 90,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderColor: "rgba(239, 68, 68, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          rotate: { duration: 0.2 },
        }}
        onClick={() => {
          playInterrupt();
          router.push(PATHS.GOLD_PHRASE_HOME);
        }}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white-1/10 backdrop-blur-md border-2 border-white-1/20 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 group"
        aria-label="ホームに戻る"
      >
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
          <MdClose
            size={24}
            className="text-white-1 group-hover:text-red-300 transition-colors duration-200"
          />
        </motion.div>
      </motion.button>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
          >
            <MdSchool size={40} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-white-1 to-gray-300 bg-clip-text text-transparent mb-2"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-gray-300 text-sm leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          {/* Training Card */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playButtonSound();
              handleChangeStatus("setting_training");
            }}
            className="w-full p-6 rounded-2xl bg-white-1/10 backdrop-blur-md border border-white-1/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-md"
              >
                <MdPlayArrow size={24} className="text-white" />
              </motion.div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-white-1 mb-1 group-hover:text-green-300 transition-colors duration-200">
                  トレーニング開始
                </h3>
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                  学習モードを選択して問題に挑戦
                </p>
              </div>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MdTrendingUp
                  size={20}
                  className="text-green-400 group-hover:text-green-300 transition-colors duration-200"
                />
              </motion.div>
            </div>
          </motion.button>

          {/* List Card */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playButtonSound();
              handleChangeStatus("display_list");
            }}
            className="w-full p-6 rounded-2xl bg-white-1/10 backdrop-blur-md border border-white-1/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md"
              >
                <MdList size={24} className="text-white" />
              </motion.div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-white-1 mb-1 group-hover:text-purple-300 transition-colors duration-200">
                  単語一覧
                </h3>
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                  収録されている単語を確認・復習
                </p>
              </div>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MdAutoStories
                  size={20}
                  className="text-purple-400 group-hover:text-purple-300 transition-colors duration-200"
                />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Stats or Progress Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white-1/5 backdrop-blur-sm border border-white-1/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-gray-300 font-medium">
              準備完了 - 学習を開始しましょう！
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(NotStarted);
