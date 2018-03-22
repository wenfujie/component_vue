<template>
  <div
    class="zoehis_message_box_wrapper"
    v-show="visible"
    @click.self="handleWrapperClick"

  >
    <div
      class="zoehis_message_box"
      ref="dialog"
      :class="customClass"
    >
      <div class="zoehis_message_box_header" v-if="title !== ''" @mousedown="handleMousedown">
        <span>{{title}}</span>
      </div>
      <div class="zoehis_message_box_body" :style="{height: (height-89)+'px'}">
        <div class="zoehis_message_box_body_inner">
          <i v-if="type" class="zoehis_icon zoeIconfont" :class="[iconTypeClass]"></i>
          <div class="zoehis_message_box_message">
            <div class="zoehis_message_box_info">
              <p v-html="message"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="zoehis_message_box_footer" v-if="showConfirmButton || showNoButton || showCancelButton">
        <a
          class="zoehis_message_box_error_toggle"
          v-if="errorMessage!=''"
          @click="errorToggleClick"
        >
          <i
            class="zoeIconfont"
            :class="errorSlideDown ? 'z_dropU_form' : 'z_dropD_form'"
          ></i>
          {{errorSlideDown ? errorSlideDownName : errorSlideUpName}}
        </a>
        <zoehis-button
          type="primary"
          @clickenter="handleAction('confirm')"
          v-show="showConfirmButton"
          :ref="btnRef.confirm"
          icon="z_examine_normal"
        >{{(type=="question" || confirmType!='1')?yesButtonText:confirmButtonText}}</zoehis-button>
        <zoehis-button
          v-show="showNoButton"
          :ref="btnRef.no"
          icon="z_positiveF_normal"
          @clickenter="handleAction('no')">{{noButtonText}}</zoehis-button>
        <zoehis-button
          v-show="showCancelButton"
          :ref="btnRef.cancel"
          icon="z_cancellationOA_normal02"
          @clickenter="handleAction('cancel')">{{confirmType=='1' ? cancelButtonText : noButtonText}}</zoehis-button>
      </div>
      <div
        class="zoehis_message_box_error"
        v-if="errorMessage!=''"
        v-show="errorSlideDown"
        ref="error"
      >
        <div class="zoehis_message_box_error_detail">{{errorMessage}}</div>
        <div class="zoehis_message_box_error_send"><span>{{sendManager}}</span></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Popup from '../../../src/utils/popup/index';
  import ZoehisButton from '../../button/src/button';
  import {setStyle,on} from '../../../src/utils/dom';

  let iconTypeMap = {
    success: 'success_icon z_right_normal',
    error: 'error_icon z_wrong_normal',
    question: 'question_icon z_question_normal',
    warn: 'warn_icon z_warm_normal'
  };

  export default {
    data() {
      return {
        title:undefined,
        message: '',
        type: '',
        showConfirmButton: true,
        showNoButton: false,
        showCancelButton: true,
        yesButtonText:"是",
        confirmButtonText: '确认',
        noButtonText: '否',
        cancelButtonText: '取消',
        errorSlideDownName:'收起详情信息',
        errorSlideUpName:'展开详情信息',
        sendManager:'发送给管理员',
        action: "",
        callback: null,
        width: 420,
        height: 235,
        customClass: '',
        errorSlideDown:false,//错误详情是否展开，true代表展开，false代表关闭
        errorMessage:"",
        confirmType:1,
        isSetTimeout:false,//是否启用自动关闭功能
        timeoutNum:1000,//多少毫秒后关闭弹窗 默认500ms
      };
    },
    mixins: [Popup],
    components: {
      ZoehisButton
    },
    props:{
      modal: {//显示遮罩
        default: true
      },
      closeOnClickModal: {//点击遮罩是否关闭弹窗、false：不关闭
        default: false
      },
      closeOnPressEscape: {//按快捷键esc是否关闭弹窗、false：不关闭；true关闭
        default: true
      }
    },
    computed: {
      iconTypeClass() {
        return iconTypeMap[this.type];
      }
    },

    created(){
      let time = new Date().getTime();
      this.btnRef={
        confirm:"confirm" + time,
        no:"no" + time,
        cancel:"cancel" + time
      };
    },
    watch: {
      visible(val) {
        if(val){
          this.$nextTick(()=>{
            if(this.showConfirmButton){
              this.$refs[this.btnRef.confirm].focus();
            }else if(this.showNoButton){
              this.$refs[this.btnRef.no].focus();
            }else if(this.showCancelButton){
              this.$refs[this.btnRef.cancel].focus();
            }
          });
        }
      }
    },

    methods: {
      errorToggleClick(){
        this.errorSlideDown = !this.errorSlideDown;
        //dom元素显示出来才执行initStyle
        this.$nextTick(function(){
          this.initStyle(true);
        });
      },
      /**
       * 初始化弹窗的位置
       * @param fixedLeft 距离左边的位置是否不需要设置 true代表不去管左边的位置 false/没传表示需要去处理距离左边的位置
       */
      initStyle(fixedLeft){      //初始化弹窗的位置跟宽度
        let wh = window.innerHeight;//获取窗体高度
        let ww = window.innerWidth;//获取窗体宽度
        var tempParam = {
          width:this.width+'px',
          top:(wh - (this.$refs.error ? this.$refs.error.offsetHeight : 0)-this.height)/2+'px'
        };
        if(!fixedLeft) tempParam.left=(ww-this.width)/2+'px';
        setStyle(this.$refs.dialog,tempParam);
      },
      handleMousedown(ev){
        var g=this;
        var _start = true; //开始标志
        var wh = window.innerHeight;//获取窗体高度
        var ww = window.innerWidth;//获取窗体高度
        var dlgBox = this.$refs.dialog;
        dlgBox.style.cursor="move";
        //鼠标按下
        var d=document;
        if(!ev) ev=window.event;
        //按下时创建一个事件
        var x=ev.clientX-dlgBox.offsetLeft;
        //x=鼠标相对于网页的x坐标-网页被卷去的宽-待移动对象的左外边距
        var y=ev.clientY-dlgBox.offsetTop;
        //y=鼠标相对于网页的y左边-网页被卷去的高-待移动对象的左上边距
        d.onmousemove=function(moveEv){//鼠标移动
          if(!_start) return false;
          moveEv = moveEv || window.event;//移动时创建一个事件
          var l=moveEv.clientX-x;
          var t=moveEv.clientY-y;
          if(l<0){
            l=0;
          }else if(l+ g.width>ww){
            l=ww- g.width;
          }
          if(t<0){
            t=0;
          }else if(t+ g.height>wh){
            t=wh- g.height;
          }
          dlgBox.style.left=l+"px";
          dlgBox.style.top=t+"px";
          if (moveEv.preventDefault) {
            moveEv.preventDefault();
          }
          return false;
        };
        d.onmouseup=function (){//鼠标放开
          if(!_start == true) return false;
          document.onmousemove=null;
          document.onmouseup = null;
          dlgBox.style.cursor="default";//设置放开的样式
          _start = false; //结束
        };
      },
      handleWrapperClick:function(){//遮罩点击事件
        if(this.closeOnClickModal){
          this.handleAction("cancel");
        }
      },
      handleAction(action) {
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(action, this, this.doClose);
        } else {
          this.doClose();
        }
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

//        this.onClose && this.onClose();

        this.opened = false;


        this.doAfterClose();//关闭遮罩

        //关闭弹窗的回调函数
        if (this.action) this.callback(this.action, this);
      }
    }
  };
</script>
