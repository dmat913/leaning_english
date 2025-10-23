import Image from "next/image";
import GoldPhraseLogo from "@/public/gold_phrase_logo.png";
import GrammarExpressLogo from "@/public/grammar_express_logo.png";
import Link from "next/link";
import { PATHS } from "@/lib/paths";

const page = () => {
  return (
    <div className="flex p-4 h-full items-center gap-4 flex-col justify-center bg-white">
      <Link
        href={PATHS.GOLD_PHRASE_HOME}
        className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-yellow-700/80 via-yellow-400/60 to-yellow-200/80 rounded-2xl shadow-2xl p-2 px-6 transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/60 hover:border-2 hover:border-yellow-300 cursor-pointer backdrop-blur-xl bg-opacity-70 border-2 border-transparent"
      >
        <Image
          src={GoldPhraseLogo}
          alt="Gold Phrase Logo"
          className="rounded-lg opacity-80 object-cover mb-4"
          width={80}
          height={80}
        />

        <span className="text-2xl text-center font-bold text-gray-800 mb-2">
          TOEIC L&R TEST
          <br />
          出る単特急
          <br />
          金のフレーズ
        </span>
      </Link>
      <Link
        href={PATHS.GRAMMAR_EXPRESS_HOME}
        className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-900/80 via-blue-500/60 to-blue-300/80 rounded-2xl shadow-5xl p-2 px-6 transition-all duration-300 hover:scale-105 hover:shadow-blue-400/60 hover:border-2 hover:border-blue-300 cursor-pointer backdrop-blur-xl bg-opacity-70 border-2 border-transparent"
      >
        <Image
          src={GrammarExpressLogo}
          alt="Grammar Express Logo"
          className="rounded-lg opacity-80 object-cover mb-4"
          width={80}
          height={80}
        />
        <span className="text-2xl text-center font-bold text-gray-800 mb-2">
          1駅1題
          <br />
          TOEIC L&R TEST
          <br />
          文法特急
        </span>
      </Link>
    </div>
  );
};

export default page;
