<template>
  <div class="zoehis_dialog_wrapper" v-show="visible" @click.self="handleWrapperClick">
    <div
      class="zoehis_dialog"
      ref="dialog"
    >
      <div
        class="zoehis_dialog_header"
        v-if="title"
        @mousedown="handleMousedown('header',$event)"
      >
        <span>{{title}}</span>
        <i class="zoeIconfont zoehis_header_close z_close_normal" v-if="headerclose" @click="handleHeaderClose"></i>
      </div>
      <zoehis-scrollbar ref="scrollbar">
        <div
          class="zoehis_dialog_body"
          v-if="rendered"
          :style="initBodyH"
          @mousedown="handleMousedown('body',$event)"
        ><slot></slot></div>
      </zoehis-scrollbar>

      <div class="zoehis_dialog_footer" v-if="$slots.footer">
        <a
          class="zoehis_dialog_error_toggle"
          v-if="$slots.error"
          @click="errorToggleClick"
        >
          <i
            class="zoeIconfont"
            :class="errorSlideDown ? 'z_dropU_form' : 'z_dropD_form'"
          ></i>
          {{errorSlideDown ? errorSlideDownName : errorSlideUpName}}
        </a>
        <slot name="footer"></slot>
      </div>
      <div
        class="zoehis_dialog_error"
        v-if="$slots.error"
        v-show="errorSlideDown"
        ref="error"
      >
        <div class="zoehis_dialog_error_detail"><slot name="error"></slot></div>
        <div class="zoehis_dialog_error_send"><span>{{$t('zoehisUI.dialog.sendManager')}}</span></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Popup from '../../../src/utils/popup/index';
  import {setStyle} from '../../../src/utils/dom';
  import { addResizeListener, removeResizeListener } from '../../../src/utils/resize-event';
  import ZoehisScrollbar from '../../scrollbar/index.js'
  export default {
    name: 'ZoehisDialog',
    componentName: 'ZoehisDialog',
    mixins: [Popup],
    components:{ZoehisScrollbar},
    data(){
      return {
        errorSlideDown:false,//错误详情是否展开，true代表展开，false代表关闭
        dHeight:0,
        eHeight:50//错误区的高度
      }
    },
    props:{
      title: { //弹窗标题 为""空的话，不显示弹窗标题
        type: String,
        default(){
          return this.$t('zoehisUI.dialog.title')
        }
      },
      modal: {//是否显示黑色遮罩
        type: Boolean,
        default: true
      },
      modalAppendToBody: {//黑色遮罩的位置//body下或者当前弹窗的同级下
        type: Boolean,
        default: false
      },
      width:{
        type:[Number,String],
        default:420
      },
      height:{
        type:[Number,String],
        default:235
      },
      closeOnClickModal: {//点击遮罩是否关闭弹窗、false：不关闭
        type: Boolean,
        default: false
      },
      closeOnPressEscape: {//按快捷键esc是否关闭弹窗、false：不关闭；true关闭
        type: Boolean,
        default: true
      },
      beforeClose: Function, //关闭前事件
      errorSlideDownName: {
        type:String,
        default(){
          return this.$t('zoehisUI.dialog.errorSlideDownName')
        }
      },
      errorSlideUpName: {
        type:String,
        default(){
          return this.$t('zoehisUI.dialog.errorSlideUpName')
        }
      },
      headerclose:Boolean,
      supportdrag:{//是否支持拖拉
        type:Boolean,
        default:true
      }
    },
    methods:{
      //滚动条的位置
      scrollMove(left=0,top=0){
        this.$refs.scrollbar.move({
          left:left,top:top
        });
      },
      handleHeaderClose(){
        this.$emit("headerclose");
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
          top:(wh-this.dHeight)/2+'px'
        };
        if(!fixedLeft) tempParam.left=(ww-parseInt(this.width))/2+'px';
        setStyle(this.$refs.dialog,tempParam);
      },
      errorToggleClick(){
        const errorSlide = !this.errorSlideDown;
        this.toggleErrorDetail(errorSlide);
      },
      //切换错误选择区
      toggleErrorDetail(val){
        //如果val没有传，则当做切换
        if(val===undefined){
          this.errorSlideDown = !this.errorSlideDown;
        }else if(this.errorSlideDown === val){//如果val值与errorSlideDown一样 则返回，不做处理
          return;
        }else {
          this.errorSlideDown = val;
        }
        this.$nextTick(function(){
          if(this.errorSlideDown){
            this.eHeight = this.$refs.error.clientHeight;
            this.dHeight = this.dHeight+this.eHeight;
          }else {
            this.dHeight = this.dHeight-this.eHeight;
          }
          this.initStyle(true);
        });
      },
      handleWrapperClick:function(){//遮罩点击事件
        if(!this.closeOnClickModal) return;
        this.handleClose();
      },
      //关闭前事件 若父组件有定义beforeClose变量 要关闭时直接执行（参数的方法）
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
        }
      },
      //显示弹窗的方法
      show() {
        this.$emit('update:visible', true);
      },
      handleMousedown(type,ev){
        if(type=="body" && this.title!="") return;//若存在头部，则内容去的拖拉无效果
        if(!this.supportdrag) return;
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
        var x=ev.clientX-dlgBox.offsetLeft;//x=鼠标相对于网页的x坐标-待移动对象的左外边距
        var y=ev.clientY-dlgBox.offsetTop;//y=鼠标相对于网页的y左边-待移动对象的左上边距
        d.onmousemove=function(moveEv){//鼠标移动
          if(!_start) return false;
          moveEv = moveEv || window.event;//移动时创建一个事件
          var l=moveEv.clientX-x;
          var t=moveEv.clientY-y;
          if(l<0){
            l=0;
          }else if(l+ parseInt(g.width)>ww){
            l=ww- parseInt(g.width);
          }
          if(t<0){
            t=0;
          }else if(t+ g.dHeight>wh){
            t=wh- g.dHeight;
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
      }
    },
    computed:{
      initBodyH(){
        var bodyH = this.height-(this.title=="" ? 0 : 38)-(this.$slots.footer ? 51 : 0);
        return "height:"+bodyH+"px;"
      }
    },
    watch:{
      visible(val){
        this.$emit('update:visible', val);
        if (val) {
          this.$emit('open');
        } else {
          this.$emit('close');
        }
      },
      width(val){
        this.initStyle();
      },
      height(val){
        this.dHeight=parseInt(val);
        this.initStyle();
      }
    },
    created(){
      this.dHeight=parseInt(this.height);
    },
    mounted() {
      const vThis = this;
      if (vThis.visible) {
        vThis.rendered = true;//代表已经渲染完成
        vThis.open();
      }
      vThis.initStyle();
      addResizeListener(this.$el,()=>{
        this.initStyle();
    });
    },
    beforeDestroy() {
      if (this.$el && this.initStyle) removeResizeListener(this.$el, this.initStyle);
    }
  };
</script>
