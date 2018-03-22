/**
 * Created by lhn on 2017/8/7.
 */
/**http://www.jianshu.com/p/984cf10954ae 详细说明
 * 来源：https://github.com/ElemeFE/element/blob/dev/src/utils/resize-event.js**/
const isServer = typeof window === "undefined";//判断是否是服务器渲染vue组件
/**
 * 帧动画实现
 */
const requestFrame = (function () {
  if (isServer)return;
  const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
      return window.setTimeout(fn, 20);
    };
  return function (fn) {
    return raf(fn);
  };
})();
/**
 * 取消帧动画
 */
const cancelFrame = (function () {
  if (isServer)return;
  const caf = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function (id) {
    return caf(id);
  }
})();
/**
 *
 * 重置resize触发器
 * https://zhuanlan.zhihu.com/p/24887312 通过scroll来监听resize
 * @param element 要处理的元素
 */
const resetTrigger = function (element) {
  const trigger = element.__resizeTrigger__;// 要重置的触发器
  const expand = trigger.firstElementChild;// 第一个子元素，用来监听变大
  const contract = trigger.lastElementChild;// 最后一个子元素，用来监听变小
  const expandChild = expand.firstElementChild;// 第一个子元素的第一个子元素，用来监听变大
  contract.scrollLeft = contract.scrollWidth;// 滚动到最右
  contract.scrollTop = contract.scrollHeight;//滚动到最下面
  expandChild.style.width = expand.offsetWidth + 1 + "px"; // 保持宽度多1px
  expandChild.style.height = expand.offsetHeight + 1 + 'px';  // 保持高度多1px
  expand.scrollLeft = expand.scrollWidth;  // 滚动到最右
  expand.scrollTop = expand.scrollHeight;  // 滚动到最右
};
/**
 * 检测resize触发器状态
 * @param element 要检查的元素
 * @returns {boolean} 是否改变了大小
 */
const checkTriggers = function (element) {
  return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
};
/**
 * 滚动监听
 * @param event 要监听的事件
 */
const scrollListener = function (event) {
  resetTrigger(this);// 重置触发器
  if (this.__resizeRAF__)cancelFrame(this.__resizeRAF__);// 取消之前的回调
  this.__resizeRAF__ = requestFrame(()=> {
    if (checkTriggers(this)) {// 如果改变了大小
      this.__resizeLast__.width = this.offsetWidth;  // 更新宽度
      this.__resizeLast__.height = this.offsetHeight;  // 更新高度
      this.__resizeListeners__.forEach((fn) => {  // 调用回调
        fn.call(this, event);
      });
    }
  });
};
/**
 *通过检测CSS动画支持来检测元素的显示和重新加入
 */
const attachEvent = isServer ? {} : document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');  // 浏览器前缀
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
const RESIZE_ANIMATION_NAME = 'resizeanim';
let animation = false;
let keyFramePrefix = '';
let animationStartEvent = 'animationstart';

if (!attachEvent && !isServer) {
  const testElement = document.createElement('fakeelement'); // 用来检测相关特性的支持性
  if (testElement.style.animationName !== undefined) {// 支持 animation
    animation = true;
  }
  if (animation === false) {
    let prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {  // 根据testElement来检测支持的前缀
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toLowerCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        break;
      }
    }
  }
}
;

let stylesCreated = false;
/**
 * 创建样式
 */
const createStyles = function () {
  if (!stylesCreated && !isServer) {
    const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} { from { opacity: 0; } to { opacity: 0; } } `;
    const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATION_NAME};`;
    // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    //解决 visibility: hidden 时在 --force-accelerated-composited-scrolling 显示滚动条的bug
    const css = `${animationKeyframes}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`;

    const head = document.head || document.getElementsByTagName('head')[0];// 后者兼容IE9以下
    const style = document.createElement('style');
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    stylesCreated = true;
  }
};
/**
 * 添加大小更改监听
 * @param element 要监听的元素
 * @param fn 回调函数
 */
export const addResizeListener = function (element, fn) {
  if (isServer) return; // 服务器端直接返回
  if (attachEvent) { // 处理低版本ie
    element.attachEvent('onresize', fn);
  } else {
    if (!element.__resizeTrigger__) {
      if (getComputedStyle(element).position === 'static') {//获取作用在元素上的css 只读与style区别请百度
        element.style.position = 'relative';
      }
      createStyles();// 添加相应的CSS样式
      element.__resizeLast__ = {};// 初始化触发器最后的状态
      element.__resizeListeners__ = [];// 初始化触发器的监听器
      const resizeTrigger = element.__resizeTrigger__ = document.createElement('div');// 创建触发器
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      element.appendChild(resizeTrigger);// 添加触发器
      resetTrigger(element); // 重置触发器
      element.addEventListener('scroll', scrollListener, true);// 监听滚动事件
      //监听CSS动画来检测元素显示或者重新添加
      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function (event) {// 增加动画开始的事件监听
          if (event.animationName === RESIZE_ANIMATION_NAME) { // 如果是大小改变事件
            resetTrigger(element);// 重置触发器
          }
        });
      }
    }
    element.__resizeListeners__.push(fn);// 加入该回调
  }
};
/**
 * 移除大小改变的监听
 * @param element 被监听的元素
 * @param fn 对应的回调函数
 */
export const removeResizeListener = function (element, fn) {
  if (attachEvent) { // 处理ie
    element.detachEvent('onresize', fn);
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);// 移除对应的回调函数
    if (!element.__resizeListeners__.length) {  // 如果全部事件被移除
      element.removeEventListener('scroll', scrollListener);// 移除滚动监听
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);// 移除对应的触发器
    }
  }
}


