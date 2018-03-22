<template>
  <div class="zoehis_date_table">
    <div class="zoehis_table_tr">
      <th>{{mon}}</th><th>{{tue}}</th><th>{{wed}}</th><th>{{thu}}</th><th>{{fri}}</th><th>{{sat}}</th><th>{{sun}}</th>
    </div>
    <div class="zoehis_table_td zoehis_td_bg"
         v-for="item in prevMonthDayArr"
         @click="clickSelectedDate(item.date, theMonth-1, theYear, 0,item.timestamp)">{{item.date}}</div>
    <div class="zoehis_table_td zoehis_current_month"
         v-for="item in initDateArr"
         @click="clickSelectedDate(item.date, theMonth, theYear, 2,item.timestamp)"
         @mouseover="dateMouseOver(item.timestamp)"
         @mouseout="dateMouseOut"
         :class="{
         'zoehis_is_range':
         (item.timestamp>=startTimestamp && item.timestamp<=endTimestamp && isClickStartDate && !onalign)||
         (!onalign && item.timestamp>=startTimestampMoment && item.timestamp<=mouseOverTimeStamp && !isClickStartDate)||
         (onalign && item.timestamp>=startTimestampMoment && item.timestamp<=grandpaInitEndDateHelpSave)||
         (onalign && mouseOverTimeStamp && item.timestamp>=mouseOverTimeStamp && item.timestamp<=startTimestamp && !isRightPanel)||
         (onalign && item.timestamp<=mouseOverTimeStamp && item.timestamp>=endTimestamp && isRightPanel),
         'zoehis_is_selected' :
         (selectedDay.day==item.date && selectedDay.month==theMonth && selectedDay.year==theYear && type==='date')||
         (item.timestamp===startTimestamp && isClickStartDate && !isRightPanel)||
         (item.timestamp===endTimestamp && isClickStartDate && isRightPanel)||
         (item.timestamp===startTimestampMoment && !isClickStartDate),
         'zoehis_td_bg':
         (onalign && item.timestamp>grandpaInitEndDateHelpSave && !isRightPanel)||
         (onalign && item.timestamp<startTimestampMoment && isRightPanel)
          }">{{item.date}}</div>
    <div class="zoehis_table_td zoehis_td_bg"
         v-for="item in nextMonthDayArr"
         @click="clickSelectedDate(item.date, theMonth+1, theYear, 1,item.timestamp)">{{item.date}}</div>
  </div>
</template>

