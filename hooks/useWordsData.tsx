import { useQuery } from "@tanstack/react-query";
import { TestData } from "@/types/types";

interface WordsResponse {
  words: TestData[];
}

const fetchWords = async (
  userName: string,
  category: string
): Promise<TestData[]> => {
  const response = await fetch(
    `/api/words?name=${userName}&category=${category}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load ${category} data`);
  }

  const data: WordsResponse = await response.json();
  return data.words || [];
};

interface UseWordsDataOptions {
  // ポーリング間隔（ミリ秒）。未指定の場合はポーリングなし
  refetchInterval?: number;
  // ウィンドウフォーカス時に再取得するか
  refetchOnWindowFocus?: boolean;
}

export const useWordsData = (
  userName: string | undefined,
  category: string,
  options?: UseWordsDataOptions
) => {
  return useQuery({
    queryKey: ["words", userName, category],
    queryFn: () => fetchWords(userName!, category),
    enabled: !!userName && !!category, // userNameとcategoryが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    gcTime: 10 * 60 * 1000, // 10分間メモリに保持
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
};
