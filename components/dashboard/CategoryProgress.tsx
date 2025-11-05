"use client";

import { motion } from "framer-motion";

interface CategoryData {
  category: string;
  totalWords: number;
  completedWords: number;
  completionRate: number;
  accuracy: number;
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
      <h2 className="text-xl font-bold text-white-1 mb-6">
        金のフレーズ 進捗率
      </h2>

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
                <span className="text-cyan-400 font-bold min-w-[3rem] text-right">
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
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
