import { useQuery } from "@tanstack/react-query";

interface DashboardData {
  overall: {
    totalWords: number;
    completedWords: number;
    completionRate: number;
    totalAttempts: number;
    studyStreak: number;
  };
  categories: Array<{
    category: string;
    totalWords: number;
    completedWords: number;
    completionRate: number;
    accuracy: number;
    lastUpdated: Date;
  }>;
  recentActivity: Array<{
    category: string;
    wordId: string;
    lastAttemptAt: Date;
    isCompleted: boolean;
  }>;
}

const fetchDashboardData = async (userName: string): Promise<DashboardData> => {
  const response = await fetch(`/api/dashboard?name=${userName}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch dashboard data");
  }

  return result.data;
};

interface UseDashboardDataOptions {
  // ポーリング間隔（ミリ秒）。未指定の場合はポーリングなし
  refetchInterval?: number;
  // ウィンドウフォーカス時に再取得するか
  refetchOnWindowFocus?: boolean;
}

export const useDashboardData = (
  userName: string | undefined,
  options?: UseDashboardDataOptions
) => {
  return useQuery({
    queryKey: ["dashboard", userName],
    queryFn: () => fetchDashboardData(userName!),
    enabled: !!userName, // userNameが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    gcTime: 10 * 60 * 1000, // 10分間メモリに保持
    refetchInterval: options?.refetchInterval, // ポーリング間隔
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false, // デフォルトはfalse
  });
};
