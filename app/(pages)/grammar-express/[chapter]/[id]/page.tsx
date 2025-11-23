"use client";

import {
  selectedGrammarState,
  grammarTestDataState,
} from "@/states/grammarTestDataState";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userState } from "@/states/userState";
import { useUpdateCompleted } from "@/hooks/useUpdateCompleted";
import { useGrammarData } from "@/hooks/useGrammarData";
import { GrammarReadyModal } from "@/components/grammar-express/GrammarReadyModal";
import { GrammarQuestionView } from "@/components/grammar-express/GrammarQuestionView";
import { GrammarAnswerView } from "@/components/grammar-express/GrammarAnswerView";

const GrammarDetails = () => {
  const router = useRouter();
  const params = useParams();
  const chapter = params.chapter as string;
  const user = useRecoilValue(userState);

  const selectedGrammar = useRecoilValue(selectedGrammarState);
  const [grammarList, setGrammarList] = useRecoilState(grammarTestDataState);
  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);
  const [status, setStatus] = useState<"ready" | "unanswered" | "answered">(
    "ready"
  );
  const [answer, setAnswer] = useState("");

  const category = chapter;
  const updateCompletedMutation = useUpdateCompleted(user?.name, category);
  const { data: cachedGrammars } = useGrammarData(user?.name, category);

  useEffect(() => {
    if (cachedGrammars && cachedGrammars.length > 0) {
      setGrammarList(cachedGrammars);
      if (selectedGrammar) {
        const updatedGrammar = cachedGrammars.find(
          (g) => g.grammar_id === selectedGrammar.grammar_id
        );
        if (updatedGrammar) {
          setSelectedGrammar(updatedGrammar);
        }
      }
    }
  }, [cachedGrammars, setGrammarList, setSelectedGrammar, selectedGrammar]);

  const isLoading = updateCompletedMutation.isPending;

  const handleClickAnswer = (option: string) => {
    setAnswer(option);
    setStatus("answered");
  };

  const handleBackToList = () => {
    router.push(`/grammar-express/${chapter}`);
  };

  const handleNextQuestion = () => {
    if (!selectedGrammar || grammarList.length === 0) return;
    const currentIndex = grammarList.findIndex(
      (g) => g.grammar_id === selectedGrammar.grammar_id
    );
    if (currentIndex !== -1 && currentIndex < grammarList.length - 1) {
      const nextGrammar = grammarList[currentIndex + 1];
      setSelectedGrammar(nextGrammar);
      router.push(`/grammar-express/${chapter}/${nextGrammar.grammar_id}`);
      setStatus("ready");
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
      router.push(`/grammar-express/${chapter}/${prevGrammar.grammar_id}`);
      setStatus("ready");
      setAnswer("");
    }
  };

  const handleClickStar = async (isCompleted: boolean) => {
    if (!user?._id || !selectedGrammar) return;
    const prevGrammarList = grammarList;
    const updatedGrammarList = grammarList.map((grammar) => {
      if (grammar.grammar_id === selectedGrammar.grammar_id) {
        return { ...grammar, isCompleted };
      }
      return grammar;
    });
    setGrammarList(updatedGrammarList);
    setSelectedGrammar({ ...selectedGrammar, isCompleted });

    try {
      await updateCompletedMutation.mutateAsync({
        userId: user._id,
        grammar_id: selectedGrammar.grammar_id,
        isCompleted: isCompleted,
        category: category,
      });
    } catch (error) {
      setGrammarList(prevGrammarList);
      setSelectedGrammar(selectedGrammar);
      alert("更新失敗");
      console.error("Failed to update completion status:", error);
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
      <GrammarReadyModal
        isOpen={status === "ready"}
        grammarId={selectedGrammar.grammar_id}
        time={selectedGrammar.time || "制限なし"}
        navigation={selectedGrammar.navigation}
        onStart={() => setStatus("unanswered")}
      />

      {status === "unanswered" && (
        <GrammarQuestionView
          selectedGrammar={selectedGrammar}
          onAnswer={handleClickAnswer}
        />
      )}

      {status === "answered" && (
        <GrammarAnswerView
          selectedGrammar={selectedGrammar}
          answer={answer}
          isLoading={isLoading}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          onStarClick={handleClickStar}
          onPreviousQuestion={handlePreviousQuestion}
          onNextQuestion={handleNextQuestion}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
};

export default GrammarDetails;
