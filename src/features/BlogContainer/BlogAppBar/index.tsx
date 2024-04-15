import * as React from "react";
import { headers } from "next/headers";
import { Link } from "@mui/material";
import BlogSearch from "../BlogSearch";
import {
  navigatorListWithLogin,
  navigatorListWithNotLogin,
} from "@/utils/menu";
import { DouMiAvatar } from "../../DoumiAvatar";
import styles from "./index.module.css";
import Logout from "./Logout";

interface AppBarProps {
  // handleDrawerToggle: () => void,
  endpoint?: string;
  isLogin?: boolean;
}

export default function BlogAppBar(props: AppBarProps) {
  const { isLogin } = props;
  const heads = headers();
  const url = heads.get("x-url");
  const urlObject = new URL(url || "http://localhost:3000");

  const navList: {
    name: string;
    subName: string;
    link: string;
    icon?: JSX.Element;
  }[] = !isLogin ? navigatorListWithNotLogin : navigatorListWithLogin;

  return (
    <header key="header" className={styles.navHeader}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <DouMiAvatar avatarSize={46} />
        </div>

        <div className={styles.tabs}>
          {navList.map((item) => {
            const isActive = urlObject.pathname === item.link && item.link;
            return item.name === "退出" ? (
              <Logout {...item} key={item.name} />
            ) : (
              <Link
                className={isActive ? styles.active : ""}
                color="inherit"
                underline={"none"}
                href={item.link}
                key={item.name}
              >
                <span>{item.name}</span>
                <span>{item.subName}</span>
              </Link>
            );
          })}
        </div>
        <BlogSearch isLogin={isLogin || false} />
      </div>
    </header>
  );
}
