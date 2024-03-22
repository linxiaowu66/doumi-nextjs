import { cloneDeep } from "lodash-es";

export const yAxisLabelFormatter = (isScale100: boolean) => (value: number) => {
  if (isScale100) {
    return value * 100;
  }
  return value >= 10000 ? `${value / 10000}万` : value;
};
export const tooltipPercent = (params: any) => {
  let relVal = params[0].name;
  params.forEach(({ marker, seriesName, value }: any) => {
    relVal += `<br/>${marker}${seriesName} : ${(value * 100).toFixed(2)}%`;
  });
  return relVal;
};
/**
 * 深度合并代码，思路来自 zepto.js 源代码
 * 切记不要对象递归引用，否则会陷入递归跳不出来，导致堆栈溢出
 * 作用是会合并 target 和 other 对应位置的值，冲突的会保留 target 的值
 */
export function deepMerge(
  target: Record<string, any>,
  other: Record<string, any>
) {
  const targetToString = Object.prototype.toString.call(target);
  const otherToString = Object.prototype.toString.call(other);
  const result = !["[object Object]", "[object Array]"].includes(targetToString)
    ? target
    : cloneDeep(target);

  if (
    targetToString === "[object Object]" &&
    otherToString === "[object Object]"
  ) {
    for (const [key, val] of Object.entries(other)) {
      if (result[key] === undefined) {
        result[key] = val;
      } else {
        result[key] = deepMerge(result[key], val);
      }
    }
  } else if (
    targetToString === "[object Array]" &&
    otherToString === "[object Array]"
  ) {
    for (const [key, val] of Object.entries(other)) {
      if (result[key]) {
        result[key] = deepMerge(result[key], val);
      } else {
        result.push(val);
      }
    }
  }
  return result;
}
