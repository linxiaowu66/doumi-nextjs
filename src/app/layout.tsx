import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { NextAuthProvider } from "./providers";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import "github-markdown-css/github-markdown-light.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "豆米的博客",
  description:
    "热爱前端的豆米打造了这么一个记录前端的博客，希望可以和大家一起见证前端的变化和发展，一起进步",
  keywords: "博客 web前端 编程 全栈开发",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scriptContent = `
    // 禁用右键菜单，增加盗用博客图片的成本
    document.oncontextmenu = () => false;
    document.onkeydown = (event) => {
      if (event.key === "F12") {
        event.preventDefault();
      }
    };
    // defer对应本地脚本无效，所以51la加载会在这个之后
    setTimeout(() => {
      LA.init({id:"3IsaMGkz3DziSbD8",ck:"3IsaMGkz3DziSbD8",autoTrack:true})
    }, 5000)
  `;
  return (
    <html lang="zh">
      <script
        id="LA_COLLECT"
        src="//sdk.51.la/js-sdk-pro.min.js"
        defer
      ></script>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      <script
        type="text/javascript"
        async
        src="https://webapi.amap.com/maps?v=2.0&key=7576f5a466e35e0df1f7d87c3110fe50&plugin=AMap.Scale,AMap.ToolBar"
      ></script>
      <body className={inter.className}>
        <StoreProvider>
          <NextAuthProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
