import DMATButton from "@/components/elements/DMATButton";
import { Status } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TrainingResultState, testDataState } from "@/states/trainingState";
import { CiViewList } from "react-icons/ci";
import DisplayResult from "@/features/training/DisplayResult";
import { cn } from "@/lib/utils";
import { TestData } from "@/models/userModel";
import useDoughnutChart from "@/hooks/useDoughnutChart";

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
  const correctData: TestData[] = useMemo(() => {
    const result = trainingResult.filter((item) => item.result);
    return result.map((item) => item.data);
  }, [trainingResult]);

  //不正解データ
  const incorrectData: TestData[] = useMemo(() => {
    const result = trainingResult.filter((item) => !item.result);
    return result.map((item) => item.data);
  }, [trainingResult]);

  // カスタムフックからデータとオプションを取得
  const { data, options, centerTextPlugin } = useDoughnutChart(
    correctData,
    incorrectData
  );

  // ホームへ戻るボタン押下
  const handleClickBackToTop = () => {
    router.push("/home");
    setTrainingResult([]);
    setTestData([]);
    setTimeout(() => {
      handleChangeStatus("not_started");
    }, 1000);
  };

  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 items-center justify-center w-full h-full relative"
      )}
    >
      <div
        className={cn("relative z-30", `${isOpenResult && "opacity-[0.1]"}`)}
      >
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
      <div
        className={cn(
          "flex items-center gap-2",
          `${isOpenResult && "opacity-[0.1]"}`
        )}
      >
        <DMATButton title="ホームに戻る" handleClick={handleClickBackToTop} />
        <DMATButton
          title="一覧"
          handleClick={() => setIsOpenResult(true)}
          icon={<CiViewList size={20} />}
        />
      </div>
      {isOpenResult && (
        <DisplayResult
          correctData={correctData}
          incorrectData={incorrectData}
          setIsOpen={setIsOpenResult}
        />
      )}
    </div>
  );
};

export default memo(CompletedTraining);
