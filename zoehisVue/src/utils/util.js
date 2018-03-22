/**
 * Created by lhn on 2017/8/14.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;//对象的原型链中是否存在该属性
/**
 *
 * @param obj 对象
 * @param key key
 * @returns {boolean}
 */
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
/**
 * 覆盖式扩展to(源)对象
 * @param to 源
 * @param _from 添加的对象
 * @returns {*} 返回to
 */
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};
/**
 * 覆盖式合并对象
 * @param arry 对象数组
 * @returns {{}}
 */
export function toObject(arry) {
  var res = {};
  for (let i = 0; i < arry.length; i++) {
    if (arry[i]) {
      extend(res, arry[i]);
    }
  }
  return res;
};
/**
 * 根据路径获取相关值
 * @param object 对象
 * @param prop 路径 “.”隔开
 * @returns {*}
 */
export const getValueByPath = function (object, prop) {
  prop = prop || '';
  const paths = prop.split(".");
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current)break;
    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};
/**
 *  去掉字符串前后的所有空格
 * @param str  字符串
 */
export function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 *  判断是否是undefined、null、""
 * @param obj 要被判断的对象/字符串
 * @returns {boolean}
 */
export function isNull(obj){
  if(obj==null || obj==='' || obj === undefined){
    return true
  }else if(typeof obj=='string'){
    var spaceRe = new RegExp("^[ ]+$");//检验两边是否为空
    if (spaceRe.test(obj)) {//为空
      return true;
    } else {//不为空
      obj = obj.toUpperCase();
      if (obj === 'NULL' || obj === 'UNDEFINED' || obj === '{}') {
        return false
      }
    }
  }else {
    return false;
  }
}
/**
 * 判断是否是空对象，若obj不是对象，则返回true
 * @param obj 对象
 * @returns {boolean}
 */
export function isEmptyObject(obj){
  for(var name in obj){
    if(obj.hasOwnProperty(name)){
      return false;
    }
  }
  return true;
};
//拷贝于jquery源码
export function jQextend(){
  var src, copyIsArray, copy, name, options, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
}
