---
title: HTTP消息头总结（持续更新）
author: Cynthia
categories:
  - HTTP网络
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-24 16:12:04
---

🐰
...
<!--more-->

> ，MDN：<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers>

## HTTP 消息结构

### 客户端请求信息

> 客户端发送一个HTTP请求到服务器的请求消息包括以下格式：
>
> 请求行（request line）、请求头（header）、空行和请求数据（请求体）四个部分组成



下图给出了请求报文的一般格式。

![img](https://www.runoob.com/wp-content/uploads/2013/11/2012072810301161.png)







### 服务器响应消息

> HTTP响应也由四个部分组成，分别是：状态行、消息报头、空行和响应正文。



![img](https://www.runoob.com/wp-content/uploads/2013/11/httpmessage.jpg)

------



### 实例

下面实例是一点典型的使用GET来传递数据的实例：

客户端请求：

```http
GET /hello.txt HTTP/1.1
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi
```

服务端响应:

```http
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
Content-Length: 51
Vary: Accept-Encoding
Content-Type: text/plain
```



## HTTP 消息头概念

**HTTP 消息头**允许客户端和服务器通过 **request**和 **response**传递附加信息。一个请求头由名称（不区分大小写）后跟一个冒号“：”，冒号后跟具体的值（不带换行符）组成。该值前面的引导空白会被忽略。



### 根据不同上下文

可将消息头分为：

- [一般头](https://developer.mozilla.org/zh-CN/docs/Glossary/%E4%B8%80%E8%88%AC%E5%A4%B4): 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
- [请求头](https://developer.mozilla.org/zh-CN/docs/Glossary/%E8%AF%B7%E6%B1%82%E5%A4%B4): 包含更多有关要获取的资源或客户端本身信息的消息头。
- [响应头](https://developer.mozilla.org/zh-CN/docs/Glossary/%E5%93%8D%E5%BA%94%E5%A4%B4): 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
- [实体头](https://developer.mozilla.org/zh-CN/docs/Glossary/%E5%AE%9E%E4%BD%93%E5%A4%B4): 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。





### 根据代理对其的处理方式

分为：

**端到端消息头**

这类消息头必须被传输到最终的消息接收者，也即，请求的服务器或响应的客户端。
中间的代理服务器必须转发未经修改的端到端消息头，并且必须缓存它们。

**逐跳消息头**

这类消息头仅对单次传输连接有意义，不能通过代理或缓存进行重新转发。
这些消息头包括 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection), [`Keep-Alive`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive), [`Proxy-Authenticate`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Proxy-Authenticate), [`Proxy-Authorization`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Proxy-Authorization), [`TE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/TE), [`Trailer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Trailer), [`Transfer-Encoding`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding) 及 [`Upgrade`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Upgrade)。注意，只能使用 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection) 来设置逐跳一般头。









## 常见的请求头属性

> 一览表：<http://tools.jb51.net/table/http_header>

**Accept**：指定客户端能够接收的内容类型，内容类型中的先后次序表示客户端接收的先后次序。

Accept属性的值可以为一个或多个MIME类型的值，关于MIME类型，大家请参考：<https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types>



**Accept-Encoding** : 指定客户端浏览器可以支持的web服务器返回内容压缩编码类型。表示允许服务器在将输出内容发送到客户端以前进行压缩，以节约带宽。而这里设置的就是客户端浏览器所能够支持的返回压缩格式



**Accept-Language** : 指定HTTP客户端浏览器用来展示返回信息所优先选择的语言。



**cookie** ：客户端的Cookie就是通过这个报文头属性传给服务端的



**Referer**：表示这个请求是从哪个URL过来的



**Cache-Control** ：对缓存进行控制

> 如一个请求希望响应返回的内容在客户端要被缓存一年，或不希望被缓存就可以通过这个报文头达到目的。 
>
> 如以下设置，相当于让服务端将对应请求返回的响应内容不要在客户端缓存： `Cache-Control: no-cache  `

**Content-Type**：请求头的长度

**Connec-Length**：显示此HTTP请求提交的内容类型。一般只有post提交时才需要设置该属性

**Hose** : 客户端地址

**User-Agent** : 客户端信息

**x-Requested-With** : 是否为同步请求 ，如果为XMLHttpRequest，则为 Ajax 异步请求。如果为null则为传统同步请求



## 常见的响应头属性

> **响应头Response Header**
>
> 一览表：<http://tools.jb51.net/table/http_header>







## 常用的Content-Type

> Content-Type，内容类型，一般是指网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，比如用PHP输出图片文件、JSON数据、XML文件等非HTML内容时，就必须用header函数来指定Content-Type，才能达到输出一张图片或是其它指定内容类型的需求。

一览表：<http://tools.jb51.net/table/http_content_type>



- [关于Content-Type中application/x-www-form-urlencoded 和 multipart/form-data的区别及用法](https://www.cnblogs.com/kaibin/p/6635134.html)
- [HTTP协议之multipart/form-data请求分析](https://blog.csdn.net/qq_33706382/article/details/78168325)













