"use client";
import GrammarLoader from "@/components/common/GrammarLoader";
import { GrammarExpress } from "@/models/grammarExpressModel";
import {
  grammarTestDataState,
  selectedGrammarState,
} from "@/states/grammarTestDataState";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

const Chapter1 = () => {
  const router = useRouter();

  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);

  const handleClick = (grammar: GrammarExpress) => {
    setSelectedGrammar(grammar);
    router.push(`/grammar-express/${grammar.grammar_id}`);
  };

  return (
    <GrammarLoader category="chapter1" dataState={grammarTestDataState}>
      {(grammars) => (
        <div className="flex flex-col h-full p-2 overflow-y-auto gap-3">
          {grammars.map((grammar) => (
            <div
              key={grammar.grammar_id}
              className="cursor-pointer text-white-1 text-base font-semibold tracking-wide bg-gradient-to-br  from-gray-900 via-indigo-900 to-gray-800 border border-gray-700 rounded-xl shadow-md p-4 hover:scale-[1.02] transition-transform duration-150"
              onClick={() => handleClick(grammar)}
            >
              <span>
                {grammar.grammar_id.slice(-2)}.{grammar.navigation}
              </span>
            </div>
          ))}
        </div>
      )}
    </GrammarLoader>
  );
};

export default Chapter1;
