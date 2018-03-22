<template>
  <zoehis-input
    class="zoehis_time_editor"
    ref="reference"
    v-clickoutside="handleClose"
    :icon="icon"
    :readonly="readonly"
    :disabled="disabled"
    @blur="handleBlur"
    @click="handleClick"
    @keydown.native="handleKeydown"
    @keyup.native="handleKeyup"
    :value="displayValue"
    @change.native="displayValue = $event.target.value"
    @focus="handleFocus"
    @clear="handleClear"
    @clickicon="handleClickIcon"
    :width="width"
    :clickselect="false"
    :showclose="showclose"
    :clearable="clearable"
    :error-tip="errorTip"
    :prevent-over-id="preventOverId"
  ></zoehis-input>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import Clickoutside from '../../../src/utils/clickoutside'; //点击其他地方触发的事件
  import { formatDate, parseDate, getWeekNumber, equalDate, isDate } from './util';
  import Popper from '../../../src/utils/vue-popper';//设置位置的
  import Emitter from '../../../src/mixins/emitter';
  import ZoehisInput from '../../input';

  const NewPopper = {
    props: {
      preventOverId: Popper.props.preventOverId,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
  };

  //对应类型的时间格式
  const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    week: 'yyyywWW',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    year: 'yyyy'
  };
  //picker的类型
  const HAVE_TRIGGER_TYPES = [
    'date',
    'datetime',
    'time',
    'time-select',
    'week',
    'month',
    'year',
    'daterange',
    'timerange',
    'datetimerange'
  ];
  //日期格式的转换
  const DATE_FORMATTER = function(value, format) {
    return formatDate(value, format);
  };
  //获得时间戳
  const DATE_PARSER = function(text, format) {
    return parseDate(text, format);
  };
  const RANGE_FORMATTER = function(value, format, separator) {
    if (Array.isArray(value) && value.length === 2) {
      const start = value[0];
      const end = value[1];

      if (start && end) {
        return formatDate(start, format) + separator + formatDate(end, format);
      }
    }
    return '';
  };
  /**
   * 将text 进行separator符号分隔
   * @param text  原数据
   * @param format 格式化
   * @param separator  切割符
   * @returns {*} 返回数组
   */
  const RANGE_PARSER = function(text, format, separator) {
    const array = text.split(separator);
    if (array.length === 2) {
      const range1 = array[0];
      const range2 = array[1];

      return [parseDate(range1, format), parseDate(range2, format)];
    }
    return [];
  };
  //类型-值的映射
  const TYPE_VALUE_RESOLVER_MAP = {
    default: {
      formatter(value) {
        if (!value) return '';
        return '' + value;
      },
      parser(text) {
        if (text === undefined || text === '') return null;
        return text;
      }
    },
    week: {
      formatter(value, format) {
        let date = formatDate(value, format);
        const week = getWeekNumber(value);

        date = /WW/.test(date)
          ? date.replace(/WW/, week < 10 ? '0' + week : week)
          : date.replace(/W/, week);
        return date;
      },
      parser(text) {
        const array = (text || '').split('w');
        if (array.length === 2) {
          const year = Number(array[0]);
          const month = Number(array[1]);

          if (!isNaN(year) && !isNaN(month) && month < 54) {
            return text;
          }
        }
        return null;
      }
    },
    date: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    datetime: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    daterange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    datetimerange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    timerange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    time: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    month: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    year: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    number: {
      formatter(value) {
        if (!value) return '';
        return '' + value;
      },
      parser(text) {
        let result = Number(text);

        if (!isNaN(text)) {
          return result;
        } else {
          return null;
        }
      }
    }
  };
  //todo
  const PLACEMENT_MAP = {
    left: 'bottom-start',
    center: 'bottom',
    right: 'bottom-end'
  };
  //只考虑data-picker的value值： Date or [Date,Date]
  const valueEquals = function(a, b) {
    const aIsArray = a instanceof Array;
    const bIsArray = b instanceof Array;
    if (aIsArray && bIsArray) {
      return new Date(a[0]).getTime() === new Date(b[0]).getTime() &&
        new Date(a[1]).getTime() === new Date(b[1]).getTime();
    }
    if (!aIsArray && !bIsArray) {
      return new Date(a).getTime() === new Date(b).getTime();
    }
    return false;
  };
  export default {
    mixins:[Emitter,NewPopper],
    components: {ZoehisInput},
    directives: { Clickoutside },
    props:{
      value: {},//父组件传来的初始值
      defaultValue: {},//父组件传来的默认值（点击展开之后默认选中的值）
      format: String,//要显示的格式
      readonly: Boolean,//只读
      disabled: Boolean,//禁用状态
      popperClass: String,//popper的自定义class
      align: {    //设置弹出窗的位置（左对齐、居中对齐、右对齐）
        type: String,
        default: 'left'
      },
      rangeSeparator: {//用于time时间限选区间的分隔符 注意 前后加空格
        default: ' - '
      },
      pickerOptions: {},//time独自的参数
      tabInner: {    //tab键是否进行时分秒切换(内部切换)
        type:Boolean,
        default:false
      },
      clearable: {    //是否具有清空功能
        type: Boolean,
        default: true
      },
      showclose: {    //是否具有清空功能
        type: Boolean,
        default: true
      },
      pickerWidth:{     //时间弹出框的宽度
        type: [Number,String],
        default:133
      },
      width:{     //输入框的宽度
        type: [Number,String],
        default:133
      },
      standardtype:{
        type:Boolean,
        default:false
      },
      errorTip: { //错误的提示内容 为 "" 时表示关闭错误的提示
        type: String,
        default: ""
      },
      icon: { //图标
        type: String,
        default: "z_timeA_normal"
      },

    },
    data(){
      return {
        pickerVisible: false,  //控制time组件隐藏、显示(时间的那个弹窗)
        currentValue: '',  //间接的输入框的值（是国际化单位）
        unwatchPickerOptions: null,
        keyTabEsc: false,   //用来标识是否按tab/esc键来关闭弹窗的
        appendToBody: true,
      }
    },
    watch: {
      //监听处理时间的那个弹窗
      pickerVisible(val){
        //只读和禁用 则返回
        if(this.disabled) return;
        //显示、隐藏
        val ? this.showPicker() : this.hidePicker();
      },
      //清空数据
      currentValue(val){
        if(val) return; //如果有值，返回
        if(this.picker && typeof this.picker.handleClear==='function') {
          this.picker.handleClear();
        }else {
          this.$emit('input','')
        }
      },
      //监听v-model传进来的值
      value:{
        immediate:true,//第一次的时候会立即执行，而不是value变化的时候才执行
        handler(val){
          this.currentValue = isDate(val) ? new Date(val) : val; //国际化单位
        }
      },
      displayValue(val){
        this.$emit('change', val);
      }
    },
    computed: {
      //判断是否为空值
      valueIsEmpty() {
        const val = this.currentValue;
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; i++) {
            if (val[i]) {
              return false;
            }
          }
        } else {
          if (val) {
            return false;
          }
        }
        return true;
      },
      //input组件的el对象
      reference(){
        return this.$refs.reference.$el;
      },
      //输入框的input对象
      refInput(){
        if(this.reference) return this.reference.querySelector("input");
        return {};
      },
      displayValue:{
        //获取显示的值
        get(){
          const value = this.currentValue;
          return this.timeToFormatter(value);
        },
        set(value){
          //不为空
          if(value){
            const type = this.type;
            const parser = (
              TYPE_VALUE_RESOLVER_MAP[type] ||
              TYPE_VALUE_RESOLVER_MAP['default']
            ).parser;
            //将输入框的值转化为标准时间格式
            const parserValue = parser(value,this.format || DEFAULT_FORMATS[type]);
            //如果转化的值不为空且picker存在
            if(parserValue){
              if(this.picker){//picker 存在的情况
                this.picker.value = parserValue;
              }else {//picker不存在的情况直接更新input里的值
                this.$emit('input', this.standardtype?parserValue:parserValue.getTime());
              }
            }

          }else {//为空
            this.$emit('input', value);
            this.picker.value = value;
          }
          this.$forceUpdate();//本身组件以及子组件重新渲染 todo 为何

        }
      }
    },
    created(){
      // vue-popper 属性
      this.popperOptions = {
        boundariesPadding: 0,
        gpuAcceleration: false
      };
      this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;//vue-popper的属性 一定要传
    },
    methods: {
      //图标点击事件
      handleClickIcon(){
        this.pickerVisible = !this.pickerVisible;
      },
      //获取是否可以编辑的状态
      getDisabled(){
        return this.disabled;
      },
      //焦点聚集的方法
      focus(){
        this.refInput.focus();
        this.setInputSelect(0,0);//定位到第一个
      },
      //国际化转为格式化时间
      timeToFormatter(value,newFormat){
        if(!value) return "";//值为空的话返回""
        //type类型存在的或就用type类型的formatter方法
        const formatter = (
          TYPE_VALUE_RESOLVER_MAP[this.type] ||
          TYPE_VALUE_RESOLVER_MAP['default']
        ).formatter;
        //type对应的显示格式
        const format = DEFAULT_FORMATS[this.type];
        return formatter(value, newFormat || this.format || format);//有自己配置format的话用自己的，否则用默认的
      },
      /**
       * 获取时间的值 没有参数默认获取国际化单位的时间
       * @param isFormat： 想要获取的格式 如： HH:mm:ss
       * @returns {*}
       */
      getTime(isFormat){
        return isFormat ? this.timeToFormatter(this.currentValue,isFormat) : this.currentValue;
      },
      //时间清空事件
      handleClear(e){
        this.currentValue = '';
        this.$nextTick(()=>{
          this.pickerVisible=true;
        });
        e.stopPropagation();
      },
      //隐藏时间框
      hidePicker() {
        if (this.picker) {
//          this.picker.resetView && this.picker.resetView();
          this.pickerVisible = this.picker.visible = false;
          this.destroyPopper();
        }
      },

      //显示时间框的方法
      showPicker() {
        if (this.$isServer) return; //服务器渲染 则返回 todo 不大懂
        //还不存在picker的vm对象只创建一个
        if (!this.picker) {
          this.mountPicker();
        }

        this.pickerVisible = this.picker.visible = true;//显示time弹窗
        this.updatePopper();
        if (this.currentValue instanceof Date) {
          this.picker.date = new Date(this.currentValue.getTime());
        } else {
          this.picker.value = this.currentValue;
        }
//        this.picker.resetView && this.picker.resetView();
//
        this.$nextTick(() => {
          this.picker.ajustScrollTop && this.picker.ajustScrollTop();
        });
      },
      //
      mountPicker(){
        this.panel.defaultValue = this.defaultValue || this.currentValue;
        this.picker = new Vue(this.panel).$mount();//实例化this.panel,手动挂载$mount
        this.picker.popperClass = this.popperClass;//自定义时间弹窗的class
        this.popperElm = this.picker.$el;
        this.picker.width = this.pickerWidth || this.reference.getBoundingClientRect().width; //时间选择框的宽度,自己有配置，则用自己的
        //格式 this.format自己配置的有的话用自己配置的
        if (this.format) {
          this.picker.format = this.format;
        }

        const updateOptions = () => {
          const options = this.pickerOptions; //时间选择器picker自己独有的参数
          if(options && options.selectableRange){
            let ranges = options.selectableRange;//限选区间
            const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;//日期时间parser
            const format = DEFAULT_FORMATS.timerange;//时间time的格式

            ranges = Array.isArray(ranges) ? ranges : [ranges];//设置成数组格式
            this.picker.selectableRange = ranges.map(ranges => parser(ranges, format, this.rangeSeparator));
          }

          for(const option in options){
            //过滤掉selectableRange属性，其他的全都付给picker
            if(options.hasOwnProperty(option) && option !== 'selectableRange'){
              this.picker[option]=options[option];
            }
          }
        };
        updateOptions();
        //监听pickerOptions属性
        this.unwatchPickerOptions = this.$watch('pickerOptions', () => updateOptions(), { deep: true });
        this.$el.appendChild(this.picker.$el);//手动挂载到this.$el上
        this.picker.$on('dodestroy',this.doDestroy);   //picker监听dodestroy事件
        this.picker.$on('pick',(date='',visible=false) => {
          //如果value值跟date一样的话就不emit
          if(!valueEquals(this.value, date)){
            this.$emit('input',this.standardtype?date:(date && date.getTime()));
          }

          //tab、esc键、setTime()（解决按tab、esc键，若是手动输入造成窗体不关闭的bug或者setTime()时窗体弹出的bug）
          if(this.keyTabEsc){
            if(visible){//且visible为true
              return;
            }else {
              this.keyTabEsc = false;//重置
            }
          }
          this.pickerVisible = this.picker.visible = visible;
        });

        //选中输入框的一部分
        this.picker.$on('select-range',(start,end) => {
//          this.refInput.setSelectionRange(start,end);
          this.refInput.focus();
        });


        //监听显示、隐藏时间框
        this.picker.$on('toggle-visible',(isShow,isChange) => {
          if(isShow){//显示
            this.$emit("show",this.currentValue);
          }else {
            this.$emit("hide",this.currentValue);
            if(isChange){
              this.$emit("inputnative",this.currentValue);
            }
          }
        });

        //当前点击的事件
        this.picker.$on('click-now',() => {
          this.$emit("click-now");
        });

      },
      ummountPicker(){
        if(this.picker){
          this.picker.$destroy();
          this.picker.$off();
          if(typeof this.unwatchPickerOptions === 'function'){
            this.umwatchPickerOptions();
          }
          this.picker.$el.parentNode.removeChild(this.picker.$el);
        }
      },
      //焦点触发的事件，打开时间框
      handleFocus(){
        const type = this.type;
        //若类型存在 且是时间弹窗是隐藏的
        if(HAVE_TRIGGER_TYPES.indexOf(type) !==-1 && !this.pickerVisible){
          this.pickerVisible = true;
        }
        //触发焦点focus事件
        this.$emit('focus',this);
      },
      //时间组件关闭
      handleClose(){
        this.pickerVisible = false;
      },
      //焦点离开
      handleBlur() {
        //修复连续两次手动输入一样的值而不会被格式化的bug
        if(this.refInput.value !== this.displayValue){
          this.$refs.reference.setValue(this.displayValue);
        }
        this.$emit('blur', this);
      },
      handleKeydown(e){
        const keyCode = e.keyCode;
        switch (keyCode){
          case 27://ESC
            this.pickerVisible = false;
            this.refInput.blur(); //焦点离开
            this.keyTabEsc = true;
            e.stopPropagation();
            break;
          case 9://tab
//            this.pickerVisible = false;
//            this.keyTabEsc = true;
            e.preventDefault();
            break;
          case 38://up
          case 40://down
            e.preventDefault();
            break;
          default:
        }
      },
      //keyup键
      handleKeyup(e){
        var keyCode = e.keyCode;
        let indexStart = this.refInput.selectionStart;//光标起始位置
        let indexEnd = this.refInput.selectionEnd;//光标结束位置
        if(keyCode==38){//up
          //阻止冒泡
          e.stopPropagation();
          this.changeValueByUpDown(indexStart,indexEnd,true);
        }else if(keyCode==40){//down
          //阻止冒泡
          e.stopPropagation();
          this.changeValueByUpDown(indexStart,indexEnd,false);
        }else if((keyCode<58 && keyCode>47) || (keyCode<106 && keyCode>95) || (e.shiftKey && keyCode==186) || keyCode==8){
          //48-57是大键盘的数字键，96-105是小键盘的数字键，英文冒号键以及backspace键
          let time = this.getHourMinSec();
          let hour,minute,second ;
          //有没有显示秒
          const showSecond = (this.format || DEFAULT_FORMATS[this.type]).indexOf("ss") !== -1;
          if(!time){
            //存数字的情况 且长度达到6
            let nVal = e.target.value;
            if(nVal.indexOf(":") ===-1 && nVal.length>3){
              hour = nVal.substring(0,2);
              minute = nVal.substring(2,4);
              second = nVal.substring(4,6);
            }else {
              return;
            }
          }else {
            hour = time.hour;
            minute = time.minute;
            second = time.second;
          }
          let hL = hour.length;
          let mL = minute.length;
          let sL = second.length;

          //小于2，则不管
          if(hL <2 || mL<2 || (showSecond && sL<2)){
            return;
          }
          //等于2
          if((hL == 2 && indexStart ==2) || (mL == 2 && indexStart == 5) || (showSecond && sL == 2 && indexStart == 8)){
            indexStart ++;
          }else {
            if(hL>2){
              hour = hour.substring(0,2);
              if(indexStart>=2){
                indexStart = 3;
              }
            }
            if(mL>2){
              minute = minute.substring(0,2);
              if(indexStart>=5){
                indexStart = 6;
              }
            }
            if(showSecond && sL>2){
              second = second.substring(0,2);
              if(indexStart>=8){
                indexStart = 9;
              }
            }
          }
          let newVal = hour + ":" + minute;//重组数据
          if(showSecond){
            newVal += ":" + second;
          }
          if(this.displayValue == newVal){
            this.$refs.reference.setValue(this.displayValue);
          }else {
            this.displayValue = newVal;
          }
          //重新定位焦点
          this.$nextTick( () => {
            this.setInputSelect(indexStart, indexStart);
          });
        }else if(keyCode == 9){ //tab

          //tabInner true代表按tab键切换时分秒
          let time = this.getHourMinSec();
          if(this.tabInner && time){
            //焦点在"小时"
            if(time.cursor === "hour"){
              this.setInputSelect(time.hourIndex+1, time.minuteIndex);
            }else if(time.cursor === "minute" && time.second !==''){
              this.setInputSelect(time.minuteIndex+1, time.secondIndex);
            }else {
              this.pickerVisible = false;
              this.keyTabEsc = true;
              this.refInput.blur(); //焦点离开
              //emit => tab事件 带两参数 1:国际单位时间； 2:格式化过的时间
              //需要$nextTick是因为tab之后值有时会改变
              this.$nextTick(function(){
                this.$emit('tab',this.currentValue,this.displayValue);
              });
            }
          }else {
            this.pickerVisible = false;
            this.keyTabEsc = true;
            this.refInput.blur(); //焦点离开
            //emit => tab事件 带两参数 1:国际单位时间； 2:格式化过的时间
            //需要$nextTick是因为tab之后值有时会改变
            this.$nextTick(function(){
              this.$emit('tab',this.currentValue,this.displayValue);
            });
          }
        }else if(keyCode == 13){ //enter键
          this.pickerVisible = false;
          this.refInput.blur(); //焦点离开
          this.$nextTick(function(){
            this.$emit('enter',this.currentValue,this.displayValue);
          });
        }
      },
      //改变数值通过上下键
      changeValueByUpDown(keyStart,keyEnd,isUp){
        let time = this.getHourMinSec();
        if(!time) return;
        let accVal = isUp ? -1 : 1;
        let nowValue = this.currentValue;
        let hour = time.hour;
        let minute = time.minute;
        if(time.cursor==="hour"){
          nowValue.setHours(nowValue.getHours()+accVal);
          keyStart = 0;
          keyEnd = time.hourIndex;
        }else if(time.cursor === "minute"){
          nowValue.setMinutes(nowValue.getMinutes()+accVal);
          keyStart = time.hourIndex+1;
          keyEnd = time.minuteIndex;
        }else {
          nowValue.setSeconds(nowValue.getSeconds()+accVal);
          keyStart = time.minuteIndex+1;
          keyEnd = time.secondIndex;
        }
        this.displayValue = this.timeToFormatter(nowValue);
        this.$nextTick( () => this.setInputSelect(keyStart, keyEnd) );
      },
      //输入框点击时进行部分全选功能
      handleClick(){
        let time = this.getHourMinSec();
        if(!time) return;
        let start = 0;
        let end = 0;
        if(time.cursor === "hour"){
          start = 0;
          end = time.hourIndex;
        }else if(time.cursor === "minute"){
          start = time.hourIndex + 1;
          end = time.minuteIndex;
        }else {
          start = time.minuteIndex + 1;
          end = time.secondIndex;
        }
        this.setInputSelect(start, end);
      },
      //获取当前输入框原始数据的时分秒以及光标的位置
      getHourMinSec(){
        let nVal = this.refInput.value;
        //获取"小时"
        let firstIndex = nVal.indexOf(":");
        if(firstIndex === -1) return null; //若没有"时"，则返回
        let  hour = nVal.substring(0,firstIndex) || "00";

        //没有显示秒
        const showSecond = (this.format || DEFAULT_FORMATS[this.type]).indexOf("ss") !== -1;
        //获取"分钟"
        let secIndex = showSecond ? nVal.indexOf(":",firstIndex+1) : nVal.length;
        if(secIndex === -1) return null; //若没有"分钟"，则返回
        let minute = nVal.substring(firstIndex+1,secIndex) || "00";//分钟
        //获取"秒"
        let second = showSecond ? (nVal.substring(secIndex+1) || "00") : '';//秒

        //时分秒 字段的长度
        let hL = hour.length;
        let mL = minute.length;
        let end = this.refInput.selectionEnd;//光标结束位置
        let cursor = ""; //焦点的位置
        if(end<hL+1){    //焦点在"小时"
          cursor = "hour";
        }else if(end<hL+mL+2){ //焦点在"分钟"
          cursor = "minute";
        }else {       //焦点在"秒"
          cursor = "second";
        }
        return {
          hour: hour,
          minute: minute,
          second: second,
          hourIndex: hL,
          minuteIndex: hL+mL+1,
          secondIndex: nVal.length,
          cursor: cursor,
        }
      },
      //选中输入框的某一段字符串
      setInputSelect(start,end){
        this.refInput.setSelectionRange(start, end);
      },
      /**
      * 设置当前的时间 (picker存在时)
      * @param nowTime 当前时间
      */
      handleNow(nowTime){
        this.picker && this.picker.handleNow(nowTime);
      },
      /**
       * 供外部调用的方法
       *

      /**
       * 设置时间控件的值
       * @param value： 设置时间控件的值
       */
      setTime(value){
        //当前已经存在弹窗了 则调用handleNow
        if(this.picker){
          //若当前弹窗是隐藏的  则设置keyTebEsc为true 防止设置值后弹窗显示出来
          if(!this.pickerVisible){
            this.keyTabEsc = true;//解决设置值窗体弹出的bug
          }
          this.handleNow(value)
        }else {
          this.keyTabEsc = true;//解决设置值窗体弹出的bug
          //isDate: 判断是否是时间 若不是，则可能是 10:16:16这样的格式
          this.displayValue = isDate(value) ? this.timeToFormatter(new Date(value)) : value;
          this.currentValue = isDate(value) ? new Date(value) : value; //国际化单位
        }
      },
    }
  }

</script>
