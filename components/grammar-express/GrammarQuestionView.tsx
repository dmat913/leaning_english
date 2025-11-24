"use client";

import { motion } from "framer-motion";
import { GrammarTimer } from "./GrammarTimer";
import { GrammarExpress } from "@/models/grammarExpressModel";

interface GrammarQuestionViewProps {
  selectedGrammar: GrammarExpress;
  onAnswer: (option: string) => void;
}

export const GrammarQuestionView = ({
  selectedGrammar,
  onAnswer,
}: GrammarQuestionViewProps) => {
  return (
    <div className="flex flex-col h-full justify-between gap-6 overflow-auto pb-4">
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between gap-4">
        {/* 問題番号 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50" />
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 rounded-2xl border border-blue-400/30 shadow-xl">
            <span className="text-2xl font-bold text-white-1">
              Q.{selectedGrammar.grammar_id.slice(-2)}
            </span>
          </div>
        </motion.div>
        {/* タイマー */}
        {selectedGrammar.time && (
          <GrammarTimer timeText={selectedGrammar.time} />
        )}
      </div>

      {/* 問題文カード - より大きく目立つように */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-600/50 p-8">
          <p className="text-xl text-white-1 leading-relaxed whitespace-pre-wrap font-medium">
            {selectedGrammar.sentence}
          </p>
        </div>
      </motion.div>

      {/* 選択肢 - よりモダンなデザイン */}
      <div className="grid grid-cols-1 gap-4">
        {selectedGrammar.options[0]?.map((option, i) => (
          <motion.button
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            type="button"
            onClick={() => onAnswer(option)}
            className="group relative text-left overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* ホバー時のグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* グロー効果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

            {/* コンテンツ */}
            <div className="relative flex items-center gap-5 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm px-6 py-5 rounded-2xl border border-slate-600/50 group-hover:border-purple-500/50 transition-all duration-300">
              {/* 選択肢ラベル */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-blue-600 group-hover:to-purple-600 border border-slate-600 group-hover:border-purple-500 transition-all duration-300 shadow-lg">
                <span className="text-lg font-bold text-slate-300 group-hover:text-white-1 transition-colors duration-300">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>

              {/* 選択肢テキスト */}
              <span className="flex-1 text-lg font-medium text-white-1/90 group-hover:text-white-1 transition-colors duration-300">
                {option}
              </span>

              {/* 矢印アイコン */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                  <span className="text-white-1 text-xl">→</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
