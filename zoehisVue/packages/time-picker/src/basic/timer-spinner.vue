<template>
  <div class="zoehis_time_spinner" :class="{'has_seconds': showSeconds }">
    <zoehis-scrollbar
      @mouseenter.native="emitSelectRange('hours')"
      class="zoehis_time_spinner__wrapper"
      wrap-style="max-height: inherit;"
      view-class="zoehis_time_spinner__list"
      noresize
      tag="ul"
      ref="hour">
      <li
        @click="handleClick('hours',{ value: hour, disabled: disabled }, true)"
        v-for="(disabled,hour) in hoursList"
        track-by="hour"
        class="zoehis_time_spinner__item"
        :class="{ 'active': hour === hours, 'disabled': disabled }"
      >{{hour|$filterZero}}</li>
    </zoehis-scrollbar>
    <zoehis-scrollbar
      @mouseenter.native="emitSelectRange('minutes')"
      class="zoehis_time_spinner__wrapper"
      wrap-style="max-height: inherit;"
      view-class="zoehis_time_spinner__list"
      noresize
      tag="ul"
      ref="minute">
      <li
        @click="handleClick('minutes',key)"
        v-for="(minute,key) in 60"
        class="zoehis_time_spinner__item"
        :class="{ 'active': key === minutes }"
      >{{key | $filterZero}}</li>
    </zoehis-scrollbar>
    <zoehis-scrollbar
      @mouseenter.native="emitSelectRange('seconds')"
      class="zoehis_time_spinner__wrapper"
      wrap-style="max-height: inherit;"
      view-class="zoehis_time_spinner__list"
      v-show="showSeconds"
      noresize
      tag="ul"
      ref="second">
      <li
        @click="handleClick('seconds',key)"
        v-for="(second,key) in 60"
        class="zoehis_time_spinner__item"
        :class="{ 'active': key === seconds }"
      >{{key | $filterZero}}</li>
    </zoehis-scrollbar>
  </div>
</template>
<script type="text/babel">
  import ZoehisScrollbar from '../../../scrollbar'
  import {getRangeHours} from '../util'
  import debounce from '../../../../src/utils/throttle-debounce'
  export default {
    components: {ZoehisScrollbar},
    watch:{
      hoursPrivate(newVal,oldVal){//监听hoursPrivate的值，用于点击"时"的事件
        if(!(newVal>=0 && newVal<=23)){
          this.hoursPrivate = oldVal;
        }
        this.ajustZoehisTop('hour',newVal);
        this.$emit('change', { hours: newVal });
      },
      minutesPrivate(newVal,oldVal){//监听minutesPrivate的值，用于点击"分"的事件
        if(!(newVal>=0 && newVal<=59)){
          this.minutesPrivate = oldVal;
        }
        this.ajustZoehisTop('minute',newVal);
        this.$emit('change', { minutes: newVal });
      },
      secondsPrivate(newVal,oldVal){//监听secondsPrivate的值，用于点击"秒"的事件
        if(!(newVal>=0 && newVal<=59)){
          this.secondsPrivate = oldVal;
        }
        this.ajustZoehisTop('second',newVal);
        this.$emit('change', { seconds: newVal });
      },
    },
    props: {
      showSeconds: { //是否显示秒
        type: Boolean,
        default: true
      },
      hours: {//当前选中的小时
        type: Number,
        default: 0
      },
      minutes: { //当前选中的分
        type: Number,
        default: 0
      },
      seconds: {  //当前选中的秒
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        selectableRange:[],
        hoursPrivate: 0,
        minutesPrivate: 0,
        secondsPrivate: 0
      }
    },
    filters:{
      //显示补0
      $filterZero(val){
        if(val<10){
          return "0"+val;
        }else {
          return val;
        }
      }
    },
    created(){
      this.debounceAjustZoehisTop = debounce(100, type => this.ajustZoehisTop(type, this[`${type}s`]));
      this.debounceHandleClick = debounce(100, (type,value) => this.handleClickEvn(type,value));
    },
    computed: {
      //获取小时列表
      hoursList() {
        return getRangeHours(this.selectableRange);
      },
      //"时"的滚动条dom对象
      hourZoehis() {
        return this.$refs.hour.wrap;
      },
      //"分"的滚动条dom对象
      minuteZoehis() {
        return this.$refs.minute.wrap;
      },
      //"秒"的滚动条dom对象
      secondZoehis() {
        return this.$refs.second.wrap;
      },
    },
    mounted(){
      this.$nextTick(() => {
        this.bindScrollEvent();
      });
    },
    methods: {
      //点击事件
      handleClick(type, value){
        if(value.disabled) return;

        this[`${type}Private`] = value.value>=0 ? value.value : value;
        this.emitSelectRange(type)
      },
      //全选输入框的某一段
      emitSelectRange(type){
        if(type === 'hours'){
          this.$emit('select-range',0,2);
        }else if(type === 'minutes'){
          this.$emit('select-range',3,5);
        }else if(type === 'seconds'){
          this.$emit('select-range',6,8);
        }
      },
      //绑定滚动条事件
      bindScrollEvent(){
        const bindFuntion = (type) => {
          this[`${type}Zoehis`].onscroll = (e) => this.handleScroll(type,e);
        };
        bindFuntion('hour');
        bindFuntion('minute');
        bindFuntion('second');
      },
      handleScroll(type, e){
        const ajust = {};
        const item = Math.floor((this[`${type}Zoehis`].scrollTop - 80) / 32 + 3);
        ajust[`${type}s`] = Math.min(item,type==='hour' ? 23 : 59);
        this.debounceAjustZoehisTop(type);
        this.$emit('change', ajust);//emit=》chang,参数为滚动条选中的值
      },
      //重置选中值的滚动条位置
      ajustScrollTop(){
        this.ajustZoehisTop('hour', this.hours);
        this.ajustZoehisTop('minute', this.minutes);
        this.ajustZoehisTop('second', this.seconds);
      },
      //将滚动条滚动到选中值的位置上
      ajustZoehisTop(type, value){
        this[`${type}Zoehis`].scrollTop = Math.max(0, (value - 2.5) * 32 + 80);
      }
    },

  }
</script>