"use client";

import { motion } from "framer-motion";
import { IoBookSharp } from "react-icons/io5";

interface CategoryData {
  category: string;
  totalWords: number;
  completedWords: number;
  completionRate: number;
  accuracy?: number;
  totalAttempts: number;
  lastUpdated: string | null;
}

interface CategoryProgressProps {
  categories: CategoryData[];
}

const categoryDisplayNames: Record<string, string> = {
  level600: "600点レベル",
  level730: "730点レベル",
  level860: "860点レベル",
  level990: "990点レベル",
  part1_essentialWord100: "Part1必須100語",
  phrases120: "120フレーズ",
  prepositions: "前置詞",
  conjunctions: "接続詞",
  conjunctiveAdverbs: "接続副詞",
  departments: "部署",
  occupations: "職業",
  majors: "専攻",
};

export default function CategoryProgress({
  categories,
}: CategoryProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-500/10">
          <IoBookSharp className="text-amber-400 text-xl" />
        </div>
        <h2 className="text-xl font-bold text-white-1">金のフレーズ</h2>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">
                {categoryDisplayNames[category.category] || category.category}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-slate-400">
                  {category.completedWords}/{category.totalWords}
                </span>
                <span className="text-amber-400 font-bold min-w-[3rem] text-right">
                  {category.completionRate}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${category.completionRate}%` }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full relative"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      {categories.length > 0 && (
        <div className="pt-4 mt-2 border-t border-slate-700/50 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-semibold">全体進捗</span>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">
                {categories.reduce((sum, cat) => sum + cat.completedWords, 0)}/
                {categories.reduce((sum, cat) => sum + cat.totalWords, 0)}
              </span>
              <span className="text-amber-400 font-bold min-w-[3rem] text-right">
                {Math.round(
                  (categories.reduce(
                    (sum, cat) => sum + cat.completedWords,
                    0
                  ) /
                    categories.reduce((sum, cat) => sum + cat.totalWords, 0)) *
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
                  (categories.reduce(
                    (sum, cat) => sum + cat.completedWords,
                    0
                  ) /
                    categories.reduce((sum, cat) => sum + cat.totalWords, 0)) *
                    100
                )}%`,
              }}
              transition={{
                delay: 0.8,
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-full relative"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
