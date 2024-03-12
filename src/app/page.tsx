import styles from "./page.module.css";
import { Container } from "@mui/material";
import { DouMiIntroduction } from "@/features/DoumiIntro";
import DoumiLinks from "@/features/DoumiLink";
import FootPrint from "@/features/Footprint";
import { queryArticles } from "./api/article/route";
import HottestArticles from "@/features/HottestArticles";

export default async function Home() {
  const res = await queryArticles(1, 5, JSON.stringify({ pv: "DESC" }));

  return (
    <Container maxWidth="md" className={styles.homeContainer}>
      <DouMiIntroduction avatarSize={120} fontSize={16} />
      <DoumiLinks />
      <HottestArticles list={res.list} />
      <FootPrint />
    </Container>
  );
}
export const dynamic = "force-dynamic";
