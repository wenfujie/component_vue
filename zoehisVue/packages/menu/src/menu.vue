<template>
  <div class="zoehis_menu zoehis_menu_font zoehis_menu_css"
    :label="label"
    :class="{'zoehis_check1':isActivity && !isType2 && !isType3,
      'zoehis_check2': isActivity && isType2,
      'zoehis_menu_type2' : isType2,
      'zoehis_menu_style2' : isType2,
      'zoehis_menu_hover' : isHover && !isType3,
      'zoehis_check3': isActivity && isType3,
      'zoehis_menu_type3' : isType3,
      'zoehis_menu_style3' : isType3,
      'zoehis_menu_style3_hover' : isHover && isType3,
    }"
    @click="handleClick"
    v-model="model"
  >
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter.js'
  export default{
    name: "ZoehisMenu",
    componentName: "ZoehisMenu",
    mixins: [Emitter],

    data(){
      return {

      }
    },

    props: {
      label: {},
      disabled: {
        type: Boolean,
        default: false
      },
    },

    computed: {
//      查找父组件ZoehisMenuGroup，并赋值给_radioGroup
      isGroup(){
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.name !== 'ZoehisMenuGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },

//      是否选中
      isActivity(){
        if(this.isGroup){
          return this.label === this.model
        }
      },

//      风格2
      isType2(){
        if(this.isGroup){
          return this._radioGroup.$props.type === "style2"
        }
      },

//      风格3
      isType3(){
        if(this.isGroup){
          return this._radioGroup.$props.type === "style3"
        }
      },

//      是否hover
      isHover(){
        if(this.isGroup){
          return this._radioGroup.$props.hover
        }
      },

      model: {
        get(){
          return  this._radioGroup.value;
        },

        set(val) {
          if (this.isGroup) {
            this.dispatch('ZoehisMenuGroup', 'input', [val]);
          }
        }
      },

      isDisabled(){
        if(this.isGroup){
          return this._radioGroup.$props.disabled;
        }
      },
    },

    created(){
    },

    methods: {
      handleClick: function () {
        var beforeClick = this._radioGroup.$props.beforeClick;
        if(typeof beforeClick == "function"){
          beforeClick(this.continue,this.label,this.model);
        }else {
          this.continue();
        }
      },
      continue(){
        if(this.isDisabled || this.disabled) return false;  //menu禁用
        let oldLabel = this.model;
        this.model = this.label;  //切换menu
        this.$emit('menuClick',this.label,oldLabel);  //触发父组件事件
      },

    }

  }
</script>
