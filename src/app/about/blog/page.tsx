import BlogContainer from "@/features/BlogContainer";
import Timeline from "./Timeline";
import { Divider } from "@mui/material";
import { WebsiteChangelog } from "@/utils/constants";

const AboutWebsite = () => {
  return (
    <BlogContainer>
      <Timeline
        title="网站更新记录"
        timeList={WebsiteChangelog.map((item) => ({
          subTitle: item.title,
          time: `${item.date} ${item.time}`,
          desc: `${item.desc1}${item.desc2}`,
        }))}
      />
      <Divider />
      <Timeline
        title="网站技术栈"
        timeList={[
          {
            subTitle: "前端",
            time: "2024-03-08",
            desc: "Nextjs + Material UI",
          },
          {
            subTitle: "后端",
            time: "2024-03-08",
            desc: "Nextjs + TypeORM",
          },
        ]}
      />
    </BlogContainer>
  );
};

export default AboutWebsite;
