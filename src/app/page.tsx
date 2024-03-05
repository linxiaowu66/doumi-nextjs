import styles from "./page.module.css";
import { Container } from "@mui/material";
import { DouMiIntroduction } from "@/features/DoumiIntro";
import DoumiLinks from "@/features/DoumiLink";
import FootPrint from "@/features/Footprint";

export default function Home() {
  return (
    <Container maxWidth="md" className={styles.homeContainer}>
      <DouMiIntroduction avatarSize={120} fontSize={16} />
      <DoumiLinks />
      {/* <HottestArticles list={response} /> */}
      <FootPrint />
    </Container>
  );
}
