"use client";

import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, RecoilState } from "recoil";
import { userState } from "@/states/userState";
import { TestData } from "@/types/types";
import { useWordsData } from "@/hooks/useWordsData";

interface DataLoaderProps {
  category: string;
  dataState: RecoilState<TestData[]>;
  children: (data: TestData[], isLoading: boolean) => React.ReactNode;
}

const DataLoader: React.FC<DataLoaderProps> = ({
  category,
  dataState,
  children,
}) => {
  const user = useRecoilValue(userState);
  const setData = useSetRecoilState<TestData[]>(dataState);

  // React Queryでデータを取得（キャッシュ付き）
  const { data: fetchedData, isLoading } = useWordsData(user?.name, category);

  // React Queryで取得したデータをRecoil stateに同期
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, setData]);

  return <>{children(fetchedData || [], isLoading)}</>;
};

export default DataLoader;
