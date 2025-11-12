import { useQuery } from "@tanstack/react-query";
import { GrammarExpress } from "@/models/grammarExpressModel";

interface GrammarResponse {
  message: string;
  grammars: GrammarExpress[];
  category: string;
  statistics: {
    total: number;
    completed: number;
    completionRate: number;
  };
}

const fetchGrammar = async (
  userName: string,
  category: string
): Promise<GrammarExpress[]> => {
  const response = await fetch(
    `/api/grammar-express?name=${userName}&category=${category}`,
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to load ${category} grammar data`);
  }

  const data: GrammarResponse = await response.json();
  return data.grammars || [];
};

interface UseGrammarDataOptions {
  // ポーリング間隔（ミリ秒）。未指定の場合はポーリングなし
  refetchInterval?: number;
  // ウィンドウフォーカス時に再取得するか
  refetchOnWindowFocus?: boolean;
}

export const useGrammarData = (
  userName: string | undefined,
  category: string,
  options?: UseGrammarDataOptions
) => {
  return useQuery({
    queryKey: ["grammar-express", userName, category],
    queryFn: () => fetchGrammar(userName!, category),
    enabled: !!userName && !!category, // userNameとcategoryが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    gcTime: 10 * 60 * 1000, // 10分間メモリに保持
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
  });
};
