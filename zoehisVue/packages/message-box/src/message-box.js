const defaults = {
  title: "提示",//默认为提示
  message: '',
  type: '',
  //showInput: false,
  //showClose: true,
  //modalFade: true,
  //lockScroll: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  //inputValue: null,
  //inputPlaceholder: '',
  //inputPattern: null,
  //inputValidator: null,
  //inputErrorMessage: '',
  showConfirmButton: true,
  showNoButton: false,
  showCancelButton: true,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: '确认',
  noButtonText: '否',
  cancelButtonText: '取消',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null,
  errorMessage:"",
  preventOverId:"",//要插入字段的ID
  confirmType:1,//确认弹窗按钮文本内容不同 "1":确认/取消  "2"是/否
  isSetTimeout:false,//是否启用自动关闭功能
  timeoutNum:1000,//多少毫秒后关闭弹窗 默认500ms
  width: 420,
  height: 235,
};

import Vue from 'vue';
import messageBoxVue from './message-box.vue';
import merge from '../../../src/utils/merge';
//import { isVNode } from 'element-ui/src/utils/vdom';

const MessageBoxConstructor = Vue.extend(messageBoxVue);

let currentMsg, instance;
let msgQueue = [];

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      //if (instance.showInput) {
      //  callback(instance.inputValue, action);
      //} else {
      callback(action);
      //}
    }
    //if (currentMsg.resolve) {
    //  if (action === 'confirm') {
    //    if (instance.showInput) {
    //      currentMsg.resolve({ value: instance.inputValue, action });
    //    } else {
    //      currentMsg.resolve(action);
    //    }
    //  } else if (action === 'cancel' && currentMsg.reject) {
    //    currentMsg.reject(action);
    //  }
    //}
  }
};

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

const showNextMsg = () => {
  if (!instance) { //对象vm不存在，则new一个
    initInstance();
  }
  instance.action = '';

  if (!instance.visible) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      };
      //if (isVNode(instance.message)) {
      //  instance.$slots.default = [instance.message];
      //  instance.message = null;
      //} else {
      delete instance.$slots.default;
      //}
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      let appendDom = options.preventOverId && document.getElementById(options.preventOverId);
      if(appendDom){
        appendDom.appendChild(instance.$el);
      }else {
        document.body.appendChild(instance.$el);
      }

      Vue.nextTick(() => {

        //设置窗体的位置
        window.onresize=function(){
          instance.initStyle();
        };
        instance.initStyle();

        //显示弹窗
        instance.visible = true;
        if(instance.isSetTimeout){
          setTimeout(()=>{
            //隐藏弹窗
            instance.doClose();
          },instance.timeoutNum)
        }
      });
    }
  }
};

const MessageBox = function(options, callback) {
  if (Vue.prototype.$isServer) return;
  if (typeof options === 'string') {
    options = {
      message: options
    };
    if (arguments[1]) {
      options.title = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  //if (typeof Promise !== 'undefined') {
  //  return new Promise((resolve, reject) => { // eslint-disable-line
  //    msgQueue.push({
  //      options: merge({}, defaults, MessageBox.defaults, options),
  //      callback: callback,
  //      resolve: resolve,
  //      reject: reject
  //    });
  //
  //    showNextMsg();
  //  });
  //} else {
  msgQueue.push({
    options: merge({}, defaults, MessageBox.defaults, options),
    callback: callback
  });


  showNextMsg();
  //}
};

MessageBox.setDefaults = defaults => {
  MessageBox.defaults = defaults;
};

MessageBox.success = (message, options) => {
  return MessageBox(merge({
    message: message,
    type: 'success',
    showCancelButton: false
  }, options));
};

MessageBox.error = (message, options) => {
  return MessageBox(merge({
    message: message,
    type: 'error',
    showCancelButton: false
  }, options));
};

MessageBox.warn = (message, options) => {
  return MessageBox(merge({
    message: message,
    type: 'warn',
    showCancelButton: false
  }, options));
};

MessageBox.confirm = (message, options) => {
  return MessageBox(merge({
    message: message,
    type: 'warn',
    showCancelButton: true
  }, options));
};

MessageBox.confirm2 = (message, options) => {
  return MessageBox(merge({
    message: message,
    type: 'warn',
    showCancelButton: true,
    confirmType:2
  }, options));
};

MessageBox.question = (message, options) => {
  return MessageBox(merge({
    message: message,
    showNoButton: true,
    type: 'question'
  }, options));
};

MessageBox.timeoutPopup = (message, options) => {
  return MessageBox(merge({
    message: message,
    showConfirmButton: false,
    showNoButton: false,
    showCancelButton: false,
    type: 'success',
    width:360,
    height:250,
    isSetTimeout: true
  }, options));
};

MessageBox.close = () => {
  instance.visible = false;
  msgQueue = [];
  currentMsg = null;
};

export default MessageBox;
export { MessageBox };
