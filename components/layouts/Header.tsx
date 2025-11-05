import { userState } from "@/states/userState";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { resetState } from "@/states/testDataState";
import useAudio from "@/hooks/useAudio";
import Image from "next/image";
import Logo from "@/public/logo.png";
import DMATDialog from "../elements/DMATDialog";
import { motion, AnimatePresence } from "framer-motion";
import { MdLogout, MdPerson, MdHome, MdCheck } from "react-icons/md";
import { PATHS } from "@/lib/paths";
import { IoBookSharp, IoHeadset } from "react-icons/io5";
import { FaBook } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { playInterrupt } = useAudio();

  // ユーザー情報
  const user = useRecoilValue(userState);
  const [_, setReset] = useRecoilState(resetState);
  // display sign out dialog
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  // hamburger menu state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // click sign out button
  const handleSignOut = () => {
    playInterrupt();
    sessionStorage.clear();
    setReset();
    router.push(PATHS.LOGIN);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      icon: MdHome,
      label: "メインホーム",
      path: PATHS.HOME,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      hoverBg: "hover:bg-blue-500/20",
    },
    {
      icon: IoBookSharp,
      label: "金のフレーズ",
      path: PATHS.GOLD_PHRASE_HOME,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      hoverBg: "hover:bg-amber-500/20",
    },
    {
      icon: FaBook,
      label: "文法特急",
      path: PATHS.GRAMMAR_EXPRESS_HOME,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      hoverBg: "hover:bg-cyan-500/20",
    },
    {
      icon: IoHeadset,
      label: "リスニング",
      path: PATHS.LISTENING_HOME,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      hoverBg: "hover:bg-purple-500/20",
    },
  ];

  const handleMenuItemClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    playInterrupt();
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInterrupt();
    setIsMenuOpen(false);
    setIsOpenDialog(true);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInterrupt();
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if current path matches the menu item path
  const isActivePath = (path: string) => {
    if (path === PATHS.HOME) {
      return pathname === "/home";
    }
    return pathname?.includes(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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

          {/* User Profile with Hamburger Menu */}
          <motion.div
            ref={menuRef}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Image
                  src={String(user?.thumbnail)}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 border-2 border-white-1/30 shadow-lg cursor-pointer transition-all duration-200 hover:border-white-1/50"
                  onClick={handleProfileClick}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-black-2 flex items-center justify-center">
                  <MdPerson size={8} className="text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Hamburger Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 right-0 w-64 bg-black-2/95 backdrop-blur-xl border border-white-1/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {/* User Info Section */}
                  <div className="p-4 border-b border-white-1/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <div className="flex items-center gap-3">
                      <Image
                        src={String(user?.thumbnail)}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white-1/30"
                      />
                      <div>
                        <p className="text-white-1 font-bold text-sm">
                          {user?.name}
                        </p>
                        <p className="text-gray-400 text-xs">学習者</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {menuItems.map((item, index) => {
                      const isActive = isActivePath(item.path);
                      return (
                        <motion.button
                          key={item.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={(e) => handleMenuItemClick(e, item.path)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? `${item.bgColor} ${
                                  item.hoverBg
                                } border-l-4 ${item.color.replace(
                                  "text-",
                                  "border-"
                                )}`
                              : item.hoverBg
                          } group relative`}
                        >
                          <div
                            className={`${
                              item.bgColor
                            } p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 ${
                              isActive ? "scale-110" : ""
                            }`}
                          >
                            <item.icon
                              className={`${item.color} text-lg ${
                                isActive ? "drop-shadow-glow" : ""
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium flex-1 text-left ${
                              isActive ? "text-white-1" : "text-white-1"
                            }`}
                          >
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`${item.bgColor} p-1 rounded-full`}
                            >
                              <MdCheck className={`${item.color} text-sm`} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="mx-4 border-t border-white-1/10" />

                  {/* Sign Out Button */}
                  <div className="p-2">
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      onClick={handleSignOutClick}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-500/20 group"
                    >
                      <div className="bg-red-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                        <MdLogout className="text-red-400 text-lg" />
                      </div>
                      <span className="text-red-400 text-sm font-medium">
                        サインアウト
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
