import { fetchWebsiteStatistics } from "@/service/statistics";
import "./page.css";
import LineOrBarChart from "@/features/LineOrBarChart";
import BlogContainer from "@/features/BlogContainer";
import CustomBarChart from "@/features/PieChart";

const BlogData: React.FC<void> = async () => {
  const response = await fetchWebsiteStatistics();

  const { visitData, archiveData, catData } = response;

  const days = visitData.map((item) => item.date);
  const pvs = visitData.map((item) => item.todayPv);
  const uvs = visitData.map((item) => item.todayUv);

  return (
    <BlogContainer isLogin contentClass="statistics-container">
      <div className="chart-item flex-basis-50">
        <LineOrBarChart
          style={{
            paddingTop: "1.56vw",
          }}
          xAxis={days}
          yAxis={[
            {
              type: "bar",
              yAxisIndex: 0,
              name: "访问次数",
              yAxisLabel: "访问次数",
              value: pvs,
              lrColors: ["rgba(13, 204, 255, 1)", "rgba(71, 96, 255, 1)"],
            },
            {
              type: "line",
              yAxisIndex: 1,
              name: "访问用户",
              yAxisLabel: "访问用户",
              value: uvs,
              lrColors: ["rgba(100, 188, 255, 0.8)", "rgba(108, 226, 255, 0)"],
            },
          ]}
        />
      </div>
      <div className="chart-item flex-basis-50">
        <LineOrBarChart
          style={{
            paddingTop: "1.56vw",
          }}
          xAxis={archiveData.map((item) => item.archiveTime)}
          yAxis={[
            {
              type: "bar",
              yAxisIndex: 0,
              name: "发表的文章个数",
              yAxisLabel: "文章个数",
              value: pvs,
              lrColors: ["rgba(13, 204, 255, 1)", "rgba(71, 96, 255, 1)"],
            },
          ]}
        />
      </div>
      <div className="chart-item flex-basis-50">
        <CustomBarChart
          chartName="车辆状况"
          data={catData}
          style={{ height: "25.925vh" }}
          legendConfig={{
            right: "6.49%",
            top: "25%",
            align: "right",
          }}
        />
      </div>
    </BlogContainer>
  );
};

export default BlogData;
