---
title: hexo相关的实用插件
author: Cynthia
categories:
  - Hexo博客
tags: []
date: 2019-04-26 14:37:34
---

集中整理一些hexo相关的插件

<!--more-->

## 页面实时刷新插件

[hexo-browsersync](https://github.com/hexojs/hexo-browsersync/)

**使用方法**

- 首先在项目目录下安装 `hexo-browsersync` 插件

    ```shell
    $ cd hexo_project/
    $ npm install hexo-browsersync --save
    ```

- 然后运行 hexo server, 看到以下内容说明启动成功

    ```shell
    $ hexo s
    [BS] Access URLs:
     --------------------------------------
              UI: http://localhost:3001
     --------------------------------------
     UI External: http://192.168.191.1:3001
     --------------------------------------
    INFO  Start processing
    INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
    ```
- 最后运行 `http://localhost:4000`，另一边编辑博客这边运行的页面也会实时更新