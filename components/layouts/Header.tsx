import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue } from "recoil";

const Header = () => {
  const router = useRouter();

  const user = useRecoilValue(userState);

  const handleSignOut = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <header className="relative z-10 bg-gray-900 h-[56px] w-full flex items-center justify-between px-5 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-400 drop-shadow-lg">
          {`Hello! ${user?.name}!`}
        </h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
