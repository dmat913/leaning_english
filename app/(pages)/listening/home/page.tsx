"use client";
import { Background } from "@/components/aceternity/Background";
import { part3ListeningData } from "@/data/listening/listening";
import {
  listeningTestDataState,
  listeningTestStatusState,
  currentQuestionIndexState,
  userAnswersState,
  isTestCompletedState,
  showQuestionTextState,
  showSubQuestionJapaneseState,
} from "@/states/listeningTestDataState";
import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import NotStarted from "@/components/listening/NotStarted";
import ListeningTest from "@/components/listening/ListeningTest";
import ListeningResult from "@/components/listening/ListeningResult";

const ListeningPage = () => {
  const [testStatus, setTestStatus] = useRecoilState(listeningTestStatusState);
  const setTestData = useSetRecoilState(listeningTestDataState);
  const resetCurrentQuestionIndex = useResetRecoilState(
    currentQuestionIndexState
  );
  const resetUserAnswers = useResetRecoilState(userAnswersState);
  const resetIsTestCompleted = useResetRecoilState(isTestCompletedState);
  const resetShowQuestionText = useResetRecoilState(showQuestionTextState);
  const resetShowSubQuestionJapanese = useResetRecoilState(
    showSubQuestionJapaneseState
  );

  // ページロード時にデータをリセット
  useEffect(() => {
    resetCurrentQuestionIndex();
    resetUserAnswers();
    resetIsTestCompleted();
    resetShowQuestionText();
    resetShowSubQuestionJapanese();
  }, [
    resetCurrentQuestionIndex,
    resetUserAnswers,
    resetIsTestCompleted,
    resetShowQuestionText,
    resetShowSubQuestionJapanese,
  ]);

  // テストを開始
  const handleStartTest = useCallback(() => {
    // データから13問をランダムに選択
    const selectedData = getRandomQuestions(part3ListeningData, 13);
    setTestData(selectedData);
    setTestStatus("in_progress");
  }, [setTestData, setTestStatus]);

  // テストをリセット
  const handleResetTest = useCallback(() => {
    setTestStatus("not_started");
    resetCurrentQuestionIndex();
    resetUserAnswers();
    resetIsTestCompleted();
    resetShowQuestionText();
    resetShowSubQuestionJapanese();
  }, [
    setTestStatus,
    resetCurrentQuestionIndex,
    resetUserAnswers,
    resetIsTestCompleted,
    resetShowQuestionText,
    resetShowSubQuestionJapanese,
  ]);

  return (
    <Background>
      <div className="flex w-full h-full relative">
        {testStatus === "not_started" && (
          <NotStarted onStartTest={handleStartTest} />
        )}
        {testStatus === "in_progress" && (
          <ListeningTest onComplete={() => setTestStatus("completed")} />
        )}
        {testStatus === "completed" && (
          <ListeningResult onRestart={handleResetTest} />
        )}
      </div>
    </Background>
  );
};

// ランダムに指定数の問題を選択する関数
function getRandomQuestions<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

export default ListeningPage;
