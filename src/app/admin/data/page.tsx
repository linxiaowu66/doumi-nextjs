import { fetchWebsiteStatistics } from "@/service/statistics";
import "./page.css";
import LineOrBarChart from "@/features/LineOrBarChart";
import BlogContainer from "@/features/BlogContainer";
import CustomBarChart from "@/features/PieChart";
import CustomMapChart from "@/features/MapChart";

const BlogData: React.FC<void> = async () => {
  const response = await fetchWebsiteStatistics();

  const { visitData, archiveData, catData, tagData, visitCities } = response;

  const days = visitData.map((item) => item.date);
  const pvs = visitData.map((item) => item.todayPv);
  const uvs = visitData.map((item) => item.todayUv);

  return (
    <BlogContainer isLogin contentClass="statistics-container">
      <div className="chart-item flex-basis-100">
        <header className="header">
          <span>近十五日网站访问量</span>
          <span>LAST 15 DAYS</span>
        </header>
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
              lrColors: ["#90f0bf", "#17d172"],
            },
            {
              type: "line",
              yAxisIndex: 1,
              name: "访问用户",
              yAxisLabel: "访问用户",
              value: uvs,
              lrColors: ["rgba(62, 223, 140, 0.5)", "rgba(62, 223, 140, 0)"],
            },
          ]}
        />
      </div>
      <div className="chart-item flex-basis-100">
        <header className="header">
          <span>近一年文章创作量</span>
          <span>LAST 365 DAYS</span>
        </header>
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
              value: archiveData.map((item) => item.articlesCount),
              lrColors: ["#90f0bf", "#17d172"],
            },
          ]}
        />
      </div>
      <div className="chart-item flex-basis-50">
        <header className="header">
          <span>文章分类</span>
          <span>TOTAL ARTICLES CATEGORY</span>
        </header>
        <CustomBarChart
          chartName="文章总数"
          data={catData}
          style={{ height: "30.925vh", marginBottom: "1.56vw" }}
          legendConfig={{
            right: "6.49%",
            top: "35%",
            align: "right",
          }}
        />
      </div>
      <div className="chart-item flex-basis-50">
        <header className="header">
          <span>文章标签最多的前六个</span>
          <span>AHEAD ARTICLES TAG</span>
        </header>
        <CustomBarChart
          chartName="文章总数"
          data={tagData}
          style={{ height: "30.925vh", marginBottom: "1.56vw" }}
          legendConfig={{
            right: "6.49%",
            top: "35%",
            align: "right",
          }}
        />
      </div>
      <div className="chart-item flex-basis-100">
        <header className="header">
          <span>访问人群分布</span>
          <span>VISIT PEOPLE GIS DISTRIBUTION</span>
        </header>
        <CustomMapChart
          style={{
            width: "100%",
            height: "60.925vh",
            marginBottom: "1.56vw",
          }}
          data={visitCities}
        />
      </div>
    </BlogContainer>
  );
};

export default BlogData;
