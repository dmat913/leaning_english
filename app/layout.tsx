"use client";
import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100svh] w-[100vw] overflow-hidden p-5">
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
