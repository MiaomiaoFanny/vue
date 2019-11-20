import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// @@找到 Vue 定义
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // _init 一定是在原型链上
  this._init(options)
}
// initGlobalAPI

// 初始化
  // // 生命周期
  // initLifecycle(vm)
  // // 事件
  // initEvents(vm)
  // // 渲染
  // initRender(vm)
  // // 生命周期钩子
  // callHook(vm, 'beforeCreate')
  // // injections
  // initInjections(vm) // resolve injections before data/props
  // // state
  // initState(vm)
  // // provide
  // initProvide(vm) // resolve provide after data/props
  // // 生命周期
  // callHook(vm, 'created')
initMixin(Vue)
// 初始化state
  // Object.defineProperty(Vue.prototype, '$data', dataDef)
  // Object.defineProperty(Vue.prototype, '$props', propsDef)
  // Vue.prototype.$set = set
  // Vue.prototype.$delete = del
stateMixin(Vue)
// 事件
    // Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    // Vue.prototype.$once = function (event: string, fn: Function): Component {
    // Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    // Vue.prototype.$emit = function (event: string): Component {
eventsMixin(Vue)
// 生命周期
    // _update !!!! 重点逻辑
    // Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    // Vue.prototype.$forceUpdate = function () {
    // Vue.prototype.$destroy = function () {
lifecycleMixin(Vue)
// 渲染
  // installRenderHelpers(Vue.prototype)
  // Vue.prototype.$nextTick = function (fn: Function) {
  // Vue.prototype._render = function (): VNode {
renderMixin(Vue)

// @@4. 真正对外 暴露的Vue
export default Vue
