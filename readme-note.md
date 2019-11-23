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
1. compile
   1. 把template编译成render函数
2. runtime
   1. 实际执行
3. 寻找Vue的源头
   1. package.json - build
   2. scripts\build.js - getAllBuilds
   3. scripts\config.js - builds['web-full-cjs-dev'].entry web/entry-runtime-with-compiler.js
   4. src\platforms\web\entry-runtime-with-compiler.js - import Vue from './runtime/index'
   5. src\platforms\web\runtime\index.js - import Vue from 'core/index'
   6. src\core\index.js - import Vue from './instance/index'
   7. src\core\instance\index.js - function Vue (options) {
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
   1. F:\开课吧全栈课\录播视频\Vue训练营\Vue训练营-P3.Vue全家桶源码剖析.mp4
   2. timestamp: 01:08:00
8. 