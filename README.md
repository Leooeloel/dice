# 项目介绍

本 demo 是基于 [community-app-template](https://github.com/netless-io/community-app-template) 模版开发的互动骰子小工具

![](https://netless-docs.oss-cn-hangzhou.aliyuncs.com/Leo/dice.gif)

## 快速开始
前置条件：至少需要安装了 `git`、`node 16`、`npm 8`

第一步：`git clone git@github.com:Leooeloel/dice.git`

第二步：`cd dice` 找到目录下的 .env.example 文件，重命名为 .env 后，在里面填写必须的白板房间配置环境，参考[配置白板房间](https://github.com/Leooeloel/dice#%E9%85%8D%E7%BD%AE%E7%99%BD%E6%9D%BF%E6%88%BF%E9%97%B4)

第三步：下载项目依赖 `npm install`

第四步：[community-app-template](https://github.com/netless-io/community-app-template) 不同分支提供了多种脚手架，本 demo 是基于 vanilla 开发

第五步：运行项目 `npm start`



## 配置白板房间
 
 第一步需要先开启互动白板服务，获取互动白板项目的安全密钥，参考 [开启和配置互动白板服务](https://docs.agora.io/cn/whiteboard/enable_whiteboard?platform=Web)

第二步需要获取白板房间 UUID 和 ROOMTOKEN，参考[加入房间](https://docs.agora.io/cn/whiteboard/join_whiteboard_room_web)

也可以通过 [白板临时配置环境](https://workshop.netless.link) 来快速获取白板配置环境