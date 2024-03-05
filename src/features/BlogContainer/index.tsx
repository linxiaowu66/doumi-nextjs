import * as React from "react";
import { useScrollTrigger, Snackbar, Zoom, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import FootPrint from "../Footprint";
import BlogAppBar from "./BlogAppBar";
import styles from "./index.module.css";

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  contentClass?: string;
  isLogin?: boolean;
  endpoint?: string;
  isOpenSnackbar?: boolean;
  snackbarMsg?: string;
  closeSnackBar?: () => void;
}

interface ScrollProps {
  children: React.ReactElement;
}
function ScrollTop(props: ScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    target: undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={styles.fixedZoom}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default function BlogContainer(props: ContainerProps) {
  const { isOpenSnackbar } = props;
  const [snackBarOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpenSnackbar !== snackBarOpen) {
      setOpen(isOpenSnackbar || false);
    }
  }, [isOpenSnackbar]);

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
      <Snackbar
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={"top,right"}
        open={snackBarOpen}
        onClose={() => {
          setOpen(false);
          props.closeSnackBar && props.closeSnackBar();
        }}
        message={props.snackbarMsg}
      />
    </div>
  );
}
