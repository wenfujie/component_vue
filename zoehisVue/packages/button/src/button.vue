<template>
  <button
    class="zoehis_button"
    :disabled="disabled"
    @click="handleClickEnter"
    @keydown.enter.prevent
    @keyup.enter="handleClickEnter"
    @focus="handleFocus"
    @blur="handleBlur"
    :class="[
      type ? 'zoehis_button_' + type : '',
      size ? 'zoehis_button_' + size : '',
      {
        'zoehis_disabled':disabled,
        'has_icon':icon,
      }
    ]"

  >
    <i :class="'zoehis_button_icon zoeIconfont ' + icon" v-if="icon"></i><template v-if="icon">&nbsp;</template><span v-if="keyboard" class="zoehis_button_keyboard">{{keyboard}}</span><span v-if="$slots.default" class="zoehis_button_desc"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ZoehisButton',
    props: {
      type: {    //按钮类型  default/primary/features(默认的、主要的、底部按钮功能键)
        type: String,
        default: "default"
      },
      size: {   // normal | small（正常按钮/小型按钮）
        type:String,
        default:'normal'
      },
      icon: String,//是否有图标，目前只针对底部按钮图标
      keyboard: [String,Number],//给按钮加快捷键的数字
      disabled:Boolean
    },
    methods: {
      handleClickEnter:function(evt){
        this.$emit('clickenter', evt); //向父级触发事件
      },
      handleFocus:function(evt){
        this.$emit('focus', evt); //向父级触发事件
      },
      handleBlur:function(evt){
        this.$emit('blur', evt); //向父级触发事件
      },
      //焦点聚集的方法
      focus:function(evt){
        this.$el.focus()
      },
      //获取当前按钮是否不可以点击的状态  true代表不可以点击
      getDisabled:function(){
        return this.disabled;
      }
    }
  };
</script>
