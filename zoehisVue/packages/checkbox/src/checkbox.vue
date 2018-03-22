<template>
  <label
    class="zoehis_checkbox"
    :class="isFocus ? 'zoehis_focus' : ''"
  >
    <span
      class="zoehis_checkbox_input zoeIconfont"
      :class="[
      isChecked ? 'z_checkboxS_form' : 'z_checkbox_form',
      {
        'zoehis_disabled':disabled
      }]"
    >
      <input
        type="checkbox"
        class="zoehis_checkbox_original"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="isFocus = false"
        @keyup.enter="handleEnter"
        @click="handleClick"
        :name="name"
        :value="label"
        v-model="model"
        ref="input"
      >
    </span><span v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '../../../src/mixins/emitter.js';
  export default {
    name: 'ZoehisCheckbox',
    componentName: 'ZoehisCheckbox',
    mixins: [Emitter],
    props: {
      value: {},
      label: {},
      disabled:Boolean,//是否可用
      checked: Boolean,//选中的状态
      name: String,
      trueflag:{
        type:[String,Boolean,Number],
        default:true
      },
      falseflag:{
        type:[String,Boolean,Number],
        default:false
      },
      beforeSelect: Function,//选中前事件 返回false 阻止选中
      item:[Object,String,Boolean,Number],//用于解决beforeSelect不能额外传参数的问题  该参数会作为beforeSelect的第二个参数被传出去
      strictflag:Boolean,//trueflag 是否需要全等 默认 不需要
    },
    data(){
      return{
        isBeforeSelect:false,//当前是否是有点击前事件，同时点击前事件返回false了
        isFocus:false,         //焦点聚集
        selfModel: false
      }
    },
    watch:{
      value(val){
        this.$emit('change',val);
      }
    },
    computed:{
      model: {
        get() {
          if(this.strictflag){
            return this.isGroup
              ? this.store : this.value !== undefined
              ? this.value===this.trueflag : this.selfModel===this.trueflag;
          }else {
            return this.isGroup
              ? this.store : this.value !== undefined
              ? this.value==this.trueflag : this.selfModel==this.trueflag;
          }

        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('ZoehisCheckboxGroup', 'input', [val]);//向父组件触发事件设置值
            this.dispatch('ZoehisCheckboxGroup', 'inputnative', [val]);//向父组件触发事件设置值
          } else {
            if(this.isBeforeSelect){
              this.isBeforeSelect=false;
              return;
            }else{
              if (typeof this.beforeSelect === 'function' && this.beforeSelect(val,this.item)===false) {
                this.isBeforeSelect=true;
                this.model=!val;
                return;
              }else {
                this.isBeforeSelect=false;
              }
            }
            let curVal = val? this.trueflag:this.falseflag;
            this.$emit('input', curVal);
            this.$emit('inputnative', curVal);
            this.selfModel = curVal;
          }
        }
      },
      isGroup() {//判断是不是复选框的组
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'ZoehisCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },
      isChecked() {//是否选中
        if ({}.toString.call(this.model) === '[object Boolean]') {//判断model是不是Boolean类型
          return this.model;
        } else if (Array.isArray(this.model)) {//数组类型
          return this.model.indexOf(this.label) > -1;
        }
      },
      store() {//获取值
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      }
    },
    methods: {
      handleClick(){
        this.$emit("click",[this.selfModel,event])
      },
      //获取是否可以编辑的状态
      getDisabled(){
        return this.disabled;
      },
      focus:function(){//焦点定位方法
        this.$refs.input.focus();
      },
      handleEnter:function(evt){//enter事件
        this.$emit("enter",evt);
      },
      //焦点聚集的方法
      handleFocus(){
        this.isFocus = true;
        this.$emit("focus");
      },
      addToStore() {//设置初始化
        if (
          Array.isArray(this.model) &&
          this.model.indexOf(this.label) === -1
        ) {
          this.model.push(this.label);
        }else {
          this.model=true;
        }
      }
    },
    created(){
      this.checked && this.addToStore();

    }
  };
</script>
