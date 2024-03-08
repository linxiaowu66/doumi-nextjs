import { Button } from "@mui/material";
import QRCode from "qrcode.react";
import styles from "../index.module.css";
import React from "react";

const WxShare = (props: { slug: string }) => {
  const [isShowWeixinQrCode, setShow] = React.useState(false);
  const weixinLink = `${`https://blog.5udou.cn/blog/detail/${props.slug}`}`;
  const handleToggleWeixin = () => {
    setShow(!isShowWeixinQrCode);
  };
  return (
    <Button
      size="small"
      color="primary"
      style={{ lineHeight: 1 }}
      className={styles.weixinShare}
      onClick={handleToggleWeixin}
    >
      {/* eslint-disable-next-line max-len */}
      <svg
        color="#60C84D"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="17"
        height="17"
      >
        <path
          d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <div
        className={styles.qrCode}
        style={isShowWeixinQrCode ? { display: "block" } : { display: "none" }}
      >
        <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>微信扫一扫</span>
        <QRCode value={weixinLink} size={94} includeMargin />
      </div>
    </Button>
  );
};

export default WxShare;
