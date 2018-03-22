/**
 * Created by tianwenbin on 2017/9/14.
 */
import {on} from './dom.js'
export default {
  bind(el,binding,vnode){

    el.setAttribute('tabindex',-1);//给tabindex设置-1
    let keyRefs = getKeyRefs(binding,vnode);//获取总的keyRefs
    //将生成好的keyRefs帮到属性 keyrefs上
    el.setAttribute('keyrefs',JSON.stringify(keyRefs));
    //el节点上绑定的所有事件
    const onEvn = vnode.data.attrs;

    let onBeforeNext,onAfterNext,onBeforePrev,onAfterPrev;

    if(onEvn){
      onBeforeNext = onEvn['before-next'];//顺向快捷键执行之前事件回调
      onAfterNext = onEvn['after-next'];//顺向快捷键执行之后事件回调
      onBeforePrev = onEvn['before-prev'];//逆向快捷键执行之前事件回调
      onAfterPrev = onEvn['after-prev'];//逆向快捷键执行之后事件回调
    }
    on(el,'keydown',function(e){
      //阻止默认 tab/enter
      if(e.keyCode==9 || e.keyCode==13){
        e.stopPropagation();
        e.preventDefault();
      }
    });
    on(el,'keyup',function(e){
      var keyCode = e.keyCode;
      //组合键 ctrl+tab / ctrl+enter
      if(e.ctrlKey && (keyCode == 9 || keyCode == 13)){

        tabEnterFn(el,vnode,'prev',function(current,theVm,vnode){
          //定位前事件 若返回false 则返回
          if($.isFunction(onBeforePrev) && onBeforePrev(current,theVm,e)===false) return;
          if(theVm==null) return; //没找到则返回
          //焦点定位
          focusToVm(vnode,theVm);
          //定位后事件
          $.isFunction(onAfterPrev) && onAfterPrev(theVm,e);
        });
      }else if(keyCode == 9 || keyCode == 13){//tab、enter
        tabEnterFn(el,vnode,'next',function(current,theVm,vnode){
          //定位前事件 若返回false 则返回
          if($.isFunction(onBeforeNext) && onBeforeNext(current,theVm,e)===false) return;
          if(theVm==null) return; //没找到则返回
          //焦点定位
          focusToVm(vnode,theVm);
          //定位后事件
          $.isFunction(onAfterNext) && onAfterNext(theVm,e);
        });
      }
    });
  },
  update(el,binding,vnode){
    if(binding.value == binding.oldValue) return;
    let keyRefs = getKeyRefs(binding,vnode);//获取总的keyRefs
    //将生成好的keyRefs帮到属性 keyrefs上
    el.setAttribute('keyrefs',JSON.stringify(keyRefs));
  },
  unbind(el){
    //解绑
    on(el,'keydown');
    on(el,'keyup');
  }
}

/**
 * 焦点定位到某一个组件
 * @param nextVm  下一个需要定焦点的控件
 * @param vnode   容器的虚拟节点
 */
const focusToVm = function (vnode,nextVm) {
  vnode.context.$refs[nextVm.ref].focus();
};

/**
 * 通过binding值获取 keyRefs的值
 * @param binding   用于获取前缀
 * @param vnode
 * @returns {Array}
 */
const getKeyRefs = function(binding,vnode){
  const keyFocusObj = binding.value;//快捷键相应的属性
  let prefix = keyFocusObj.prefix || "keyRef"; //前缀属性 默认前缀 keyRef
  let total = keyFocusObj.total || 0; //总数 默认为0
  let keyRefs = [];
  if(keyFocusObj.keyRefs && keyFocusObj.keyRefs.length){
    keyRefs = keyFocusObj.keyRefs;
  }else {
    for(let i=0; i<total; i++){
      keyRefs.push({ref: prefix+i});
    }
  }
  return keyRefs;
};

/**
 * 查找下一个要定位的vm
 * @param el dom节点
 * @param current 当前焦点的位置
 * @param vnode 容器的虚拟节点
 * @param isNext 是否顺向查找 默认是'next' (next/prev)
 * @return {obj} 返回查找到的vm
 */
