/**
 * @param {.vue} comp 传入的模板.vue文件
 * @param {object} props 模板.vue文件需要的数据属性
 */
//获取某个组件渲染的DOM元素
export default function (comp, props) {
  const vm = new Vue({
    render: (h) => h(comp, { props })
  })
  vm.$mount()
  return vm.$el
  //对比vue2的new Vue的$mount()方法，vue3需要传一个空白dom节点，vue2不需要
  /*
  const vm = new Vue({
    render:(h)=>h(comp,{props})
  })
  vm.$mount()
  return vm.$el
  */

}