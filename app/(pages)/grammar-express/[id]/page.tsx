"use client";

import DMATCloseButton from "@/components/elements/DMATCloseButton";
import {
  selectedGrammarState,
  grammarTestDataState,
} from "@/states/grammarTestDataState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const GrammarDetails = () => {
  const router = useRouter();

  const selectedGrammar = useRecoilValue(selectedGrammarState);
  const grammarList = useRecoilValue(grammarTestDataState);
  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);
  const [status, setStatus] = useState("unanswered");
  const [answer, setAnswer] = useState("");

  const handleClickAnswer = (option: string) => {
    setAnswer(option);
    setStatus("answered");
  };

  const handleClickClose = () => {
    router.back();
  };

  const handleNextQuestion = () => {
    if (!selectedGrammar || grammarList.length === 0) return;

    const currentIndex = grammarList.findIndex(
      (g) => g.grammar_id === selectedGrammar.grammar_id
    );

    if (currentIndex !== -1 && currentIndex < grammarList.length - 1) {
      const nextGrammar = grammarList[currentIndex + 1];
      setSelectedGrammar(nextGrammar);
      router.push(`/grammar-express/${nextGrammar.grammar_id}`);
      // ステートをリセット
      setStatus("unanswered");
      setAnswer("");
    }
  };

  const handlePreviousQuestion = () => {
    if (!selectedGrammar || grammarList.length === 0) return;

    const currentIndex = grammarList.findIndex(
      (g) => g.grammar_id === selectedGrammar.grammar_id
    );

    if (currentIndex > 0) {
      const prevGrammar = grammarList[currentIndex - 1];
      setSelectedGrammar(prevGrammar);
      router.push(`/grammar-express/${prevGrammar.grammar_id}`);
      // ステートをリセット
      setStatus("unanswered");
      setAnswer("");
    }
  };

  if (!selectedGrammar) {
    return <div className="text-white-1">No grammar selected</div>;
  }

  const currentIndex = grammarList.findIndex(
    (g) => g.grammar_id === selectedGrammar.grammar_id
  );
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === grammarList.length - 1;

  return (
    <div className="p-4 w-full h-full relative overflow-hidden">
      <DMATCloseButton handleClick={handleClickClose} />
      {status === "unanswered" && (
        <div className="flex flex-col h-full justify-between gap-6 overflow-auto">
          {/* 問題番号とナビゲーション */}
          <div className="flex items-start flex-col gap-2 justify-between mb-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
              <span className="text-xl font-bold text-white-1">
                Q.{selectedGrammar.grammar_id.slice(-2)}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {selectedGrammar.navigation}
            </div>
          </div>

          {/* 問題文カード */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-600/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  問題文
                </span>
              </div>
              <p className="text-lg text-white-1 leading-relaxed whitespace-pre-wrap">
                {selectedGrammar.sentence}
              </p>
            </div>

            {/* 選択肢 */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3">
                {selectedGrammar.options.map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleClickAnswer(option)}
                    className="group relative w-full text-left overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {/* グラデーション背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* ボーダーグロー効果 */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-400/50 transition-all duration-300" />

                    {/* コンテンツ */}
                    <div className="relative flex items-center gap-4 bg-slate-800/80 backdrop-blur-sm px-5 py-4 rounded-xl border border-slate-600/40 group-hover:border-indigo-500/50 transition-colors duration-300">
                      {/* 選択肢ラベル */}
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700/50 group-hover:bg-indigo-600/30 text-sm font-bold text-slate-300 group-hover:text-indigo-300 transition-all duration-300">
                        {String.fromCharCode(65 + i)}
                      </span>

                      {/* 選択肢テキスト */}
                      <span className="flex-1 text-base font-medium text-white-1 group-hover:text-indigo-100 transition-colors duration-300">
                        {option}
                      </span>

                      {/* ホバー時の矢印 */}
                      <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-indigo-400">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "answered" && (
        <div className="flex h-full py-4">
          <div className="flex flex-col h-full w-full gap-4 text-white-1 overflow-y-auto">
            {/* 正解/不正解バッジ */}
            <div className="flex items-center justify-center gap-3 pb-2">
              <span
                className={`text-2xl font-bold px-6 py-3 rounded-2xl shadow-lg ${
                  answer === selectedGrammar.answer
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white-1"
                    : "bg-gradient-to-r from-red-500 to-red-600 text-white-1"
                }`}
              >
                {answer === selectedGrammar.answer ? "✓ 正解!" : "✗ 不正解!"}
              </span>
            </div>

            {/* 正答表示 */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-500/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-300 text-sm font-semibold">
                  正答
                </span>
              </div>
              <span className="text-2xl font-bold text-yellow-300">
                {selectedGrammar.answer}
              </span>
            </div>

            {/* Strategy & Type カード */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
                <div className="text-xs text-purple-300 mb-1">戦略</div>
                <div className="text-base font-semibold text-white-1">
                  {selectedGrammar.strategy}
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-4">
                <div className="text-xs text-indigo-300 mb-1">タイプ</div>
                <div className="text-base font-semibold text-white-1">
                  {selectedGrammar.type}
                </div>
              </div>
            </div>

            {/* Description - 最も重要 */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-500/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-slate-200">
                  📖 解説
                </span>
              </div>
              <div className="space-y-2">
                {selectedGrammar.description.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="text-sm text-slate-100 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>
            </div>

            {/* Tips - 重要 */}
            <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/40 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-500/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-amber-200">
                  💡 Tips
                </span>
              </div>
              <p className="text-sm text-amber-50 leading-relaxed">
                {selectedGrammar.tips}
              </p>
            </div>

            {/* 例文と訳 */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-500/30 p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-semibold text-emerald-200">
                  回答
                </span>
              </div>
              <div className="text-sm text-emerald-50 leading-relaxed mb-3 whitespace-pre-wrap">
                {selectedGrammar.sentence.split(/(\s+|,|\.)/).map((part, i) => {
                  if (part === "-------") {
                    return (
                      <span
                        key={i}
                        className="font-bold text-yellow-300 underline decoration-2 underline-offset-2"
                      >
                        {selectedGrammar.answer}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
              <div className="border-t border-emerald-600/50 pt-3">
                <span className="text-xs text-emerald-300 font-semibold">
                  訳:
                </span>
                <p className="text-sm text-emerald-100 mt-1">
                  {selectedGrammar.sentence_meaning}
                </p>
              </div>
            </div>

            {/* Remarks - 折りたたみ可能 */}
            {selectedGrammar.remarks && (
              <details className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30 overflow-hidden">
                <summary className="cursor-pointer p-4 hover:bg-gray-700/30 transition-colors">
                  <span className="text-sm font-semibold text-gray-300">
                    📝 補足情報を表示
                  </span>
                </summary>
                <div className="px-4 pb-4 space-y-1">
                  {selectedGrammar.remarks.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className="text-xs text-gray-300 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </details>
            )}

            {/* ナビゲーションボタン */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handlePreviousQuestion}
                disabled={isFirstQuestion}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                  isFirstQuestion
                    ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                ← 前の問題
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={isLastQuestion}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                  isLastQuestion
                    ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                次の問題 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarDetails;
