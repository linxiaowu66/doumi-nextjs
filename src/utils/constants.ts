export const WebsiteChangelog = [
  {
    title: "博客分类",
    desc1: "增加标签、分类、时间线页面，方便查询",
    desc2: "修复首页调整的链接错误",
    date: "2024/05",
    time: "15 周四",
  },
  {
    title: "博客数据",
    desc1: "博客数据统计迁移至后台，改用echarts实现",
    desc2: "优化一些功能bug",
    date: "2024/03",
    time: "27 周三",
  },
  {
    title: "博客迁移",
    desc1: "由之前的Malagu框架迁移到Nextjs框架，适配SSR",
    desc2: "优化一些页面的展示，将数据报表页面挪到后台",
    date: "2024/03",
    time: "08 周五",
  },
  {
    title: "博客列表页改写",
    desc1: "重新设计博客列表页",
    desc2: "增加分享功能，增加博文目录，增加博文数据概况",
    date: "2020/03",
    time: "31 周二",
  },
  {
    title: "重构博客",
    desc1: "使用malagu框架重构整个博客的实现",
    desc2: "博客的整体UI风格全新呈现",
    date: "2020/02",
    time: "09 周日",
  },
  {
    title: "接入gitalk评论系统，增加渠道曝光",
    desc1: "11月21号，弃用disqus评论系统，改用gitalk评论系统，好用不止一点点~",
    desc2: "11月21号，优化SEO，增加小程序曝光，优化博客详情页底部展示信息",
    date: "2019/11",
    time: "21 周四",
  },
  {
    title: "抽离controller主逻辑，支持api请求获取数据",
    desc1:
      "01月04号，抽离controller的主逻辑，支持api请求，不再单一支持服务端渲染",
    desc2: "01月05号，新增8个api，覆盖完整博客的请求，为小程序和RN版本提供接口",
    date: "2019/01",
    time: "04 周六",
  },
  {
    title: "迁移网站到https，删掉些功能，添加新东西",
    desc1:
      "05月12号，升级网站到https,05月13号，增加[关于豆米](https://blog.5udou.cn/aboutDouMi)页面",
    desc2: "05月13号，增加[米喳简历](https://blog.5udou.cn/resume/mizha)页面",
    date: "2018/05",
    time: "13 周日",
  },
  {
    title: "增加Markdown编辑器对于数学公式渲染的支持",
    desc1: "03月29号，支持数学公式的渲染显示，修复若干个bug",
    desc2:
      '在<a href="https://www.npmjs.com/package/marked">marked</a>解析器的基础上支持数学公式的编辑，并将修改后的包发布到npm上：<a href="https://www.npmjs.com/package/marked-katex">marked-katex</a>',
    date: "2017/03",
    time: "29 周三",
  },
  {
    title: "优化管理后台和统计数据",
    desc1: "02月09号，优化管理后台，增加操作信息框",
    desc2: "优化网站统计数据，修复若干bug",
    date: "2017/02",
    time: "09 周四",
  },
  {
    title: "增加友情链接面板",
    desc1: "01月05号，增加友情链接面板，加大文章标题的可存长度",
    desc2: "新增博客的友情链接，外链到一些推荐的博客网站",
    date: "2017/01",
    time: "05 周四",
  },
  {
    title: "博文列表改版",
    desc1: "12月03号，博文列表改版，使之更加简洁大方。",
    desc2: "新增博客首页图片，方便显示博文列表中的大图,增加网站形象性",
    date: "2016/12",
    time: "03 周六",
  },
  {
    title: "改进网站的SEO",
    desc1: "10月10号，修改部分代码，增强网站的SEO。",
    desc2:
      "修改页面的title、description等meta，提高网站的SEO。添加google的verification文件，提高谷歌收录网站的可能性",
    date: "2016/10",
    time: "10 周一",
  },
  {
    title: "完成文章搜索功能",
    desc1: "9月11号，完成网站的首页以及后台的文章搜索功能。",
    desc2: "暂时只提供对博客的标题搜索，不支持全文搜索。",
    date: "2016/09",
    time: "11 周日",
  },
  {
    title: "本站正式上线",
    desc1: "8月8号，完成所有博客的基本功能，除了关于豆米的网页暂时没完成之外。",
    desc2:
      "豆米的博客意在分享web开发的点点滴滴，前端和后台都会有所涉及，再适当分享些生活的精彩。",
    date: "2016/08",
    time: "08 周一",
  },
];

