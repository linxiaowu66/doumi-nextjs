import * as React from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import FootPrint from "../Footprint";
import BlogAppBar from "./BlogAppBar";
import styles from "./index.module.css";
import ScrollTop from "./ScrollTop";

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  contentClass?: string;
  isLogin?: boolean;
  endpoint?: string;
  isOpenSnackbar?: boolean;
  snackbarMsg?: string;
  closeSnackBar?: () => void;
}

export default function BlogContainer(props: ContainerProps) {
  return (
    <div className={styles.root}>
      <BlogAppBar isLogin={props.isLogin} />
      <main className={`${styles.content} ${props.contentClass}`}>
        <div className={styles.toolbar} id="back-to-top-anchor" />
        {props.children}
        {props.isLogin ? null : <FootPrint />}
      </main>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
  );
}
