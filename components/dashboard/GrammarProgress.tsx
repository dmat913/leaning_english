"use client";

import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

interface GrammarChapter {
  category: string;
  totalProblems: number;
  completedProblems: number;
  completionRate: number;
  totalAttempts: number;
  lastUpdated: string | null;
}

interface GrammarProgressProps {
  chapters: GrammarChapter[];
}

const GrammarProgress = ({ chapters }: GrammarProgressProps) => {
  const getChapterLabel = (category: string) => {
    const chapterMap: { [key: string]: string } = {
      chapter1: "1 絶対おさえるべき23題",
      chapter2: "2 スピードを手に入れる19題",
      chapter3: "3 苦手を克服する14題",
      chapter4: "4 意外な落とし穴を回避する22題",
      chapter5: "5 一気に駆け抜ける Part6 28題",
      chapter6: "6 ここで差がつく24題",
      chapter7: "7 最高峰を目指す23題",
    };
    return chapterMap[category] || category;
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return "from-cyan-500 to-blue-500";
    if (rate >= 60) return "from-blue-500 to-indigo-500";
    if (rate >= 40) return "from-indigo-500 to-blue-600";
    return "from-slate-500 to-slate-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 shadow-xl"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <FaBook className="text-cyan-400 text-xl" />
          </div>
          <h2 className="text-xl font-bold text-white-1">文法特急</h2>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="space-y-2"
            >
              {/* Chapter Info */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium flex-1 truncate">
                  {getChapterLabel(chapter.category)}
                </span>
                <div className="flex gap-4 items-center">
                  <span className="text-slate-400">
                    {chapter.completedProblems}/{chapter.totalProblems}
                  </span>
                  <span className="text-cyan-400 min-w-[2rem]  font-semibold text-right">
                    {chapter.completionRate}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${chapter.completionRate}%` }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
              </div>

              {/* Attempts Info */}
              {/* {chapter.totalAttempts > 0 && (
                <div className="text-xs text-slate-500">
                  試行回数: {chapter.totalAttempts}回
                </div>
              )} */}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        {chapters.length > 0 && (
          <div className="pt-4 border-t border-slate-700/50 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-semibold">全体進捗</span>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">
                  {chapters.reduce((sum, ch) => sum + ch.completedProblems, 0)}/
                  {chapters.reduce((sum, ch) => sum + ch.totalProblems, 0)}
                </span>
                <span className="text-cyan-400 font-bold min-w-[3rem] text-right">
                  {Math.round(
                    (chapters.reduce(
                      (sum, ch) => sum + ch.completedProblems,
                      0
                    ) /
                      chapters.reduce((sum, ch) => sum + ch.totalProblems, 0)) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
            {/* Overall Progress bar */}
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.round(
                    (chapters.reduce(
                      (sum, ch) => sum + ch.completedProblems,
                      0
                    ) /
                      chapters.reduce((sum, ch) => sum + ch.totalProblems, 0)) *
                      100
                  )}%`,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1,
                  ease: "easeOut",
                }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 rounded-full relative"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

export default GrammarProgress;
