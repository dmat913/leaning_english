import React from "react";

// 型定義
interface Params {
  type: string;
}

// 静的パスを生成する関数
export async function generateStaticParams(): Promise<Params[]> {
  const paths: Params[] = [{ type: "level600" }];
  return paths;
}

const Training = ({ params }: { params: Params }) => {
  const { type } = params;
  return <div>Training type: {type}</div>;
};

export default Training;
