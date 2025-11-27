"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GrammarTimer } from "./GrammarTimer";
import { GrammarExpress } from "@/models/grammarExpressModel";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface Chapter5QuestionViewProps {
  selectedGrammar: GrammarExpress;
  onAnswer: (answers: string[]) => void;
  onBackToList: () => void;
}

export const Chapter5QuestionView = ({
  selectedGrammar,
  onAnswer,
  onBackToList,
}: Chapter5QuestionViewProps) => {
  const totalBlanks = selectedGrammar.options.length; // 4

  // 問題文から実際の問題番号を抽出
  const questionNumbers =
    selectedGrammar.sentence
      .match(/\((\d+)\)-------/g)
      ?.map((match) => parseInt(match.match(/\d+/)?.[0] || "0"))
      .filter((num) => num > 0) || [];

  // 各空欄の回答を管理（空欄の数だけ初期化）
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(totalBlanks).fill(null)
  );

  // モーダル表示制御
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBlankIndex, setModalBlankIndex] = useState<number | null>(null);

  // 空欄ボタンをクリック
  const handleBlankClick = (blankIndex: number) => {
    setModalBlankIndex(blankIndex);
    setIsModalOpen(true);
  };

  // モーダルで選択肢を選択
  const handleSelectOption = (option: string) => {
    if (modalBlankIndex !== null) {
      const newAnswers = [...selectedAnswers];
      newAnswers[modalBlankIndex] = option;
      setSelectedAnswers(newAnswers);
      setIsModalOpen(false);
      setModalBlankIndex(null);
    }
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalBlankIndex(null);
  };

  // 全て回答済みかチェック
  const allAnswered = selectedAnswers.every((ans) => ans !== null);

  // 回答を確定
  const handleSubmit = () => {
    if (allAnswered) {
      onAnswer(selectedAnswers as string[]);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 overflow-y-auto overflow-x-hidden pb-4">
      {/* ヘッダー部分 */}
      <div className="flex flex-col items-center justify-between gap-4">
        {/* 問題番号と空欄進捗 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50" />
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 rounded-2xl border border-blue-400/30 shadow-xl">
              <span className="text-2xl font-bold text-white-1">
                Q.{selectedGrammar.grammar_id.slice(-2)}
              </span>
            </div>
          </div>

          {/* 空欄進捗インジケーター */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalBlanks }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleBlankClick(index)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 hover:scale-105 ${
                  selectedAnswers[index] !== null
                    ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white-1 cursor-pointer"
                    : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 cursor-pointer"
                }`}
              >
                {questionNumbers[index] || index + 1}
              </button>
            ))}
          </div>
        </motion.div>

        {/* タイマー */}
        {selectedGrammar.time && (
          <GrammarTimer timeText={selectedGrammar.time} />
        )}
      </div>

      {/* 長文問題カード */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-600/50 p-4 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <span className="text-sm font-bold text-blue-300 tracking-wider">
              {selectedGrammar.navigation}
            </span>
          </div>

          {/* 長文を表示（空欄をボタン化） */}
          <div className="text-sm sm:text-lg text-white-1 leading-relaxed whitespace-pre-wrap font-medium break-words max-w-full">
            {selectedGrammar.sentence
              .split(/(\(\d+\)-------|-------)/g)
              .map((part, i) => {
                // 空欄パターンをチェック
                const blankMatch = part.match(/\((\d+)\)-------/);
                if (blankMatch) {
                  const displayNum = parseInt(blankMatch[1]); // 表示用の番号 (1-4, 5-8, など)
                  // 配列のインデックスを計算: (1,2,3,4) → (0,1,2,3), (5,6,7,8) → (0,1,2,3)
                  const arrayIndex = (displayNum - 1) % 4;
                  const isAnswered = selectedAnswers[arrayIndex] !== null;

                  return (
                    <button
                      key={i}
                      onClick={() => handleBlankClick(arrayIndex)}
                      className={`inline-block px-2 py-1 mx-1 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 cursor-pointer ${
                        isAnswered
                          ? "bg-gradient-to-r from-green-500/40 to-emerald-500/40 border-2 border-green-400 text-green-200 hover:border-green-300"
                          : "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-400/50 text-blue-200 hover:border-blue-300 animate-pulse"
                      }`}
                    >
                      ({displayNum})
                      {isAnswered
                        ? ` ${selectedAnswers[arrayIndex]}`
                        : "-------"}
                    </button>
                  );
                }
                if (part === "-------") {
                  return (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 mx-1 bg-slate-600/50 border border-slate-500/50 rounded-lg text-slate-300"
                    >
                      ___
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
          </div>
        </div>
      </motion.div>

      {/* 回答確定ボタン */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-2"
      >
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
            !allAnswered
              ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50"
              : "bg-gradient-to-r from-green-600 to-emerald-600 text-white-1 hover:scale-[1.02] active:scale-[0.98] border-2 border-green-500 shadow-lg shadow-green-500/30"
          }`}
        >
          {allAnswered
            ? "回答を確定する ✓"
            : `未回答の空欄があります (${
                selectedAnswers.filter((a) => a === null).length
              }個)`}
        </button>
      </motion.div>

      {/* 一覧に戻るボタン */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="pt-2"
      >
        <button
          onClick={onBackToList}
          className="group relative w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 text-white-1 hover:scale-[1.02] active:scale-[0.98] border-2 border-violet-500 shadow-lg shadow-violet-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 border-2 border-violet-400/0 group-hover:border-violet-400/50 rounded-2xl transition-all duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <span className="text-lg">📋</span>
            <span>一覧に戻る</span>
          </span>
        </button>
      </motion.div>

      {/* 選択肢モーダル */}
      <AnimatePresence>
        {isModalOpen && modalBlankIndex !== null && (
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
              className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 背景のグラデーション効果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

              {/* コンテンツ */}
              <div className="relative py-8 px-4 space-y-6">
                {/* ヘッダー */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white-1">
                        {modalBlankIndex + 1}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-colors"
                  >
                    <MdClose size={24} className="text-slate-300" />
                  </button>
                </div>

                {/* 選択肢 */}
                <div className="space-y-3">
                  {selectedGrammar.options[modalBlankIndex]?.map(
                    (option, i) => {
                      const isSelected =
                        selectedAnswers[modalBlankIndex] === option;

                      return (
                        <motion.button
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          type="button"
                          onClick={() => handleSelectOption(option)}
                          className={`group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                            isSelected ? "ring-2 ring-amber-400" : ""
                          }`}
                        >
                          {/* ホバー時・選択時のグラデーション */}
                          <div
                            className={`absolute inset-0 transition-opacity duration-300 ${
                              isSelected
                                ? "bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 opacity-100"
                                : "bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100"
                            }`}
                          />

                          {/* グロー効果 */}
                          <div
                            className={`absolute inset-0 rounded-2xl blur-lg transition-opacity duration-300 ${
                              isSelected
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 opacity-40"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30"
                            }`}
                          />

                          {/* コンテンツ */}
                          <div
                            className={`relative flex items-center gap-5 backdrop-blur-sm px-4 py-5 rounded-2xl border transition-all duration-300 ${
                              isSelected
                                ? "bg-gradient-to-r from-amber-800/80 to-orange-800/80 border-amber-500"
                                : "bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-slate-600/50 group-hover:border-purple-500/50"
                            }`}
                          >
                            {/* 選択肢ラベル */}
                            <div
                              className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 shadow-lg ${
                                isSelected
                                  ? "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400"
                                  : "bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-blue-600 group-hover:to-purple-600 border-slate-600 group-hover:border-purple-500"
                              }`}
                            >
                              <span
                                className={`text-lg font-bold transition-colors duration-300 ${
                                  isSelected
                                    ? "text-white-1"
                                    : "text-slate-300 group-hover:text-white-1"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}
                              </span>
                            </div>

                            {/* 選択肢テキスト */}
                            <span
                              className={`flex-1 text-lg font-medium transition-colors duration-300 break-words ${
                                isSelected
                                  ? "text-white-1"
                                  : "text-white-1/90 group-hover:text-white-1"
                              }`}
                            >
                              {option}
                            </span>

                            {/* チェックマーク or 矢印 */}
                            {/* <div
                              className={`flex-shrink-0 absolute top-1/2 translate-y-[-50%] right-2 transition-all duration-300 ${
                                isSelected
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                                  isSelected
                                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                    : "bg-gradient-to-br from-blue-500 to-purple-500"
                                }`}
                              >
                                <span className="text-white-1 text-xl">
                                  {isSelected ? "✓" : "→"}
                                </span>
                              </div>
                            </div> */}
                          </div>
                        </motion.button>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
