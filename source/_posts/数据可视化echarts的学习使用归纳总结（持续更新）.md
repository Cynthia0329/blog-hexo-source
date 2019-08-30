---
title: 数据可视化echarts的学习使用归纳总结（持续更新）
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-07-29 15:16:26
---

🐰
...
<!--more-->

>配置手册：https://www.echartsjs.com/option.html#title
>
>官方实例demo：https://www.echartsjs.com/examples/
>
>在线定制：https://echarts.baidu.com/builder.html



## 引入echarts

>[在Vue中使用echarts的两种方式](https://segmentfault.com/a/1190000015453413)

​	









## 使用vue-echarts

> 引入方式：https://github.com/ecomfe/vue-echarts/blob/HEAD/README.zh_CN.md

### 起步

安装

```shell
npm install echarts vue-echarts
```

在 `main.js` 中引入并注册

```js
import ECharts from 'vue-echarts/components/ECharts.vue'
Vue.component('v-chart', ECharts)
```

### 在组件中调用

#### 注册和引入

```html
<template>
	<v-chart :options="echartsOption"/>
</template>

<script>
// ⭐必须引入相关的所有组件！包括legend,dataZoom这类，否则不生效
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  data () {
      echartsOption: {}
}
</script>
```

#### 设置option

建议将具体的option写在方法里

比如：

```js
setoption() {
   let option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };
      this.echartsOption = option
},
```

然后在异步数据获取了之后，再调用该方法

```js
async getData() {
    //  .... await
    this.setOption()
}
```





### 样式修改

```html
<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
```































