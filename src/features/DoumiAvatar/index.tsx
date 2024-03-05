import * as React from "react";
import { Avatar } from "@mui/material";
import styles from "./index.module.css";
export interface AvatarProps {
  avatarSize: number;
}

export function DouMiAvatar(props: AvatarProps) {
  const { avatarSize } = props;
  return (
    <div className={styles.doumiAvatar}>
      <Avatar
        alt="豆米的画像"
        src={"/douMi.jpg"}
        className={styles.avatar}
        sx={{ width: avatarSize, height: avatarSize }}
      />
    </div>
  );
}
