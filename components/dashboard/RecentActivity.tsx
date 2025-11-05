"use client";

import { motion } from "framer-motion";
import { MdCheckCircle, MdAccessTime } from "react-icons/md";

interface Activity {
  category: string;
  wordId: string;
  lastAttemptAt: Date;
  isCompleted: boolean;
}

interface RecentActivityProps {
  activities: Activity[];
}

const categoryDisplayNames: Record<string, string> = {
  level600: "600点",
  level730: "730点",
  level860: "860点",
  level990: "990点",
  part1_essentialWord100: "Part1",
  phrases120: "フレーズ",
  prepositions: "前置詞",
  conjunctions: "接続詞",
  conjunctiveAdverbs: "接続副詞",
  departments: "部署",
  occupations: "職業",
  majors: "専攻",
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  return `${diffDays}日前`;
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">最近の学習</h2>
        <div className="text-center py-8">
          <p className="text-slate-400">まだ学習記録がありません</p>
          <p className="text-sm text-slate-500 mt-2">学習を始めましょう！</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">最近の学習</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-600/70">
        {activities.map((activity, index) => (
          <motion.div
            key={`${activity.category}-${activity.wordId}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200"
          >
            {/* Status Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.isCompleted ? "bg-green-500/20" : "bg-blue-500/20"
              }`}
            >
              {activity.isCompleted ? (
                <MdCheckCircle className="text-green-400 text-lg" />
              ) : (
                <MdAccessTime className="text-blue-400 text-lg" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {categoryDisplayNames[activity.category] || activity.category}
              </p>
              <p className="text-xs text-slate-400">
                {activity.isCompleted ? "完了" : "学習中"}
              </p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-500">
                {formatTimeAgo(activity.lastAttemptAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
