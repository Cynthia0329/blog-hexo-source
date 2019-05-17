

## Koa

> [Koa](https://koajs.com/) 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

Koa 和 Express 的设计风格非常类似，底层也都是共用的[同一套 HTTP 基础库](https://github.com/jshttp)，但是有几个显著的区别，除了上面提到的默认异步解决方案之外，主要的特点还有下面几个。

### Middleware

Koa 的中间件和 Express 不同，Koa 选择了洋葱圈模型。

- 中间件洋葱图：

![img](https://camo.githubusercontent.com/d80cf3b511ef4898bcde9a464de491fa15a50d06/68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67)

- 中间件执行顺序图：

![img](https://raw.githubusercontent.com/koajs/koa/a7b6ed0529a58112bac4171e4729b8760a34ab8b/docs/middleware.gif)

所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑，对比 Koa 和 Express 的 Compress 中间件就可以明显的感受到 Koa 中间件模型的优势。

- [koa-compress](https://github.com/koajs/compress/blob/master/index.js) for Koa.
- [compression](https://github.com/expressjs/compression/blob/master/index.js) for Express.

### Context

和 Express 只有 Request 和 Response 两个对象不同，Koa 增加了一个 Context 的对象，作为这次请求的上下文对象（在 Koa 1 中为中间件的 `this`，在 Koa 2 中作为中间件的第一个参数传入）。我们可以将一次请求相关的上下文都挂载到这个对象上。类似 [traceId](https://github.com/eggjs/egg-tracer/blob/1.0.0/lib/tracer.js#L12) 这种需要贯穿整个请求（在后续任何一个地方进行其他调用都需要用到）的属性就可以挂载上去。相较于 request 和 response 而言更加符合语义。

同时 Context 上也挂载了 Request 和 Response 两个对象。和 Express 类似，这两个对象都提供了大量的便捷方法辅助开发，例如

- `get request.query`
- `get request.hostname`
- `set response.body`
- `set response.status`

### 异常处理

通过同步方式编写异步代码带来的另外一个非常大的好处就是异常处理非常自然，使用 `try catch` 就可以将按照规范编写的代码中的所有错误都捕获到。这样我们可以很便捷的编写一个自定义的错误处理中间件。

```
async function onerror(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err);
    ctx.body = 'server error';
    ctx.status = err.status || 500;
  }
}
```

只需要将这个中间件放在其他中间件之前，就可以捕获它们所有的同步或者异步代码中抛出的异常了。



## 学习资源

- [《Koa2进阶学习笔记》](https://github.com/chenshenhai/koa2-note)



## 利用脚手架搭建过程

```shell
# 全局安装koa脚手架
$ npm install -g koa-generator

# 用脚手架搭建项目（-e：EJS模板，后面跟的是自定义的项目名称）
$ joa2 -e koa2-learn

# 安装第三方JS库
$ npm install

# 运行项目
$ npm run dev
```



## koa中间件

视频讲得很好，把视频保存下来吧



## koa路由

> github: https://github.com/ZijianHe/koa-router

示例项目重点代码：

```js
router.prefix('/users')	// 路由模块前缀
```



## koa端口

默认启动的端口号为：3000