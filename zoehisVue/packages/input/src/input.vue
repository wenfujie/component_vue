<template>
  <div
    :class="[
      type === 'textarea' ? 'zoehis_textarea' : 'zoehis_input',
      {
        'zoehis_over':(mouseover || isFocus),
        'zoehis_disabled':disabled,
        'zoehis_line':isShowLine,
        'zoehis_error':errorTip!='',
      }
    ]"
    ref="reference"
    @click="handleClick"
    :style="textStyle"
    @mouseover="mouseover = true"
    @mouseleave="mouseover = false"
  >
    <!--错误提示-->
    <transition
      name="zoehis_zoom_in_top"
      @after-leave="doDestroy">
      >
      <zoehis-input-error
        v-show="showError"
        ref="popper"
        :error-tip="errorTip"
        :prevent-over-id="preventOverId"
        :width="errorTipWidth"
      >
      </zoehis-input-error>
    </transition>
    <i
      v-if="showCloseIcon"
      class="zoeIconfont"
      :class="iconClass"
      @click.stop="handleClear"
    ></i>
    <i
      v-else-if="showIcon"
      class="zoeIconfont"
      :class="iconClass"
      @click.stop="handleClickIcon"
    ></i>
    <input
      v-if="type==='text'"
      class="zoehis_input_inner"
      type="text"
      :style="{textAlign:textAlign}"
      ref="input"
      :placeholder="isShowLine ? '' : placeholder"
      :disabled="disabled"
      :readonly="readonly"
      v-on="{focus:handleFocus,blur:handleBlur}"
      @input="handleInput"
      @keyup.46="handleClear"
      v-model="currentValue"
      :title="currentValue"
    />
    <input
      v-else-if="type==='password'"
      class="zoehis_input_inner"
      type="password"
      ref="input"
      :placeholder="isShowLine ? '' : placeholder"
      :disabled="disabled"
      :readonly="readonly"
      v-on="{focus:handleFocus,blur:handleBlur}"
      @input="handleInput"
      @keyup.46="handleClear"
      v-model="currentValue"
    />
    <textarea
      v-else
      class="zoehis_textarea_inner"
      type="textarea"
      ref="textarea"
      :placeholder="disabled ? '' : placeholder"
      :disabled="disabled"
      :readonly="readonly"
      v-on="{focus:handleFocus,blur:handleBlur}"
      @input="handleInput"
      @keyup.46="handleClear"
      v-model="currentValue"
    ></textarea>
  </div>
