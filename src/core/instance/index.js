import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// !!! @@找到 Vue 定义
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // _init 一定是在原型链上 defined in initMixin
  this._init(options)
}
/* Initialization */
//! Vue.prototype._init(options)
  // ! 挂载$options
  //! initProxy(vm) // dev
  //! initLifecycle(vm)
      // 挂载 $parent $root 初始化$children $refs _watcher _isMounted _isDestroyed ...
  //! initEvents(vm)
      // 初始化 _events _hasHookEvent, init parent attached events
  //! initRender(vm)
      // 挂载 $slots $scopedSlots _c $createElement $attrs $listeners
      // ?? $createElement 重点
  //! callHook(vm, 'beforeCreate')
      // 执行我们配置{}里的 $options.beforeCreate 函数, new Vue({ beforeCreate() {} })
      // TODO 此时还没有 data props methods, 所以不能调用, 测试一下
  //! initInjections(vm) // resolve injections before data/props
      // 拿到配置里的 $options.inject > 配置响应式defineReactive(TODO需要后续研究)
      // ! resolveInject(vm.$options.inject, vm) 查找 _provided 拿到keys
      // ! defineReactive 重点 多处见到
  //!!!!! initState(vm) 非常重要的函数
      // 初始化 _watchers

      // 拿到配置里的 $options.props
        // initProps(vm, opts.props)

      // 拿到配置里的 $options.methods
        // initMethods(vm, opts.methods)

      // 拿到配置里的 $options.data
        // initData(vm)
        // observe(vm._data = {}, true /* asRootData */ ) //if (!$options.data)

      // 拿到配置里的 $options.computed
        // initComputed(vm, opts.computed)

      // 拿到配置里的 $options.watch
        // initWatch(vm, opts.watch)
  //! initProvide(vm) // resolve provide after data/props
      // 拿到配置里的 $options.provide 挂载到 _provided
  //! callHook(vm, 'created')
      // TODO 此时可以获取 inject provide props methods data computed watch 了, 测试一下
//  首先挂载一些必要的函数, 在 new Vue时执行_init 加载数据, 配置, 触发(emit)生命周期函数hook:xxx
initMixin(Vue)
    // Vue.prototype._init

// 挂载 $data $props $set $delete $watch
stateMixin(Vue)

// 挂载事件 $on $emit $once $off
eventsMixin(Vue)

// 挂载_update $forceUpdate $destroy
// !!!!!_update 重点
lifecycleMixin(Vue)

// installRenderHelpers(Vue.prototype), 挂载$nextTick _render
// !!!!!_render 重点
renderMixin(Vue)

/* src\core\index.js > src\core\global-api\index.js */
// initGlobalAPI(Vue)
    // 挂载 config util set delete nextTick options
    // Vue.util = { warn, extend, mergeOptions, defineReactive }
    //   initUse(Vue) // Vue.use
    //   initMixin(Vue) // Vue.mixin
    //   initExtend(Vue) // Vue.extend
    //   initAssetRegisters(Vue) // Vue.options.components/directives/filters

// platform处 挂载 $mount 函数
// !!!!! $mount 重点
    // mountComponent(this, el, hydrating)
// @@4. 真正对外 暴露的Vue
export default Vue
