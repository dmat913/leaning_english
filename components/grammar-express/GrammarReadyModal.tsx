"use client";

import useAudio from "@/hooks/useAudio";
import { motion, AnimatePresence } from "framer-motion";
import { MdTimer, MdLightbulb, MdPlayArrow, MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";

interface GrammarReadyModalProps {
  isOpen: boolean;
  grammarId: string;
  time: string;
  navigation?: string;
  onStart: () => void;
}

export const GrammarReadyModal = ({
  isOpen,
  grammarId,
  time,
  navigation,
  onStart,
}: GrammarReadyModalProps) => {
  const { playInterrupt } = useAudio();
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* 背景のグラデーション効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            {/* コンテンツ */}
            <div className="relative p-8 space-y-6">
              {/* 閉じるボタン */}
              <button
                onClick={() => {
                  playInterrupt();
                  router.back();
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              >
                <MdClose size={24} className="text-slate-300" />
              </button>

              {/* ヘッダー */}
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-2"
                >
                  <span className="text-3xl">📝</span>
                </motion.div>
                <h2 className="text-2xl font-bold text-white-1">
                  問題 {grammarId.slice(-2)}
                </h2>
                <p className="text-sm text-slate-400">
                  準備ができたら開始してください
                </p>
              </div>

              {/* 情報カード */}
              <div className="space-y-3">
                {/* 目標時間 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl border border-emerald-500/30"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-500/20 rounded-xl">
                    <MdTimer size={24} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-emerald-300 font-semibold mb-0.5">
                      目標回答時間
                    </p>
                    <p className="text-2xl font-bold text-white-1">{time}</p>
                  </div>
                </motion.div>

                {/* ナビゲーション */}
                {navigation && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-900/40 to-blue-800/40 backdrop-blur-sm rounded-2xl border border-blue-500/30"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-xl">
                      <MdLightbulb size={24} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-blue-300 font-semibold mb-1">
                        ポイント
                      </p>
                      <p className="text-sm text-white-1 leading-relaxed">
                        {navigation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* スタートボタン */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playInterrupt();
                  onStart();
                }}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-2xl font-bold text-lg text-white-1 shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* ボタンのグロー効果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative flex items-center justify-center gap-2">
                  <MdPlayArrow size={24} />
                  <span>問題を開始する</span>
                </span>
              </motion.button>

              {/* 補足テキスト */}
              <p className="text-xs text-center text-slate-500">
                制限時間が過ぎても回答は可能です
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
