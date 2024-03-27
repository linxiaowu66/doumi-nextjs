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

const CustomPieChart = ({
  style,
  chartName,
  data,
  notMerge = true,
  loading = false,
  legendConfig = {},
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
      style={style}
      showLoading={loading}
      shouldSetOption={() => true} // 在请求不到数据的时候将echarts图进行清空
      notMerge={notMerge} // 决定了是否进行选项merge，如果不merge的话，当我关掉某个图例的话因为数据一直刷新导致配置又被冲掉了
      lazyUpdate
      option={{
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#37394F",
            fontSize: 14,
          },
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "#64BCFF",
        },
        legend: {
          ...legendConfig,
          ...{
            show: true,
            orient: "vertical",
            icon: "circle",
            right: 10,
            top: "25%",
            textStyle: { fontSize: "0.729vw" },
            formatter: (name: string) =>
              `${name} ${
                data.find((it: { name: string }) => it.name === name)?.value
              }`,
          },
        },
        series: [
          {
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
            data: data.map(
              (item: {
                name: string;
                value: number | string;
                lrColors?: string[] | string;
                tooltipFormatter?: (params: any) => string;
              }) => ({
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
              })
            ),
          },
        ],
      }}
    />
  );
};

export default CustomPieChart;
