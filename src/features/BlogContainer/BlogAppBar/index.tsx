"use client";
import * as React from "react";
// import axios from 'axios';
import { Link, Tooltip } from "@mui/material";
import BlogSearch from "../BlogSearch";
import {
  navigatorListWithLogin,
  navigatorListWithNotLogin,
} from "@/utils/menu";
import { DouMiAvatar } from "../../DoumiAvatar";
import styles from "./index.module.css";
import { signOut } from "next-auth/react";

interface AppBarProps {
  // handleDrawerToggle: () => void,
  endpoint?: string;
  isLogin?: boolean;
}

export default function BlogAppBar(props: AppBarProps) {
  const { isLogin } = props;
  const handleLogout = async () => {
    await signOut({ redirect: false });

    location.href = "/auth/login";
  };

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
            const isActive = location.pathname.match(item.link) && item.link;
            return item.icon ? (
              <Tooltip title={item.name} enterDelay={500}>
                <a
                  href={item.link}
                  className={styles.withIcon}
                  target="_blank"
                  onClick={
                    item.subName === "Exit" ? () => handleLogout() : () => {}
                  }
                >
                  {item.icon}
                </a>
              </Tooltip>
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
        <BlogSearch />
      </div>
    </header>
  );
}
