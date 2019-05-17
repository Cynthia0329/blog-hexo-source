---
title: 关于TCP/IP相关的知识总结（持续更新）
author: Cynthia
categories:
  - HTTP网络
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-17 10:44:09
---

🐰
仅作为一个前端从事者的整理，可能不会特别深入
<!--more-->







## 待看文章

- [重学TCP/IP 协议 与三次握手](https://juejin.im/post/5ca95ed46fb9a05e3d0a8533)







## 基础

OSI(Open Systems Interconncection，开放系统互联)网络分层

从上到下分别是：

##### 7.应用层(Application)

##### 6.表示层(Presentation)

##### 5.会话层(Session)

##### 4.传输层(Transport)

##### 3.网络层(Network)    -- 路由器

##### 2.数据链路层(Data Link) -- 交换机

##### 1.物理层(Physical) -- 网卡、集线器（Hub）

### TCP头部报文结构

[tcp的头部报文结构](https://blog.csdn.net/jijianshuai/article/details/80883091)









## 三次握手和四次挥手



**相关的关键词**

- `ACK`：此标志表示应答域有效，就是说前面所说的TCP应答号将会包含在TCP数据包中；有两个取值：0和1，为1的时候表示应答域有效，反之为0； 
- `SYN`：表示同步序号，用来建立连接。SYN标志位和ACK标志位搭配使用，当连接请求的时候，SYN=1，ACK=0；连接被响应的时候，SYN=1，ACK=1；这个标志的数据包经常被用来进行端口扫描。扫描者发送一个只有SYN的数据包，如果对方主机响应了一个数据包回来 ，就表明这台主机存在这个端口；但是由于这种扫描方式只是进行TCP三次握手的第一次握手，因此这种扫描的成功表示被扫描的机器不很安全，一台安全的主机将会强制要求一个连接严格的进行TCP的三次握手；



**三次握手：**

1. 客户端发送 `syn` 包到服务器，等待服务器确认接收。
2. 服务器确认接收 `syn` 包并确认客户的 `syn` ，并发送回来一个 `syn+ack` 的包给客户端。
3. 客户端确认接收服务器的 `syn+ack` 包，并向服务器发送确认包 `ack` ，二者相互建立联系后，完成tcp三次握手。

**四次握手：**就是中间多了一层 等待服务器再一次响应回复相关数据的过程





### **相关有趣的总结**

- [谈谈你对 TCP 三次握手和四次挥手的理解](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)
- <https://juejin.im/post/5c078058f265da611c26c235#heading-11>
- [详解三次握手和四次挥手：遇到心动的女孩时，如何去把握？](https://juejin.im/post/5cdd3fa4f265da03761eb1a1)



















<br>

---

> 此处仅作知识整理，便于自己查阅，详情参考原文：
>
> <https://juejin.im/post/5c078058f265da611c26c235>