const findTheVm = function(el,current,vnode,isNext='next'){
  let keyRefs = JSON.parse(el.getAttribute("keyRefs"));
  //先判断有无keyArr的值
  if(!keyRefs || !keyRefs.length) return null;
  let theVm = null;//要定位的vm
  //current为-1，则从第一个/最后一个的开始,即array[0]/array[keyL-1]
  //if(current == -1) return keyRefs[isNext === 'next' ? 0 : keyL-1];

  //找到当前焦点所在的vm (不可编辑时没有焦点的)
  let curVm = findRefByIndex(keyRefs,current);
  //若没有找到当前的 则返回null;
  if(curVm === null) return theVm;

  //没有设置next/prev属性，则按顺向/逆向来
  if(keyRefs[0][isNext] === undefined){ //无
    return nextOrPrevToRef(keyRefs,curVm,vnode,isNext);
  }else {
    return findRefByIndex(keyRefs,curVm[isNext],vnode,isNext);
  }
};

/**
 * isNext参数没传：通过当前的current（keyIndex值）找到对应的vm
 * isNext参数"next/prev"：通过当前的current（keyIndex值）找到下一个对应的vm
 * @param keyRefs  快捷键的ref集合
 * @param current  当前焦点的位置
 * @param vnode   容器的虚拟节点
 * @param isNext 是否顺向查找 (next/prev/undefined(没传))，没传代表只for循环一遍
 * @returns {*}
 */
const findRefByIndex = function(keyRefs,current,vnode,isNext){
  let keyL = keyRefs.length;
  let curVm = null;
  for(let j=0; j<keyL; j++){
    if(keyRefs[j].ref == current){
      curVm = keyRefs[j];
      //若isNext为'next/prev' 且 存在getDisabled这个方法 且返回值为true（代表不可以编辑），则往下一个vm查找
      if(isNext && getDisabledStatus(vnode,curVm.ref)){
        curVm = findRefByIndex(keyRefs,keyRefs[j][isNext],vnode,isNext);
      }
      break;
    }
  }
  return curVm;
};

/**
 * 对数组加一或减一的查找
 * @param keyRefs 快捷键的ref集合
 * @param curVm  当前焦点的vm
 * @param vnode 容器的虚拟节点
 * @param isNext 是否顺向查找 (next/prev)
 * @returns {*}
 */
const nextOrPrevToRef = function(keyRefs,curVm,vnode,isNext){
  let arrIndex = keyRefs.indexOf(curVm);
  let keyL = keyRefs.length;
  let theVm = null;
  if(isNext==="next"){
    theVm = arrIndex+1 < keyL ? keyRefs[arrIndex+1] : keyRefs[0];
  }else {
    theVm = arrIndex == 0 ? keyRefs[keyL-1] : keyRefs[arrIndex-1];
  }
  if(getDisabledStatus(vnode,theVm.ref)){
    theVm = nextOrPrevToRef(keyRefs,theVm,vnode,isNext);
  }
  return theVm;
};

/**
 * 判断某一组件是否可以编辑的状态
 * return true 代表不能编辑 return false 代表可以编辑
 * @param vnode     容器的虚拟节点
 * @param refName   ref的名称
 * @returns {boolean}
 */
const getDisabledStatus = function(vnode,refName){
  let curRef = vnode.context.$refs[refName];
  let disStatus = curRef ? curRef.getDisabled : null;
  return (!curRef || disStatus && disStatus()===true) ? true : false;
};
//快捷键切换的方法
const tabEnterFn = function(el,vnode,isNext,fn){
  var current = el.dataset.current; //当前焦点聚集的ref名称；
  let keyRefs = JSON.parse(el.getAttribute("keyRefs"));
  //找到当前焦点所在的vm (不可编辑时没有焦点的)
  let curVm = findRefByIndex(keyRefs,current);
  //若没有找到当前的 则返回null;
  if(curVm === null) return null;
  let theVm = null;
  //没有设置next/prev属性，则按顺向/逆向来
  if(keyRefs[0][isNext] === undefined){ //无
    theVm = nextOrPrevToRef(keyRefs,curVm,vnode,isNext);
  }else {
    theVm = findRefByIndex(keyRefs,curVm[isNext],vnode,isNext);
  }
  if($.isFunction(fn)){
    fn(current,theVm,vnode);
  }
};