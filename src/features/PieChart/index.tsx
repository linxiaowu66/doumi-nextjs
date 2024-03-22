"use client";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  GraphicComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { debounce } from "lodash-es";

import { deepMerge } from "@/utils";

const themeColor: any = {
  light: {
    label: "#37394F",
    tooltip: {
      text: "#37394F",
      border: "#C2D4E4",
      background: "rgba(255, 255, 255, 0.9)",
    },
    yAxis: {
      nameText: "#6D7177",
    },
  },
  dark: {
    label: "#E9EBFE",
    tooltip: {
      text: "#E9EBFE",
      border: "rgba(84, 182, 254, 0.5)",
      background: "rgba(40, 41, 59, 0.9)",
    },
    yAxis: {
      nameText: "#9496AC",
    },
  },
};

const CustomPieChart = ({
  style,
  chartName,
  graphic,
  data,
  theme = "light",
  notMerge = true,
  loading = false,
  legendConfig = {},
  seriesConfig = {},
  tooltipConfig = {},
  chartOtherConfig = {},
}: any) => {
  const chartRef = useRef<ReactEChartsCore>(null);
  echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    GraphicComponent,
    PieChart,
    CanvasRenderer,
  ]);

  const handleResize = debounce(() => {
    if (chartRef.current) {
      const echartInstance = chartRef.current.getEchartsInstance();
      echartInstance.resize();
    }
  });

  useEffect(() => {
    // 因为图表生成的时机早于父级元素layout的时机，为了解决图表宽度自适应问题，重新触发一次图表渲染
    setTimeout(handleResize, 200);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      theme={theme}
      style={style}
      showLoading={loading}
      shouldSetOption={() => true} // 在请求不到数据的时候将echarts图进行清空
      notMerge={notMerge} // 决定了是否进行选项merge，如果不merge的话，当我关掉某个图例的话因为数据一直刷新导致配置又被冲掉了
      lazyUpdate
      option={deepMerge(chartOtherConfig, {
        tooltip: deepMerge(tooltipConfig, {
          trigger: "item",
          textStyle: {
            color: themeColor[theme].tooltip.text,
          },
          borderColor: themeColor[theme].tooltip.border,
          backgroundColor: themeColor[theme].tooltip.background,
        }),
        legend: deepMerge(legendConfig, {
          show: true,
          orient: "vertical",
          icon: "circle",
          right: 10,
          top: "25%",
          textStyle: { fontSize: "0.729vw" },
          formatter: (name: string) =>
            `${name} ${data.find((it) => it.name === name)?.value}`,
        }),
        graphic: !graphic
          ? []
          : graphic.map((item) => ({
              type: "text",
              left: "center",
              top: item.top,
              style: {
                textAlign: "center",
                text: item.text,
                fill: item.color,
                fontSize: item.fontSize,
              },
            })),
        series: [
          deepMerge(seriesConfig, {
            name: chartName,
            type: "pie",
            radius: ["50%", "80%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: data.map((item) => ({
              value: item.value,
              name: item.name,
              tooltip: {
                formatter: item.tooltipFormatter,
              },
              itemStyle: {
                color: Array.isArray(item.lrColors)
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: item.lrColors[0],
                      },
                      {
                        offset: 1,
                        color: item.lrColors[1],
                      },
                    ])
                  : item.lrColors,
              },
            })),
          }),
        ],
      })}
    />
  );
};

export default CustomPieChart;
