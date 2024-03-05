import * as React from "react";
import { GitHub, LocationOn, Link, Twitter } from "@mui/icons-material";
import { DouMiAvatar } from "../DoumiAvatar";
import { Grid, Link as MuiLink } from "@mui/material";
import styles from "./index.module.css";

export interface IntroProps {
  avatarSize: number;
  fontSize: number;
}

export function DouMiIntroduction(props: IntroProps) {
  return (
    <div>
      <DouMiAvatar avatarSize={props.avatarSize} />
      <header className={styles.introTitle}>豆米</header>
      <p className={styles.introDesc}>
        豆米目前生活在“上有天堂，下有苏杭”的杭州，美不胜收的美景之地也收获着甜蜜恩爱的生活。豆米热爱前端，热爱互联网，豆米是洋芋(土豆-豆)和米喳(米)的简称。
      </p>
      <Grid container spacing={1}>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink
            href="https://www.amap.com/search?id=B0FFHEF1TQ&city=330103&geoobj=119.961315%7C30.173403%7C120.4557%7C30.407304&query_type=IDQ&zoom=12"
            color="inherit"
          >
            {/* 这里跳转到高德地图 */}
            <LocationOn color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://5udou.cn" color="inherit">
            {/* 这里跳转到结婚纪念网站 */}
            <Link color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://github.com/linxiaowu66" color="inherit">
            {/* 这里跳转到Github主页 */}
            <GitHub color="secondary" />
          </MuiLink>
        </Grid>
        <Grid item container alignItems="center" xs={1} sm={1}>
          <MuiLink href="https://twitter.com/linxiaowu666" color="inherit">
            {/* 这里跳转到Twitter */}
            <Twitter color="secondary" />
          </MuiLink>
        </Grid>
      </Grid>
    </div>
  );
}
