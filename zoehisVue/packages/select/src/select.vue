<template>
  <div
    class="zoehis_select"
    v-clickoutside="handleClose"
    :style="{width:width+(!isPercent?'px':'')}"
    ref="selectWrap"
  >
    <zoehis-input
      width="100%"
      ref="reference"
      v-model="selectedLabel"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="!filterable"
      @clear="handleClear"
      @clickicon="toggleMenu"
      @mousedown.native="handleMouseDown"
      @keyup.native="handleKeyup"
      @keydown.native.down.prevent="navigateOptions('next')"
      @keydown.native.up.prevent="navigateOptions('prev')"
      @keydown.native.192.prevent
      @keydown.native.27.prevent="handleClose"
      @keyup.native.enter.prevent="selectOption"
      @keydown.native.tab="handleTab"
      @focus="handleFocus"
      icon="z_dropD_form"
      :clearable="showClose"
      :clickselect="false"
      showclose
      :error-tip="errorTip"
      :prevent-over-id="preventOverId"
    >
    </zoehis-input>
    <!--<transition-->
      <!--name="zoehis_zoom_in_top"-->
      <!--@after-leave="doDestroy">-->
      <!--&gt;-->
      <zoehis-select-dropdown
        v-if="visible"
        ref="popper"
        :prevent-over-id="preventOverId"
        :min-width="inputWidth"
      >
        <zoehis-scrollbar
          tag="ul"
          wrap-class="zoehis_select_dropdown__wrap"
          ref="scrollbar"
          @scrollafter="scrollafter"
        >
          <zoehis-option
            v-for="(item, index) in selectdata"
            :item="item"
            :key="item[itemkey]"
            :value="item[itemcode]"
            :label="item[itemtext]"
            :itemindex="index"
          >
            <div v-if="(typeof renderItem=='function')" v-html="renderItem(item)"></div>
          </zoehis-option>
        </zoehis-scrollbar>
        <p class="zoehis_select_dropdown__empty" v-if="isShowNone">{{ noMatchText }}</p>
      </zoehis-select-dropdown>
    <!--</transition>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import Emitter from '../../../src/mixins/emitter';
  import ZoehisInput from '../../input/index.js'
  import ZoehisScrollbar from '../../scrollbar/index.js'
  import ZoehisOption from './option.vue'
  import ZoehisSelectDropdown from './select-dropdown.vue'
  import Clickoutside from '../../../src/utils/clickoutside.js'
  import scrollIntoView from '../../../src/utils/scroll-into-view.js'
  import { getValueByPath,isNull } from '../../../src/utils/util';
  import debounce from '../../../src/utils/throttle-debounce.js';
  import {addResizeListener,removeResizeListener} from '../../../src/utils/resize-event';//resize事件(监听某个元素的)
  export default{
    name: "ZoehisSelect",
    componentName: "ZoehisSelect",
    mixins: [Emitter],
    components: {
      ZoehisInput,
      ZoehisScrollbar,
      ZoehisOption,
      ZoehisSelectDropdown,
    },
    directives: { Clickoutside },//这边命名什么，HTML那就用 v- 什么
    created: function () {
      //宽度是否是百分比
      this.isPercent = !this.isWidthNumber(this.width);
      //选中某一项的标识
      this.selectItem = false;
      //keyup事件标识，用来控制对输入框的全选
      this.isKeyup = false;
      //当前下拉的选中值（object）
      this.selected={};
      //存放所有的option vue对象
      this.options=[];
      //下拉的所有数据
      this.cachedOptions=[];
      //下拉数据的长度
      this.optionsCount=0;

      this.debounceOnInputChange = debounce(this.debounce, (e) => {
        switch (e.keyCode){
          case 13://enter
          case 37://left
          case 38://top
          case 39://right
          case 40://down
          case 9://tab
          case 16: //shift
          case 17: //ctrl
          case 20: //alt
            break;
          default:
            this.onInputChange();
        }
      });
      this.$on('handleOptionClick', this.beforeOptionSelect); //监听选中事件
      this.$on('onOptionDestroy', this.onOptionDestroy);
      this.$on('setSelected', this.setSelected);//监听设置选中事件
    },
    methods:{
      handleKeyup(e){
        //阻止向上、向下快捷键的冒泡
        if(e.keyCode==38 || e.keyCode==40){
          e.stopPropagation();
        }
        if(e.keyCode==27){
          return;
        }
        this.debounceOnInputChange(e);
      },
      //获取是否可以编辑的状态
      getDisabled(){
        return this.disabled;
      },
      scrollMove(num){
        this.$refs.scrollbar && this.$refs.scrollbar.move({top:num});
      },
      //获取文本
      getText(){
        return this.selectedLabel;
      },
      //获取选中的数据
      getSelected(){
        return (this.selected && this.selected.item) ? this.selected.item : null;
      },
      //遮罩对象销毁
      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },
      //焦点聚集的方法
      focus(){
        this.$refs.reference.focus();
      },
      scrollafter(wrap){
        const [h,sh,st]=[wrap.clientHeight,wrap.scrollHeight,wrap.scrollTop];
        this.$emit("scroll-after",this.query,this);
        //滚动条快滚到底事件
        if(sh-h-st<10){
          this.$emit("scroll-to-bottom",this.query,this);
        }
        //滚动条滚快顶了的事件
        if(st<10){
          this.$emit("scroll-to-top",this.query,this);
        }
      },
      //初始化选中项
      initSelectData(){
        this.hoverIndex = this.defaultfirst ? 0 : -1;//默认第一条
        let option = this.getOption(this.value);//获取选中的对象option
        if(option){
          if(typeof this.renderShowData === "function"){
            this.selectedLabel=this.renderShowData(option.item);
          }else {
            this.selectedLabel = option.item[this.itemtext];
          }
          if(option.index !== undefined){
            this.hoverIndex = option.index;
          }
          this.selected = option;
        }
      },
      /**
       * 创建select组件时通过v-model的值初始化显示设置选中的行
       */
      initSelData(){
        this.hoverIndex = this.defaultfirst ? 0 : -1;//默认第一条
        return this.getRowData();
//        let option = this.getRowData();
//        if(option){
//          if(typeof this.renderShowData === "function"){
//            this.selectedLabel=this.renderShowData(option);
//          }else {
//            this.selectedLabel = option[this.itemtext];
//          }
//          this.hoverIndex = option.tempIndex;
//          let item = {};
//          item.item = option;
//          item.value = this.value;
//          item.currentLabel = this.selectedLabel;
//          this.selected = item;
//        }

      },
      /**
       * 获取当前选中行的数据的vm对象
       */
      getRowData(){
        if(isNull(this.value)) return null;
        let option = null;
        for(let i=0,l=this.selectdata.length; i<l; i++){
          if(this.value == this.selectdata[i][this.itemcode]){
            option = Object.assign({},this.selectdata[i]);
            option.tempIndex= i;
            break;
          }
        }
        if(!option && this.textvalue!==undefined){
          option = {};
          option[this.itemcode]=this.value;
          option[this.itemtext]=this.textvalue;
        }
        if(option){
          if(typeof this.renderShowData === "function"){
            this.selectedLabel=this.renderShowData(option);
          }else {
            this.selectedLabel = option[this.itemtext];
          }
          this.hoverIndex = option.tempIndex;
          let item = {};
          item.item = option;
          item.value = this.value;
          item.currentLabel = this.selectedLabel;
          return item;
        }else {
          return null;
        }

      },
      //设置要显示的值
      setSelectedLabel(val){
        this.selectedLabel=val;
      },
      //销毁选项
      onOptionDestroy(option) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        let index = this.options.indexOf(option);
        if (index > -1) {
          this.options.splice(index, 1);
          this.cachedOptions.splice(index, 1);
        }
      },
      //模糊查询
      onInputChange() {
        //若支持模糊查询
        if (this.filterable) {
          //存在numString以及是输入数字
          if(this.numString!=undefined && this.isWidthNumber(this.selectedLabel)){
            if(this.numTimer) clearTimeout(this.numTimer);
            this.numTimer = setTimeout(()=>{
              let item = null;
              for(let i=0,l=this.cachedOptions.length; i<l; i++){
                let cacheItem = this.cachedOptions[i];
                if(cacheItem.visible && cacheItem.item[this.numString]==this.selectedLabel){
                  item=cacheItem;
                  break;
                }
              }
              if(item){
                this.hoverIndex = item.itemindex;
                this.scrollToOption(item);
              }
              this.broadcast('ZoehisInput', 'inputSelect');//对输入框进行全选
            },300);
            return;
          }

          //如果搜索条件更input的值都为""空，说明是全选然后delete的这种情况
          if(this.query === "" && this.selectedLabel==""){
            this.resetHoverIndex(true);
            this.$emit('input', "");//输入框的值设置为""
            this.selected="";//选中的值要重置
            if(!this.visible && this.selectItem) {
              this.visible = true; //检索之后都要将visible设置为true,除了是选中后的一次
            }
          }else {
            this.selectItem = false;
            this.selected="";//选中的值要重置
            this.visible = true;
            //下拉框先显示 再进行检索
            this.$nextTick(()=>{
              this.query = this.selectedLabel;
            });
            this.isKeyup = true;
          }
          //每次查询，滚动的重置到最顶
          this.$nextTick(function(){
            this.scrollMove(0);
          })

        }
      },
      //滚动条定位到相应的位置
      scrollToOption(p) {
        let option = p || this.selected;
        //没有选中项则定位到0
        if(!option) {
          this.$nextTick(()=>{
            this.$refs.scrollbar && this.$refs.scrollbar.move({top:0})
          });
          return;
        }
        const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
        if (this.$refs.popper && target) {
          const menu = this.$refs.popper.$el.querySelector('.zoehis_select_dropdown__wrap');
          scrollIntoView(menu, target);
        }
      },
      //点击其他地方关闭弹窗
      handleClose() {
        this.visible = false;
      },
      //焦点聚集事件
      handleFocus() {
        //处理点击清空 会展开下拉的问题
        if(this.isClickClear){
          this.isClickClear=false;
          return;
        }
        this.visible = true;
        this.selectItem=false;
        this.isKeyup=false;
        this.$emit('focus')
      },
      //点击输入框事件
      handleMouseDown(event){
        if (event.target.tagName !== 'INPUT') return;
        let inputs = this.$el.querySelectorAll('input');
        //判断当前焦点的元素是否是select组件里的其中一个input元素
        if ([].indexOf.call(inputs, document.activeElement) != -1) { //是
          if(!this.visible){
            this.visible = true;
            this.selectItem=false;
            this.isKeyup=false;
            event.preventDefault();
          }
        }
      },
      //清空事件
      handleClear(event){
        event && event.stopPropagation();
        this.deleteSelected();
        this.$emit('clear');
        this.isClickClear=true;//标识是点击清空按钮
      },
      //显示/隐藏下拉框
      toggleMenu(e) {
//        if (this.filterable && this.query === '' && this.visible) {
//          return;
//        }
        //是可以点击的下拉框
        if (!this.disabled) {
          this.visible = !this.visible;
        }
        this.$emit("clickicon",e)
      },
      //快捷键tab事件
      handleTab(e){
        this.visible = false;
      },
      //上下快捷键
      navigateOptions(direction) {
        if (!this.visible) {
          this.visible = true;
          return;
        }
        //没有option对象（数据），则返回
        if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
        //获取
        this.optionsAllDisabled = this.options.length === this.options.filter(item => item.disabled === true).length;
        if (!this.optionsAllDisabled) {
          if (direction === 'next') {
            this.hoverIndex++;
            //已经到了最后一个了，则重新定位到第一个 hoverIndex=0
            if (this.hoverIndex === this.options.length) {
              this.hoverIndex = this.options.length-1;
              return;
            }
            //若是不可以点击的、组的、隐藏的，则进行下一个定位
            if (this.options[this.hoverIndex].disabled === true ||
              !this.options[this.hoverIndex].visible) {
              this.navigateOptions('next');
            }
          }
          if (direction === 'prev') {
            this.hoverIndex--;
            //到达第一个了，则跳到最后一个
            if (this.hoverIndex < 0) {
              this.hoverIndex = -1;
            }else {
              //若是不可以点击的、组的、隐藏的，则进行下一个定位
              if (this.options[this.hoverIndex].disabled === true ||
                !this.options[this.hoverIndex].visible) {
                this.navigateOptions('prev');
              }
            }
          }
        }
        this.hoverIndex !== -1 && this.$nextTick(() => this.scrollToOption(this.options[this.hoverIndex]));
      },
      //通过value值获取 option
      getOption(value) {
        let option;
        const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
        for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
          const cachedOption = this.cachedOptions[i];
          const isEqual = isObject
            ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
            : cachedOption.value === value;
          if (isEqual) {
            option = cachedOption;
            break;
          }
        }
        if (option) return option;


        const label = !isObject
          ? this.textvalue===undefined ? value : this.textvalue : '';
        let newOption = {
          value: value,
          currentLabel: label,
          item:{}
        };
        newOption.item[this.itemcode]=value;
        newOption.item[this.itemtext]=label;
        return newOption;
      },
      //设置选中值
      setSelected() {

//        let option = this.getOption(this.value);//获取选中的对象option
        let option = this.visible ? this.getOption(this.value) : this.initSelData();//获取选中的对象option
//        if (option.created) {
//          this.createdLabel = option.currentLabel;
//          this.createdSelected = true;
//        } else {
//          this.createdSelected = false;
//        }
        if(option){
          this.selectedLabel = option.currentLabel;
        }
        this.selected = option;
        this.selectItem = true;
      },
      //enter选中option
      selectOption() {
        //修复下拉没有展开的时候一直去按enter造成的bug
        if(!this.visible) {
          this.$emit("enter");
          return;
        }
        this.beforeOptionSelect(this.options[this.hoverIndex]);
      },
      //删除选中的操作，并隐藏下拉
      deleteSelected() {
        this.$emit('input', '');
        this.selected="";
        if(!this.noClearBlur){
          this.selectedLabel="";
        }
        this.query = "";
      },
      /**
       * 重新设置hoverIndex的值
       * 若是模糊查询的情况，则不考虑selected情况，只考虑是否需要默认第一行
       * @param isQuery (是否是selected的情况)
       */
      resetHoverIndex(isQuery) {
        let nowIndex=-1;
        let dataLength = this.options.length;
        if(this.selected && !isQuery){
          for(let i=0; i<dataLength; i++){
            if(this.options[i].itemSelected){
              nowIndex=this.options[i].index;
              this.selected = this.options[i];//矫正选中的选项
              break;
            }
          }
        }
        //找不到选中的行 同时需要默认值
        if(nowIndex===-1 && this.defaultfirst){
          for(let j=0; j<dataLength; j++){
            if(this.options[j].visible){
              nowIndex=this.options[j].index;
              break;
            }
          }
        }
        this.hoverIndex = nowIndex;
      },

      beforeOptionSelect(option){
        if(option && option.visible){
          if (typeof this.beforeSelect === 'function' && this.beforeSelect(option.value, option.item)===false) {
            //beforeSelect返回false 表示阻止选中 否则选中
          }else {
            this.handleOptionSelect(option);
          }
        }else {
          //判断当前有选中的数据时 是否需要清选中行的数据
          if(this.selected && !this.outclear){
            if (typeof this.beforeSelect === 'function' && this.beforeSelect(this.selected.value, this.selected.item)===false) {
              //beforeSelect返回false 表示阻止选中 否则选中
            }else {
              this.handleOptionSelect(this.selected);
            }
          }else {
            if (typeof this.beforeSelect === 'function' && this.beforeSelect("", null)===false) {
              //beforeSelect返回false 表示阻止选中 否则选中
            }else {
              this.handleClear();
              this.visible = false;
            }
          }
        }

      },
      //选中事件
      handleOptionSelect(option) {
        this.$emit('input', option.value);
        this.$emit('selected', option.value, option.item);//触发选中事件（无论值是否改变）

        this.visible = false;
        this.$nextTick(() =>{
//          this.scrollToOption(option);

          this.$emit("enter");
        });

      },
      //判断选中的值是否是空
      isNoSelectData(val){
        if(val==="" || (Array.isArray(val) || val.length===0)){
          return true;
        }else {
          return false;
        }//若数据是空，则返回
      },
      setInputWidth(){
        if (this.$refs.reference && this.$refs.reference.$el) {
          let temp=0;
          if(this.dropdownWidth){
            temp = this.dropdownWidth;
          }else {
            temp = this.$refs.reference.$el.getBoundingClientRect().width || this.width;
          }
          this.inputWidth = this.isWidthNumber(temp) ? `${temp}px` : temp;
        }
      },
      //重置选中项的位置
      resetSelectPos(val){
        //滚动到选中的行
        this.$nextTick(() => {
          this.resetHoverIndex();
          this.scrollToOption();
          !val && this.broadcast('ZoehisSelectDropdown', 'updatePopper')
        });
      },
      //判断是否是数字
      isWidthNumber(val){
        var re = /^[0-9]+\.?[0-9]*$/; //匹配是否是数字
        return re.test(val);
      },
    },
    computed:{
      debounce() {
        return this.remote ? this.delayTime : 0;
      },
      isShowNone(){
        if(this.filteredOptionsCount===0){
          return true;
        }else {
          return false;
        }
      },
      //监听是否显示XX
      showClose(){
        let isShowClose = this.clearable &&
          this.selectedLabel!=="" &&
          this.selectedLabel!==undefined;
        return isShowClose ? true : false;
      },
    },
    mounted(){
//      this.currentPlaceholder = this.placeholder;
      this.$nextTick(() => {
        this.selected = this.initSelData();
        if(this.selected){
          this.selectedLabel = this.selected.currentLabel;
        }
      });
      addResizeListener(this.$refs.selectWrap,()=>{
        //是百分比的时候才去重新设置inputWidth的值
        this.isPercent && this.setInputWidth();
      });
    },
    beforeDestroy(){
      removeResizeListener(this.$refs.selectWrap);
    },
    watch:{
      //查询数据的监听
      query(val) {
        //更新位置
        this.$nextTick(() => {
          if (!this.visible){
            if(!this.selectItem || (this.options.length && val!="")){//除了选中后的第一次检索 / 检索有数据而且内容不能为空的情况
              this.visible=true;
              this.selectItem=false;
            }else {
              if(val!=""){
                this.selectItem=false;
              }
            }
          }
          this.broadcast('ZoehisSelectDropdown', 'updatePopper')
        });
        //选中的值的索引重新设置为-1
        this.hoverIndex = -1;
//        this.$emit('input', "");

        if(!this.selectItem){
          this.isChangeQuery = true;
          this.$emit('input', "");
        }else {
          this.isChangeQuery = false;
        }
        if (typeof this.filterMethod === 'function') {
          this.hoverIndex = -1;
          this.filterMethod(val);
        } else { //内部自动检索
          this.filteredOptionsCount = this.optionsCount;
          this.broadcast('ZoehisOption', 'queryChange', val);
        }
        //重置hoverIndex值 此处要找到显示的那行的索引值
        this.$nextTick(()=>{
          this.resetHoverIndex(true);
        });
      },
      value(val,oldValue){
        if(val===oldValue) return;
        //判断value是否为空
        if(this.isNoSelectData(val)){
          this.selected="";
          if(!this.isChangeQuery){
            this.selectedLabel="";
            this.$emit('update:textvalue','');
          }else {
            this.isChangeQuery = false;
          }
          this.$emit("change",val,null);//向上触发change事件
        }else {
          this.setSelected();
          this.$emit('update:textvalue',this.selectedLabel);
          this.$emit("change",val,this.selected?this.selected.item:null);//向上触发change事件
        }

      },
      visible(val) {
        if (!val) {
          //关闭后清空查询数据
          if(!this.noClearBlur){
            this.selectedLabel = '';
          }else {
            //解决设置noClearBlur时文本没有值的bug
            this.$emit('update:textvalue',this.selectedLabel);
          }
          if (this.selected) {
//            if (this.filterable && this.allowCreate &&
//              this.createdSelected && this.createdOption) {
//              this.selectedLabel = this.createdLabel;
//            } else {
              //若存在自定义的展示内容函数，则执行
              if(typeof this.renderShowData === "function"){
                this.selectedLabel = this.renderShowData(this.selected.item);
              }else {
                this.selectedLabel = this.selected.currentLabel;
              }
//            }
          }
          if (this.filterable) {
            this.selectItem=true;
            this.query = "";
          }
        } else {
          this.filteredOptionsCount = this.optionsCount;
          if (this.filterable) {
            if(!this.isKeyup){
              this.broadcast('ZoehisInput', 'inputSelect');//对输入框进行全选
            } else {
              this.isKeyup=false;
            }
          }
          //滚动到选中的行
          this.$nextTick(() => {
            this.broadcast('ZoehisOption', 'queryChange', [this.selectedLabel,true]); //第二个参数代表的是弹窗显示的时候触发的事件 用于过滤前端显示的数据

            this.broadcast('ZoehisSelectDropdown', 'updatePopper'); //更新下拉框的位置(即创建下拉)

            this.setInputWidth();//设置最小宽度
            this.resetHoverIndex();
            this.scrollToOption();
          });
        }
        this.$emit('visible-change', val,this);
      },
      //监听width是否改变，如果是 input跟着变
//      width:{
//        handler(val){
//          //匹配是否是数字
//          if(this.isWidthNumber(val)){
//            this.selectStyle = `width:${val}px;`;
//          }else {
//            this.selectStyle = `width:${val};`;
//          }
//        },
//        immediate:true
//      }
    },
    data() {
      return {
//        options: [],//存放所有的option vue对象
//        cachedOptions: [],//下拉的数据
//        optionsCount: 0,//下拉数据的长度
        filteredOptionsCount: 0,//下拉显示数据的长度
//        currentPlaceholder:"",//当前默认显示的提示文字
//        currentDisabled:true,//当前是否可以编辑
        visible:false,  //是否显示下拉框
//        selected:{},
        isSelect: true,//标识这是个Select组件，主要用于option组件的查找
        hoverIndex: -1,//选中的索引值
        selectedLabel:"",  //
        query: '',//查询的条件
        inputWidth: '',//输入框的宽度
//        selectStyle: '',//外框的样式
//        selectItem: false,//选中某一项的标识
//        isKeyup: false,//keyup事件标识，用来控制对输入框的全选
//        isPercent: false,//宽度是否是百分比
      }
    },
    props: {
      clearable: {  //是否支持XX清空功能
        type: Boolean,
        default: true
      },
      placeholder: {//默认显示的提示文字
        type: String,
        default:""
      },
      disabled:Boolean,//是否可以编辑 true代表不可以编辑，false代表可以编辑
      filterable: Boolean,//是否可以搜索 true：搜索，false:不可以搜索
      value: {
        required: true
      },
      textvalue: [Number,String],
      remote: Boolean,//是否支持远程模糊查询（即延时加载，主要用于调用API的情况，这样不会时时查询）
      delayTime: {    //模糊查询的延时时间（当remote为true才有效）
        type:[String,Number],
        default:200
      },
      filterMethod: Function,//自定模糊查询回调
      filterRowData: Function,//自定义显示的内容
      noMatchText: {
        default(){
          return this.$t('zoehisUI.select.noMatchText');
        },
        type:String
      },
      renderShowData:Function,
      renderItem:Function,
      scrollToBottom:Function,//滚动条滚到底的事件 用于分页
      scrollToTop:Function,//滚动条滚到顶的事件 用于分页
      selectdata:{//下拉的所有数据
        type:Array,
        default:[]
      },
      itemkey:{ //下拉的选项的唯一值
        type:String,
        default(){
          return this.itemcode;
        }
      },
      itemcode:{ //下拉的选项的唯一值
        type:String,
        default:"id"
      },
      itemtext:{//下拉选项的文本值
        type:String,
        default:"text"
      },
      width:{//下拉的宽度
        type:[Number,String],
        default:115
      },
      dropdownWidth:[Number,String],//下拉框的宽度
      noClearBlur:{//焦点离开是否不清空数据，默认false代表情况数据
        type:Boolean,
        default:false
      },
      defaultfirst:{
        type:Boolean,
        default:true
      },
      preventOverId:{
        type:String,
        default:""
      },
      filterField:{//需要过滤的几个字段  默认为：名称、code值、拼音码、五笔码
        type:Array,
        default(){
          return [this.itemtext,this.itemcode,"spellCode","wbzxCode"];
        }
      },
      errorTip: { //错误的提示内容 为 "" 时表示关闭错误的提示
        type: String,
        default: ""
      },
      beforeSelect: Function,//选中前事件
      numString:String,//是否支持数字定位 有设置的话代表支持
      outclear:String,//enter键 hoverIndex在其他地方时要不是清空数据 true:代表清空数据
    }
  }
</script>

