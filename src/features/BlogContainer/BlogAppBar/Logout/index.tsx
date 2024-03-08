"use client";

import { Tooltip } from "@mui/material";
import { signOut } from "next-auth/react";
import styles from "../index.module.css";

const Logout = (item: {
  name: string;
  subName: string;
  link: string;
  icon?: JSX.Element;
}) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });

    location.href = "/auth/login";
  };
  return (
    <Tooltip title={item.name} enterDelay={500}>
      <a
        href={item.link}
        className={styles.withIcon}
        target="_blank"
        onClick={item.subName === "Exit" ? () => handleLogout() : () => {}}
      >
        {item.icon}
      </a>
    </Tooltip>
  );
};

export default Logout;
