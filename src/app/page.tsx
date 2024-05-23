import styles from "./page.module.css";
import { Container } from "@mui/material";
import { DouMiIntroduction } from "@/features/DoumiIntro";
import DoumiLinks from "@/features/DoumiLink";
import FootPrint from "@/features/Footprint";
import { queryArticles } from "@/service/article";
import HottestArticles from "@/features/HottestArticles";
import { getHottestArticles } from "@/service/statistics";

export default async function Home() {
  const [res, latestHottestArticles] = await Promise.all([
    queryArticles(1, 5, JSON.stringify({ pv: "DESC" })),
    getHottestArticles(),
  ]);

  return (
    <Container maxWidth="md" className={styles.homeContainer}>
      <DouMiIntroduction avatarSize={120} fontSize={16} />
      <DoumiLinks />
      <HottestArticles list={res.list} hottestList={latestHottestArticles} />
      <FootPrint />
    </Container>
  );
}
