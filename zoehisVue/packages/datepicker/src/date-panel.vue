<template>
  <!--后期要绑上isShowPanel判断显示隐藏-->
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <!-- <div> -->
      <div class="zoehis_date_panel"
           onselectstart="return false"
           :class="{'zoehis_date_panel_range' : isRightPanel,
           'zoehis_date_panel_range_isalign' : isRightPanel && align==='right',
           'zoehis_panel_left' : (type==='daterange'||type==='datetime') && !isRightPanel,
           'zoehis_panel_left_isalign' : (type==='daterange'||type==='datetime') && !isRightPanel && align==='right',
           'zoehis_panel_onedate' : (align==='right'&&type==='date')||
           (align==='right'&&type!=='date'&&isRightPanel),
           'zoehis_left_align' : align==='right'&&type!=='date'&&!isRightPanel,
           }">
        <!--时分秒组件-->
        <div class="zoehis_panel_time" v-if="type==='datetime'||fatherHasTimeReal">
          <zoehis-time-picker v-model="theTime"
                              ref="picker1"
                              :clearable="fatherClearable"
                              class="zoehis_panel_timeinput"
                              :standardtype="true"
                              :class="{'zoehis_timeinput_left':!isRightPanel,
                              'zoehis_timeinput_right':isRightPanel}">
          </zoehis-time-picker>
          <div class="zoehis_panel_time_line"></div>
        </div>
        <div class="zoehis_panel_head">
          <button class="zoeIconfont z_arrowALM_normal zoehis_panel_prevbtn" @click="prevYear"></button>
          <button class="zoeIconfont z_arrowTTL_normal zoehis_panel_prevbtn" @click="prevMonth"></button>
          <zoehis-select v-model="theYear"
                         :selectdata="selectYear"
                         @scroll-to-top="yearScrollTop"
                         :width="60"
                         :placeholder="$t('zoehisUI.datepicker.year')"
                         itemcode="id"
                         itemtext="text"
                         ref="yearRef"
                         @scroll-to-bottom="yearScrollBottom"
                         :clearable="false">
          </zoehis-select>
          <zoehis-select v-model="theMonth"
                         :selectdata="selectMonth"
                         :clearable="false"
                         :width="71"
                         :placeholder="$t('zoehisUI.datepicker.month')">
          </zoehis-select>
          <button class="zoeIconfont z_arrowARM_normal zoehis_panel_nextbtn" @click="nextYear"></button>
          <button class="zoeIconfont z_arrowTTR_normal zoehis_panel_nextbtn" @click="nextMonth"></button>
        </div>
        <div class="zoehis_panel_content">
          <ZoehisDatetable :theYear="theYear"
                           :theMonth="theMonth"
                           :initDate="initDate"
                           :type="type"
                           :isRightPanel="isRightPanel"
                           @getMouseOverStamp="getMouseOverStamp"
                           @selectedDate="getDateToParent"
                           :initEndDate="initEndDate"
                           :startTimestampOfIndex="startTimestampOfIndex"
                           :isClickStartDate="isClickStartDate"
                           :initDateHelpSave="initDateHelpSave"
                           ref="oneTable">
          </ZoehisDatetable>
          <!--单日期底部按钮-->
          <div  v-if="type==='date'">
            <div class="zoehis_date_line"></div>
            <div>
              <div><zoehis-button class="zoehis_sure_button" @clickenter="clickGetDate">{{$t('zoehisUI.datepicker.confirmButtonText')}}</zoehis-button></div>
              <div v-if="father.$props.nowBtn" class="zoehis_clear_button" @click="getActiveDate">{{father.$props.nowBtnText.substring(0,6)}}</div>
              <div v-if="fatherClearable" class="zoehis_clear_button" @click="clickClearDate">{{$t('zoehisUI.datepicker.clearButtonText')}}</div>
            </div>
          </div>
          <!--范围日期底部按钮-->
          <div  v-if="type==='daterange'||type==='datetime'">
            <div class="zoehis_date_line zoehis_panel_range_line"></div>
            <div :class="{'zoehis_panel_left_button':!isRightPanel}">
              <div><zoehis-button class="zoehis_sure_button" @clickenter="clickGetDate" v-if="isRightPanel">{{$t('zoehisUI.datepicker.confirmButtonText')}}</zoehis-button></div>
              <div v-if="father.$props.nowBtn && isRightPanel" class="zoehis_clear_button" @click="getActiveDate">{{father.$props.nowBtnText.substring(0,6)}}</div>
              <div class="zoehis_clear_button" @click="clickClearDate" v-if="isRightPanel&&fatherClearable">{{$t('zoehisUI.datepicker.clearButtonText')}}</div>
            </div>
          </div>

        </div>
      </div>
    <!-- </div> -->

  </transition>
