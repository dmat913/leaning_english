"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil";
import { userState } from "@/states/userState";
import { GrammarExpress } from "@/models/grammarExpressModel";

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
  const [data, setData] = useRecoilState<GrammarExpress[]>(dataState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/grammar-express?name=${user.name}&category=${category}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData.grammars || []);
        } else {
          console.error(`Failed to load ${category} grammar data`);
          setData([]);
        }
      } catch (error) {
        console.error(`Error loading ${category} grammar data:`, error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [user, category, setData]);

  return <>{children(data, isLoading)}</>;
};

export default GrammarLoader;
