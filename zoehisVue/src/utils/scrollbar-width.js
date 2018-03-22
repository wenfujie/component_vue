/**
 * Created by lhn on 2017/8/14.
 */
import Vue from 'vue';
let scrollBarWidth;
/**
 * 计算浏览器滚动条宽度
 * @returns {*}
 */
export default function () {
  if (Vue.prototype.$isServer) return 0;
  if (scrollBarWidth != undefined) return scrollBarWidth;
  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;//获取没有滚动条的元素宽度
  outer.style.overflow = 'scroll';//强制滚动条
  const inner = document.createElement("div");//内部创建元素
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;//获取内部元素的可视区域，有滚动条
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;//获取浏览器滚动条宽度
  return scrollBarWidth;
};
