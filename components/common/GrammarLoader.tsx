"use client";

import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, RecoilState } from "recoil";
import { userState } from "@/states/userState";
import { GrammarExpress } from "@/models/grammarExpressModel";
import { useGrammarData } from "@/hooks/useGrammarData";

interface GrammarLoaderProps {
  category: string;
  dataState: RecoilState<GrammarExpress[]>;
  children: (data: GrammarExpress[], isLoading: boolean) => React.ReactNode;
}

const GrammarLoader: React.FC<GrammarLoaderProps> = ({
  category,
  dataState,
  children,
}) => {
  const user = useRecoilValue(userState);
  const setData = useSetRecoilState<GrammarExpress[]>(dataState);

  // React Queryでデータを取得（キャッシュ付き）
  const { data: fetchedData, isLoading } = useGrammarData(user?.name, category);

  // React Queryで取得したデータをRecoil stateに同期
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData, setData]);

  return <>{children(fetchedData || [], isLoading)}</>;
};

export default GrammarLoader;
