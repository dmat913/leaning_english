"use client";
import GlassLoadingSpinner from "@/components/elements/GlassLoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  // username
  const [username, setUsername] = useState<string>("");
  // error Message
  const [error, setError] = useState<string | null>(null);
  // ローディング状態
  const [loading, setLoading] = useState<boolean>(false);
  // ログイン済み判定
  const [isSuccessLogin, setIsSuccessLogin] = useState<boolean>(false);

  // ログインボタン押下時
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // user取得
    setLoading(true);
    setIsSuccessLogin(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?name=${encodeURIComponent(
          username
        )}`
      );

      // response data
      const data = await response.json();

      // successful
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        router.push("/home");
      } else {
        setError(data.message);
        setIsSuccessLogin(false);
      }
    } catch (err) {
      setError("エラーが発生しました。");
      setIsSuccessLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full w-full">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <GlassLoadingSpinner />
        </div>
      ) : (
        !isSuccessLogin && (
          <div className="flex items-center justify-center p-5 w-full h-full">
            <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg bg-white-1">
              <h1 className="text-2xl font-semibold mb-6 text-center">
                ログイン
              </h1>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  ユーザー名
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  placeholder="DMAT"
                  disabled={loading}
                />
              </div>
              <button
                className="w-full py-2 bg-blue-500 text-white-1 font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                type="submit"
                disabled={username.length === 0 || loading}
              >
                ログイン
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        )
      )}
    </form>
  );
};

export default LoginPage;
