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
      </head>
      <body className="h-[100svh] w-[100vw]">
        <RecoilRoot>
          <Background>{children}</Background>
        </RecoilRoot>
      </body>
    </html>
  );
}