<script>
  export default{
    name: "ZoehisDateTable",
    data: function () {
      return {
        mon: this.$t('zoehisUI.datepicker.weeks.mon'),
        tue: this.$t('zoehisUI.datepicker.weeks.tue'),
        wed: this.$t('zoehisUI.datepicker.weeks.wed'),
        thu: this.$t('zoehisUI.datepicker.weeks.thu'),
        fri: this.$t('zoehisUI.datepicker.weeks.fri'),
        sat: this.$t('zoehisUI.datepicker.weeks.sat'),
        sun: this.$t('zoehisUI.datepicker.weeks.sun'),

        firstDayHowWeek: null,
        countDayOfMonth: 30,  //当前月总天数
        countDayOfPrevMonth: null,  //上个月总天数
        prevMonthDayArr: [],  //上个月要显示天数数组
        nextMonthDayArr: [],  //下个月要显示天数数组
        selectedDay: {},  //已选中日期
        selectedNum: null,  //已选中号数
        startTimestamp: null,
        endTimestamp: null,
        mouseOverTimeStamp: null,  //鼠标进入日期的时间戳
      }
    },

    computed: {
      grandpaClearState(){//清空字段
        return this.grandpa.$data.clearState;
      },
      grandpaHasTime(){
        if(this.grandpa){
          return this.grandpa.$props.hasTime;
        }
      },
      onalign(){
        if(this.grandpa){
          return this.grandpa.$props.onalign;
        }
      },
      grandpaInitEndDateHelpSave(){//暂存结束时间戳
        return this.jsonToDate(this.grandpa.$data.initEndDateHelpSave).getTime();
      },
      startTimestampMoment: function () {//暂存开始时间戳
        if(this.initDateHelpSave){
          return this.jsonToDate(this.initDateHelpSave).getTime();
        }else {
          return false
        }
      },
      grandpaOneDateJson(){
        return this.grandpa.$data.oneDateJson;
      },

      grandpaChangeYear(){
        if(this.grandpa){//获取爷组件要修改年份
          return this.grandpa.$data.changeYearByKey;
        }
      },

      grandpaChangeMonth(){//获取爷组件要修改月份
        if(this.grandpa){
          return this.grandpa.$data.changeMonthByKey;
        }
      },

      grandpaChangeDate: function () {
        if(this.grandpa){
          return this.grandpa.$data.changeDateByKey;
        }
      },

      grandpaMouseStamp: function () {
        return this.grandpa.$data.mouseStamp;
      },

      isClearPanel: function () {
        return this.grandpa.$data.isClickStartDate;
      },

      isClearOnePanel: function () {
        return this.father.$data.isClearOneDateJson;
      },

      father(){
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.name !== 'ZoehisDatePanel') {
            parent = parent.$parent;
          } else {
            return parent;
          }
        }
        return false;
      },

      grandpa(){
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

//    存放当前月天数数组
      initDateArr: function () {
        var currentArr = [];
        for(var i=1; i<=this.countDayOfMonth; i++){
          currentArr.push(i);
        }
        return this.m_addTimestampForArr(currentArr,this.theYear,this.theMonth);
      },
//      当前月第一天是周几
      firstDayOfMonth: {
        get: function () {
          return this.firstDayHowWeek;
        },
        set: function (val) {
//          周0是周天
          val = val === 0 ? 7 : val;
//          周1是周8，即换行在第二行显示周1
          val = val === 1 ? 8 : val;
          this.firstDayHowWeek = val;
        }
      },
    },

    props: {
      theYear: Number,  //年份
      theMonth: Number,  //月份
      initDate: {},  //初始化日期
      type: String,
      isRightPanel: Boolean,  //是否右边表盘
      initEndDate: {},
      startTimestampOfIndex: Number,
      isClickStartDate: Boolean,
      initDateHelpSave: {},  //第一次点击获取开始日期
    },

    watch: {
      grandpaOneDateJson: {
        handler: function (val) {
          if(this.type!=="date") return false
          this.selectedDay.day = val.date;
          this.selectedDay.month = val.month;
          this.selectedDay.year = val.year;
          this.selectedNum = val.date;
        },
        deep: true
      },

      grandpaChangeDate(newDate){//爷组件修改号数
        if(this.grandpaChangeYear)
          this.selectedDay.year = this.grandpaChangeYear;
        if(this.grandpaChangeMonth)
          this.selectedDay.month = this.grandpaChangeMonth;
        this.selectedDay.day = newDate;
      },

      grandpaMouseStamp(mouseStamp){
        this.mouseOverTimeStamp = mouseStamp;
      },

      theYear: function (parentYear) {
        this.getDate(parentYear,this.theMonth, this.selectedNum);
      },
      theMonth: function (parentMonth) {
        if(this.grandpa.$data.clickPanelChange){
          this.getDate(this.theYear,parentMonth, this.selectedNum);
        }else{
          this.getDate(this.theYear,parentMonth, this.selectedNum);
        }
//      	点击左右按钮控制月份出错位置
//        点按钮的时候触发这个
//        this.getDate(this.theYear,parentMonth+1, this.selectedNum);
      },
      isClearPanel(boolean){
        if(this.type==="daterange"||this.type==="datetime"){
          var grandpaData = this.grandpa.$data;
          var startDate = grandpaData.initDateHelpSave,
            endDate = grandpaData.initEndDateHelpSave;
          if(!boolean) {
            this.startTimestamp = null;
            this.endTimestamp = null;
          }else{
            //          判断暂时保存的开始结束日期对象是否为空
            if (JSON.stringify(startDate) != "{}" && JSON.stringify(endDate) != "{}") {
              this.startTimestamp = new Date(startDate.year, startDate.month-1, startDate.date, 0, 0, 0).getTime();
              this.endTimestamp = new Date(endDate.year, endDate.month-1, endDate.date, 0, 0, 0).getTime();
            }
          }
        }
      },
      isClearOnePanel(boolean){
        if(boolean){
          this.selectedDay = {};
        }
      },

    },

    created: function () {
      var initDate = this.initDate,
        initEndDate = this.initEndDate;
//      初始化面板，将初始日期选中
      this.getDate(this.theYear, this.theMonth, this.initDate.date);
      this.selectedDay = {
        year: this.theYear,
        month: this.theMonth,
        day: this.initDate.date
      };
      if(this.type==='daterange'||this.type==='datetime'){
        //      初始化给开始、结束时间戳赋值
        // if(this.onalign){
        //   this.initDateHelpSave = this.initDate;
        // }
        if(this.isRightPanel){
            this.startTimestamp = this.startTimestampOfIndex;
        }else{
          this.startTimestamp = this.jsonToDate(initDate).getTime();
        }
//      加个表盘
        this.endTimestamp = this.jsonToDate(initEndDate).getTime();
      }
    },

    methods: {
      dateMouseOut(){
        if(this.onalign){
          this.$emit("getMouseOverStamp", null);
        }
      },
//    	鼠标进入每个当前日期
      dateMouseOver: function (timeStamp) {
        if(this.type!=="date"){
          if(this.onalign){
            if((!this.isRightPanel&&this.grandpaInitEndDateHelpSave<timeStamp)||(this.isRightPanel&&this.startTimestampMoment>timeStamp)){
              return
            }
          }
          this.$emit("getMouseOverStamp", timeStamp);
        }
      },
//      点击面板中的日期
      clickSelectedDate: function (day, month, year,type,stamp) {
        //        type=2,父组件月份不变,=0父组件月份减一，=1父组件月份加一
        var date = {day: day, type: type,stamp:stamp};
        this.getDateForPraent(date);
//        赋值给开始、结束时间戳
        if(this.type==="daterange"||this.type==="datetime"){
          var clickTimestamp = new Date(year,month-1,day,0,0,0).getTime();
          if(this.onalign){
            if(this.isRightPanel){
              if(this.grandpaClearState){
                this.endTimestamp = clickTimestamp;
                this.changeClear(false);

                return
              }
              var leftClickStamp = this.startTimestampMoment;
              // 开始时间戳小于等于点击时间戳--
              if(leftClickStamp<=clickTimestamp){
                this.endTimestamp = clickTimestamp;
                this.changeClear(false);
              }else{
                return
              }
            }else{
              if(this.grandpaClearState){
                this.startTimestamp = clickTimestamp;
                this.changeClear(false);
                return
              }
              var rightClickStamp = this.grandpaInitEndDateHelpSave;
              // 结束时间戳大于等于点击时间戳
              if(rightClickStamp>=clickTimestamp){
                this.startTimestamp = clickTimestamp;
                this.changeClear(false);
              }else{
                return
              }
            }
          }else{
            if(!this.startTimestamp){
              this.startTimestamp = clickTimestamp;
            }else if(this.startTimestamp<=clickTimestamp){
              if(this.endTimestamp){
                this.startTimestamp = clickTimestamp;
                this.endTimestamp = null;
              }else{
                this.endTimestamp = clickTimestamp;
              }
            }else{
              this.startTimestamp = clickTimestamp;
              this.endTimestamp = null;
            }
          }
        }else{
          this.changeClear(false);
        }


        this.selectedNum = day;
//        修改选中日期
        this.selectedDay = {day: day, month: month, year: year};
      },
      changeClear(boo){
        this.$parent.changeClear(boo);
      },
      jsonToDate: function (json) {//对象转换成标准时间
        var date = new Date(
          json.year,
          json.month-1,
          json.date,
          0,0,0);
        return date
      },

//      触发父组件函数
      getDateForPraent: function (date) {
//        先提交所选日期给父组件
        this.$emit("selectedDate", date);
      },

//      获取下个月显示天数数组
      getNextMonthDay: function (countDay, firstDayWeek) {
//        下个月要显示几天
        var howDayShow = 42-countDay-(firstDayWeek-1);
        var nextMonthDayArr = [];
        for (var i=1; i<=howDayShow; i++){
          nextMonthDayArr.push(i);
        }
        return this.m_addTimestampForArr(nextMonthDayArr,this.theYear,this.theMonth);
      },

//      获取上个月显示天数数组
      getPrevMonthDay: function (firstDayWeek, countDayOfPrevMonth) {
        var numDay = firstDayWeek - 1;  //显示几天
        var prevMonthDay, prevMonthArr = [];  //上个月显示的号数,上个月号数数组
        for (var i = 0; i<numDay; i++){
          prevMonthDay = countDayOfPrevMonth - i;
          prevMonthArr.unshift(prevMonthDay);
        }
        return this.m_addTimestampForArr(prevMonthArr,this.theYear,this.theMonth);
      },

//      给数组添加时间戳
      m_addTimestampForArr: function (arrs, year, month) {
        var newArr = [];
        arrs.map(function (item) {
          var arrTimestamp = new Date(year, month-1, item, 0, 0, 0).getTime();
          newArr.push({date: item, timestamp: arrTimestamp});
        })
        return newArr;
      },

//      获取1号周几，当前月总天数 ,上个月总天数
      getDate: function (year,month,selectDate) {
        var date = new Date(year,month-1,selectDate,0,0,0);
//        date.setFullYear();
//        获取1号周几
        this.firstDayOfMonth = this.getFirstDayOfMonth(date);
        var firstDayWeek = this.firstDayOfMonth;
//        获取当前月天数
        var countDayCurrentMonth = this.countDayOfMonth = this.getDayCountOfMonth(year,month-1);

//        获取上个月总天数
        var counetDayPrevMonth = this.countDayOfPrevMonth = this.getDayCountOfMonth(year,month-2);
//        获取上个月显示天数数组
        this.prevMonthDayArr = this.getPrevMonthDay(firstDayWeek, counetDayPrevMonth);
//        获取下个月显示天数数组
        this.nextMonthDayArr = this.getNextMonthDay(countDayCurrentMonth, firstDayWeek);
      },

//      得到该月一号是周几（传入一个日期）
      getFirstDayOfMonth: function(date) {
        const temp = new Date(date.getTime());
        temp.setDate(1);
//        console.log(temp,temp.getDay())
        return temp.getDay();
      },

//      得到该月有几天（传入年份如1999，月份如11--传月份要减1）
      getDayCountOfMonth: function(year, month) {
        if (month === 3 || month === 5 || month === 8 || month === 10) {
          return 30;
        }
        if (month === 1) {
          if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return 29;
          } else {
            return 28;
          }
        }
        return 31;
      },


    }
  }
</script>
