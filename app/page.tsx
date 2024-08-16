"use client";
import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const router = useRouter();

  // username
  const [username, setUsername] = useState<string>("");
  // error Message
  const [error, setError] = useState<string | null>(null);
  // loginUser
  const setUser = useSetRecoilState(userState);

  // ユーザー情報取得
  const getUser = async (name: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${name}`
    );

    // response data
    const data = await response.json();

    // successful
    if (response.ok) {
      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } else {
      setError(data.message);
    }
  };

  // ログインボタン押下時
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // user取得
    await getUser(username);
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
          <button
            className="w-full py-2 bg-blue-500 text-white-1 font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-70"
            type="submit"
            disabled={username.length === 0}
          >
            ログイン
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
