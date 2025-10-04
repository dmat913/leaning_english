import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdTrendingUp,
} from "react-icons/md";

interface DMATProgressBarProps {
  totalQuestions: number;
  completedQuestions: number;
  showIcon?: boolean;
}

const DMATProgressBar: React.FC<DMATProgressBarProps> = ({
  totalQuestions,
  completedQuestions,
  showIcon = true,
}) => {
  // 割合を計算
  const percentage = useMemo(() => {
    return (completedQuestions / totalQuestions) * 100;
  }, [completedQuestions, totalQuestions]);

  // 進捗レベルを判定
  const getProgressLevel = () => {
    if (percentage >= 100) return "完了";
    if (percentage >= 80) return "もうすぐ完了";
    if (percentage >= 60) return "順調";
    if (percentage >= 40) return "進行中";
    if (percentage >= 20) return "開始済み";
    return "未開始";
  };

  const getProgressColor = () => {
    if (percentage >= 100) return "from-green-400 to-emerald-500";
    if (percentage >= 80) return "from-blue-400 to-cyan-500";
    if (percentage >= 60) return "from-purple-400 to-pink-500";
    if (percentage >= 40) return "from-yellow-400 to-orange-500";
    if (percentage >= 20) return "from-orange-400 to-red-500";
    return "from-gray-400 to-gray-500";
  };

  const getIconColor = () => {
    if (percentage >= 100) return "text-green-400";
    if (percentage >= 80) return "text-blue-400";
    if (percentage >= 60) return "text-purple-400";
    if (percentage >= 40) return "text-yellow-400";
    if (percentage >= 20) return "text-orange-400";
    return "text-gray-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-3"
    >
      {showIcon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className={`${getIconColor()}`}
            >
              {percentage >= 100 ? (
                <MdCheckCircle size={24} />
              ) : (
                <MdTrendingUp size={24} />
              )}
            </motion.div>
            <div>
              <p className="text-white-1 font-semibold text-sm">
                {getProgressLevel()}
              </p>
              <p className="text-gray-300 text-xs">
                {completedQuestions}/{totalQuestions} 問題完了
              </p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
            className="px-3 py-1 rounded-full bg-white-1/10 backdrop-blur-sm border border-white-1/20"
          >
            <span className="text-white-1 font-bold text-sm">
              {percentage.toFixed(0)}%
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Progress Bar Container */}
      <div className="relative">
        <div className="h-3 w-full bg-white-1/10 backdrop-blur-sm rounded-full border border-white-1/20 shadow-inner overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white-1/5 to-transparent"></div>

          {/* Progress Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full relative overflow-hidden shadow-lg`}
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />

            {/* Progress Dots */}
            {percentage > 0 && (
              <div className="absolute inset-0 flex items-center justify-end pr-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="w-2 h-2 bg-white rounded-full shadow-sm"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Progress Milestones */}
        <div className="absolute top-0 left-0 w-full h-3 flex items-center">
          {[25, 50, 75].map((milestone, index) => (
            <motion.div
              key={milestone}
              initial={{ scale: 0 }}
              animate={{ scale: percentage >= milestone ? 1.2 : 0.8 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="absolute w-1 h-1 rounded-full transition-colors duration-300"
              style={{ left: `${milestone}%`, transform: "translateX(-50%)" }}
            >
              {percentage >= milestone ? (
                <MdCheckCircle
                  size={12}
                  className="text-white drop-shadow-sm"
                />
              ) : (
                <MdRadioButtonUnchecked size={12} className="text-white-1/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {percentage >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-400/10 border border-green-400/30 backdrop-blur-sm"
        >
          <MdCheckCircle size={20} className="text-green-400" />
          <span className="text-green-300 font-medium text-sm">
            🎉 すべての問題が完了しました！
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DMATProgressBar;
