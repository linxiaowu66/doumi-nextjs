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
  `;
  return (
    <html lang="en">
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
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
