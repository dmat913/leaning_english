"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GrammarTimerProps {
  timeText?: string; // "10秒" などの形式
  onTimeUp?: () => void;
}

export const GrammarTimer = ({ timeText, onTimeUp }: GrammarTimerProps) => {
  // "2分15秒" や "10秒" などから秒数に変換
  const totalSeconds = (() => {
    if (!timeText) return 0;

    const minuteMatch = timeText.match(/(\d+)分/);
    const secondMatch = timeText.match(/(\d+)秒/);

    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
    const seconds = secondMatch ? parseInt(secondMatch[1]) : 0;

    return minutes * 60 + seconds;
  })();

  const [remainingTime, setRemainingTime] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [hasCalledOnTimeUp, setHasCalledOnTimeUp] = useState(false);

  useEffect(() => {
    setRemainingTime(totalSeconds);
    setIsRunning(true);
    setHasCalledOnTimeUp(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;

        // 0になった瞬間にonTimeUpを呼ぶ(一度だけ)
        if (newTime === 0 && onTimeUp && !hasCalledOnTimeUp) {
          setHasCalledOnTimeUp(true);
          onTimeUp();
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp, hasCalledOnTimeUp]);

  // パーセンテージ計算(0以下の場合は0%)
  const percentage =
    totalSeconds > 0 && remainingTime > 0
      ? (remainingTime / totalSeconds) * 100
      : 0;

  // 時間に応じた色の変更
  const getColor = () => {
    if (remainingTime < 0) return "#dc2626"; // dark red (マイナス時間)
    if (percentage > 50) return "#10b981"; // green
    if (percentage > 25) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  // 時間に応じたグロー効果
  const getGlowColor = () => {
    if (remainingTime < 0) return "rgba(220, 38, 38, 0.6)";
    if (percentage > 50) return "rgba(16, 185, 129, 0.5)";
    if (percentage > 25) return "rgba(245, 158, 11, 0.5)";
    return "rgba(239, 68, 68, 0.5)";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative w-64 h-16 flex items-center"
    >
      {/* グラスモーフィズム背景 */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />

      {/* グロー効果 */}
      <div
        className="absolute inset-0 rounded-2xl blur-lg transition-all duration-500"
        style={{
          backgroundColor: getGlowColor(),
          opacity:
            remainingTime <= 10 && remainingTime >= 0
              ? 0.8
              : remainingTime < 0
              ? 0.9
              : 0.3,
        }}
      />

      {/* 残り時間が少ない時またはマイナスの時のパルスアニメーション */}
      {((remainingTime <= 10 && remainingTime > 0) || remainingTime < 0) && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: getColor() }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: remainingTime < 0 ? 0.8 : 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* コンテンツエリア */}
      <div className="relative w-full h-full flex gap-4 items-center justify-between px-4 py-2">
        {/* 左側: 時間表示 */}
        <div className="flex items-center gap-3">
          <motion.div
            key={remainingTime}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-1"
          >
            {remainingTime < 0 && (
              <span
                className="text-3xl font-bold transition-colors duration-300"
                style={{ color: getColor() }}
              >
                -
              </span>
            )}
            <span
              className="text-3xl font-bold transition-colors duration-300"
              style={{ color: getColor() }}
            >
              {Math.abs(remainingTime)}
            </span>
            <span className="text-sm text-white-1 font-medium">秒</span>
          </motion.div>
        </div>

        {/* 右側: プログレスバー */}
        <div className="flex-1 w-full h-3 bg-slate-800/50 rounded-full overflow-hidden border border-white/10">
          <motion.div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: getColor(),
              boxShadow: `0 0 10px ${getGlowColor()}`,
            }}
            initial={{ width: "100%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};
