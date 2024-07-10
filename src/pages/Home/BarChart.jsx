import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarChart = () => {
  const chartRef = useRef();
  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: "三大框架滿意度",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: ["vue", "react", "angular"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          type: "bar",
          data: [10, 40, 70],
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);

  return <div className="w-96 h-80" ref={chartRef}></div>;
};

export default BarChart;
