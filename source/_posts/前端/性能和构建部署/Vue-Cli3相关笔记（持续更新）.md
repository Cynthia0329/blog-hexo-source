---
title: Vue-Cli3相关笔记（持续更新）
author: Cynthia
categories:
  - 前端
  - 性能和构建部署

date: 2018-12-05 13:15:36
tags:
---

🐰

<!--more-->

<blockquote class="blockquote-center">

官方文档：https://cli.vuejs.org/zh/guide/

</blockquote>

> 配置文档：<https://cli.vuejs.org/zh/config/>

## 脚手架搭建

### 安装

`首先注意一下：Vue Cli要求Node.js版本8或更高，也可以在同一台计算机上管理多个版本的Node。`

```shell
npm install -g @vue/cli
# or
yarn global add @vue/cli
```

检查安装

```shell
vue --version
```

### 创建项目

#### 手动创建

[官方教程](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

```shell
vue create my-project
```



#### 通过图形化界面创建 

```shell
vue ui
```



![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20191016083702.png)









## 项目配置

### 配置不同的打包环境

#### 新建文件

在目录里创建3个新的文件 

- .env 文件

  ```js
  // 开发环境
  NODE_ENV=dev
  VUE_APP_URL= "我是测试接口地址"
  ```

- .env.dev 文件

  ```js
  // 开发环境
  NODE_ENV=dev
  VUE_APP_URL= "我是测试接口地址"
  ```

- .env.prod 文件

  ```js
  // 生产环境
  NODE_ENV=prod
  VUE_APP_URL = "我是生产接口地址"
  ```

  

#### 在packge.json中配置打包环境

```js
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build --mode dev",		// 打包测试
    "build:test": "vue-cli-service build --mode prod"	// 打包生产
  },
```



   <br>

- npm run serve            默认会使用.env文件 
- npm run build:dev     默认会使用.env.dev文件 
- npm run build:prod   默认会使用.env.prod文件 



#### 本地预览

打包后在本地预览,你需要启动一个node服务：

```js
npm install -g serve  	//全局安装服务
serve -s dist   	// 启动服务预览
```

在main.js中获取当前的环境

```js
// 打印当前所处的环境
console.log("打包的环境是：" + process.env.NODE_ENV)
console.log("接口地址为：" + process.env.VUE_APP_URL)
```



### babel配置文件

为了保证ES版本的兼容，我们还需要配置一下`babel.config.js` 文件的内容

```js

```



### 浏览器css兼容处理文件配置

`.browserslistrc` 文件

```js
> 1%
last 2 versions
not ie <= 8
复制代码
```

`.postcssrc.js` 文件

```js
module.exports = {
  plugins: {
    autoprefixer: {},
    //'postcss-px2rem': {
    //  remUnit: 75,
    //},
    'postcss-px2rem-exclude': {
      remUnit: 75,
      exclude: /node_modules|assets|login|main/gi,
    },
  }
};
```



### eslint配置

`.eslintrc.js` 的配置可以先前直接在图形化界面配置

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
```

 

### .browserslistrc文件

- [browserslist详解](https://www.jianshu.com/p/d45a31c50711)
- [browserslist使用手册](https://www.jianshu.com/p/bbe85745e655)



根目录中多了一个.browserslist文件，可以指定项目的目标浏览器的范围 

用于转译的 JavaScript 特性和添加CSS 浏览器前缀，可以**减少兼容代码提高代码质量** 

如果想少一个文件，你也可以在package.json中添加browserslist字段，参数是一个数组

| 参数             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| > 1%             | 全球超过1%人使用的浏览器                                     |
| > 5% in US       | 使用美国使用情况统计，接受两个字母的[国家/地区代码](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) |
| > 5% in my stats | 使用[自定义使用数据](https://github.com/browserslist/browserslist#custom-usage-data) |
| last 2 versions  | 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本        |
| Firefox ESR      | 火狐最新版本                                                 |
| Firefox > 20     | 指定版本范围                                                 |
| not ie <=8       | 方向排除部分版本                                             |
| Firefox 12.1     | 指定浏览器版本                                               |
| since 2013       | 2013年之后发布的所有版本                                     |

默认配置

 ```js
// 默认配置
> 1%
last 2 versions
not ie <= 8

// 
> 1%
last 4 versions

// 
> 1%
last 4 versions
ie 10

 ```



 

 

 

 

###  package.json命令汇总

```js
// dev:vue-cli-service serve

  --open    在服务器启动时打开浏览器

  --copy    在服务器启动时将 URL 复制到剪切版

  --mode    指定环境模式 (默认值：development)

  --host    指定 host (默认值：0.0.0.0)

  --port    指定 port (默认值：8080)

  --https   使用 https (默认值：false)


// build:vue-cli-service build

  --modern 使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。

  --target 允许你将项目中的任何组件以一个库或 Web Components 组件的方式进行构建。更多细节请查阅构建目标。

  --report 和 --report-json 会根据构建统计生成报告，它会帮助你分析包中包含的模块们的大小

```



### 现代模式

 为了兼容那些不支持js新特性的浏览器我们需要Babel转译，但转译后的代码笨重冗长，这次3.x提供了一个现代模式

```shell
vue-cli-service build --modern
```

Vue CLI 会产生两个应用的版本：

> 一个现代版的包，面向支持 [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/) 的现代浏览器，另一个旧版的包，面向不支持的旧浏览器。

最酷的是这里没有特殊的部署要求。其生成的 HTML 文件会自动使用 [Phillip Walton 精彩的博文](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)中讨论到的技术：

- 现代版的包会通过 `<script type="module">` 在被支持的浏览器中加载；它们还会使用 `<link rel="modulepreload">` 进行预加载。
- 旧版的包会通过 `<script nomodule>` 加载，并会被支持 ES modules 的浏览器忽略。
- 一个针对 Safari 10 中 `<script nomodule>` 的修复会被自动注入。

对于一个 Hello World 应用来说，现代版的包已经小了 16%。在生产环境下，现代版的包通常都会表现出显著的解析速度和运算速度，从而改善应用的加载性能

 




## config.js配置

### 参考配置

- [基于vue-cli3.x下，配合vuex、vue-router、iView、axios、scss、amfe-flexible、vConsole等等等](https://github.com/trsoliu/vue-cli3.x-configure) 
- [vueCli3搭建的vue-vuex-router开发模版，PC、Mobile两个分支开箱即用，支持scss、vuex、axios、多语言、过滤器、仓库快速提交等](https://github.com/wangyupo/vue-vuex-router) 



### 基本配置

#### 单项
```js
 // 基本路径
 // baseUrl: '/', // 3.3之前
 publicPath: '/', // 3.3之后
     
 // 输出文件目录
 outputDir: 'dist',
     
 // eslint-loader 是否在保存的时候检查
 lintOnSave: true,
```
#### 多项
```js    
 // webpack配置
 chainWebpack: () => {},
 configureWebpack: () => {},
    
 // vue-loader 配置项
 vueLoader: {},
    
 // 生产环境是否生成 sourceMap 文件
 productionSourceMap: true,
    
 // css相关配置
 css: {
  // 是否使用css分离插件 ExtractTextPlugin
  extract: true,
  // 开启 CSS source maps?
  sourceMap: false,
  // css预设器配置项
  loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  modules: false
 },
    
 // webpack-dev-server 相关配置
 devServer: {
  open: true,
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: null, // 设置代理
  before: app => {}
 },
    
 // 第三方插件配置
 pluginOptions: {
  // ...
 }
```





### css配置

#### 基本

```js
css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
```



#### css.loaderOptions

> 配置文档：https://cli.vuejs.org/zh/config/#css-loaderoptions

```js
module.exports = {
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      sass: {
        // 这里的选项会传递给 sass-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  }
}
```



##### sass-loader 配置


- 示例1

  ```js
  sass: {
    	// 一次配置，全局使用，这个scss 因为每个文件都要引入
        data: @import "./src/assets/style/bass.scss";
      }
  ```
- 示例2

  ```js
  sass: {
          // 向全局sass样式传入共享的全局变量
          data: @import "~assets/scss/flex.scss";$src: "${process.env.VUE_APP_SRC}";
        }
  ```
- 示例3

  ```js
  sass: {
  				//设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
  				data: `
  				$baseUrl: "/";
  				@import '@/assets/scss/_common.scss';
  				`
  			}
  ```
- 示例4

  ```js
  sass: {
                  data: `
                  @import "@/style/mixin.scss";
                  @import "@/style/_var.scss";
                  `
              }
  ```



注意新版的sass可能要这样配置：

https://segmentfault.com/a/1190000020392688?utm_source=tag-newest







### webpack配置

主要分为以下两个模块

```js
chainWebpack: () => {},	// 链式的方式进行配置
configureWebpack: () => {},
```



#### 配置别名

- 在 `chainWebpack` 中配置

  ```js
    chainWebpack: (config) => {
      config.resolve.alias
        .set('@$', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
        .set('layout', resolve('src/views'))
        .set('utils', resolve('src/utils'))
    },
  ```





#### 自定义静态资源打包路径

##### css输出配置

更改该配置需要先安装MiniCssExtractPlugin插件到开发依赖中，如下： 

```shell
npm install --save-dev mini-css-extract-plugin
```

然后在vue.config.js文件中添加相关配置到chainWebpack即可，如下所示： 

```js
module.exports = {
    chainWebpack: config => {
        // css output config
        let miniCssExtractPlugin = new MiniCssExtractPlugin(
            {
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].css'
            }
        )
        config.plugin('extract-css').use(miniCssExtractPlugin)
    },
}
```















#### 链式与显示的对比

实例1：

```js
module.exports = {
    
    configureWebpack: config => {
        // js output config
        config.output.filename = '[name].[contenthash:8].js'
        config.output.chunkFilename = '[name].[contenthash:8].js'
    },
    
    chainWebpack: config => {
    const filename = `static/js/[name]-${filenameHashing ? '[contenthash:8]' : ''}-${Timestamp}.js` // name+哈希值+时间戳控制缓存
      config.output.filename(filename).chunkFilename(filename)
   }
}
```









## 小Tip

### 使用inspec功能查看config

本身配置方面没有啥特别好说的，官方[文档](https://link.juejin.im?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2F)已经写得很详细了。

这次更新基本上就是基于 [webpack-chain](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fneutrinojs%2Fwebpack-chain) 把之前的 webpack 配置迁移了一遍，因为`vue-cli`帮你做了很多默认配置，所有可以省去一些代码。当然这种`out-of-the-box`的工具利弊也很明显，它能快速上手，大部分简单场景无需任何额外配置基本就能用了。

但对于复杂度高的或者自定义性强的项目来说，配置复杂度可能没有减少太多。它要求你不仅要对 webpack 或者相关工程化的东西很很熟悉，你还要对`vue-cli`做的一些默认配置和参数也有有一定了解，时不时要去看一下源码它到底干了啥，有的时候它的一些 plugin 出现了问题还不太好解决。

而且说实话 `webpack-chain` 的书写也是有些门槛的，大部分情况下我也很难保证自己的配置写对的，还好官方提供了`inspec`功能，能让配置简单了不少。

**当你想知道自己的 `vue-config.js` 里的配置到底对不对的时候**，你可以在命令行里执行`vue inspect > output.js`,它会将你最终生成的`config`展现在`output.js`之中，不过它默认显示的是开发环境的配置。

如果你想查看其它环境的配置可以通过`vue inspect --mode production > output.js`。在写构建配置的时候这个功能很有帮助，同时也能帮助你了解`vue-cli`在构建时到底帮你做了些什么。



### 取消路由懒加载

这里还有一个黑科技，看过我之前文章的小伙伴应该还有印象，我一般在开发环境是**不使用路由懒加载**的，因为这样会导致热更新速度变慢，具体的可以看之前的 [文章](https://link.juejin.im?target=https%3A%2F%2Fpanjiachen.gitee.io%2Fvue-element-admin-site%2Fzh%2Fguide%2Fadvanced%2Flazy-loading.html%23%25E8%25B7%25AF%25E7%2594%25B1%25E6%2587%2592%25E5%258A%25A0%25E8%25BD%25BD)，在`vue-cli@3`中可以更简单的实现

你只要在`.env.development`环境变量配置文件中设置`VUE_CLI_BABEL_TRANSPILE_MODULES:true`就可以了。

它的实现逻辑和原理与之前还是一样的，还是基于 [plugins babel-plugin-dynamic-import-node](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fbabel-plugin-dynamic-import-node) 来实现的。

之所以在`vue-cli`中只需要设置一个变量就可以了，是借用了`vue-cli`它的默认配置，它帮你代码都写好了。

通过阅读 [源码](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-cli%2Fblob%2Fdev%2Fpackages%2F%40vue%2Fbabel-preset-app%2Findex.js) 可知，`vue-cli`会通过`VUE_CLI_BABEL_TRANSPILE_MODULES`这个环境变量来区分是否使用`babel-plugin-dynamic-import-node`，所以我们只要开其它就可以。虽然它的初衷是为了单元测试的，但正好满足了我们的需求。









<br>

>参考文章：
>
>https://juejin.im/post/5cdd47c16fb9a031fe3becfb#heading-3


```

```