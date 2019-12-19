---
title: Vuex 笔记（持续更新）
author: Cynthia
categories:
  - 前端
  - Vue
  - 文档总结
tags: []
date: 2018-11-15 11:19:09
---

通读官方文档和平时使用的总结和注意点

<!--more-->

> 官方教程：<https://vuex.vuejs.org/zh/guide/>
>
> API文档：<https://vuex.vuejs.org/zh/api/>

## 核心概念

> 核心概念中的例子仅作理解，实际运用参考模块化使用

### Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

**这个状态自管理应用包含以下几个部分：**

- state，驱动应用的数据源；
- view，以声明方式将 state 映射到视图；
- actions，响应在 view 上的用户输入导致的状态变化。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190428112709.png)





### store（仓库）

> 每一个 Vuex 应用的核心就是 store（仓库）。
> “store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。

**Vuex 和单纯的全局对象有以下两点不同：**

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。



### State

> 下面是一个最简单的store中获取state的示例

#### 通过属性获取

- [安装](https://vuex.vuejs.org/zh/installation.html) Vuex 之后

    ```js
    // 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
    
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      }
    })
    ```

- 通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：

    ```js
    store.commit('increment')
    
    console.log(store.state.count) // -> 1
    ```

- 通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。

  ```js
  const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
      <div class="app">
        <counter></counter>
      </div>
    `
  })
  ```

- 组件中调用

  > 由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在 `计算属性` 中返回即可。触发变化也仅仅是在组件的 `methods` 中提交 mutation。
  ```js
  // 创建一个 Counter 组件
  const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count () {
          return this.$store.state.count
        }
      }
  }
  ```



#### mapState

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
// 引入辅助函数 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // 计算属性
  computed: {
      localComputed () { /* 自定义的其他计算属性 */ },
      ...mapState({
        // 1.箭头函数可使代码更简练
        count: state => state.count,

        // 2.传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 3.为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
      })
   }
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以直接给 `mapState` 传一个字符串数组

```js
computed: mapState([	// 现在一般这样获取，特殊情况按上面三种方法
  'count'
])
```

### Getter

> Vuex 允许我们在 store 中定义“getter”（可以认为是 **store 的计算属性**）。
> 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其 `第一个参数`：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 通过属性访问

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为 `第二个参数`：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

在组件中使用：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

#### 通过方法访问

也可以通过让 getter 返回一个函数，来实现给 getter 传参。在对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

#### mapGetters

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```



### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
> Vuex 中的 mutation 非常类似于事件：
> 每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。

这个回调函数就是我们实际进行状态更改的地方，并且它会接受 `state 作为第一个参数`：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你不能直接调用一个 mutation handler。
这个选项更像是**事件注册**：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”
要唤醒一个 mutation handler，你需要以相应的 type 调用 **`store.commit`** 方法：

```js
store.commit('increment')
```

#### 提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

在大多数情况下，载荷应该是一个 `对象` ，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

#### 对象风格的提交方式

提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

当然也可以直接这样：

```js
 mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENU_VISIBLE': (state, visible) => {
      state.menuVisible = visible
    },
    'SET_SETTING_VISIBLE': (state, visible) => {
      state.settingVisible = visible
    },
 }
```



#### Mutation 必须是同步函数

一条重要的原则就是要记住 **mutation 必须是同步函数**。为什么？请参考下面的例子：

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

#### 在组件中提交 Mutation

> - 你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation
> - 或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```



### Action

在 mutation 中混合异步调用会导致你的程序很难调试。
例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，**mutation 都是同步事务**：

```js
store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
```

为了处理异步操作，引入了action
> Action 类似于 mutation，不同在于：
> - Action 提交的是 mutation，而不是直接变更状态。
> - Action 可以包含任意异步操作。

#### context 对象

注册一个简单的 action：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个**与 store 实例具有相同方法和属性** 的 `context` 对象
- 因此你可以调用 `context.commit` 提交一个 mutation
- 或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

#### 分发 Action

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的 **载荷方式和对象方式** 进行分发：

```js
// 1.以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 2.以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

注意我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）。

#### 在组件中分发 Action

