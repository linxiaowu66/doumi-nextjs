"use client";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { ScatterChart, EffectScatterChart } from "echarts/charts";
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
import { install as AMapComponent } from "echarts-extension-amap/export";

// import the official type definition for AMap 2.0
import "@amap/amap-jsapi-types";
import { geoCoordMap } from "@/utils/allCity";

const convertData = function (data: { name: string; value: number }[]) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(+data[i].value),
      });
    }
  }
  return res;
};

const CustomMapChart = ({
  style,
  notMerge = true,
  loading = false,
  data,
}: any) => {
  const chartRef = useRef<ReactEChartsCore>(null);
  echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    GraphicComponent,
    AMapComponent,
    ScatterChart,
    EffectScatterChart,
    CanvasRenderer,
  ]);

  console.log(data);

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

    if (chartRef.current) {
      // get AMap extension component
      // var amapComponent = chartRef.current.getModel().getComponent("amap");
      // // get the instance of AMap
      // var amap = amapComponent.getAMap();
      // // add some controls provided by AMap.
      // amap.addControl(new AMap.Scale());
      // amap.addControl(new AMap.ToolBar());
      // // add SatelliteLayer and RoadNetLayer to map
      // // var satelliteLayer = new AMap.TileLayer.Satellite();
      // // var roadNetLayer = new AMap.TileLayer.RoadNet();
      // // amap.add([satelliteLayer, roadNetLayer]);
      // // Add a marker to map
      // amap.add(
      //   new AMap.Marker({
      //     position: [110, 35],
      //   })
      // );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const max = Math.max(...data.map((item: { value: number }) => item.value));
  const min = Math.min(...data.map((item: { value: number }) => item.value));

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
        // load amap component
        amap: {
          // enable 3D mode
          // Note that it's suggested to enable 3D mode to improve echarts rendering.
          viewMode: "3D",
          // initial options of AMap
          // See https://lbs.amap.com/api/javascript-api/reference/map#MapOption for details
          // initial map center [lng, lat]
          center: [104.114129, 37.550339],
          // initial map zoom
          zoom: 4,
          // whether the map and echarts automatically handles browser window resize to update itself.
          resizeEnable: true,
          // customized map style, see https://lbs.amap.com/dev/mapstyle/index for details
          mapStyle: "amap://styles/light",
          // whether echarts layer should be rendered when the map is moving. Default is true.
          // if false, it will only be re-rendered after the map `moveend`.
          // It's better to set this option to false if data is large.
          renderOnMoving: true,
          // the zIndex of echarts layer for AMap, default value is 2000.
          // deprecated since v1.9.0, use `echartsLayerInteractive` instead.
          echartsLayerZIndex: 2019,
          // whether echarts layer is interactive. Default value is true
          // supported since v1.9.0
          echartsLayerInteractive: true,
          // whether to enable large mode. Default value is false
          // supported since v1.9.0
          largeMode: false,
          // Note: Please DO NOT use the initial option `layers` to add Satellite/RoadNet/Other layers now.
          // There are some bugs about it, we can use `amap.add` instead.
          // Refer to the codes at the bottom.

          // More initial options...
        },
        tooltip: {
          trigger: "item",
        },
        animation: false,
        series: [
          {
            name: "访问分布",
            type: "scatter",
            // use `amap` as the coordinate system
            coordinateSystem: "amap",
            // data items [[lng, lat, value], [lng, lat, value], ...]
            data: convertData(data),
            symbolSize: function (val: number[]) {
              return ((val[2] - min) / (max - min)) * 10 + 5;
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            itemStyle: {
              color: "#119d55",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            name: "前5的城市",
            type: "effectScatter",
            coordinateSystem: "amap",
            data: convertData(
              data
                .sort(function (a: { value: number }, b: { value: number }) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: function (val: number[]) {
              return ((val[2] - min) / (max - min)) * 10 + 5;
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "rgba(255, 165, 0, 0.8)",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      }}
    />
  );
};

export default CustomMapChart;
