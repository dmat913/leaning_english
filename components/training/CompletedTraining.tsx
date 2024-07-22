import DMATButton from "@/components/elements/DMATButton";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TrainingResultState, testDataState } from "@/states/trainingState";

Chart.register(...registerables);

const CompletedTraining = ({
  handleChangeStatus,
}: {
  handleChangeStatus: (status: Status) => void;
}) => {
  const router = useRouter();

  const setTestData = useSetRecoilState(testDataState);

  // Training結果
  const [trainingResult, setTrainingResult] =
    useRecoilState(TrainingResultState);

  //正解データ
  const correctData = useMemo(() => {
    return trainingResult.filter((item) => item.result);
  }, [trainingResult]);

  //不正解データ
  const incorrectData = useMemo(() => {
    return trainingResult.filter((item) => !item.result);
  }, [trainingResult]);

  const data = {
    // 画面に色のついたラベルを表示
    labels: ["わかる", "わからない"],
    datasets: [
      {
        data: [correctData.length, incorrectData.length],
        backgroundColor: ["#f58787", "#aaa2f5"],
        borderColor: ["red", "blue"],
        borderWidth: 1,
      },
    ],
  };

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push("/");
    setTrainingResult([]);
    setTestData([]);
    setTimeout(() => {
      handleChangeStatus("not_started");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full h-full ">
      <p className="text-white-1 text-xl">結果</p>
      <Doughnut data={data} />
      <DMATButton title="ホームに戻る" handleClick={handleClickBackToTop} />
    </div>
  );
};

export default CompletedTraining;
