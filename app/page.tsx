"use client";
import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
// components/Home.tsx
import { useState } from "react";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const setUser = useSetRecoilState(userState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        router.push("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("ログインエラー:", error);
      setError("ログインに失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen p-5">
        <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg bg-white-1">
          <h1 className="text-2xl font-semibold mb-6 text-center">ログイン</h1>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="DMAT"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              パスワード
            </label>
            <input
              type="text"
              id="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0000"
            />
          </div>
          <button className="w-full py-2 bg-blue-500 text-white-1 font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            ログイン
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