</template>
<script type="text/babel">
  import Emitter from '../../../src/mixins/emitter';
  import ZoehisInputError from './input-error';
  import {addResizeListener,removeResizeListener} from '../../../src/utils/resize-event';//resize事件(监听某个元素的)
  export default {
    name: 'ZoehisInput',
    componentName: 'ZoehisInput',
    components: {
      ZoehisInputError
    },
    mixins: [Emitter],
    props: {
      type: {    //文本类型
        type: String,
        default: "text"
      },
      value: {
        default:""
      }, //定义父组件传过来的值，即v-model
      icon: String,
      disabled: Boolean,
      readonly: Boolean,//是否只读，true：只读，false不是
      placeholder: String,
      width: {      //文本的宽度
        type:[Number,String],
        default: 115
      },
      height: {      //文本的height
        type:[Number,String],
        default: ""
      },
      clearable: {    //是否启动清空功能
        type: Boolean,
        default: true
      },
      clickselect: {    //单击的时候文字全选
        type: Boolean,
        default: true
      },
      textAlign: {//input textAlign属性
        type: String,
        default: "left"
      },
      showclose: Boolean,  //有清空功能的时候是否优先显示XX图标
      reg:RegExp,//自定义正则校验
      checkType:String, //校验类型 目前有 "num/int/float/digit"
      decimalLength:Number,//保留的小数位
      digitLength:Number,//保留的正数位
      preventOverId:{
        type:String,
        default:""
      },
      errorTip:{
        type:String,
        default:""
      },
      positive:Boolean, //正数 包括0
      checkzero:{   //检验时要不要包括0
        type:Boolean,
        default:true
      },

    },
    data(){
      return{
        currentValue:"",//当前的值
        mouseover:false,//用来判断鼠标悬浮的
        isFocus:false,//焦点聚集状态
        isPercent: false,//宽度是否是百分比
        errorTipWidth:0,
        showError:false//是否显示错误提示框
      }
    },
    computed:{
      isShowLine:function(){
        return (this.disabled && this.currentValue==="") ? true : false;
      },
      textStyle(){
        var re = /^[0-9]+\.?[0-9]*$/; //匹配是否是数字
        let obj = {
          height: re.test(this.height) ? this.height+'px' : this.height
        };
        if(re.test(this.width)){
          obj.width = this.width+'px';
          this.isPercent=false;
        }else {
          obj.width = this.width;
          this.isPercent=true;
        }
        return obj;
      },
      showIcon(){
        // 自定义的图标
        return (this.icon && !this.disabled);
      },
      showCloseIcon(){
        //clearable为true 且不是禁止状态且鼠标移上去
        let isShow = (this.mouseover && this.clearable && !this.disabled && this.currentValue!=="" && this.currentValue!==null && (!this.showclose && !this.icon || this.showclose));
        return isShow;
      },
      iconClass(){
        let html = '';
        if(this.type === 'textarea'){
          html = 'zoehis_textarea_icon'
        }else {
          html = 'zoehis_input_icon ';
        }

        if(this.showCloseIcon && !this.icon){
          html += ' zoehis_close z_close_normal';
        }else if(this.icon && !this.showclose){
          html += this.icon;
        }else if(this.showclose && this.showCloseIcon){
          html += ' zoehis_close z_close_normal';
        }else if(this.icon){
          html += this.icon;
        }
        return html;
      },
      regStr(){
        if(this.reg) return this.reg;
        let reg,temp;
        let dec = this.decimalLength ? `{0,${this.decimalLength}}` : '*';
        let dig = this.digitLength ? `{0,${this.digitLength-1}}` : '*';
        let pos = this.positive ? "" : "-?";
        let zero = this.checkzero ? "[0]|" : "";
        switch (this.checkType){
          case 'num':
            temp = `^(${zero}[1-9]\\d${dig})$|^$`;//保留的正数 位数
            reg = new RegExp(temp);
            break;
          case 'int':
            temp = `^(${zero}${pos}[1-9]\\d${dig})$|^${pos}$`;//保留的正数 位数
            reg = new RegExp(temp);
            break;
          case 'float':
            temp = `^(${pos}([1-9][0-9]${dig})(\\.\\d${dec})?|[0](\\.\\d${dec})?)$|^${pos}$`;//保留的正数 位数
            reg = new RegExp(temp);
            break;
          case 'digit': //纯数字
            let dig2 = this.digitLength ? `{0,${this.digitLength}}` : '*';
            temp = `^\\d${dig2}$|^$`;//保留的正数 位数
            reg = new RegExp(temp);
            break;
          default:
        }
        return reg;
      }
    },
    watch: {
      value:{
        handler(val) {
          this.setValue(val);
        },
        immediate:true //立即执行
      },
      showError(val){
        if(val){
          this.$nextTick(() => {
            this.broadcast('ZoehisInputError', 'updatePopper')
          });
        }else {
          this.$nextTick(() => {
            this.broadcast('ZoehisInputError', 'destroyPopper')
          });
        }
      }
    },
    methods: {
      setErrorTipWidth(){
        this.$nextTick(()=>{
          this.errorTipWidth = this.$refs.reference.getBoundingClientRect().width || this.width;
        });
      },
      //错误提示的销毁
      doDestroy(){
        this.$refs.popper && this.$refs.popper.doDestroy();
      },
      //获取是否可以编辑的状态
      getDisabled(){
        return this.disabled;
      },
      getValue:function(){ //获取当前的值（给父组件用）
        return this.currentValue;
      },
      setValue:function(val){ //设置值（给父组件用）
        if(val===this.currentValue) return;
        this.currentValue=val;
        this.$emit('input', val);
        this.$emit('change', val);
      },
      handleFocus(event) {//焦点聚集事件
        this.isFocus=true;
        this.changeShowError();
        this.$emit('focus', event);
      },
      handleBlur(event) {//焦点离开事件
        this.isFocus=false;
        this.changeShowError();
        this.$emit('blur', event);
      },
      //改变showError的值
      changeShowError(){
        if(this.isFocus && this.errorTip!=""){
          this.showError = true;
        }else {
          this.showError = false;
        }
      },
      handleInput(event) {//值改变事件
        let value = event.target.value;
        const _value = event.target._value;//旧的值
        let reg = this.regStr;
        if(reg && !reg.test(value)){
          value = _value;
        }
        this.currentValue=value;
        if(value===_value) return;
        this.$emit('input', value);
        this.$emit('inputnative', value);
        this.$emit('change', value);
      },
      handleClickIcon(event) {
        this.$emit('clickicon', event);
      },
      handleClear(event) { //清空事件
        let isClear = this.clearable &&
          this.currentValue !=="" &&
          this.currentValue !==null &&
          !this.disabled;
        if(!isClear) return;
        this.$emit('input', "");
        this.$emit('change', "");
        this.$emit('clear', event);
        this.focus();
      },
      handleClick(event) { //点击输入框的事件
        this.$emit('click', event);
        //若选中某一部分了就不在去全选了
        if(this.type == 'text' && (this.$refs.input.selectionStart == this.$refs.input.selectionEnd)){
          this.focus();
        }
      },
      //全选方法
      inputSelect() {
        this.$refs.input.select();
      },
      //焦点聚集方法
      focus() {
        this.$refs[this.type!='textarea' ? 'input' : 'textarea'].focus();
        this.clickselect && this.$refs[this.type!='textarea' ? 'input' : 'textarea'].select();
      }
    },
    created() {
      this.currentValue=this.value;
      //监听全选事件
      this.$on('inputSelect', this.inputSelect);
    },
    mounted(){
      this.setErrorTipWidth();
      addResizeListener(this.$refs.reference,()=>{
        //是百分比的时候才去重新设置inputWidth的值
        this.isPercent && this.setErrorTipWidth();
      });
    },
    beforeDestroy(){
      removeResizeListener(this.$refs.reference);
    },
  };
</script>
