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
