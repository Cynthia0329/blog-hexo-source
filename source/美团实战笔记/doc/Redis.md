

> [*Redis* 教程 | 菜鸟教程](https://www.baidu.com/link?url=mfjBnlAdpWaZpQu8ivFESGlZQlvseHm8wzQSi78HpEOIf3vsbslikG0lLbCozI3q7BBtR2xWEr9_KDMpaVVEsa&wd=&eqid=8ef19cf6000ee8d0000000065cb6e9ed)

## 起步

### 安装

教程：<http://www.runoob.com/redis/redis-install.html>

### 启动

```shell
$ redis-server
```

### 安装koa中间件

```shell
$ cnpm i koa-generic-session koa-redis
```



## Redis数据类型

> 菜鸟教程：<https://www.runoob.com/redis/redis-data-types.html>
>
> （目前只了解前两种）

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

------

### String（字符串）

string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。

string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。

string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。

**实例**

```shell
redis 127.0.0.1:6379> SET name "runoob"
OK
redis 127.0.0.1:6379> GET name
"runoob"
```

在以上实例中我们使用了 Redis 的 **SET** 和 **GET** 命令。键为 name，对应的值为 **runoob**。

**注意：**一个键最大能存储512MB。

------

### Hash（哈希）

Redis hash 是一个键值(key=>value)对集合。

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

实际结构：`key field value`   

**！注意**：（此处的key是指的哈希表的key哦，后面field-value才是存储的值的key-value，不要混淆了）



**实例**

**DEL runoob** 用于删除前面测试用过的 key，不然会报错：**(error) WRONGTYPE Operation against a key holding the wrong kind of value**

```shell
redis 127.0.0.1:6379> DEL runoob

# HMSET key field value [field value …]
redis 127.0.0.1:6379> HMSET myhash field1 "Hello" field2 "World"
"OK"

# HGET key field
redis 127.0.0.1:6379> HGET myhash field1
"Hello"

redis 127.0.0.1:6379> HGET myhash field2
"World"
```

实例中我们使用了 Redis **HMSET, HGET** 命令，**HMSET** 设置了两个 **field=>value** 对, HGET 获取对应 **field** 对应的 **value**。

每个 hash 可以存储 2

32

 -1 键值对（40多亿）。



## koa中用例

```js
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var koa = require('koa');
var redis = require('redis');
// 注意: client默认是异步callback方式调用;
// store.client是经过了co-redis包装,返回Promise, 在koa里面用yield异步编程比较方便
var client = redis.createClient(6379, "172.19.65.240");

var app = koa();
app.keys = ['keys', 'keykeys'];
// var option={host: "172.19.65.240", db:1};
var options = {client: client, db: 1};

var store = redisStore(options);
app.use(session({
  store: store
}));

app.use(function *() {
  switch (this.path) {
    case '/get':
      get.call(this);
      break;

    case '/testKV':
      // 保存key value
      if (this.query.adminId) {
        yield store.client.set("test1", this.query.adminId);
      }
      //同步读取key value
      this.body = yield store.client.get("test1");
      break;

    case '/testHM':
      //操作hashmap
      var result = yield store.client.hmset("hosts", "mjr", "123", "another", "23", "home", "1234");
      console.log(result);

      var obj = yield store.client.hgetall("hosts")
      console.dir(obj);
      //获取hashmap key的值
      this.body = yield store.client.hget("hosts", "home");

      //保存hashmap,使用默认的callback方式
      // client.hset("hash key", "hashtest 1", "some value", redis.print);
      // client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
      // client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
      // client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {
      //   console.log(res);
      // });

      break;
    case '/testSet':
      //保存set
      var key = "key1";
      store.client.sadd("key1", "v1");
      store.client.sadd("key1", "v2");
      store.client.sadd("key1", "v3");

      //读取set
      store.client.multi()
        .sismember(key, 'v1')
        .smembers(key)
        .exec(function (err, replies) {
          console.log("MULTI got " + replies.length + " replies");
          replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
          });
        });

      //读取set
      this.body = yield store.client.smembers("key1");
      break;
    case '/testList':
      //保存list
      store.client.rpush("mylist", "bbb")
      store.client.rpush("mylist", "ccc")
      store.client.lpush("mylist", "aaa")

      this.body = yield store.client.rpop("mylist");
      break;
    case '/remove':
      remove.call(this);
      break;
    case '/regenerate':
      yield regenerate.call(this);
      break;
  }
});

function get() {
  var session = this.session;
  session.count = session.count || 0;
  session.count++;
  var test = store.client.get("test");
  console.log(test);
  this.body = session.count;
}

function remove() {
  this.session = null;
  this.body = 0;
}

function *regenerate() {
  get.call(this);
  yield this.regenerateSession();
  get.call(this);
}

app.listen(8080);

```







