<template>
  <li
    class="zoehis_select_dropdown__item"
    :class="{
      'zoehis_selected':itemSelected,
      'zoehis_disabled':disabled,
      'zoehis_hover':parent.hoverIndex === index
    }"
    v-show="visible"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <!--@mouseenter="hoverItem"-->
    <!--@click.stop="selectOptionClick"-->
    <!--class="el-select-dropdown__item"-->
    <!--v-show="visible"-->
    <!--:class="{-->
    <!--'selected': itemSelected,-->
    <!--'is-disabled': disabled || groupDisabled || limitReached,-->
    <!--'hover': parent.hoverIndex === index-->
    <!--}">-->
    <slot>
      <span>{{currentLabel}}</span>
    </slot>
  </li>
</template>

<script type="text/babel">
  import Emitter from '../../../src/mixins/emitter';
  import { getValueByPath } from '../../../src/utils/util';

  export default {
    mixins: [Emitter],

    name: 'ZoehisOption',

    componentName: 'ZoehisOption',

    props: {
      //当前选中的值
      value: {
        required: true
      },
      label: [String, Number],
      created: Boolean,
      disabled: {
        type: Boolean,
        default: false
      },
      itemindex:Number, //整行的数据
      item:null//整行的数据
    },

    data() {
      return {
//        index: -1,
//        groupDisabled: false,
        visible: true,
//        hitState: false
      };
    },

    computed: {

      //选中的值是否是对象
      //.call： this.value继承对象Object的toString方法
      isObject() {
        return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
      },
      //当前的label值
      currentLabel() {
        return this.label || (this.isObject ? '' : this.value);
      },
      //当前的值
      currentValue() {
        return this.value || this.label || '';
      },
      //查找Select组件
      parent() {
        let result = this.$parent;
        while (!result.isSelect) {
          result = result.$parent;
        }
        return result;
      },

      //选中的项
      itemSelected() {
        //判断是否是多选
//        if (!this.parent.multiple) {
          return this.isEqual(this.value, this.parent.value);
//        } else {
//          return this.contains(this.parent.value, this.value);
//        }
      },
      //监听itemindex值是否有变化，有变化的话就赋值给index
      index(){
        return this.itemindex;
      }
//      limitReached() {
//        if (this.parent.multiple) {
//          return !this.itemSelected &&
//            this.parent.value.length >= this.parent.multipleLimit &&
//            this.parent.multipleLimit > 0;
//        } else {
//          return false;
//        }
//      }
    },

    watch: {
      //监听currentLabel的值的变化 todo 还不明白created/remote是什么意思
      currentLabel() {
//        if (!this.created ) this.dispatch('ZoehisSelect', 'setSelected');
      },
      //value
      value() {
//        if (!this.created || !this.parent.remote) this.dispatch('ZoehisSelect', 'setSelected');
      }
    },

    methods: {
      isEqual(a, b) {
        if (!this.isObject) {
          return a === b;
        } else {
          const valueKey = this.parent.valueKey;
          return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
        }
      },
//      contains(arr = [], target) {
//        if (!this.isObject) {
//          return arr.indexOf(target) > -1;
//        } else {
//          const valueKey = this.parent.valueKey;
//          return arr.some(item => {
//            return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
//          });
//        }
//      },
//
//      handleGroupDisabled(val) {
//        this.groupDisabled = val;
//      },
      //鼠标移动到上面，设置hoverIndex的值
      hoverItem() {
        if (!this.disabled) {
          this.parent.hoverIndex = this.parent.options.indexOf(this);
        }
      },
      //选中事件
      selectOptionClick(e) {
//        e.preventDefault();
        if (this.disabled !== true) {
          this.dispatch('ZoehisSelect', 'handleOptionClick', this); //向父组件Select触发选中事件
        }
      },

      queryChange(query,isVisible) {

        if(isVisible){ //前端过滤条件（当弹窗显示的时候会触发，然后判断有无filterRowData这个方法）
          if (typeof this.parent.filterRowData === 'function') {  //过滤方法 filterRowData
            this.visible = this.parent.filterRowData(query,this.item) || this.created;
          }
        }else { //input按keyup进行过滤
          // query 里如果有正则中的特殊字符，需要先将这些字符转义
          let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
          let reg = new RegExp(parsedQuery, 'i');
          this.visible = reg.test(this.optionQueryStr) || this.created;
        }
        if (!this.visible) {
          this.parent.filteredOptionsCount--;
        }
      },
      setOptionQueryStr(){
        this.optionQueryStr = "";//用于查找拼音码跟五笔码 使用 波形号(数字1旁边的键) 来拼接需要检索的数据（输入框会禁止输入波形号）
        for(let i=0,l=this.parent.filterField.length; i<l; i++){
          let queryField = this.item[this.parent.filterField[i]];
          if(queryField!=undefined && queryField!==""){
            this.optionQueryStr += "~" + queryField;
          }
        }
      },
    },
    created() {
      this.parent.options.splice(this.itemindex,0,this);//创建一个option就往options里push进去
      this.parent.cachedOptions.splice(this.itemindex,0,this);//创建一个option就往options里push进去
      this.parent.optionsCount++;
      this.parent.filteredOptionsCount++;
      this.setOptionQueryStr();//设置要查询的字段拼接
      this.$on('queryChange', this.queryChange); //监听自定义检索功能

//      this.$on('handleGroupDisabled', this.handleGroupDisabled);
    },

    beforeDestroy() {
      this.dispatch('ZoehisSelect', 'onOptionDestroy', this);
    }
  };
</script>
