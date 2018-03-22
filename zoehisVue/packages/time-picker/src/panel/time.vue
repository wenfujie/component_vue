<template>
  <transition name="zoehis_zoom_in_top" @after-leave="$emit('dodestroy')">
    <div
      class="zoehis_time_panel"
      :class="popperClass"
      :style="{width: width + 'px'}"
      v-show="currentVisible"
    >
      <div class="zoehis_time_panel__content" :class="{'has_seconds' : showSeconds }">
        <zoehis-time-spinner
          ref="spinner"
          :show-seconds="showSeconds"
          @select-range="setSelectionRange"
          @change="handleChange"
          :hours="hours"
          :minutes="minutes"
          :seconds="seconds"
        ></zoehis-time-spinner>
      </div>
      <div class="zoehis_time_panel__footer">
        <button
          type="button"
          class="zoehis_time_panel__btn"
          @click.stop="handleClickNow"
        >当前</button>
        <button
          type="button"
          class="zoehis_time_panel__btn"
          @click="handleConfirm()"
        >确认</button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {limitRange} from '../util'
  import ZoehisTimeSpinner from '../basic/timer-spinner'
  export default {
    components: {ZoehisTimeSpinner},
    created(){
      this.hours = this.currentDate.getHours();
      this.minutes = this.currentDate.getMinutes();
      this.seconds = this.currentDate.getSeconds();
    },
    mounted(){
      this.$nextTick(() => {
        this.handleConfirm(true,true);
      });
      this.$emit('mounted');
    },
    methods: {
      handleClear(){
        this.$emit('pick');
      },
      //向父组件触发select-range事件
      setSelectionRange(start, end){
        this.$emit('select-range', start, end);
      },
      //设置当前值
      handleClickNow(){
        this.handleNow();
        this.$nextTick(_ =>{
          this.$emit('click-now');//只有手动点击弹窗框上的当前按钮 才会触发click-now事件
        });
      },
      //设置值
      handleNow(nowTime){
        this.currentDate = nowTime || new Date();
        this.hours = this.currentDate.getHours();
        this.minutes = this.currentDate.getMinutes();
        this.seconds = this.currentDate.getSeconds();
        this.handleConfirm(true);
        //定位到相应的滚动条位置
        this.$nextTick(_ =>{
          this.ajustScrollTop();
        });
      },
      //选中的事件
      handleConfirm(visible=false,first){
        if(first) return;//如果是第一次则返回
        const date = new Date(limitRange(this.currentDate, this.selectableRange, 'HH:mm:ss'));
        this.$emit('pick',date,visible,first);
      },
      //值改变事件
      handleChange(date){
        if(date.hours !== undefined){
          this.currentDate.setHours(date.hours);
          this.hours = this.currentDate.getHours();
        }
        if(date.minutes !== undefined){
          this.currentDate.setMinutes(date.minutes);
          this.minutes = this.currentDate.getMinutes();
        }
        if(date.seconds !== undefined){
          this.currentDate.setSeconds(date.seconds);
          this.seconds = this.currentDate.getSeconds();
        }
        //改变后触发设置值事件
        this.handleConfirm(true);
      },
      //定位到相应的滚动条位置
      ajustScrollTop() {
        return this.$refs.spinner.ajustScrollTop();
      }
    },
    watch:{
      pickerWidth(val) {
        this.width = val;
      },
      //监听visible的显示/隐藏
      visible(val) {
        this.currentVisible = val;
        let isChange = false;
        if(val){
          this.oldValue = this.currentDate?this.currentDate.getTime():"";
        }else {
          let curVal = this.currentDate?this.currentDate.getTime():"";
          if(this.oldValue!=curVal){//改变了
            isChange=true;
          }
        }
        this.$emit("toggle-visible",val,isChange);
      },
      selectableRange(val){
        this.$refs.spinner.selectableRange = val;
      },
      value(newVal,oldVal){

        //用于修复 时分格式的时候 改变值之后 按enter键 下拉不会关闭的bug
        if(newVal && oldVal && (newVal.getTime() == oldVal.getTime())){
          return;
        }

        let date;
        if(newVal instanceof Date){
          date = limitRange(newVal, this.selectableRange);
        }else if(!newVal){//若为空
          date = new Date();
        }
        this.handleChange({
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        });
        //定位到相应的滚动条位置
        this.$nextTick(_ => this.ajustScrollTop());
      }
    },
    computed:{
      //监听是否显示 '秒'
      showSeconds(){
        return (this.format || '').indexOf('ss') !== -1;
      }
    },
    data(){
      return {
        popperClass: '',//时间弹窗的class
        width: this.pickerWidth || 0,  //时间弹窗的width
        currentVisible: this.visible || false,
        format: 'HH:mm:ss',//time的格式
        selectableRange: [],  //可选值的区间
        currentDate: this.$options.defaultValue || this.date || new Date(),//当前的值(国际化)
        value: "",//当前的值（格式过的）
        hours: 0,
        minutes: 0,
        seconds: 0,
        oldValue:''//旧的值
      }
    },
    props:{
      pickerWidth: '',//时间弹窗的width
      visible: Boolean,//时间弹窗的显示、隐藏
      date: {
        default(){
          return new Date();
        }
      }
    }
  }

</script>