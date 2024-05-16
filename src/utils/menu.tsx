import { ExitToApp, GitHub } from "@mui/icons-material";

export const navigatorListWithNotLogin = [
  {
    name: "首页",
    subName: "Home",
    link: "/",
  },
  {
    name: "博客",
    subName: "Blogs",
    link: "/blog/list",
  },
  {
    name: "标签",
    subName: "Tags",
    link: "/blog/tags",
  },
  {
    name: "分类",
    subName: "Tags",
    link: "/blog/cats",
  },
  {
    name: "时间线",
    subName: "Tags",
    link: "/blog/timeline",
  },
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
    name: "数据",
    subName: "Data",
    link: "/admin/data",
  },
  {
    name: "退出",
    subName: "Exit",
    icon: <ExitToApp />,
    link: "",
  },
];
