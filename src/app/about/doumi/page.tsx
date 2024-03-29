import React from "react";
import { Facebook, Email } from "@mui/icons-material";
import BlogContainer from "@/features/BlogContainer";
import { DouMiIntroduction } from "@/features/DoumiIntro";
import DouMiDetailItem from "./DoumiDetail";

import "./page.css";
import ClickTooltip from "./ClickTooltip";
import Image from "next/image";

const AboutDouMi = () => {
  return (
    <BlogContainer contentClass="doumi-info">
      <DouMiIntroduction avatarSize={120} fontSize={16} />
      <DouMiDetailItem title="关于豆米">
        <p className="detail-intro">
          <span>大洋芋</span>
          ：2012年毕业的豆，从一开始就投入到前端开发的行业中，一去不回头。工作地点曾经在深圳待过两年，之后辗转到杭州，公司也从吉祥腾达科技切换到阿里巴巴，
          目前在杭州XX智能科技。回望前端工作生涯，经历了前端行业剧变的年代，写过JQuery，处理过一大堆的浏览器兼容性。深谙React之道，做事认真负责是她的个人标签，经过鉴定，是个纯正的前端er
        </p>
        <p className="detail-intro">
          <span>小米喳</span>
          ：同样2012年毕业的米，经历就多一些，一开始做的是交换机协议软件开发，焊过电路板，烧录过交换机芯片，各种折腾，纯粹为了满足自己的动手愿望。2014年与豆一起辗转到杭州，
          就职于诺基亚通信，这次玩的是LTE
          4G下行协议开发，玩玩天线、鼓捣鼓捣DSP，后来觉得太闲，果断转行到前端行业，
          2016年8月至今，依然在前端行业折腾，辗转多个行业和公司，从nodejs一路玩到3D，擅长设计复杂的项目架构，实现复杂的业务，一句话：就是爱挑战自己~~
        </p>
      </DouMiDetailItem>
      <DouMiDetailItem title="豆米标签">
        <div className="tags-intro">
          <span>个人标签：</span>
          <div className="category">
            <div>
              大洋芋：<span>热情好客</span>
              <span>话痨</span>
              <span>居家整理好帮手</span>
            </div>
            <div>
              小米喳：<span>好厨师</span>
              <span>细心暖男</span>
              <span>宠娃萌爸</span>
              <span>动手能力强</span>
            </div>
          </div>
        </div>
        <div className="tags-intro">
          <span>技能标签：</span>
          <div className="category">
            <div>
              大洋芋：<span>React</span>
              <span>浏览器兼容性</span>
              <span>中后台</span>
              <span>SSR</span>
            </div>
            <div>
              小米喳：<span>React</span>
              <span>Nodejs</span>
              <span>WebGL</span>
              <span>GIS/Canvas</span>
              <span>前端管理</span>
            </div>
          </div>
        </div>
      </DouMiDetailItem>
      <DouMiDetailItem title="联系豆米">
        <p className="contact-me-tip">
          您可以通过以下方式找到豆米，欢迎交朋友，一起探讨人生、美食、带娃，哦~也可以交流前端知识~我在杭州等你(
          <em>
            点击即复制，由于material-ui没有微信图标，懒得再重新引入新的图标库，所以以facebook的图标代表微信
          </em>
          )
        </p>
        <div className="contact-me-channels">
          <ClickTooltip title="linguang66990@126.com">
            <Email />
          </ClickTooltip>
          <ClickTooltip title="lg997312609">
            <Facebook />
          </ClickTooltip>
        </div>
      </DouMiDetailItem>
      <DouMiDetailItem title="赞赏豆米">
        <p className="doumi-reward-tip">
          如果觉得博客还不错，欢迎Fork，顺便请作者喝杯咖啡哦~
        </p>
        <div className="doumi-reward">
          <Image
            width={160}
            height={160}
            src="https://blogimages2016.oss-cn-hangzhou.aliyuncs.com/homePage/WechatIMG2.jpeg?x-oss-process=image/resize,l_600/crop,x_40,y_190,w_320,h_320/resize,l_160"
            alt="微信收款"
          />
          <Image
            width={160}
            height={160}
            src="https://blogimages2016.oss-cn-hangzhou.aliyuncs.com/homePage/WechatIMG3.jpeg?x-oss-process=image/resize,l_600/crop,x_60,y_120,w_320,h_320/resize,l_160"
            alt="支付宝收款"
          />
        </div>
      </DouMiDetailItem>
    </BlogContainer>
  );
};

export default AboutDouMi;