export const geoCoordMap: Record<string, number[]> = {
  海门: [121.15, 31.89],
  鄂尔多斯: [109.781327, 39.608266],
  招远: [120.38, 37.35],
  舟山: [122.207216, 29.985295],
  齐齐哈尔: [123.97, 47.33],
  盐城: [120.13, 33.38],
  赤峰: [118.87, 42.28],
  青岛: [120.33, 36.07],
  乳山: [121.52, 36.89],
  金昌: [102.188043, 38.520089],
  泉州: [118.58, 24.93],
  莱西: [120.53, 36.86],
  日照: [119.46, 35.42],
  胶南: [119.97, 35.88],
  南通: [121.05, 32.08],
  拉萨: [91.11, 29.97],
  云浮: [112.02, 22.93],
  梅州: [116.1, 24.55],
  文登: [122.05, 37.2],
  上海: [121.48, 31.22],
  攀枝花: [101.718637, 26.582347],
  威海: [122.1, 37.5],
  承德: [117.93, 40.97],
  厦门: [118.1, 24.46],
  汕尾: [115.375279, 22.786211],
  潮州: [116.63, 23.68],
  丹东: [124.37, 40.13],
  太仓: [121.1, 31.45],
  曲靖: [103.79, 25.51],
  烟台: [121.39, 37.52],
  福州: [119.3, 26.08],
  瓦房店: [121.979603, 39.627114],
  即墨: [120.45, 36.38],
  抚顺: [123.97, 41.97],
  玉溪: [102.52, 24.35],
  张家口: [114.87, 40.82],
  阳泉: [113.57, 37.85],
  莱州: [119.942327, 37.177017],
  湖州: [120.1, 30.86],
  汕头: [116.69, 23.39],
  昆山: [120.95, 31.39],
  宁波: [121.56, 29.86],
  湛江: [110.359377, 21.270708],
  揭阳: [116.35, 23.55],
  荣成: [122.41, 37.16],
  连云港: [119.16, 34.59],
  葫芦岛: [120.836932, 40.711052],
  常熟: [120.74, 31.64],
  东莞: [113.75, 23.04],
  河源: [114.68, 23.73],
  淮安: [119.15, 33.5],
  泰州: [119.9, 32.49],
  南宁: [108.33, 22.84],
  营口: [122.18, 40.65],
  惠州: [114.4, 23.09],
  江阴: [120.26, 31.91],
  蓬莱: [120.75, 37.8],
  韶关: [113.62, 24.84],
  嘉峪关: [98.289152, 39.77313],
  广州: [113.23, 23.16],
  延安: [109.47, 36.6],
  太原: [112.53, 37.87],
  清远: [113.01, 23.7],
  中山: [113.38, 22.52],
  昆明: [102.73, 25.04],
  寿光: [118.73, 36.86],
  盘锦: [122.070714, 41.119997],
  长治: [113.08, 36.18],
  深圳: [114.07, 22.62],
  珠海: [113.52, 22.3],
  宿迁: [118.3, 33.96],
  咸阳: [108.72, 34.36],
  铜川: [109.11, 35.09],
  平度: [119.97, 36.77],
  佛山: [113.11, 23.05],
  海口: [110.35, 20.02],
  江门: [113.06, 22.61],
  章丘: [117.53, 36.72],
  肇庆: [112.44, 23.05],
  大连: [121.62, 38.92],
  临汾: [111.5, 36.08],
  吴江: [120.63, 31.16],
  石嘴山: [106.39, 39.04],
  沈阳: [123.38, 41.8],
  苏州: [120.62, 31.32],
  茂名: [110.88, 21.68],
  嘉兴: [120.76, 30.77],
  长春: [125.35, 43.88],
  胶州: [120.03336, 36.264622],
  银川: [106.27, 38.47],
  张家港: [120.555821, 31.875428],
  三门峡: [111.19, 34.76],
  锦州: [121.15, 41.13],
  南昌: [115.89, 28.68],
  柳州: [109.4, 24.33],
  三亚: [109.511909, 18.252847],
  自贡: [104.778442, 29.33903],
  吉林: [126.57, 43.87],
  阳江: [111.95, 21.85],
  泸州: [105.39, 28.91],
  西宁: [101.74, 36.56],
  宜宾: [104.56, 29.77],
  呼和浩特: [111.65, 40.82],
  成都: [104.06, 30.67],
  大同: [113.3, 40.12],
  镇江: [119.44, 32.2],
  桂林: [110.28, 25.29],
  张家界: [110.479191, 29.117096],
  宜兴: [119.82, 31.36],
  北海: [109.12, 21.49],
  西安: [108.95, 34.27],
  金坛: [119.56, 31.74],
  东营: [118.49, 37.46],
  牡丹江: [129.58, 44.6],
  遵义: [106.9, 27.7],
  绍兴: [120.58, 30.01],
  扬州: [119.42, 32.39],
  常州: [119.95, 31.79],
  潍坊: [119.1, 36.62],
  重庆: [106.54, 29.59],
  台州: [121.420757, 28.656386],
  南京: [118.78, 32.04],
  滨州: [118.03, 37.36],
  贵阳: [106.71, 26.57],
  无锡: [120.29, 31.59],
  本溪: [123.73, 41.3],
  克拉玛依: [84.77, 45.59],
  渭南: [109.5, 34.52],
  马鞍山: [118.48, 31.56],
  宝鸡: [107.15, 34.38],
  焦作: [113.21, 35.24],
  句容: [119.16, 31.95],
  北京: [116.46, 39.92],
  徐州: [117.2, 34.26],
  衡水: [115.72, 37.72],
  包头: [110, 40.58],
  绵阳: [104.73, 31.48],
  乌鲁木齐: [87.68, 43.77],
  枣庄: [117.57, 34.86],
  杭州: [120.19, 30.26],
  淄博: [118.05, 36.78],
  鞍山: [122.85, 41.12],
  溧阳: [119.48, 31.43],
  库尔勒: [86.06, 41.68],
  安阳: [114.35, 36.1],
  开封: [114.35, 34.79],
  济南: [117, 36.65],
  德阳: [104.37, 31.13],
  温州: [120.65, 28.01],
  九江: [115.97, 29.71],
  邯郸: [114.47, 36.6],
  临安: [119.72, 30.23],
  兰州: [103.73, 36.03],
  沧州: [116.83, 38.33],
  临沂: [118.35, 35.05],
  南充: [106.110698, 30.837793],
  天津: [117.2, 39.13],
  富阳: [119.95, 30.07],
  泰安: [117.13, 36.18],
  诸暨: [120.23, 29.71],
  郑州: [113.65, 34.76],
  哈尔滨: [126.63, 45.75],
  聊城: [115.97, 36.45],
  芜湖: [118.38, 31.33],
  唐山: [118.02, 39.63],
  平顶山: [113.29, 33.75],
  邢台: [114.48, 37.05],
  德州: [116.29, 37.45],
  济宁: [116.59, 35.38],
  荆州: [112.239741, 30.335165],
  宜昌: [111.3, 30.7],
  义乌: [120.06, 29.32],
  丽水: [119.92, 28.45],
  洛阳: [112.44, 34.7],
  秦皇岛: [119.57, 39.95],
  株洲: [113.16, 27.83],
  石家庄: [114.48, 38.03],
  莱芜: [117.67, 36.19],
  常德: [111.69, 29.05],
  保定: [115.48, 38.85],
  湘潭: [112.91, 27.87],
  金华: [119.64, 29.12],
  岳阳: [113.09, 29.37],
  长沙: [113, 28.21],
  衢州: [118.88, 28.97],
  廊坊: [116.7, 39.53],
  菏泽: [115.480656, 35.23375],
  合肥: [117.27, 31.86],
  武汉: [114.31, 30.52],
  大庆: [125.03, 46.58],
  台北: [121.514449, 25.028879],
  高雄: [120.285385, 22.643712],
  嘉义: [120.457101, 23.474124],
};
