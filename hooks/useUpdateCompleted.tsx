import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCompletedParams {
  userId: string;
  word_id: string;
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
      });

      // 更新されたカテゴリーの単語データを無効化して再取得
      if (category) {
        queryClient.invalidateQueries({
          queryKey: ["words", userName, category],
        });
      }

      // または、更新リクエストのcategoryを使用
      if (variables.category) {
        queryClient.invalidateQueries({
          queryKey: ["words", userName, variables.category],
        });
      }

      // 全ての単語データを無効化（複数カテゴリーが影響を受ける場合）
      // queryClient.invalidateQueries({
      //   queryKey: ["words", userName],
      // });
    },
  });
};
