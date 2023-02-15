import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

function Chart({ data }) {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
  ]);

  const xData = [];
  const yData = [];
  if (data) {
    for (const key in data) {
      if (key !== "hiddenSubscriberCount") {
        xData.push(key);
        yData.push(parseInt(data[key]));
      }
    }
  }

  const option = {
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yData,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  return (
    <div>
      {option && typeof option === "object" && (
        <ReactEChartsCore
          style={{ height: "500px" }}
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={"purple-passion"}
          darkMode
        />
      )}
    </div>
  );
}

export default Chart;
