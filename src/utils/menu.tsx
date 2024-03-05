import { ExitToApp, GitHub } from "@mui/icons-material";

export const navigatorListWithNotLogin = [
  {
    name: "首页",
    subName: "Home",
    link: "",
  },
  {
    name: "博客",
    subName: "Blogs",
    link: "/blog/list",
  },
  // {
  //   name: "数据",
  //   subName: "Statistics",
  //   link: "/website/stats",
  // },
  {
    name: "豆米",
    subName: "DouMi",
    link: "/about/doumi",
  },
  {
    name: "本站",
    subName: "Website",
    link: "/about/blog",
  },
  {
    name: "登录",
    subName: "Login",
    link: "/auth/login",
  },
  {
    name: "Github",
    subName: "Github",
    icon: <GitHub />,
    link: "https://github.com/linxiaowu66/doumi-nextjs",
  },
];

export const navigatorListWithLogin = [
  {
    name: "主页",
    subName: "Home",
    link: "/blog/list",
  },
  {
    name: "新建",
    subName: "New",
    link: "/admin/editor",
  },
  {
    name: "博客",
    subName: "Blog",
    link: "/admin",
  },
  {
    name: "退出",
    subName: "Exit",
    icon: <ExitToApp />,
    link: "javascript:void(0)",
  },
];
