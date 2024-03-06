import IconFont from "@/components/IconFont"
import styles from "./index.module.less"
import getComponentRootDom from "@/utils/getComponentRootDom"
/**
 * @param {string} content 提示文字
 * @param {string} type 提示类型 info success warn error
 * @param {number} duration 持续时间
 * @param {HTMLElement} container 挂载的节点
 * @param {Function} callback  回调函数
 */
export default function (options = {}) {
  const content = options.content || "默认提示"
  const type = options.type || "info"
  const duration = options.duration || 2000
  const container = options.container || document.body
  const div = document.createElement('div')
  const iconDom = getComponentRootDom(IconFont, { type })
  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`
  const typeClassName = styles[`message-${type}`]
  div.className = `${styles.message} ${typeClassName}`
  if (options.container) {
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative'
    }
  }
  container.appendChild(div)
  //强行渲染-读取元素的位置或者试图会强制渲染 
  div.clientWidth //导致reflow
  //回归正常
  div.style.opacity = "1";
  div.style.transform = `translate(-50%,-50%)`;
  //等一段时间小时
  setTimeout(() => {
    div.style.opacity = "0"
    div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
    div.addEventListener("transitionend", function () {
      div.remove();
      options.callback && options.callback()
    }, { once: true })
  }, duration);
}  