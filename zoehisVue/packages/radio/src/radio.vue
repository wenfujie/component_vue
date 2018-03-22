<template>
  <label class="zoehis_radio_all">
      <span
        class="zoehis_radio_input">
        <!--isCheck(判断选中)，isDisabled(判断禁用)，focus(判断聚焦)-->
        <!--i标签注释了  @focus="iFocus"  :tabindex="isDisabled? -1:tindex"-->
        <i class="zoeIconfont zoehis_radio"
           :class="[isCheck ? 'z_radioS_form' : 'z_radio_form',
          isDisabled ? 'zoehis_disabled':'',
          isCheck && isDisabled ? 'zoehis_disabled_check':'',
          isFocus && isShowFocus1 ? 'zoehis_focus':'']"
        ></i>
        <!--@focus="focus = true"  @blur="focus = false"  注释input中-->
        <input
          @click="handleClick"
          @focus="handleFocus"
          @blur="handleBlur"
          :name="name"
          type="radio"
          :disabled="isDisabled"
          :value="label"
          class="zoehis_radio_original"
          v-model="model">
      </span><span class="zoehis_radio_label"><slot></slot></span>
  </label>
</template>

<script type="text/ecmascript-6">
  import Emitter from '../../../src/mixins/emitter.js'
  export default{
    created: function () {
    },


    name: "ZoehisRadio",

    componentName: "ZoehisRadio",
    mixins: [Emitter],
    data() {
      return {
        _radioGroup: "",
        isFocus: false,
        isGoon: false,
      }
    },
    props: {
      tabNum: {},
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      tabindex: {},
      isShowFocus: {
        type: Boolean,
        default: false
      },
    },
    computed: {
//      判断是否是单选组，是的话找到单选组的父元素赋值给_radioGroup
      isGroup(){
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.name !== 'ZoehisRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },

      isCheck(){
        return this.model === this.label
      },
//      判断是否选中
      model: {
        get(){
          return this.isGroup ? this._radioGroup.value : this.value;
        },

        set(val) {
          this.$nextTick(()=>{
            if (this.isGroup&&this.isGoon) {
              this.isGoon = false;
              this.dispatch('ZoehisRadioGroup', 'input', [val]);
            } else {
              this.$emit('input', val);
            }
          })
        }
      },

      isDisabled() {
        return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
      },
//      判断绑定i上的tabindex值是多少
      tindex(){
        return this.tabindex ? this.tabindex : 0;
      },
//      是否显示聚焦样式
      isShowFocus1: function () {
        return this.isGroup ? this._radioGroup.$props.isShowFocus : this.isShowFocus;
      },
    },

    methods: {
      iFocus: function (e) {
        var input = e.currentTarget.nextElementSibling;
        input.focus();
      },

      focus(){
        this.$el.querySelector('input').focus();
      },

      handleClick: function (e) {
        if(this.isDisabled) return false;  //radio禁用
        this.$emit("click",this.label,this.model);
        if(this.isGroup){
          let beforeClick = this._radioGroup.$props.beforeClick;
          if(typeof beforeClick== "function"){
            let boo = beforeClick(this.label,this.model);
            if(boo===true){
              this.goOn();
            }
          }else{
            this.goOn();
          }
        }else{
          this.goOn();
        }
      },
      goOn(){
        if(this.isGroup){
          this.isGoon = true;
          this.isFocus = true;
        }
      },

      handleFocus: function () {
        this.$emit("focus",this.label);
        this.isFocus = true;
      },

      handleBlur: function () {
        this.$emit("blur",this.label);
        this.isFocus = false;
      },

    }
  }
</script>

