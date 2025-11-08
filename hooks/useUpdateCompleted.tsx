import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCompletedParams {
  userId: string;
  word_id?: string;
  grammar_id?: string;
  isCompleted: boolean;
  category: string;
}

const updateCompleted = async (params: UpdateCompletedParams) => {
  const response = await fetch("/api/update-completed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to update completion status");
  }

  return response.json();
};

export const useUpdateCompleted = (userName?: string, category?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompleted,
    onSuccess: (_, variables) => {
      // ダッシュボードデータのキャッシュを無効化して再取得
      queryClient.invalidateQueries({
        queryKey: ["dashboard", userName],
        refetchType: "active",
      });

      // 更新されたカテゴリのデータを無効化
      const targetCategory = variables.category;

      // 単語データの場合
      queryClient.invalidateQueries({
        queryKey: ["words", userName, targetCategory],
        refetchType: "active",
      });

      // 文法データの場合
      if (targetCategory.startsWith("chapter")) {
        queryClient.invalidateQueries({
          queryKey: ["grammar-express", userName, targetCategory],
          refetchType: "active",
        });
      }
    },
  });
};
