"use client";

import DMATCloseButton from "@/components/elements/DMATCloseButton";
import { PATHS } from "@/lib/paths";
import { selectedGrammarState } from "@/states/grammarTestDataState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const GrammarDetails = () => {
  const router = useRouter();

  const selectedGrammar = useRecoilValue(selectedGrammarState);
  const [status, setStatus] = useState("unanswered");
  const [answer, setAnswer] = useState("");

  const handleClickAnswer = (option: string) => {
    setAnswer(option);
    setStatus("answered");
  };

  const handleClickClose = () => {
    router.push(PATHS.GRAMMAR_EXPRESS_HOME);
  };

  if (!selectedGrammar) {
    return <div className="text-white-1">No grammar selected</div>;
  }

  return (
    <div className="p-4 w-full h-full relative overflow-hidden">
      <DMATCloseButton handleClick={handleClickClose} />
      {status === "unanswered" && (
        <div className="flex flex-col py-16 h-full justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-white-1">
              {`${selectedGrammar.grammar_id.slice(-2)}. ${
                selectedGrammar.sentence
              }`}
            </span>
            <div className="flex flex-col gap-1">
              {selectedGrammar.options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClickAnswer(option)}
                  className="w-full text-left text-white-1 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 border border-transparent hover:border-gray-600 rounded-md px-4 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <span className="text-white-1 border border-gray-50 rounded p-2">
            {selectedGrammar.navigation}
          </span>
        </div>
      )}
      {status === "answered" && (
        <div className="flex h-full">
          <div className="flex flex-col h-full gap-2 text-white-1 bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <span
                className={`text-lg shrink-0 font-bold px-3 py-1 rounded-full ${
                  answer === selectedGrammar.answer
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {answer === selectedGrammar.answer ? "正解!" : "不正解!"}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-300">
                  <span className="font-semibold">{selectedGrammar.type}</span>
                </span>
                <span className="text-xs text-gray-300">
                  <span className="font-semibold">
                    {selectedGrammar.strategy}
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-gray-800 flex-1 overflow-y-auto rounded-lg p-3">
              {selectedGrammar.description.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-sm text-gray-100 leading-relaxed mb-1"
                >
                  {line}
                </span>
              ))}
            </div>
            {selectedGrammar.remarks && (
              <div className="bg-gray-700 rounded-lg p-3">
                {selectedGrammar.remarks.split("\n").map((line, i) => (
                  <span
                    key={i}
                    className="block text-xs text-gray-300 leading-relaxed mb-1"
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {/* <span className="block text-xs text-indigo-200 font-semibold mb-1">
                {selectedGrammar.sentence}
              </span> */}
              <span className="block text-xs text-yellow-200">
                訳: {selectedGrammar.sentence_meaning}
              </span>
            </div>
            <div className="text-sm flex flex-col gap-1 text-blue-300">
              <div className="border w-16 inline-flex rounded-full py-1 px-3">
                Tips!
              </div>
              <span>{selectedGrammar.tips}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarDetails;
