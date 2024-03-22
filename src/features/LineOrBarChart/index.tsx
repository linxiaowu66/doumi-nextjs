"use client";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  MarkLineComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import React, { useRef, useEffect } from "react";

const lineChartDefaultConfig = {
  type: "line",
  smooth: true,
  lineStyle: { width: 3 },
  symbolSize: 6,
  emphasis: { scale: 2 },
};

const barChartDefaultConfig = {
  type: "bar",
  barWidth: 8,
};

const LineOrBarChart = (props: {
  style?: React.CSSProperties;
  xAxis: string[];
  yAxis: Array<{
    value: number[];
    name: string;
    lrColors: string[];
    type: "line" | "bar";
    yAxisLabel?: string;
    lineColor?: string;
    yAxisIndex: number;
    markLine?: any;
    symbol?: string;
  }>;
  onDataZoomChange?: (data: { endValue: number; startValue: number }) => void;
  [key: string]: any;
}) => {
  const { xAxis, yAxis, style, onDataZoomChange, ...rest } = props;
  const chartRef = useRef<ReactEChartsCore>(null);
  echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    BarChart,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    MarkLineComponent,
  ]);

  const handleResize = () => {
    if (chartRef.current) {
      const echartInstance = chartRef.current.getEchartsInstance();
      echartInstance.resize();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 很神奇，如果onEvents传了具体的对象值，那么options更新的时候会整个图表进行重渲染，而不是那种渐进式的渲染
  // 该问题后续有待验证是否是BUG？目前改成如果没有监听zoom事件的话，就传空对象
  return (
    <ReactEChartsCore
      style={style}
      echarts={echarts}
      notMerge={false} // 决定了是否进行选项merge，如果不merge的话，当我关掉某个图例的话因为数据一直刷新导致配置又被冲掉了
      lazyUpdate
      ref={chartRef}
      onEvents={
        onDataZoomChange
          ? {
              datazoom: () => {
                if (chartRef.current && chartRef.current.getEchartsInstance()) {
                  const ins = chartRef.current.getEchartsInstance();
                  onDataZoomChange((ins.getOption() as any).dataZoom[0]);
                }
              },
            }
          : {}
      }
      option={{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#5BBAFB",
            },
          },
          backgroundColor: "rgba(255, 255, 255, 1)",
          textStyle: {
            color: "#37394F",
            fontSize: 14,
          },
          borderColor: "#64BCFF",
        },
        legend: {
          itemWidth: 28,
          itemHeight: 8,
          data: yAxis.map((item) => ({
            name: item.name,
            textStyle: {
              color: "#6D7177",
              fontSize: 14,
            },
          })),
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              color: "#37394F",
              fontWeight: 500,
              fontSize: 14,
            },
          },
        ],
        yAxis: yAxis.map((item, index: number) => ({
          type: "value",
          name: item.yAxisLabel || "",
          nameTextStyle: {
            color: "#9496AC",
            fontSize: 14,
          },
          axisLabel: {
            color: "#37394F",
            fontWeight: 500,
            fontSize: 14,
            formatter: (value: number) => {
              const txt = [];
              if (value >= 10000) {
                txt.push(`${value / 10000}万`);
              } else {
                txt.push(value);
              }
              return txt;
            },
          },
          splitLine: {
            lineStyle: {
              color: !index ? "#7b7d95" : "#151421",
              type: "dashed",
              width: 1,
            },
          },
        })),
        series: yAxis.map((item) => {
          if (item.type === "bar") {
            return {
              ...barChartDefaultConfig,
              name: item.name,
              data: item.value,
              yAxisIndex: item.yAxisIndex,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: item.lrColors[0],
                  },
                  {
                    offset: 1,
                    color: item.lrColors[1],
                  },
                ]),
                borderRadius: [4, 4, 0, 0],
              },
            };
          }
          return {
            ...lineChartDefaultConfig,
            itemStyle: { color: item.lineColor || "#64BCFF" },
            name: item.name,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: item.lrColors[0],
                },
                {
                  offset: 1,
                  color: item.lrColors[1],
                },
              ]),
            },
            yAxisIndex: item.yAxisIndex,
            data: item.value,
            markLine: item.markLine,
            symbol: item.symbol || "emptyCircle",
          };
        }),
        ...rest,
      }}
    />
  );
};

export default LineOrBarChart;
