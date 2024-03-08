"use client";
import { useScrollTrigger, Zoom } from "@mui/material";
import styles from "../index.module.css";

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

export default ScrollTop;
