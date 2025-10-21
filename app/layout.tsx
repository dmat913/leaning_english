"use client";

import { Background } from "@/components/aceternity/Background";
import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>Dmat English</title>
        <meta
          name="description"
          content="効率的な英語学習アプリ。TOEIC対策、金のフレーズ、必須単語を学習できます。レベル別学習で着実にスキルアップ。"
        />
        <meta
          name="keywords"
          content="英語学習,TOEIC,金のフレーズ,英単語,学習アプリ,英語勉強,vocabulary,english learning"
        />
        <meta name="author" content="DMAT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Dmat English - 英語学習アプリ" />
        <meta
          property="og:description"
          content="効率的な英語学習アプリ。TOEIC対策、金のフレーズ、必須単語を学習できます。"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dmat English - 英語学習アプリ" />
        <meta
          name="twitter:description"
          content="効率的な英語学習アプリ。TOEIC対策、金のフレーズ、必須単語を学習できます。"
        />
      </head>
      <body className="h-[100svh] w-[100vw]">
        <RecoilRoot>
          <Background>{children}</Background>
        </RecoilRoot>
      </body>
    </html>
  );
}
