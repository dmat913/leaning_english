"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GrammarExpress } from "@/models/grammarExpressModel";
import { useState } from "react";
import {
  MdStar,
  MdStarBorder,
  MdArrowBack,
  MdArrowForward,
  MdList,
  MdClose,
} from "react-icons/md";
import DMATLoading from "@/components/elements/DMATLoading";
import useAudio from "@/hooks/useAudio";

interface Chapter5AnswerViewProps {
  selectedGrammar: GrammarExpress;
  answers: string[];
  elapsedTime: number;
  isLoading: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onStarClick: (isCompleted: boolean) => void;
  onPreviousQuestion: () => void;
  onNextQuestion: () => void;
  onBackToList: () => void;
}

export const Chapter5AnswerView = ({
  selectedGrammar,
  answers,
  elapsedTime,
  isLoading,
  isFirstQuestion,
  isLastQuestion,
  onStarClick,
  onPreviousQuestion,
  onNextQuestion,
  onBackToList,
}: Chapter5AnswerViewProps) => {
  const { playInterrupt } = useAudio();
  const [selectedBlankIndex, setSelectedBlankIndex] = useState<number | null>(
    null
  );

  // 経過時間を「分:秒」形式でフォーマット
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 各空欄の正誤判定
  const results = answers.map((answer, index) => ({
    answer,
    correctAnswer: selectedGrammar.answer[index],
    isCorrect: selectedGrammar.answer[index].includes(answer),
    strategy: selectedGrammar.strategy[index],
    type: selectedGrammar.type[index],
    description: selectedGrammar.description[index],
    remarks: selectedGrammar.remarks[index],
  }));

  // 正解数
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;

  const handleOpenModal = (index: number) => {
    setSelectedBlankIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedBlankIndex(null);
  };

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
                correctCount === totalCount ? "bg-green-500" : "bg-blue-500"
              }`}
            />
            <div
              className={`relative flex items-center justify-center gap-3 h-full px-6 rounded-2xl font-bold text-2xl border-2 shadow-xl ${
                correctCount === totalCount
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white-1"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white-1"
              }`}
            >
              <span className="text-xl">
                {correctCount === totalCount ? "🎉" : "📝"}
              </span>
              <span>
                {correctCount} / {totalCount} 正解
              </span>
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
                {(selectedGrammar as any).isCompleted ? (
                  <MdStar size={28} className="text-yellow-400" />
                ) : (
                  <MdStarBorder size={28} className="text-yellow-400" />
                )}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* 経過時間表示 */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="relative flex items-center justify-center gap-3 h-12 px-6 rounded-2xl font-bold text-lg border-2 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 border-cyan-400/50 text-white-1 shadow-xl backdrop-blur-sm">
            <span className="text-xl">⏱️</span>
            <span>解答時間: {formatTime(elapsedTime)}</span>
          </div>
        </motion.div>

        {/* 各空欄の結果カード */}
        <div className="grid grid-cols-1 gap-4">
          {results.map((result, index) => (
            <motion.button
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => handleOpenModal(index)}
              className="group relative text-left overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {/* グロー効果 */}
              <div
                className={`absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
                  result.isCorrect
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-red-500 to-rose-500"
                }`}
              />

              {/* コンテンツ */}
              <div
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  result.isCorrect
                    ? "bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/50 group-hover:border-green-400"
                    : "bg-gradient-to-br from-red-900/40 to-rose-900/40 border-red-500/50 group-hover:border-red-400"
                }`}
              >
                <div className="space-y-4">
                  {/* ヘッダー部分 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-lg ${
                            result.isCorrect
                              ? "bg-green-500/30 text-green-200"
                              : "bg-red-500/30 text-red-200"
                          }`}
                        >
                          空欄 ({index + 1})
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            result.isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {result.isCorrect ? "✓ 正解" : "✗ 不正解"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-base text-slate-300">
                          あなたの回答:{" "}
                          <span className="font-bold text-white-1">
                            {result.answer}
                          </span>
                        </p>
                        <p className="text-base text-slate-300">
                          正解:{" "}
                          <span className="font-bold text-yellow-300">
                            {result.correctAnswer}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* 詳細を見るアイコン */}
                    <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        <span className="text-white-1 text-lg">👁️</span>
                      </div>
                    </div>
                  </div>

                  {/* 戦略とタイプ */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-600/50">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold">
                        戦略
                      </p>
                      <p className="text-sm font-bold text-purple-300">
                        {result.strategy}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold">
                        タイプ
                      </p>
                      <p className="text-sm font-bold text-indigo-300">
                        {result.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* 問題文と和訳 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 backdrop-blur-sm space-y-4"
        >
          <div className="space-y-2">
            <p className="text-sm text-slate-400 font-semibold flex items-center gap-2">
              <span className="text-lg">📝</span>
              問題文
            </p>
            <p className="text-base text-slate-200 leading-relaxed whitespace-pre-line">
              {selectedGrammar.sentence}
            </p>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-700/50">
            <p className="text-sm text-slate-400 font-semibold flex items-center gap-2">
              <span className="text-lg">🇯🇵</span>
              和訳
            </p>
            <p
              className="text-base text-slate-300 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: selectedGrammar.sentence_meaning,
              }}
            />
          </div>

          {/* Related Words */}
          {selectedGrammar.relatedWords && (
            <div className="space-y-2 pt-2 border-t border-slate-700/50">
              <p className="text-sm text-slate-400 font-semibold flex items-center gap-2">
                <span className="text-lg">🔗</span>
                語彙
              </p>
              <p
                className="text-base text-slate-300 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: selectedGrammar.relatedWords,
                }}
              />
            </div>
          )}
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

        {/* 詳細モーダル */}
        <AnimatePresence>
          {selectedBlankIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 背景のグラデーション効果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

                {/* コンテンツ */}
                <div className="relative p-8 space-y-6">
                  {/* ヘッダー */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                          results[selectedBlankIndex].isCorrect
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-gradient-to-br from-red-500 to-rose-600"
                        }`}
                      >
                        <span className="text-2xl font-bold text-white-1">
                          {selectedBlankIndex + 1}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white-1">
                          解説
                        </h2>
                        <p
                          className={`text-sm font-bold ${
                            results[selectedBlankIndex].isCorrect
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {results[selectedBlankIndex].isCorrect
                            ? "✓ 正解です！"
                            : "✗ 不正解"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
                    >
                      <MdClose size={24} className="text-slate-300" />
                    </button>
                  </div>

                  {/* 正答 */}
                  <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-blue-500/30 p-6 shadow-2xl">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                        <span className="text-sm font-bold text-blue-300 uppercase tracking-wider">
                          Correct Answer
                        </span>
                      </div>
                      <div className="inline-block px-5 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl">
                        <span className="text-2xl font-bold text-yellow-300">
                          {results[selectedBlankIndex].correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Strategy & Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                      <div className="relative bg-gradient-to-br from-purple-900/60 to-purple-800/60 backdrop-blur-sm rounded-2xl border border-purple-500/40 p-5 hover:border-purple-400/60 transition-all duration-300">
                        <div className="text-xs text-purple-300 mb-2 font-semibold">
                          戦略
                        </div>
                        <div className="text-base font-bold text-white-1">
                          {results[selectedBlankIndex].strategy}
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
                          {results[selectedBlankIndex].type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 解説 */}
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <span className="text-xl">📖</span>
                      </div>
                      <span className="text-lg font-bold text-purple-200">
                        解説
                      </span>
                    </div>
                    <div className="space-y-3 pl-2">
                      {results[selectedBlankIndex].description
                        ?.split("\n")
                        .map((line, i) => (
                          <p
                            key={i}
                            className="text-sm text-slate-100 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: line }}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Remarks */}
                  {results[selectedBlankIndex].remarks && (
                    <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg">
                          <span className="text-lg">📝</span>
                        </div>
                        <span className="text-base font-bold text-cyan-200">
                          補足情報
                        </span>
                      </div>
                      <div className="space-y-2 pl-2">
                        {results[selectedBlankIndex].remarks
                          ?.split("\n")
                          .map((line, i) => (
                            <p
                              key={i}
                              className="text-sm text-cyan-50 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: line }}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
