import { motion } from "framer-motion";
import {
  listeningTestDataState,
  userAnswersState,
} from "@/states/listeningTestDataState";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import { MdCheckCircle, MdCancel, MdRefresh } from "react-icons/md";
import { cn } from "@/lib/utils";

interface ListeningResultProps {
  onRestart: () => void;
}

const ListeningResult = ({ onRestart }: ListeningResultProps) => {
  const testData = useRecoilValue(listeningTestDataState);
  const userAnswers = useRecoilValue(userAnswersState);

  // 正解数を計算
  const results = useMemo(() => {
    let correct = 0;
    let total = 0;

    testData.forEach((question, questionIndex) => {
      question.questions.forEach((subQuestion, subQuestionIndex) => {
        total++;
        const userAnswer = userAnswers.find(
          (a) =>
            a.questionIndex === questionIndex &&
            a.subQuestionIndex === subQuestionIndex
        );

        if (userAnswer && userAnswer.answer === subQuestion.answer) {
          correct++;
        }
      });
    });

    return {
      correct,
      total,
      percentage: (correct / total) * 100,
    };
  }, [testData, userAnswers]);

  // 詳細な結果を取得
  const detailedResults = useMemo(() => {
    return testData.map((question, questionIndex) => {
      return {
        question,
        answers: question.questions.map((subQuestion, subQuestionIndex) => {
          const userAnswer = userAnswers.find(
            (a) =>
              a.questionIndex === questionIndex &&
              a.subQuestionIndex === subQuestionIndex
          );

          return {
            subQuestion,
            userAnswer: userAnswer?.answer || "未回答",
            correctAnswer: subQuestion.answer,
            isCorrect: userAnswer?.answer === subQuestion.answer,
          };
        }),
      };
    });
  }, [testData, userAnswers]);

  const getScoreColor = () => {
    if (results.percentage >= 80) return "text-green-400";
    if (results.percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = () => {
    if (results.percentage >= 80) return "素晴らしい！";
    if (results.percentage >= 60) return "良くできました！";
    return "もう一度頑張りましょう！";
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        {/* スコアサマリー */}
        <div className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white-1/20 text-center">
          <h1 className="text-3xl font-bold text-white-1 mb-4">テスト結果</h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className={cn("text-7xl font-bold mb-2", getScoreColor())}>
              {results.correct}/{results.total}
            </div>
            <div className="text-2xl text-white-1/80">
              {results.percentage.toFixed(1)}%
            </div>
          </motion.div>

          <p className="text-xl text-white-1 mb-4">{getScoreMessage()}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 hover:shadow-xl mx-auto"
          >
            <MdRefresh size={28} />
            もう一度挑戦する
          </motion.button>
        </div>

        {/* 詳細な結果 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white-1 mb-4">詳細結果</h2>

          {detailedResults.map((result, questionIndex) => (
            <div
              key={questionIndex}
              className="bg-white-1/10 backdrop-blur-sm rounded-2xl p-6 border border-white-1/20"
            >
              <h3 className="text-xl font-semibold text-white-1 mb-4">
                会話 {questionIndex + 1}
              </h3>

              {/* 会話文 */}
              <div className="bg-white-1/5 rounded-lg p-4 mb-4">
                <p className="text-white-1/90 text-sm leading-relaxed mb-2">
                  {result.question.questionEnglishText}
                </p>
                <p className="text-white-1/70 text-xs">
                  {result.question.questionJapaneseText}
                </p>
              </div>

              {/* 各質問の結果 */}
              <div className="space-y-4">
                {result.answers.map((answer, subIndex) => (
                  <div
                    key={subIndex}
                    className={cn(
                      "p-4 rounded-lg border-2",
                      answer.isCorrect
                        ? "border-green-400 bg-green-400/10"
                        : "border-red-400 bg-red-400/10"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {answer.isCorrect ? (
                        <MdCheckCircle
                          className="text-green-400 flex-shrink-0 mt-1"
                          size={24}
                        />
                      ) : (
                        <MdCancel
                          className="text-red-400 flex-shrink-0 mt-1"
                          size={24}
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-white-1 font-medium mb-1">
                          {answer.subQuestion.questionEnglishText}
                        </p>
                        <p className="text-white-1/70 text-sm">
                          {answer.subQuestion.questionJapaneseText}
                        </p>
                      </div>
                    </div>

                    <div className="ml-9 space-y-2">
                      {!answer.isCorrect && (
                        <div className="flex gap-2">
                          <span className="text-red-400 font-medium">
                            あなたの回答:
                          </span>
                          <span className="text-white-1">
                            {answer.userAnswer}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <span className="text-green-400 font-medium">
                          正解:
                        </span>
                        <span className="text-white-1">
                          {answer.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ListeningResult;
