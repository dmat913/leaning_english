import { useMemo } from "react";
import { ChartOptions, Plugin } from "chart.js";
import { TestData } from "@/models/userModel";

const useDoughnutChart = (
  correctData: TestData[],
  incorrectData: TestData[]
) => {
  const data = useMemo(
    () => ({
      labels: ["わかる", "わからない"],
      datasets: [
        {
          data: [correctData.length, incorrectData.length],
          backgroundColor: ["#f58787", "#aaa2f5"],
          borderColor: ["red", "blue"],
          borderWidth: 1,
        },
      ],
    }),
    [correctData, incorrectData]
  );

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FAF0E6",
        },
      },
    },
  };

  const centerTextPlugin: Plugin<"doughnut"> = useMemo(
    () => ({
      id: "centerText",
      afterDraw: (chart) => {
        const {
          ctx,
          chartArea: { left, top, right, bottom },
        } = chart;
        ctx.save();

        const total = chart.data.datasets[0].data.reduce(
          (acc, value) => acc + value,
          0
        );
        const dataValue = chart.data.datasets[0].data[0];
        const percentage = ((dataValue / total) * 100).toFixed(1);

        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        ctx.font = "bold 24px Netflix Sans";
        ctx.fillStyle = "#FAF0E6";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(`${Math.ceil(Number(percentage))}%`, centerX, centerY);
        ctx.restore();
      },
    }),
    []
  );

  return { data, options, centerTextPlugin };
};

export default useDoughnutChart;
