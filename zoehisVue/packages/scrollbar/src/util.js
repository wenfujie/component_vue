/**
 * Created by lhn on 2017/8/15.
 */
/**
 * 一些常量
 * @type {{vertical: {offset: string, scroll: string, scrollSize: string, size: string, key: string, axis: string, client: string, direction: string}, horizontal: {offset: string, scroll: string, scrollSize: string, size: string, key: string, axis: string, client: string, direction: string}}}
 */
export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};
/**
 * 渲染bar的样式
 * @param move 移动的位置
 * @param size bar的宽度
 * @param bar bar的信息
 */
export function renderThumbStyle({move, size, bar}){//函数解构 es6
  const style={};
  const translate=`translate${bar.axis}(${move}%)`;
  style[bar.size]=size;
  style.transform=translate;
  style.msTransform=translate;
  style.webkitTransform=translate;
  return style;
};
