# Read Vue Resource the very FIRST month

## Day-1
2019-11-21 07:27:09
1. runtime的含义
2. src/ 文件结构
  compiler  把template编译成render函数 返回虚拟dom
            缺少compiler模块 文件变小 但仅支持render 不支持template
  core      核心
  platforms 平台 web weex
  server    服务端渲染相关
  sfc       .vue文件解析
  shared    公用的方法和常量
3. step
   1. package.json
      > scripts > build
   2. scripts\build.js
      1. scripts\config.js
         > get builds config
      3. config 先选择一个build target 'web-full-cjs-dev'
      4. 找到 entry web/entry-runtime-with-compiler.js 开始学习
   3. src\platforms\web\entry-runtime-with-compiler.js

## Day-2
2019-11-23 18:03:44
2019-11-23 21:20:24
3h
1. src下目录结构
   1. compiler
      1. 把template编译成render函数, 返回虚拟dom
      2. 没有compiler模块, 打包文件变小, 但不支持template, 只支持render
   2. core
      1. 核心代码
   3. platforms
      1. 平台
      2. web 浏览器端
      3. weex 移动端原生应用
   4. server
      1. 服务端渲染相关
   5. sfc
      1. .vue文件解析
   6. shared
      1. 公用的方法和常量
2. runtime
      1. 运行时, 实际执行
3. 寻找Vue的源头
   1. package.json - build
   2. scripts\build.js - getAllBuilds
   3. scripts\config.js - builds['web-full-cjs-dev'].entry web/entry-runtime-with-compiler.js
   4. src\platforms\web\entry-runtime-with-compiler.js - import Vue from './runtime/index'
   5. src\platforms\web\runtime\index.js - import Vue from 'core/index'
   6. src\core\index.js - import Vue from './instance/index'
   7. src\core\instance\index.js - function Vue (options) {}
      1. Got it!
4. 纵观Vue全局
   1. src\core\instance\index.js - function Vue (options) {
      1. api
      ```js
         function Vue (options) {
           // defined in initMixin
           this._init(options)
         }
         // !Initialization:
           // initLifecycle(vm)
           // initEvents(vm)
           // initRender(vm)
           // callHook(vm, 'beforeCreate')
           // initInjections(vm) // resolve injections before data/props
           // initState(vm)
           // initProvide(vm) // resolve provide after data/props
           // callHook(vm, 'created')
         initMixin(Vue)

         // 挂载 $data $props $set $delete $watch
         stateMixin(Vue)

         // 挂载事件 $on $emit $once $off
         eventsMixin(Vue)

         // 挂载_update $forceUpdate $destroy
         // !_update 重点
         lifecycleMixin(Vue)

         // installRenderHelpers(Vue.prototype), 挂载$nextTick _render
         // !_render 重点
         renderMixin(Vue)
      ```
      1. 

   2. src\core\index.js - import Vue from './instance/index'
      1. initGlobalAPI(Vue)
      2. server side render - SSR
   3. src\platforms\web\runtime\index.js - import Vue from 'core/index'
      1. $mount
   4. src\platforms\web\entry-runtime-with-compiler.js - import Vue from './runtime/index'
      1. $mount
5.  ques
    1. vm.$options 什么时候挂载上的?
       1. Vue.prototype._init 中
    2. vm.$vnode 什么时候挂载上的?
6. 学到了一些知识点 和 需要学习的点
   1. src\core\util\env.js > Firefox has a "watch" function on Object.prototype...
      1. export const nativeWatch = ({}).watch // undefined 试了一下 没有啊 ...
   2. Observer in src\core\observer\index.js 响应式重点 定义getter setter 收集依赖
   3. defineReactive 函数
7. Tomorrow
   1. F:\开课吧全栈课\录播视频\Vue训练营\Vue训练营-P3.Vue全家桶源码剖析.mp4 timestamp: 01:08:00
8. 

## Day-3
2019-11-24 09:33:07
2019-11-24 12:42:59
3h
1. 回顾昨天
2. src目录结构
3. initGlobalAPI概览
4. initState概览
   1. initProps
   2. initMethods
   3. initData
   4. initComputed
   5. initWatch
5. 响应式原理核心代码
   1. src\core\observer\index.js
   2. !!!响应式原理
      1. defineProperty < defineReactive < Observer < observe
      2. Dep dep.depend() dep.notify() 添加依赖 通知修改dom
6. $mount
   1. entry-runtime-with-compiler.js 将template编译成render函数
   2. runtime\index.js 真正执行mount
      1. src\core\instance\lifecycle.js > mountComponent()
      2. hook:beforeMount
      3. Watcher
         1. _render() 初始化虚拟dom < renderMixin
         2. _update() 更新虚拟dom < lifecycleMixin
         3. hook:beforeUpdate 数据有更新时执行
      4. hook:mounted
7. _render
   1. Vue.prototype._render in src\core\instance\render.js
   2. 返回虚拟dom vnode = render.call(vm._renderProxy, vm.$createElement)
8. _update
   1. Vue.prototype._update in src\core\instance\lifecycle.js
   2. 没有prevVnode 初始化渲染 vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
   3. 有prevVnode 更新 vm.$el = vm.__patch__(prevVnode, vnode)
      1. 做虚拟dom的diff diff算法在__patch__里学习 !!!重要
9. __patch__
   1. Vue.prototype.__patch__ = inBrowser ? patch : noop
   2. patch == createPatchFunction in src\core\vdom\patch.js
   3. createPatchFunction概览
10. 源码概览结束, 大概知道什么东西在声明地方声明, 什么时候执行生命周期钩子
11. TODO:
    1.  开始钻研核心代码
    2.  开始抠细节
    3.  以面促学: 那面试题来找源码, 以达到高效学习的目的
    4.  一些重要的知识点和原理一定要理解 
        1.  内置组件 KeepAlive 有直接实现render函数
    5.  hook:created里定义了this.cache this.keys来缓存已经创建过的vnode
    6.  自己写一个简单Vue
        1.  Vue训练营-P3.Vue全家桶源码剖析.mp4 timestamp: 02:07:00
12. Node 最佳实践
    1.  Koa2
    2.  eggjs
        1.  MVC分层
        2.  约定大于配置
        3.  nginx + docker 部署
        4.  