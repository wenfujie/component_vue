/**
 * Created by tianwenbin on 2017/9/14.
 */
import {on} from './dom.js'
import {jQextend} from './util.js'
export default {

  bind(el,binding,vnode){
    el.setAttribute('tabindex',-1);//给tabindex设置-1

    let keyRefs = getKeyRefs(el,vnode);

    //el节点上绑定的所有事件
    const onEvn = vnode.data.attrs;

    let onBeforeNext,onAfterNext,onBeforePrev,onAfterPrev;
    //将生成好的keyRefs帮到属性 keyrefs上
    el.setAttribute('keyrefs',JSON.stringify(keyRefs));
    if(onEvn){
      onBeforeNext = onEvn['before-next'];//顺向快捷键执行之前事件回调
      onAfterNext = onEvn['after-next'];//顺向快捷键执行之后事件回调
      onBeforePrev = onEvn['before-prev'];//逆向快捷键执行之前事件回调
      onAfterPrev = onEvn['after-prev'];//逆向快捷键执行之后事件回调
    }
    on(el,'keydown',function(e){
      //阻止默认 tab/enter/up/down
      if(e.keyCode==9 || e.keyCode==13 || e.keyCode == 38 || e.keyCode == 40){
        e.stopPropagation();
        e.preventDefault();
      }
    });
    on(el,'keyup',function(e){
      var keyCode = e.keyCode;

      //组合键 ctrl+tab / ctrl+enter
      if(e.ctrlKey && (keyCode == 9 || keyCode == 13)){
        tabEnterFn(el,vnode,"prev",function(curVm,theVm){
          let nowRowData = JSON.parse(el.getAttribute("rowdata"));
          //定位前事件 若返回false 则返回
          if($.isFunction(onBeforePrev) && onBeforePrev(curVm,theVm,nowRowData,e)===false) return;
          if(theVm==null) return; //没找到则返回
          //焦点定位
          focusToVm(vnode,theVm);
          //定位后事件
          $.isFunction(onAfterPrev) && onAfterPrev(theVm,e);
        });

      }else if(keyCode == 9 || keyCode == 13){//tab、enter
        tabEnterFn(el,vnode,"next",function(curVm,theVm){
          let nowRowData = JSON.parse(el.getAttribute("rowdata"));
          //定位前事件 若返回false 则返回
          if($.isFunction(onBeforeNext) && onBeforeNext(curVm,theVm,nowRowData,e)===false) return;
          if(theVm==null) return; //没找到则返回
          //焦点定位
          focusToVm(vnode,theVm);
          //定位后事件
          $.isFunction(onAfterNext) && onAfterNext(theVm,nowRowData,e);
        });
      }else if(keyCode ==38){
        upDownFn(el,vnode,true,function(curVm,theVm){
          if(theVm==null) return; //没找到则返回
          focusToVm(vnode,theVm);
        });
      }else if(keyCode == 40){//down
        upDownFn(el,vnode,false,function(curVm,theVm){
          if(theVm==null) return; //没找到则返回
          focusToVm(vnode,theVm);
        });
      }
    });
  },
  //在组件更新完成之后做操作，才能是获得的vnode准确
  componentUpdated(el,{value,oldValue},vnode){
    let vmData = vnode.data;
    //设置行数据到属性 rowdata上
    if(vmData && vmData.attrs && vmData.attrs["data-rowdata"] !== undefined){
      el.setAttribute('rowdata',JSON.stringify(vmData.attrs["data-rowdata"]));
    }
    if(value == oldValue) return;  //没有改变就返回
    let keyRefs = getKeyRefs(el,vnode);
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
  vnode.context.$refs[nextVm.rowRefName][nextVm.colIndex].focus();
};

/**
 *
 * @param keyRefs
 * @param current
 * @returns {*}
 */
const getTheRef = function(keyRefs,current){
  let keyL = keyRefs.length;
  let curVm = null;
  let refObj = getRefObj(current);
  if(refObj === null) return null;
  for(let j=0; j<keyL; j++){
    let item = keyRefs[j];
    if(item.ref == refObj.rowRefName && refObj.colIndex>-1 && refObj.colIndex<item.cols){
      curVm = refObj;
      curVm.keyIndex = j;
      curVm.cols = item.cols;
      break;
    }
  }
  return curVm;
};
const getRefObj = function(current){
  // "["符号的前面字符串
  let rowRefName = current.match(/(\S*)\[/);
  rowRefName = rowRefName && rowRefName[1];
  // "["与"]"符号的之间的字符串
  let colIndex = current.match(/\[([0-9]*)\]/);
  colIndex = colIndex && colIndex[1];

  if(rowRefName === null || colIndex === null) return null;

  return {
    rowRefName:rowRefName,
    colIndex:parseInt(colIndex)
  }
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
  let keyL = keyRefs.length;
  let theVm = jQextend({},curVm);
  if(isNext==="next"){
    //当前个就是最后一个了
    if(curVm.colIndex+1 >= keyRefs[curVm.keyIndex].cols){
      //已经到达最后一行了
      if(curVm.keyIndex+1 >= keyL){
        return null;
      }else {
        theVm.rowRefName = keyRefs[curVm.keyIndex+1].ref;
        theVm.cols = keyRefs[curVm.keyIndex+1].cols;
        theVm.colIndex = 0;
        theVm.keyIndex = curVm.keyIndex+1;
      }
    }else {
      theVm.colIndex = curVm.colIndex+1;
    }
  }else {
    //当前个是在第一列了
    if(curVm.colIndex<=0){
      //已经到达第一行了
      if(curVm.keyIndex <= 0){
        return null;
      }else {
        theVm.rowRefName = keyRefs[curVm.keyIndex-1].ref;
        theVm.cols = keyRefs[curVm.keyIndex-1].cols;
        theVm.colIndex = keyRefs[curVm.keyIndex-1].cols-1;
        theVm.keyIndex = curVm.keyIndex-1;
      }
    }else {
      theVm.colIndex = curVm.colIndex-1;
    }
  }
  if(getDisabledStatus(vnode,theVm)){
    theVm = nextOrPrevToRef(keyRefs,theVm,vnode,isNext);
  }
  return theVm;
};

/**
 * 判断某一组件是否可以编辑的状态
 * return true 代表不能编辑 return false 代表可以编辑
 * @param vnode     容器的虚拟节点
 * @param theVm   ref的名称
 * @returns {boolean}
 */
const getDisabledStatus = function(vnode,theVm){
  let rowRefs = vnode.context.$refs[theVm.rowRefName];
  if(!rowRefs || !rowRefs[theVm.colIndex]) return true;
  //若存在disabled属性 则也返回true
  let disabled = rowRefs[theVm.colIndex].getAttribute && rowRefs[theVm.colIndex].getAttribute("disabled");
  if(disabled) return true;
  let disStatus = rowRefs[theVm.colIndex].getDisabled;
  return (disStatus && disStatus()===true) ? true : false;
};

/**
 * 通过vnode的$refs 拼接keyRefs
 * @param el   用于获取前缀
 * @param vnode
 * @returns {Array}
 */
const getKeyRefs = function(el,vnode){
  let prefix = el.dataset.prefix || "keyRef_"; //前缀属性 默认前缀 keyRef
  let prefixL=prefix.length;
  let keyRefs=[];
  let refs = vnode.context.$refs;
  for(let key in refs){
    //匹配跟前缀prefix相同的属性
    if(refs.hasOwnProperty(key) && key.indexOf(prefix)===0 && refs[key].length){
      keyRefs.push({ref:key,cols:refs[key].length,index:parseInt(key.substring(prefixL))});
    }
  }
  keyRefs.sort(function(item,index,c){
    if(item.index < index.index){
      return -1;
    }else if(item.index > index.index){
      return 1;
    }else {
      return 0;
    }
  });
  return keyRefs;
};

//快捷键切换的方法tab/enter
const tabEnterFn = function(el,vnode,isNext,fn){
  let keyRefs = JSON.parse(el.getAttribute("keyRefs"));
  let current = el.dataset.current; //当前焦点聚集的ref名称；
  //找到当前焦点所在的vm (不可编辑时没有焦点的)
  let curVm = getTheRef(keyRefs,current);
  //若没有找到当前的 则返回null;
  if(curVm === null) return null;

  let theVm = nextOrPrevToRef(keyRefs,curVm,vnode,isNext);
  if($.isFunction(fn)){
    fn(curVm,theVm);
  }
};
//快捷键切换的方法 up/down
const upDownFn = function(el,vnode,isUp=true,fn){
  let keyRefs = JSON.parse(el.getAttribute("keyRefs"));
  let current = el.dataset.current; //当前焦点聚集的ref名称；
  //找到当前焦点所在的vm (不可编辑时没有焦点的)
  let curVm = getTheRef(keyRefs,current);
  //若没有找到当前的 则返回null;
  if(curVm === null) return null;

  let theVm = upDownToRef(keyRefs,curVm,vnode,isUp);
  if($.isFunction(fn)){
    fn(curVm,theVm);
  }
};

//快捷键切换的方法 up/down 获取上下行的组件
const upDownToRef = function(keyRefs,curVm,vnode,isUp=true){
  let keyL = keyRefs.length;
  let theVm = Object.assign({},curVm);//浅拷贝
  if(isUp){//up
    if(curVm.keyIndex<=0){//到达第一行
      return null;
    }else {
      //上一行没有那么多可以编辑的，则定位到上一行最后一个可以编辑的
      let theCol = curVm.colIndex>=keyRefs[curVm.keyIndex-1].cols ? keyRefs[curVm.keyIndex-1].cols - 1 : curVm.colIndex;
      theVm.rowRefName = keyRefs[curVm.keyIndex-1].ref;
      theVm.cols = keyRefs[curVm.keyIndex-1].cols;
      theVm.colIndex = theCol;
      theVm.keyIndex = curVm.keyIndex-1;
    }
  }else { //down
    if(curVm.keyIndex>=keyL-1){//到达可以编辑的最后一行
      return null;
    }else {
      //上一行没有那么多可以编辑的，则定位到上一行最后一个可以编辑的
      let theCol = curVm.colIndex>=keyRefs[curVm.keyIndex+1].cols ? keyRefs[curVm.keyIndex+1].cols - 1 : curVm.colIndex;
      theVm.rowRefName = keyRefs[curVm.keyIndex+1].ref;
      theVm.cols = keyRefs[curVm.keyIndex+1].cols;
      theVm.colIndex = theCol;
      theVm.keyIndex = curVm.keyIndex+1;
    }
  }
  return theVm;
};