- 在组件中使用 `this.$store.dispatch('xxx')` 分发 action
- 或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      // 1.将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment', 

      // 2.`mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      // 3.将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      add: 'increment' 
    })
  }
}
```

#### 组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

- 现在你可以在组件中：

    ```js
    store.dispatch('actionA').then(() => {
      // ...
    })
    ```

- 在另外一个 action 中也可以：

    ```js
    actions: {
      // ...
      actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
          commit('someOtherMutation')
        })
      }
    }
    ```

最后，如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/)，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。



### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成 **模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

#### 命名空间

[官方文档](https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)



### 总结

Vuex 交互原理图：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190428113915.png)

**States**：数据区，所有共享的状态（数据）可以放在这里

**Mutations**：改变State的状态（数据）

**Actions**：通过异步的方式调用Mutations



**调用方式：**

- **States：** `store.state.xxx`
- **Mutations：** `store.commit('xxx')`
- **Actions：** `store.dispatch('xxx')` 
- **Getter：** `store.getters.xxx`



## 易混淆

### mapState和mapGetter

> [vuex的mapState和mapGetters 有哪些区别](https://segmentfault.com/q/1010000015849766) 





## 基本用法

- main.js 文件

  ```js
  import Vue from 'vue'
  import store from './store'
  
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
  ```

- store.js 文件

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    // 数据区，所有共享的状态（数据）可以放在这里
    state: {
      test: 1
    },
    // 改变State的状态（数据）
    mutations: {
      'SET_TEST': (state, newTest) => {
        state.test = newTest
      }
    },
    // 异步调用mutations里的方法
    actions: {
      setTest: ({ commit, state }, newTest) => {
        return commit('SET_TEST', newTest) // return 返回一个promise对象
      }
    }
  })
  ```


- APP.vue 文件

  ```js
  <script>
    export default {
      mounted() {
        this.$store.dispatch('setTest',150)
          .then(() => {
            console.log("修改后的数据：" + this.$store.state.test);
          })
      },
    }
  </script>
  ```



## 模块化用法（推荐）

**结合mixin.js文件使用**

参考代码：<https://github.com/Cynthia0329/ebook/tree/master/src/store>

### 在store目录下

- 首先 store文件夹下的modules文件夹中 创建一个 模块文件 book.js

  ```js
  const book = {
    state: {
     	 // 这里放自定义的需要公用的变量
     	 fileName: '',
    },
    mutations: {
       // 这里放 改变变量的方法
      'SET_FILENAME': (state, fileName) => {
        state.fileName = fileName
      }
    }
  }
  
  export default book
  
  ```


- store文件夹下的 actions.js文件：这里异步调用mutations中的方法

  ```js
  const actions = {
    setFileName: ({ commit }, fileName) => {
        return commit('SET_FILENAME', fileName) // return 返回一个promise对象
      }
  }
  export default actions
  
  ```


- store文件夹下的 getter.js文件：得到 公用的变量 的回调函数 对象集合（后续可以直接引用）

  ```js
  const book = {
      fileName: state => state.book.fileName
  }
  export default book
  
  ```


- store文件夹下的 index.js文件：将上面三个文件联系起来，并导入相应的插件和包

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  // 导入上面的三个文件
  import book from './modules/book.js'
  import getters from './getters.js'
  import actions from './actions.js'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    modules: {
      book		// 模块文件导出的对象
    },
    getters,		//actions.js文件
    actions		//getter.js文件
  })
  ```

### 在utils目录下

**mixins 标签原理：**

```js
(property) mixins: {
    [x: string]: any;
    computed: {
        [x: string]: () => any;
    };
    methods: {
        [x: string]: (...args: any[]) => Promise<any>;
    };
}[]

```

- utils文件夹下的 mixin.js文件

  ```js
  import { mapGetters, mapActions } from 'vuex'
  
  export const ebookMixin = {
    // 这里调用getter.js中的对象，mapGetters方法结合computed将对象中的回调函数执行成相应的数值
    computed: {
      ...mapGetters([	
        'fileName',
        ])
    },
    // 这里调用actions.js中的方法
    methods: {
      ...mapActions([
        'setFileName',
      ])
    }
  }
  
  ```

### 在组件中调用

```js
// 导入 mixin 中组件相应的对象
import { ebookMixin } from '../../utils/mixin'
export default {
    // 将组件相应的对象在 vue中的mixins 进行注册
    mixins: [ebookMixin],
    methods: {
        // 在methods中直接通过 this.变量名 this.方法名 就可以了
    }
}
```

