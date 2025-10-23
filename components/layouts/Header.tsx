import { userState } from "@/states/userState";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resetState } from "@/states/testDataState";
import useAudio from "@/hooks/useAudio";
import Image from "next/image";
import Logo from "@/public/logo.png";
import DMATDialog from "../elements/DMATDialog";
import { motion } from "framer-motion";
import { MdLogout, MdPerson } from "react-icons/md";
import { PATHS } from "@/lib/paths";

const Header = () => {
  const router = useRouter();
  const { playInterrupt } = useAudio();

  // ユーザー情報
  const user = useRecoilValue(userState);
  const [_, setReset] = useRecoilState(resetState);
  // display sign out dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  // click sign out button
  const handleSignOut = () => {
    playInterrupt();
    sessionStorage.clear();
    setReset();
    router.push(PATHS.LOGIN);
  };

  const handleChangePath = useCallback(() => {
    playInterrupt();
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname.includes("/home")) {
      router.push("/home");
      return;
    }
    const segments = pathname.split("/").filter(Boolean);
    const base = segments[0] ?? "";
    router.push(base ? `/${base}/home` : "/home");
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={handleChangePath}
        className="fixed top-0 left-0 right-0 z-50 bg-black-2/90 backdrop-blur-md border-b border-white-1/10 h-[64px] w-full flex items-center justify-between px-6 shadow-lg"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Welcome */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src={Logo}
                alt=""
                width={44}
                height={44}
                className="rounded-xl shadow-lg border-2 border-yellow-400/30"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black-2 animate-pulse"></div>
            </motion.div>
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-sm"
              >
                Hello, {user?.name}! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-xs text-gray-300 font-medium"
              >
                学習を続けましょう
              </motion.p>
            </div>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Image
                  src={String(user?.thumbnail)}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 border-2 border-white-1/30 shadow-lg cursor-pointer transition-all duration-200 group-hover:border-white-1/50"
                  onClick={() => {
                    playInterrupt();
                    setIsOpenDialog(true);
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-black-2 flex items-center justify-center">
                  <MdPerson size={8} className="text-white" />
                </div>
              </motion.div>

              {/* Hover tooltip */}
              <div className="absolute top-12 right-0 bg-black-2/90 backdrop-blur-sm border border-white-1/20 rounded-lg px-3 py-2 text-xs text-white-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <MdLogout size={12} />
                  クリックでサインアウト
                </div>
                <div className="absolute -top-1 right-3 w-2 h-2 bg-black-2 border-l border-t border-white-1/20 rotate-45"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>
      {isOpenDialog && (
        <DMATDialog
          type="question"
          mainText="サインアウトしますか？"
          leftButtonText="キャンセル"
          rightButtonText="サインアウト"
          handleClickLeftButton={() => {
            setIsOpenDialog(false);
          }}
          handleClickRightButton={handleSignOut}
        />
      )}
    </>
  );
};

export default Header;
