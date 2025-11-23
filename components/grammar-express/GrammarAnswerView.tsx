"use client";

import { motion } from "framer-motion";
import DMATLoading from "@/components/elements/DMATLoading";
import {
  MdStar,
  MdStarBorder,
  MdArrowBack,
  MdArrowForward,
  MdList,
} from "react-icons/md";
import { GrammarExpress } from "@/models/grammarExpressModel";
import useAudio from "@/hooks/useAudio";

interface GrammarAnswerViewProps {
  selectedGrammar: GrammarExpress;
  answer: string;
  isLoading: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onStarClick: (isCompleted: boolean) => void;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onBackToList: () => void;
}

export const GrammarAnswerView = ({
  selectedGrammar,
  answer,
  isLoading,
  isFirstQuestion,
  isLastQuestion,
  onStarClick,
  onPreviousQuestion,
  onNextQuestion,
  onBackToList,
}: GrammarAnswerViewProps) => {
  const { playInterrupt } = useAudio();
  const isCorrect = answer.includes(selectedGrammar.answer);

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full w-full gap-5 text-white-1 overflow-y-auto pb-4">
        {/* 結果ヘッダー */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-between gap-3"
        >
          <div className="flex-1 relative h-14">
            <div
              className={`absolute inset-0 blur-xl opacity-60 ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <div
              className={`relative flex items-center justify-center gap-3 h-full px-6 rounded-2xl font-bold text-2xl border-2 shadow-xl ${
                isCorrect
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white-1"
                  : "bg-gradient-to-r from-red-600 to-rose-600 border-red-400 text-white-1"
              }`}
            >
              <span className="text-xl">{isCorrect ? "✓" : "✗"}</span>
              <span>{isCorrect ? "正解！" : "不正解"}</span>
            </div>
          </div>

          {/* 星マークボタン */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
            onClick={() => onStarClick(!selectedGrammar.isCompleted)}
            className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 flex items-center justify-center hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <DMATLoading otherClass="h-6 w-6" />
            ) : (
              <>
                {selectedGrammar.isCompleted ? (
                  <MdStar size={28} className="text-yellow-400" />
                ) : (
                  <MdStarBorder size={28} className="text-yellow-400" />
                )}
              </>
            )}
          </motion.button>
        </motion.div>
        {/* 正答と回答例 - 最優先情報 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-blue-500/30 p-6 shadow-2xl">
            {/* 正答 */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <span className="text-sm font-bold text-blue-300 uppercase tracking-wider">
                  Correct Answer
                </span>
              </div>
              <div className="inline-block px-5 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl">
                <span className="text-2xl font-bold text-yellow-300">
                  {selectedGrammar.answer}
                </span>
              </div>
            </div>

            {/* 回答例 */}
            <div className="border-t border-slate-700/50 pt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                <span className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  Example
                </span>
              </div>
              <p className="text-base text-white-1 leading-relaxed mb-4 whitespace-pre-wrap">
                {selectedGrammar.sentence.split(/(\s+|,|\.)/).map((part, i) => {
                  if (part === "-------") {
                    return (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 mx-1 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border border-yellow-500/50 rounded-lg font-bold text-yellow-300"
                      >
                        {selectedGrammar.answer}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>
              <div className="flex items-start gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <span className="text-xs text-slate-400 font-semibold mt-0.5">
                  訳:
                </span>
                <p className="flex-1 text-sm text-slate-200 leading-relaxed">
                  {selectedGrammar.sentence_meaning}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Strategy & Type */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-purple-900/60 to-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-500/40 p-5 hover:border-purple-400/60 transition-all duration-300">
              <div className="text-xs text-purple-300 mb-2 font-semibold">
                戦略
              </div>
              <div className="text-base font-bold text-white-1">
                {selectedGrammar.strategy}
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-indigo-900/60 to-indigo-800/60 backdrop-blur-sm rounded-2xl border border-indigo-500/40 p-5 hover:border-indigo-400/60 transition-all duration-300">
              <div className="text-xs text-indigo-300 mb-2 font-semibold">
                タイプ
              </div>
              <div className="text-base font-bold text-white-1">
                {selectedGrammar.type}
              </div>
            </div>
          </div>
        </motion.div>
        {/* 解説 - 重要 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <span className="text-xl">📖</span>
              </div>
              <span className="text-lg font-bold text-purple-200">解説</span>
            </div>
            <div className="space-y-3 pl-2">
              {selectedGrammar.description.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-sm text-slate-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        {/* Remarks - 補足情報 */}
        {selectedGrammar.remarks && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                <span className="text-lg">📝</span>
              </div>
              <span className="text-base font-bold text-cyan-200">
                補足情報
              </span>
            </div>
            <div className="space-y-2 pl-2">
              {selectedGrammar.remarks.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-sm text-cyan-50 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>
          </motion.div>
        )}{" "}
        {/* Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/30 p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
              <span className="text-lg">💡</span>
            </div>
            <span className="text-base font-bold text-amber-200">Tips</span>
          </div>
          <div className="space-y-2 pl-2">
            {selectedGrammar.tips.split("\n").map((line, i) => (
              <p
                key={i}
                className="text-sm text-amber-50 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        </motion.div>
        {/* ナビゲーションボタン */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 pt-2"
        >
          <button
            onClick={() => {
              playInterrupt();
              onPreviousQuestion();
            }}
            disabled={isFirstQuestion}
            className={`group relative flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
              isFirstQuestion
                ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50"
                : "bg-gradient-to-r from-slate-700 to-slate-800 text-white-1 hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
            }`}
          >
            {!isFirstQuestion && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-blue-400/0 group-hover:border-blue-400/50 rounded-2xl transition-all duration-300" />
              </>
            )}
            <span className="relative flex items-center justify-center gap-2">
              <MdArrowBack
                size={20}
                className={`transition-transform duration-300 ${
                  !isFirstQuestion && "group-hover:-translate-x-1"
                }`}
              />
              <span>前の問題</span>
            </span>
          </button>

          <button
            onClick={() => {
              playInterrupt();
              onNextQuestion();
            }}
            disabled={isLastQuestion}
            className={`group relative flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
              isLastQuestion
                ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white-1 hover:scale-[1.02] active:scale-[0.98] border border-emerald-500"
            }`}
          >
            {!isLastQuestion && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-400/50 rounded-2xl transition-all duration-300" />
              </>
            )}
            <span className="relative flex items-center justify-center gap-2">
              <span>次の問題</span>
              <MdArrowForward
                size={20}
                className={`transition-transform duration-300 ${
                  !isLastQuestion && "group-hover:translate-x-1"
                }`}
              />
            </span>
          </button>
        </motion.div>
        {/* 一覧に戻るボタン */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-2"
        >
          <button
            onClick={() => {
              playInterrupt();
              onBackToList();
            }}
            className="group relative w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 text-white-1 hover:scale-[1.02] active:scale-[0.98] border-2 border-violet-500 shadow-lg shadow-violet-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 border-2 border-violet-400/0 group-hover:border-violet-400/50 rounded-2xl transition-all duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <MdList
                size={22}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>一覧に戻る</span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
