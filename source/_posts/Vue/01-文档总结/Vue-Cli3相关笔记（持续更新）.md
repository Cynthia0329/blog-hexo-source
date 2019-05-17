---
title: Vue-Cli3相关笔记（持续更新）
author: Cynthia
categories:
  - Vue
  - 文档总结
  - 测试

date: 2018-12-05 13:15:36
tags:
---

🐰

<!--more-->

<blockquote class="blockquote-center">
官方文档：https://cli.vuejs.org/zh/guide/
</blockquote>

## vue.config.js

> 配置文档：<https://cli.vuejs.org/zh/config/>

### 一个常用的配置

```js
// vue.config.js
module.exports = {
  baseUrl: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
}
```



### vue-cli@3

本身配置方面没有啥特别好说的，官方[文档](https://link.juejin.im?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2F)已经写得很详细了。

这次更新基本上就是基于 [webpack-chain](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fneutrinojs%2Fwebpack-chain) 把之前的 webpack 配置迁移了一遍，因为`vue-cli`帮你做了很多默认配置，所有可以省去一些代码。当然这种`out-of-the-box`的工具利弊也很明显，它能快速上手，大部分简单场景无需任何额外配置基本就能用了。

但对于复杂度高的或者自定义性强的项目来说，配置复杂度可能没有减少太多。它要求你不仅要对 webpack 或者相关工程化的东西很很熟悉，你还要对`vue-cli`做的一些默认配置和参数也有有一定了解，时不时要去看一下源码它到底干了啥，有的时候它的一些 plugin 出现了问题还不太好解决。

而且说实话 `webpack-chain` 的书写也是有些门槛的，大部分情况下我也很难保证自己的配置写对的，还好官方提供了`inspec`功能，能让配置简单了不少。

**当你想知道自己的 `vue-config.js` 里的配置到底对不对的时候**，你可以在命令行里执行`vue inspect > output.js`,它会将你最终生成的`config`展现在`output.js`之中，不过它默认显示的是开发环境的配置。如果你想查看其它环境的配置可以通过`vue inspect --mode production > output.js`。在写构建配置的时候这个功能很有帮助，同时也能帮助你了解`vue-cli`在构建时到底帮你做了些什么。



这里还有一个黑科技，看过我之前文章的小伙伴应该还有印象，我一般在开发环境是**不使用路由懒加载**的，因为这样会导致热更新速度变慢，具体的可以看之前的 [文章](https://link.juejin.im?target=https%3A%2F%2Fpanjiachen.gitee.io%2Fvue-element-admin-site%2Fzh%2Fguide%2Fadvanced%2Flazy-loading.html%23%25E8%25B7%25AF%25E7%2594%25B1%25E6%2587%2592%25E5%258A%25A0%25E8%25BD%25BD)，在`vue-cli@3`中可以更简单的实现

你只要在`.env.development`环境变量配置文件中设置`VUE_CLI_BABEL_TRANSPILE_MODULES:true`就可以了。

它的实现逻辑和原理与之前还是一样的，还是基于 [plugins babel-plugin-dynamic-import-node](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fbabel-plugin-dynamic-import-node) 来实现的。之所以在`vue-cli`中只需要设置一个变量就可以了，是借用了`vue-cli`它的默认配置，它帮你代码都写好了。通过阅读 [源码](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-cli%2Fblob%2Fdev%2Fpackages%2F%40vue%2Fbabel-preset-app%2Findex.js) 可知，`vue-cli`会通过`VUE_CLI_BABEL_TRANSPILE_MODULES`这个环境变量来区分是否使用`babel-plugin-dynamic-import-node`，所以我们只要开其它就可以。虽然它的初衷是为了单元测试的，但正好满足了我们的需求。





