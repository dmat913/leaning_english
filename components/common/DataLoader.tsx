"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil";
import { userState } from "@/states/userState";
import { TestData } from "@/types/types";

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
  const [data, setData] = useRecoilState<TestData[]>(dataState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // データが既に存在する場合はスキップ
      if (data.length > 0) {
        return;
      }

      // ユーザーが存在しない場合はスキップ
      if (!user) {
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/user?name=${user.name}&category=${category}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData.words || []);
        } else {
          console.error(`Failed to load ${category} data`);
          setData([]);
        }
      } catch (error) {
        console.error(`Error loading ${category} data:`, error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, category, data.length, setData]);

  return <>{children(data, isLoading)}</>;
};

export default DataLoader;
