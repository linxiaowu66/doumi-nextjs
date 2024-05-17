## 豆米博客

新版豆米博客为了正确使用SEO，并提高网站的渲染性能，使用Next.js来进行SSR。

整个项目没有借助第三方的Nodejs框架，完全使用Next.js提供的能力，另加如下包：

* typeorm：对接Mysql数据库（因为旧版博客也是用的这个，为了保证迁移过来的成本最小，本来想用prisma的）
* next-auth：用于做登录校验
* winston：用于做日志打印
* @mui：组件库（沿用之前旧版的博客页面组件，避免太大改动）
* @giscus/react：整合github提供的Discussion能力，集成为博客的评论系统
* echarts：图表组件库

## 开发

* 先安装包：`pnpm i`

* 初始化本地MYSQL数据库；

* 启动：`pnpm dev`;

* 打开浏览器：`http://localhost:3000`；

### 添加新表

```sql
CREATE TABLE visitcity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cityName VARCHAR(200) NOT NULL UNIQUE,
  count BIGINT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 开发遇到的问题

* 使用最新的mysql服务器的时候，之前配合的是`mysql`包，在新版mysql8中会报错：`Client does not support authentication protocol requested by server; consider upgrading MySQL client`，解决办法是：替换`mysql`包为`mysql2`即可；

* 解决Next.js环境变量的问题： [Default Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables)

* 解决`pnpm build`的时候报错：[Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

> 更多问题参考博客：

## 部署

* 全局安装pm2：

```
pm2 start --name doumiblog pnpm -- start
```

> 部署相关文章参考博客：


## 待办

* [x] 目前的markdown对于一些代码的解析以及引用的样式不好看，优化一下；
* [ ] 对比lighthouse进行极限优化
* [ ] 使用两个layout文件，而不需要每个文件都放BlogContainer组件
* [ ] 思考一种方式进行api的异步错误捕获，并统一返回数据结构
* [ ] 数据管理增加地图展示访问的来源分布在全国哪些省份
* [x] 博客首页增加按照分类、标签、归档的方式展示文章
* [x] 移动端版本，方便后续作为公众号方式推出
