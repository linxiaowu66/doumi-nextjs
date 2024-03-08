import * as React from "react";

import "./not-found.css";

export default function NotFound() {
  return (
    <div className="notfoud-container">
      <div className="img-404"></div>
      <p className="notfound-p">哎呀迷路了......</p>
      <div className="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>没有这个页面</li>
          <li>原来的页面不存在了</li>
          <li>我们的服务器被外星人劫持了</li>
        </ul>
      </div>
      <div className="notfound-btn-container">
        <a className="notfound-btn" href="https://blog.5udou.cn">
          返回
        </a>
      </div>
    </div>
  );
}