</template>

<script type="text/ecmascript-6">
  import ZoehisDatetable from "./date-table.vue";
  import Popper from '../../../src/utils/vue-popper';
  export default{
    name: "ZoehisDatePanel",
    components: {ZoehisDatetable},
    mixins: [Popper],
    created: function () {
      this.$on('updatePopper', () => {
          if (this.showPopper) this.updatePopper();
      });
//      初始化年份过大或过小
      this.addYearJsonToArr(this.selectYear);
    },

    mounted: function () {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.reference;
      if(this.align==="left"){
        this.currentPlacement = `bottom-start`;
      }else{
        this.currentPlacement = `bottom-end`;
      }
      if(this.type==="datetime"||this.fatherHasTimeReal){
        this.theTime = this.theComTime;
        var timeJson = {
          internationalTime: this.theComTime,
          inputTime: this.$refs.picker1.getTime("HH:mm:ss"),
          isRightPanel: this.isRightPanel
        }
        this.$emit("timeValue",timeJson);
      }
    },

    data: function () {
      return {
        //        月份，国际化
        selectMonth: [
          {id: 1,text: this.$t('zoehisUI.datepicker.months.jan')},
          {id: 2,text: this.$t('zoehisUI.datepicker.months.feb')},
          {id: 3,text: this.$t('zoehisUI.datepicker.months.mar')},
          {id: 4,text: this.$t('zoehisUI.datepicker.months.apr')},
          {id: 5,text: this.$t('zoehisUI.datepicker.months.may')},
          {id: 6,text: this.$t('zoehisUI.datepicker.months.jun')},
          {id: 7,text: this.$t('zoehisUI.datepicker.months.jul')},
          {id: 8,text: this.$t('zoehisUI.datepicker.months.aug')},
          {id: 9,text: this.$t('zoehisUI.datepicker.months.sep')},
          {id: 10,text: this.$t('zoehisUI.datepicker.months.oct')},
          {id: 11,text: this.$t('zoehisUI.datepicker.months.nov')},
          {id: 12,text: this.$t('zoehisUI.datepicker.months.dec')}
        ],
        theYear: this.initDate.year,
        theMonth: this.initDate.month,
        theTime: new Date(),
        temp: 2019,  //下滚动加载年份(从哪个年份开始加载)
        tempTop: 2010,  //上滚动加载年份(从哪个年份开始加载)
        selectYear: this.selectYearArr,
        // selectYear: [{id: 2011,text: 2011},{id: 2012,text: 2012},{id: 2013,text: 2013},{id: 2014,text: 2014},
        //   {id: 2015,text: 2015},{id: 2016,text: 2016},{id: 2017,text: 2017},{id: 2018,text: 2018}],
        getOneDate: null,
        isClearOneDateJson: false,  //true时清除子组件的单日期
      }
    },

    props: {
      selectYearArr: Array,
      isShowPanel: {
        type: Boolean,
        default: false
      },
      initDate: {},  //单个时间   或开始时间
      type: String,
      //是否是右边表盘
      isRightPanel: {
        type: Boolean,
        default: false
      },
      initEndDate: {},
      startTimestampOfIndex: Number,
      isClickStartDate: Boolean,
      initDateHelpSave: {},
      align: String,
    },

    computed: {
      fatherClearState(){//获取父组件要修改月份
        if(this.father){
          return this.father.$data.clearState;
        }
      },
      fatherProps(){//父组件的props
        return this.$parent.$props;
      },
      fatherHasTimeReal(){//父组件的单日期是否显示时分秒
        return this.$parent.$props.hasTime;
      },
      fatherHasTime(){//
        return this.$parent.$props.oneDateHasTime;
      },
      fatherClearable(){//父组件的关闭清空功能
        return this.$parent.$props.clearable;
      },
      theComTime: {  //时分秒绑定时间
        get(){
          if(this.type==="datetime"){
            if(this.isRightPanel){
              return new Date(
                this.initEndDate.year,
                this.initEndDate.month,
                this.initEndDate.date,
                this.initEndDate.hour,
                this.initEndDate.minute,
                this.initEndDate.second
              )
            }else{
              return new Date(
                this.initDate.year,
                this.initDate.month,
                this.initDate.date,
                this.initDate.hour,
                this.initDate.minute,
                this.initDate.second
              )
            }
          }else if(this.fatherHasTime){
            return new Date(
              this.initDate.year,
              this.initDate.month,
              this.initDate.date,
              this.initDate.hour,
              this.initDate.minute,
              this.initDate.second
            )
          }
        },
        set(val){
//          this.$parents.initFunc();
        }
      },

      fatherChangeYear(){
        if(this.father){//获取父组件要修改年份
          return this.father.$data.changeYearByKey;
        }
      },

      fatherChangeMonth(){//获取父组件要修改月份
        if(this.father){
          return this.father.$data.changeMonthByKey;
        }
      },

      father(){//获取父组件
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.name !== 'ZoehisDatePicker') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },
    },

    watch: {
      '$parent.$data.isShowPanel': {
        immediate: true,
        handler(boo){
          this.showPopper = boo;
        }
      },

      fatherChangeYear(newYear){
        this.theYear = newYear;
      },

      fatherChangeMonth(newMonth){
        this.theMonth = newMonth;
      },

      theTime(time){
//        国际时间、格式化后时间
        var timeJson = {
          internationalTime: time,
          inputTime: this.$refs.picker1.getTime("HH:mm:ss"),
          isRightPanel: this.isRightPanel
        }
        this.$emit("timeValue",timeJson);
      }
    },

    methods: {
      getActiveDate(){//获取当前日期
        this.father.touchActiveEvent();
      },
      getMouseOverStamp: function (mouseStamp) {
        this.$emit("getMouseOverStamp",mouseStamp);
      },

//      点击确认----aaaa
      clickGetDate: function () {
        // if(this.type!="date"&&(!this.$refs.oneTable.$data.startTimestamp&&!this.$refs.oneTable.$data.endTimestamp)){
        //   this.$parent.changePanel(false);
        //   return
        // }
        if(this.fatherClearState){
          this.$parent.changePanel(false);
          return
        }
        if(this.fatherHasTime){
          var theTimeJson = this.father.getNewTimeHMS(this.theTime);
          if(!this.getOneDate){//无选中面板日期
            //判断时分秒是否改变过
            if(this.initDate.hour != theTimeJson.hour||this.initDate.minute != theTimeJson.minute||this.initDate.second != theTimeJson.second){
              this.getOneDate = {
                year:this.initDate.year,
                month:this.initDate.month,
                date:this.initDate.date,
                hour:theTimeJson.hour,
                minute:theTimeJson.minute,
                second:theTimeJson.second
              }
              var initDateStamp = this.father.jsonToDate(this.initDate);
              var date = {day: this.initDate.date, type: "",stamp:initDateStamp};
              this.getDateToParent(date);
              //            赋值为null---------------------------------------------------------
            }
          }else{//有选中面板日期aaa
            if(!theTimeJson.hour||!theTimeJson.minute||!theTimeJson.second){
              theTimeJson = this.father.getNewTimeHMS(new Date());//获取当前系统时分秒
            }
            let panelDate = this.$refs.oneTable.$data.selectedNum;//获取子组件的单日期的日
            this.getOneDate = {
              year:this.initDate.year,
              month:this.initDate.month,
              date:panelDate,
              hour:theTimeJson.hour,
              minute:theTimeJson.minute,
              second:theTimeJson.second
            }
            var initDateStamp = this.father.jsonToDate(this.getOneDate);
            var date = {day: this.getOneDate.date, type: "",stamp:initDateStamp};
            this.getDateToParent(date);
          }
        }
        this.$emit("clickGetDate",this.getOneDate);
      },

//      点击清空
      clickClearDate: function () {
        if(this.type==="date"){
          this.isClearOneDateJson = true;
        }
        this.$emit("clickClearDate",this.isClearOneDateJson);
      },
      changeClear(boo){
        this.$parent.changeClear(boo);
      },


      //      初始化年份过大或过小
      addYearJsonToArr: function (yearArrs) {
        var minId = yearArrs[0].id,
          maxId = yearArrs[yearArrs.length-1].id,
          initYear = this.theYear,
          addJson;
        if(initYear<minId){
          for(var i=minId; i>initYear-5;i--){
            addJson = {id: i-1,text: i-1};
            yearArrs.unshift(addJson);
          }
        }else if(initYear>maxId){
          this.temp = this.theYear + 6;
          for(var i=maxId; i<initYear+5;i++){
            addJson = {id: i+1,text: i+1};
            yearArrs.push(addJson);
          }
        }
      },

//      月份往后退的情况(多个函数调用的函数以m_开头)
      m_prevMonth: function () {

        if(this.theMonth===1) {
          this.theMonth = 12;
          this.theYear--;
        }else{
          this.theMonth--;
        }
      },
//      月份往前进的情况(多个函数调用的函数以m_开头)
      m_nextMonth: function () {
        if(this.theMonth===12) {
          this.theMonth = 1;
          this.theYear++
        }else{
          this.theMonth++;
        }
      },

      //      向上滚动加载年份
      yearScrollTop: function () {
        var item = {};
        for(let i=5;i>0;i--){
//          item.text = item.id = --this.tempTop;
          item.text = item.id = --this.selectYear[0].id;
          this.selectYear.unshift(Object.assign({},item));
        }

        this.$nextTick(()=>{
          this.$refs.yearRef.scrollMove(50);
        })
      },

//      向下滚动加载年份
      yearScrollBottom: function () {
        var item = {};
        for(let i=5;i>0;i--){
          item.text = item.id = this.selectYear[this.selectYear.length-1].id + 1;
          this.selectYear.push(Object.assign({},item));
        }
      },

//      获取子组件传来的日期值  点击子组件日期emit的事件
      getDateToParent: function (date) {
//        type是0代表点击上个月的日期，1点击下个月日期，2当前月日期
        if (date.type === 0){
          this.m_prevMonth();
        }else if (date.type ===1){
          this.m_nextMonth();
        }
        if(this.fatherHasTime){
          let timeJson;
          timeJson = this.father.getNewTimeHMS(this.theTime);
          if(!timeJson.hour||!timeJson.minute||!timeJson.second){//如果不存在时分秒
            let nowDate = new Date();
            timeJson = this.father.getNewTimeHMS(nowDate);
            this.theTime = nowDate;
          }
            date.stamp = new Date(date.stamp).setHours(
              timeJson.hour,
              timeJson.minute,
              timeJson.second);
        }
//        这边修改左右按钮控制月份
        var dateJson = {year: this.theYear, month: this.theMonth, date: date.day,stamp:date.stamp};
        this.getOneDate = dateJson;
//        点击日期后将清空按钮重置
        this.isClearOneDateJson = false;
//        增加一个属性用来判断是点击表盘中上或下个月日期改变的月份
        dateJson.changeType = "clickPanelChange";
        this.$emit("selectedDate", dateJson,this.isRightPanel);
      },

//      上一年按钮
      prevYear: function () {
        if(this.selectYear[0].id>=this.theYear-1){
          this.yearScrollTop();
        }
        this.$nextTick(()=>{
          this.theYear--;
        })
      },
//      上一个月按钮
      prevMonth: function () {
        this.m_prevMonth();
      },
//      下一年按钮
      nextYear: function () {
        if(this.selectYear[this.selectYear.length-1].id<=this.theYear+1){
          this.yearScrollBottom();
        }
        this.$nextTick(()=>{
          this.theYear++;
        })
      },
//      下一个月按钮
      nextMonth: function () {
        this.m_nextMonth();
      },

      //      点击表盘阻止冒泡
      eStop: function (e) {
        e.stopPropagation();
      },
    }

  }
</script>
