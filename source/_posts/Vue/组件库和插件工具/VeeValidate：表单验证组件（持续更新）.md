---
title: VeeValidate：表单验证组件（持续更新）
author: Cynthia
categories:
  - 组件库和插件工具
tags:
  - [表单验证]
date: 2019-05-21 18:24:50
---

🐰
...
<!--more-->

> github：<https://github.com/baianat/vee-validate>
>
> 官方文档：<https://baianat.github.io/vee-validate/guide/>



验证规则：<https://baianat.github.io/vee-validate/guide/rules.html>



## 教程文章

- [一个简单显而易见的教程](https://blog.csdn.net/docallen/article/details/73650179)



## 使用方式

首先安装

```shell
npm install vee-validate --save
```



使用 npm 安装，注入依赖。这边配置使用主要是3个文件：

- **vee-validate.js** ：自己创建一个文件，单独将关于表单验证的代码抽离出来，从 node_modules 中引入 VeeValidate，配置相关项 
- **main.js** ：vue 主文件入口，引入validate.js 
- **form.vue** ：表单组件



### main.js 引入

引入 `vee-validate.js` 文件，将相关配置独立在一个文件夹里

```js
import './utils/vee-validate.js'
```



### vee-validate.js 基本配置

先展示一个全部代码的示例

```js
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'	// 支持中文错误提示的文件
import VueI18n from 'vue-i18n'	// i18n国际化
import { byteSize, checkTel, CheckPassWord } from './validate.js'	// 验证规则

Vue.use(VueI18n)	// 使用i18n国际化

const i18n = new VueI18n({
  locale: 'zh_CN'
})

// 配置中文错误提示
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
})

// 自定义验证规则
function customMethod() {
  Validator.extend('mobile', {
    getMessage: () => '请输入正确的固话或者手机号码',
    validate: value => checkTel(value)
  })
  Validator.extend('company', {
    getMessage: () => '请输入50字节以内的公司名称',
    validate: value => byteSize(value, 50)
  })
  Validator.extend('department', {
    getMessage: () => '请输入20字节以内的部门名称',
    validate: value => byteSize(value, 20)
  })
  Validator.extend('password', {
    getMessage: value => value + '需要由字母和数字组成',
    validate: value => CheckPassWord(value)
  })
  Validator.extend('psw', {
    getMessage: () => '密码由字母和数字组成，固定6位',
    validate: value => {
      if (value === null || value.length !== 6) {
        return false
      }
      CheckPassWord(value)
      return true
    }
  })
}
customMethod()

// 自定义validate
const Dictionary = {
  zh_CN: {
    messages: {
      required: field => '请输入' + field
    },
    attributes: {
      userName: '用户名',
      companyName: '公司名称'
    }
  }
}
// 自定义validate error 信息
Validator.localize(Dictionary)


```



#### 引入

> 引入表单验证依赖文件

```js
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'	// 支持中文错误提示的文件
import VueI18n from 'vue-i18n';	// i18n国际化
```



#### 配置中文版错误提示

```js
Vue.use(VueI18n)	// 使用i18n国际化

const i18n = new VueI18n({
  locale: 'zh_CN'
})

// 配置中文错误提示
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
})
```



#### 自定义表单验证提示语

为了避免下面的场景

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190522155754.png)

我们来自定义表单验证提示语

⭐：注意！除了这个办法还可以直接在组件中操作：具体看组件中使用

- `message` ： 提示语
- `attributes`： filed

```js
// 自定义validate
const Dictionary = {
  zh_CN: {
    messages: {
      required: field => '请输入' + field
    },
    attributes: {
      userName: '用户名',
      companyName: '公司名称'
    }
  }
}
// 自定义validate error 信息
Validator.localize(Dictionary)
```



#### 扩展自定义的验证

> 扩展自定义的验证，比如这边自定义了电话的表单验证

···

```js
Validator.extend('mobile', {
    getMessage: () => '请输入正确的固话或者手机号码',
    validate: value => checkTel(value)	// checkTel（）是具体的验证方法
  })
```



### 在组件中使用

> 比如：form.vue 组件中的代码

```html
<input v-model="name" v-validate="'required|min:3|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" placeholder="账户">
<span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span>
```

这是其中的一个 input 拿出来讲：

1、首先在 input 中你得有 name 属性。

2、v-validate 属性：管道形式进行过滤，验证条件。

3、span 就是错误提示 。



#### data-vv-as

为了避免下面的场景

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190522155754.png)

我们可以加入`data-vv-as`，比如：

```html
 <input type="text"
        v-validate="'required'"
        name="departmentName"
        data-vv-as="部门名称"
        v-model="form.department"
        placeholder="请输入部门名称">
```

这样就会提示 `data-vv-as` 中定义的字段



#### 一进入就验证

> 比如我们想达到：一开始进入的时候按钮是不可点的的效果

配置：`v-validate.initial=""`

```html
 <input type="text"
        v-validate.initial="'required|max:6|alpha_num'"
        name="userName"
        v-model="form.username"
        placeholder="请输入用户名">
```





#### v-validate

```
v-validate="'required|email'"
v-validate 是由该插件提供的指令 作用于 html 上
"'required|email'" 字段验证的规则，注意双引号之内必须有单引号，多个规则之间用 | 连接
```



一些示例：

```js
v-validate="'required|min:3|alpha'" 
```





#### 错误提示

> errors.has ('email') 判断 emai 字段值是否验证通过 email 内容指向 input 的 name 属性 必须设置成一样 这意味着要用该插件，input 上的 **name** 属性**必须设置**

- `errors.first ('field')`： 显示**字段** field 的第一个出错信息
- `errors.collect ('field')`: 显示**字段** field 的所有出错信息*(list)*
- `errors.has ('field')`： 判断 fileds **字段**是否检验有误*(true/false)*
- `erros.all ()`: 显示**表单**所有的出错信息*(list)*
- `errors.any ()`： 判断**表单**是否有错误*(true/false)*



## 常用实例

### 校验两次输入的密码是否一致

```html
<div>
	<mt-field label="密码" placeholder="请输入密码" v-validate="'required'" data-vv-name="password" 
	:class="{'is-danger': errors.has('password') }" :type="passwordType" :attr="{maxlength:20}" 
	v-model="user.password">
	</mt-field>
	<div v-show="errors.has('password')">
		<p>{{ errors.first('password') }}</p>
	</div>
</div>
<div>
	<mt-field label="确认密码" placeholder="请再次输入密码" v-validate="{'required': 'true', 'is': user.password}" data-vv-name="repassword" 
	:class="{'is-danger' :errors.has('repassword') }" :type="passwordType" :attr="{maxlength:20}" 
	v-model="user.repassword">
	</mt-field>
	<div v-show="errors.has('repassword')">
		<p>{{ errors.first('repassword') }}</p>
	</div>
</div>
```







<br>

---

> 参考文章：
>
> <https://blog.csdn.net/docallen/article/details/73650179>

