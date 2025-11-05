# React Query キャッシュ戦略

## 概要

このプロジェクトでは、React Query を使用して API データをキャッシュし、パフォーマンスを向上させています。

## データ更新時の再取得方法

### 1. 手動での再取得（推奨）

学習完了などのデータ更新後に自動的にダッシュボードと単語データを再取得します。

#### 使用例: `ProgressTraining.tsx`

```tsx
import { useUpdateCompleted } from "@/hooks/useUpdateCompleted";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

const ProgressTraining = () => {
  const user = useRecoilValue(userState);
  const category = "level600";

  // カテゴリーを指定すると、そのカテゴリーの単語キャッシュも自動更新
  const updateCompletedMutation = useUpdateCompleted(user?.name, category);

  const handleComplete = async (wordId: string, isCompleted: boolean) => {
    try {
      // データベースを更新 + ダッシュボード & 単語データのキャッシュを自動無効化
      await updateCompletedMutation.mutateAsync({
        userId: user?._id,
        word_id: wordId,
        isCompleted: isCompleted,
        category: category,
      });

      // 成功時：React Queryが自動的に以下を再取得
      // - ダッシュボードデータ
      // - 該当カテゴリーの単語データ
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleComplete("word_123", true)}
        disabled={updateCompletedMutation.isPending}
      >
        {updateCompletedMutation.isPending ? "更新中..." : "完了"}
      </button>
    </div>
  );
};
```

#### DataLoader コンポーネント（自動キャッシュ対応）

```tsx
import DataLoader from "@/components/common/DataLoader";
import { testDataState } from "@/states/trainingState";

// DataLoaderは自動的にReact Queryのキャッシュを使用
// update-completed APIが呼ばれると、自動的に最新データを再取得
<DataLoader category="level600" dataState={testDataState}>
  {(data, isLoading) => (
    <div>{isLoading ? "読込中..." : `${data.length}件の単語`}</div>
  )}
</DataLoader>;
```

### 2. ポーリング（定期的な自動再取得）

バックグラウンドで定期的にデータを更新します。

#### 使用例: `HomePage.tsx`

```tsx
import { useDashboardData } from "@/hooks/useDashboardData";

// 30秒ごとに自動更新
const { data, isLoading } = useDashboardData(user?.name, {
  refetchInterval: 30 * 1000, // 30秒
});

// ウィンドウフォーカス時にも更新
const { data, isLoading } = useDashboardData(user?.name, {
  refetchOnWindowFocus: true,
});
```

### 3. 手動リフレッシュボタン

ユーザーが任意のタイミングで再取得できるようにします。

```tsx
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

const RefreshButton = () => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);

  const handleRefresh = () => {
    // ダッシュボードデータを再取得
    queryClient.invalidateQueries({
      queryKey: ["dashboard", user?.name],
    });
  };

  return <button onClick={handleRefresh}>🔄 リフレッシュ</button>;
};
```

## キャッシュ設定

### グローバル設定 (`QueryProvider.tsx`)

```typescript
{
  staleTime: 5 * 60 * 1000,    // 5分間は新鮮
  gcTime: 10 * 60 * 1000,       // 10分間メモリに保持
  refetchOnWindowFocus: false,  // フォーカス時は再取得しない
  refetchOnMount: false,        // マウント時は再取得しない
}
```

### 個別設定

各フックで設定を上書き可能です。

## ベストプラクティス

### ✅ 推奨される使い方

1. **学習データ更新時**: `useUpdateCompleted(userName, category)`を使用
   - 自動的にダッシュボードと該当カテゴリーの単語キャッシュを無効化
2. **単語データ取得**: `DataLoader`コンポーネントを使用（自動キャッシュ対応済み）
3. **ダッシュボード表示**: `useDashboardData`でデフォルトの 5 分キャッシュを使用
4. **リアルタイム性が重要**: ポーリングを 30 秒〜1 分間隔で設定

### ❌ 避けるべき使い方

1. 短すぎるポーリング間隔（5 秒以下など）→ サーバー負荷増
2. すべてのページでポーリング → バッテリー消費増
3. キャッシュを使わずに毎回 fetch → React Query の利点を活かせない
4. `update-completed`後に手動で fetch を呼ぶ → React Query が自動で行うため不要

## 実装済みコンポーネント

### キャッシュ対応済み

- ✅ `DataLoader` - 単語データの取得・キャッシュ管理
- ✅ `HomePage` - ダッシュボードデータのキャッシュ
- ✅ `ProgressTraining` - 学習完了時の自動キャッシュ更新

## パフォーマンス効果

- ✅ **初回ロード後**: 5 分間は再フェッチなし
- ✅ **ページ遷移**: キャッシュから即座に表示
- ✅ **データ更新**: 自動的に最新データに更新
- ✅ **オフライン**: 過去のキャッシュデータを表示可能
