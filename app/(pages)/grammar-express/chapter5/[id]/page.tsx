"use client";

import {
  selectedGrammarState,
  grammarTestDataState,
} from "@/states/grammarTestDataState";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userState } from "@/states/userState";
import { useUpdateCompleted } from "@/hooks/useUpdateCompleted";
import { useGrammarData } from "@/hooks/useGrammarData";
import { GrammarReadyModal } from "@/components/grammar-express/GrammarReadyModal";
import { Chapter5QuestionView } from "@/components/grammar-express/Chapter5QuestionView";
import { Chapter5AnswerView } from "@/components/grammar-express/Chapter5AnswerView";

const Chapter5Details = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  const selectedGrammar = useRecoilValue(selectedGrammarState);
  const [grammarList, setGrammarList] = useRecoilState(grammarTestDataState);
  const setSelectedGrammar = useSetRecoilState(selectedGrammarState);
  const [status, setStatus] = useState<"ready" | "unanswered" | "answered">(
    "ready"
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const category = "chapter5";
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

  // Chapter5用: 複数の回答を受け取る
  const handleClickAnswers = (selectedAnswers: string[]) => {
    // 経過時間を計算（秒単位）
    if (startTime) {
      const endTime = Date.now();
      const elapsed = Math.round((endTime - startTime) / 1000);
      setElapsedTime(elapsed);
    }
    setAnswers(selectedAnswers);
    setStatus("answered");
  };

  const handleBackToList = () => {
    router.push("/grammar-express/chapter5");
  };

  const handleNextQuestion = () => {
    if (!selectedGrammar || grammarList.length === 0) return;
    const currentIndex = grammarList.findIndex(
      (g) => g.grammar_id === selectedGrammar.grammar_id
    );
    if (currentIndex !== -1 && currentIndex < grammarList.length - 1) {
      const nextGrammar = grammarList[currentIndex + 1];
      setSelectedGrammar(nextGrammar);
      router.push(`/grammar-express/chapter5/${nextGrammar.grammar_id}`);
      setStatus("ready");
      setAnswers([]);
      setStartTime(null);
      setElapsedTime(0);
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
      router.push(`/grammar-express/chapter5/${prevGrammar.grammar_id}`);
      setStatus("ready");
      setAnswers([]);
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const handleClickStar = async (isCompleted: boolean) => {
    if (!user?._id || !selectedGrammar) return;
    const prevGrammarList = grammarList;
    const updatedGrammarList = grammarList.map((grammar: any) => {
      if (grammar.grammar_id === selectedGrammar.grammar_id) {
        return { ...grammar, isCompleted };
      }
      return grammar;
    });
    setGrammarList(updatedGrammarList);
    setSelectedGrammar({ ...selectedGrammar, isCompleted } as any);

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
    <div className="p-4 w-full h-full relative overflow-y-auto">
      <GrammarReadyModal
        isOpen={status === "ready"}
        grammarId={selectedGrammar.grammar_id}
        time={selectedGrammar.time || "制限なし"}
        onStart={() => {
          setStatus("unanswered");
          setStartTime(Date.now());
        }}
      />

      {status === "unanswered" && (
        <Chapter5QuestionView
          selectedGrammar={selectedGrammar}
          onAnswer={handleClickAnswers}
          onBackToList={handleBackToList}
        />
      )}

      {status === "answered" && (
        <Chapter5AnswerView
          selectedGrammar={selectedGrammar}
          answers={answers}
          elapsedTime={elapsedTime}
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

export default Chapter5Details;
