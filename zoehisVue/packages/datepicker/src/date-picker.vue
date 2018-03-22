<template>
  <div class="zoehis_picker">
    <!--用不了input组件的check-type="int"属性，因为input中不是数字-->
    <zoehis-input :placeholder="placeholder"
                  :icon="iconFont"
                  type="text"
                  showclose
                  :readonly="type==='daterange'||type==='datetime'||readonly||hasTime"
                  v-model="showInputDate"
                  :width="inputWidth"
                  @click="clickInput"
                  @focus="focusInput"
                  ref="reference"
                  :clearable="clearable"
                  @clear="clickClearDate(true)"
                  :disabled="disabled"
                  @blur="inputBlur"
                  :clickselect="true"
                  @keydown.native="handleKeydown"
                  :error-tip="errorTip"
                  :beforeClick="beforeClick"
                  @keyup.native="handleKeyup">
    </zoehis-input>

    <!--单个日期选择-->
    <div v-if="type==='date' && isShowPanel" @click="eStop">
      <ZoehisDatepanel :isShowPanel="isShowPanel"
                       :initDate="initDate"
                       :prevent-over-id="preventOverId"
                       :type="type"
                       :selectYearArr="selectYearArr"
                       @clickGetDate="clickGetDate"
                       @clickClearDate="clickClearDate"
                       @selectedDate="setDate"
                       @timeValue="getChildTime"
                       :align="align" ref="onePanel">
      </ZoehisDatepanel>
    </div>

    <!--日期范围选择-->
    <!--在上下两个div添加v-clickoutside="handleClose"控制是否显示-->
    <div class="zoehis_pick_range"  v-else-if="type==='daterange' && isShowPanel" @click="eStop">
      <ZoehisDatepanel :isShowPanel="isShowPanel" :initDate="initDate"
                       :prevent-over-id="preventOverId"
                       :type="type" :initEndDate="initEndDate"
                       :selectYearArr="selectYearArr"
                       @selectedDate="setDate" :isClickStartDate="isClickStartDate"
                       :initDateHelpSave="initDateHelpSave"
                       @getMouseOverStamp="getMouseOverStamp" :align="align">
      </ZoehisDatepanel>
      <ZoehisDatepanel :isShowPanel="isShowPanel" :initDate="initEndDate"
                       :prevent-over-id="preventOverId"
                       :type="type" :isRightPanel="true"
                       :selectYearArr="selectYearArr"
                       @selectedDate="setDate" :initEndDate="initEndDate"
                       :startTimestampOfIndex="startTimestampOfIndex"
                       :isClickStartDate="isClickStartDate" :initDateHelpSave="initDateHelpSave"
                       @clickClearDate="clickClearDate"
                       @clickGetDate="clickGetDate" @getMouseOverStamp="getMouseOverStamp"
                       :align="align">
      </ZoehisDatepanel>
    </div>
    <!--日期范围选择精确到时分秒-->
    <div class="zoehis_pick_range"  v-else-if="type==='datetime' && isShowPanel" @click="eStop">
      <ZoehisDatepanel :isShowPanel="isShowPanel" :initDate="initDate"
                       :prevent-over-id="preventOverId"
                       :type="type" :initEndDate="initEndDate"
                       :selectYearArr="selectYearArr"
                       @selectedDate="setDate" :isClickStartDate="isClickStartDate"
                       :initDateHelpSave="initDateHelpSave"
                       @timeValue="getChildTime" @getMouseOverStamp="getMouseOverStamp"
                       :align="align">
      </ZoehisDatepanel>
      <ZoehisDatepanel :isShowPanel="isShowPanel" :initDate="initEndDate"
                       :prevent-over-id="preventOverId"
                       :type="type" :isRightPanel="true" :align="align"
                       :selectYearArr="selectYearArr"
                       @selectedDate="setDate" :initEndDate="initEndDate"
                       :startTimestampOfIndex="startTimestampOfIndex"
                       :isClickStartDate="isClickStartDate" :initDateHelpSave="initDateHelpSave"
                       @clickClearDate="clickClearDate"
                       @clickGetDate="clickGetDate" @timeValue="getChildTime"
                       @getMouseOverStamp="getMouseOverStamp">
      </ZoehisDatepanel>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import ZoehisDatepanel from "./date-panel.vue";
  import Clickoutside from '../../../src/utils/clickoutside';
  import {on} from '../../../src/utils/dom.js';
  export default{
    name: "ZoehisDatePicker",
    components: {ZoehisDatepanel},
    directives: { Clickoutside },

    data: function () {
      return {
        showInputDate: "",  //input显示的时间
        isShowPanel: false,//是否显示panel（传给panel组件）
        initDate: {},  //传给子组件的时间对象{year: year, month: month, date: date}
        initEndDate: {},  //范围选择结束日期
        startDate: "",
        endDate: "",
        startTimestampOfIndex: null,  //传给右表盘的开始时间戳
        isClickStartDate: true,  //判断表盘上的日期是否显示
        initDateHelpSave: {},  //获取开始日期，帮助initDate暂时保存日期对象
        initEndDateHelpSave: {},  //获取结束日期，帮助initEndDate暂时保存日期对象
        oneDateClear: false,  //是否清空（单日期）

//        panel中的属性
        childLeftTime: null,  //时分秒
        childRightTime: null,
        childLeftTimePause: null,  //暂存时分秒
        childRightTimePause: null,
        leftInterTime: {},  //国际时分秒Json
        rightInterTime: {},  //
        mouseStamp: null,  //子组件传递的鼠标移动时间戳
        clickPanelChange: false,  //判断是否是点击表盘日期修改的月份，true时是

        changeYearByKey: null,//用来修改子组件年
        changeMonthByKey: null,
        changeDateByKey: null,

        oneDateJson: {},//快捷键和面板控制修改单选日期
        clearState:false,//判读是否点击了清空按钮
      }
    },

    computed: {
      iconFont(){//input右边logo是否显示
        if (this.disabled){
        return ""
        }
        return this.icon
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

      inputWidth: function () {
        if(this.width) return this.width;
        if(this.type==="date"){
          return this.hasTime?175:110;
        }else if(this.type==="daterange"){
          return 210;
        }else{
          return 345;
        }
      },
    },

    props: {
      nowBtnText:{//配置当前按钮text
        default(){
          return this.$t('zoehisUI.datepicker.now')//当前
        },
        type: String
      },
      nowBtn:{//是否显示当前按钮
        default: false,
        type: Boolean
      },
      beforeClick: Function,
      type: {//传daterange配置为日期范围选择器,默认是date为单天日期选择
        type: String,
        default: "date"
      },
      dateType: {// 返回给父组件的v-model的类型，
        type: String,
        default: "worldTime"
      },
      placeholder: {
        type: String,
        default(){
          return this.$t('zoehisUI.datepicker.selectDate');
        }
      },
      align: {
        type: String,
        default: "left"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      preventOverId: {
        type: String,
        default: ""
      },
      width: "",//input宽度
      setGetDateType: {//设置用户获取时间戳还是国际时间，1是国际时间，2时间戳
        default: "1"
      },
      originDate: {},
      value: "",//input的值
      clearable: {
        default: true,
        type: Boolean
      },
      onalign: {
        default: true,
        type: Boolean
      },
      readonly: {
        default: false,
        type: Boolean
      },
      hasTime:{//判断单日期选择是否显示时分秒
        default: false,
        type:Boolean
      },
      oneDateHasTime: {//设置单个日期emit的时间是具有时分秒而不是00:00:00
        default: true,
        type:Boolean
      },
      errorTip: { //错误的提示内容 为 "" 时表示关闭错误的提示
        type: String,
        default: ""
      },
      icon:{
        type: String,
        default: "z_time_normal"
      }
    },

    watch: {
      value(val){
        this.unEqualEmit(val);
      },

      disabled(boo){
        if(!boo){
//          this.initFunc();
        }
      },

      oneDateJson: {
        deep:true,
        handler: function (json) {
          if(!json){
            this.$emit("input","");
            this.$emit("change","");
            return
          }
          let emitDate;
          if(this.hasTime){
            emitDate = new Date(json.year,json.month-1,json.date,json.hour,json.minute,json.second);
          }else{
            let nowDate = this.getNewTimeHMS(new Date());
            emitDate = new Date(json.year,
              json.month-1,json.date,
              nowDate.hour,nowDate.minute,nowDate.second);
          }
          if(this.setGetDateType==1)
            this.$emit("input",emitDate);
          if(this.setGetDateType==2)
            this.$emit("input",emitDate.getTime());
            this.$emit("change",emitDate,emitDate.getTime());
        }
      },

      isShowPanel(boo){
        if(!boo) {
          this.isClickStartDate = true;
          if(!this.onalign){
            this.initDateHelpSave = {};
            this.initEndDateHelpSave = {};
          }
          this.startDate = "";
          this.$emit("hide");
        }else{
          this.$emit("show");
        }
      }
    },

    created: function () {
      this.selectYearArr = [];
      for(let i=1870;i<=2050;i++){
        this.selectYearArr.push({id: i,text: i});
      }

      on(document,'click',() => {
        this.changePanel(false);
      });
    },

    mounted: function () {
      if(this.type==="date"){
        if(this.value===false){
          this.initFunc("","",1);
          this.clickClearDate(true);
          return
        }
        this.initFunc(this.value,"",1);
      }else{
        if(!this.value){//为设置值对象时
          this.initFunc("","",1);
          if(this.value===false){
            this.clickClearDate(true);
          }
          return
        }
        if(this.value.startDate===false&&this.value.endDate===false){//设置为false默认值为空
          this.initFunc("","",1);
          this.clickClearDate(true);
          return
        }
        if(this.value.startDate||this.value.endDate){//设置false代表为空
          this.initFunc(this.value.startDate,this.value.endDate,1);
        }else{
          this.initFunc("","",1);
        }
      }
    },

    methods: {
      changeClear(boo){//子组件调用
        this.clearState = boo;
      },
      unEqualEmit(val){//监视value，用户传值时修改时间
        if(this.value===false){
          this.clickClearDate(true);
          return
        }
        if(this.type==="date"){
          let dateVal = new Date(val);
          if(!this.isDate(dateVal)) return
          let getDate = this.getNewTime(dateVal);

          if(this.hasTime){
            let getDateHMS = this.getNewTimeHMS(dateVal);//获取时分秒  直接比较日期或者时间戳大小无法比较（暂未找到原因）
            if(getDate.year==this.initDate.year&&getDate.month==this.initDate.month&&getDate.date==this.initDate.date&&
              getDateHMS.hour==this.initDate.hour&&getDateHMS.minute==this.initDate.minute&&getDateHMS.second==this.initDate.second){//判断时间是否相等
              return
            }else{
              this.initFunc(dateVal);
            }
          }else{
            if(getDate.year==this.initDate.year&&getDate.month==this.initDate.month&&getDate.date==this.initDate.date){//判断时间是否相等
              return
            }else{
              this.initFunc(dateVal);
            }
          }
        }else{
          let sDate,eDate,getSDate,getEDate;
          sDate = new Date(val.startDate);
          eDate = new Date(val.endDate);
          if(!this.isDate(sDate)||!this.isDate(eDate)) return
          if(this.type==="daterange"){
            getSDate = this.getNewTime(sDate);
            getEDate = this.getNewTime(eDate);
            if((getSDate.year==this.initDate.year&&getSDate.month==this.initDate.month&&getSDate.date==this.initDate.date)&&
              (getEDate.year==this.initEndDate.year&&getEDate.month==this.initEndDate.month&&getEDate.date==this.initEndDate.date)){//判断时间是否相等
//              console.log("时间是相等的啦------------")
              return
            }else{
//              console.log("范围不等",getSDate,this.initDate,getEDate,this.initEndDate)
              this.initFunc(sDate,eDate);
            }
          }else{
            getSDate = this.getNewTime(sDate);
            let getSTime = this.getNewTimeHMS(sDate);
            getEDate = this.getNewTime(eDate);
            let getETime = this.getNewTimeHMS(eDate);
            if((getSDate.year==this.initDate.year&&getSDate.month==this.initDate.month&&getSDate.date==this.initDate.date)&&
              (getEDate.year==this.initEndDate.year&&getEDate.month==this.initEndDate.month&&getEDate.date==this.initEndDate.date)&&
              (getSTime.hour==this.initDate.hour&&getSTime.minute==this.initDate.minute&&getSTime.second==this.initDate.second)&&
              (getETime.hour==this.initEndDate.hour&&getETime.minute==this.initEndDate.minute&&getETime.second==this.initEndDate.second)){//判断时间是否相等
              return
            }else{
              this.initFunc(sDate,eDate);
            }
          }
        }
      },

      inputBlur: function () {
        if(this.type === "date" && !this.hasTime && !this.oneDateClear){//单日期，无时分秒，没清空是
          this.keyEnterHandle();//转换input中值
        }
      },

      getDisabled(){//快捷键使用
        return this.disabled;
      },

      focus: function () {//快捷键使用
        this.refInput.focus();
      },

      selectAllInput(){//选中input中所有值
        this.refInput.setSelectionRange(0,this.refInput.value.length);
      },

      focusInput(){//聚焦事件，显示下拉框
        if(this.type == "date"){
          this.refInput.setSelectionRange(0,10);
        }
        this.changePanel(true);
        this.$emit("focus");
      },

      getMouseOverStamp: function (mouseStamp) {
        this.mouseStamp = mouseStamp;
      },

      getChildTime: function (timeJson) {
        if(this.hasTime){
          timeJson.inputTime = timeJson.inputTime==""? "00:00:00":timeJson.inputTime;
          this.childLeftTimePause = timeJson.inputTime;
          return
        }
        var getInterNationTime = timeJson.internationalTime;
        timeJson.inputTime = timeJson.inputTime==""? "00:00:00":timeJson.inputTime;
        if(!timeJson.isRightPanel){
          this.childLeftTimePause = timeJson.inputTime;
          //把值给data中的左右国际时间---------------------
//          左边当时分秒没清空时
          if(getInterNationTime!=""){
            this.leftInterTime = {
              hour: getInterNationTime.getHours(),
              minute: getInterNationTime.getMinutes(),
              second: getInterNationTime.getSeconds(),
            }
          }else{
            //          当时分秒清空时
            this.leftInterTime = {hour: 0, minute: 0, second: 0}
          }
        }else{
          this.childRightTimePause = timeJson.inputTime;
          //右边当时分秒没清空时
          if(getInterNationTime!=""){
            this.rightInterTime = {
              hour: getInterNationTime.getHours(),
              minute: getInterNationTime.getMinutes(),
              second: getInterNationTime.getSeconds(),
            }
          }else{
//            右边清空时
            this.rightInterTime = {hour: 0, minute: 0, second: 0}
          }
        }


      },

      //点击确认
      clickGetDate: function (oneDateJson) {
        let inputValue = "";
        if(this.type==='date'){
          if(oneDateJson&&JSON.stringify(oneDateJson)!="{}"&&!this.oneDateClear){
            var initDateTime = this.getNewTimeHMS(new Date(oneDateJson.stamp));
            if(this.hasTime){
              // 获取点击后的时分秒对象
              inputValue = this.changeDateType(oneDateJson)+" "+this.getInputHMS(initDateTime);
            }else{
              inputValue = this.changeDateType(oneDateJson);
            }
            oneDateJson.hour = initDateTime.hour;
            oneDateJson.minute = initDateTime.minute;
            oneDateJson.second = initDateTime.second;
//            赋值给父组件的v-model
            var parentModel = this.dateType==="stickTime"?
              this.changeDateType(oneDateJson):
              new Date(oneDateJson.year,oneDateJson.month-1,oneDateJson.date,0,0,0);
            this.handleBeforeClick(inputValue,oneDateJson);
          }else{
//            清空了就提交""
            // this.keyEnterHandle();
            // this.$emit("input","");
//            this.$emit("change","");
          }
        }else{
          var initDateHelpSave = this.initDateHelpSave,
            initEndDateHelpSave = this.initEndDateHelpSave;
            // 空的时候this.initDate和this.initEndDate等自己本身-----------------------
//          判断暂时保存的开始结束日期对象是否为空
          if(this.onalign||(JSON.stringify(initDateHelpSave)!="{}"&&JSON.stringify(initEndDateHelpSave)!="{}")){
            if(this.initDateHelpSave.date){
             this.initDate = initDateHelpSave;
            }
            if(this.initEndDateHelpSave.date){
             this.initEndDate = initEndDateHelpSave;
            }
            this.childLeftTime = this.childLeftTimePause;
            this.childRightTime = this.childRightTimePause;
            var startDate = new Date(
              this.initDate.year,
              this.initDate.month-1,
              this.initDate.date,
              0,0,0),
              endDate = new Date(
                this.initEndDate.year,
                this.initEndDate.month-1,
                this.initEndDate.date,
                0,0,0),
              daterange = {startDate:startDate,endDate:endDate};
//            input赋值-------------------------------
            if(this.type==="datetime"){
              var leftInterTime = this.leftInterTime;
              var rightInterTime = this.rightInterTime
              var startDateOfInput = this.changeDateType(this.initDate);
              var endDateOfInput = this.changeDateType(this.initEndDate);
              startDate = new Date(
                this.initDate.year,
                this.initDate.month-1,
                this.initDate.date,
                leftInterTime.hour,
                leftInterTime.minute,
                leftInterTime.second);
              endDate = new Date(
                this.initEndDate.year,
                this.initEndDate.month-1,
                this.initEndDate.date,
                rightInterTime.hour,
                rightInterTime.minute,
                rightInterTime.second);
              daterange = {startDate:startDate,endDate:endDate};
              inputValue = this.dateTimeRangeType(
                startDateOfInput,
                this.childLeftTime,
                endDateOfInput,
                this.childRightTime);
              if(this.setGetDateType==2){
                daterange = this.getTimestampJson(daterange);
              }
              this.handleBeforeClick(inputValue,daterange);
//              this.$emit("input",daterange);
////              this.$emit("change",daterange);//触发change事件
            }else if(this.type==="daterange"){
              if(this.setGetDateType==2){
                daterange = this.getTimestampJson(daterange);
              }
              inputValue = this.dateRangeType(this.initDate, this.initEndDate);
              this.handleBeforeClick(inputValue,daterange);
              //            赋值给父组件的v-model
//              this.$emit("input",daterange);
//              this.$emit("change",daterange);//触发change事件
            }
          }else{
//            只有开始时间就点击确认不提交修改input
//            this.$emit("input","");
          }
        }
      },

      handleBeforeClick(inputValue,activeDate){//点击前事件
        let beforeClick = this.$props.beforeClick;//父组件props的beforeClick
        if(typeof beforeClick == "function"){//有定义beforeClick
          let oldDateStamp,activeDateStamp;//当前v-model
          if(this.type == "date"){//将日期处理为时间戳后传入beforeClick方法
            oldDateStamp = +this.$props.value;
            if(this.hasTime){
              activeDateStamp = +new Date(activeDate.year,activeDate.month-1,activeDate.date,activeDate.hour,activeDate.minute,activeDate.second);
            }else{
              activeDateStamp = +new Date(activeDate.year,activeDate.month-1,activeDate.date);
            }
          }else if(this.type == "datetime" || this.type == "daterange"){//将日期处理为时间戳后传入beforeClick方法
            oldDateStamp = Object.assign({},this.$props.value);//为对象要拷贝
            oldDateStamp = {
              startDate: +oldDateStamp.startDate,
              endDate: +oldDateStamp.endDate,
            };
            activeDateStamp = {
              startDate: +activeDate.startDate,
              endDate: +activeDate.endDate,
            };
          }
          let isGoOn = beforeClick(activeDateStamp,oldDateStamp);
          if(isGoOn !== false){//beforeClick如果return false则不触发点击确认
            this.doSureBtn(inputValue,activeDate);
          }
        }else {
          this.doSureBtn(inputValue,activeDate);
        }
      },

      /**
       * @parm inputValue:input值；activeDate所点击日期
       */
      doSureBtn(inputValue,activeDate){//执行确认按钮
//        todo 这边需要做一个时间是否和点击前相等，相等不emit
        switch(this.type){
          case "date":
            this.showInputDate = inputValue;
            this.oneDateJson = activeDate;
            this.initDate = activeDate;
            break;
          case "daterange":
            this.$emit("input",activeDate);
            this.$emit("change",activeDate);//触发change事件
            break;
          case "datetime":
            this.$emit("input",activeDate);
//              this.$emit("change",activeDate);//触发change事件
            break;
        }
        this.showInputDate = inputValue;
        this.changePanel(false);
      },

      getTimestampJson: function (dateJson) {//将存放开始结束国际时间对象转化成存放时间戳
        dateJson.startDate = dateJson.startDate.getTime();
        dateJson.endDate = dateJson.endDate.getTime();
        return dateJson;
      },

//      获取范围日期有时分秒转换后类型input
      dateTimeRangeType: function (startDate,startTime,endDate,endTime) {
        return startDate+" "+startTime+" - "+endDate+" "+endTime
      },

//      点击清空
      clickClearDate: function (boolean) {
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth();
        this.showInputDate = "";
        if(this.type==="daterange"||this.type==="datetime"){
          this.isClickStartDate = false;
          this.initDateHelpSave = {};
          this.initEndDateHelpSave = {};
//          清空后初始化年、月份
          this.initDate = {year:nowYear,month: nowMonth+1, date: null};
          this.initEndDate = {year:nowYear,month: nowMonth+1, date: null};
          this.startTimestampOfIndex = null;
          this.emitDate({startDate:"",endDate:""},this.type);
        }else{
//          清空后初始化年、月份--
          this.initDate = {year:nowYear,month: nowMonth+1, date: null};
          if(boolean){
            this.oneDateClear = true;
          }
          this.oneDateJson = "";
          this.$emit("input","");
        }
        this.clearState = true;
      },
      emitDate(date){//提交日期
        this.$emit("change",date);
        this.$emit("input",date);
      },
      toSetDate: function (startDate,endDate) {
        this.initFunc(startDate,endDate);
      },

      isDate: function(date) {
        if (date === null || date === undefined) return false;
        if (isNaN(new Date(date).getTime())) return false;
        return true;
      },

//      设置时间
      initFunc: function (d,endD,isFirst) {//isFirst  为1时表示mounted调用,控制初始化不触发change事件
        // if(this.disabled) return false
        if(d){
          if(typeof (d)=="string"){  //字符串时间戳时转换
            d = parseInt(d,10);
          }
          if(typeof (endD)=="string"){//字符串时间戳时转换
            endD = parseInt(endD,10);
          }
          if(!this.isDate(d)){//没传开始时间
            d = new Date();
          }else{
            d = new Date(d);
          }
        }else if(this.originDate){  //判断是否通过属性originDate传递初始日期
//          if(!this.originDate.startDate||!this.originDate.endDate)
          var setOriginDateStart= parseInt(this.originDate.startDate,10);
          var setOriginDateEnd= parseInt(this.originDate.endDate,10);
          if(!isNaN(setOriginDateStart))
            d = new Date(setOriginDateStart);
        }else{
          d = new Date();
        }

        var _this = this;
        var submitDate,showInputDate;
//      获取当前电脑日期格式为 yyyy-mm-dd
        var initDate = this.initDate = this.getNewTime(d);
        if(this.oneDateHasTime){
          var initDateTime = this.getNewTimeHMS(d);
          this.initDate.hour = initDateTime.hour;
          this.initDate.minute = initDateTime.minute;
          this.initDate.second = initDateTime.second;
          this.startTimestampOfIndex = new Date(
            initDate.year,
            initDate.month-1,
            initDate.date,
            initDateTime.hour,
            initDateTime.minute,
            initDateTime.second).getTime();
        }else{
          this.startTimestampOfIndex = new Date(
            initDate.year,
            initDate.month-1,
            initDate.date,
            0,0,0).getTime();
        }
        if(this.type==="date"){
            submitDate = d;
          if(this.hasTime){
            showInputDate = this.changeDateType(this.initDate)+" "+this.getInputHMS(initDateTime);
          }else{
            showInputDate = this.changeDateType(this.initDate);
            // 以下是时分秒都是0,0,0的方式
            // submitDate = new Date(d.setHours(0,0,0));
            // showInputDate = this.changeDateType(this.initDate);
          }
          if(this.setGetDateType==2) submitDate = submitDate.getTime();
          if(isFirst!=1){
              this.oneDateJson = this.initDate;  //赋值后快捷键才能响应
            }
        }
        if(this.type==="daterange"||this.type==="datetime") {
//          gei  endDate赋值
          var originEndDate;
          if(!this.isDate(endD)){ //是否传结束时间
//            var nextMonth = d.getMonth();
//            originEndDate = new Date(d.setMonth(nextMonth+1));
            originEndDate = d;
            if(this.originDate&&!isNaN(this.originDate.endDate)) originEndDate = new Date(setOriginDateEnd);
          }else{
            endD = new Date(endD);
            originEndDate = endD
          }
//        范围时间时右边表盘显示下个月日期
          this.initEndDate =  this.getNewTime(originEndDate);
          if(this.onalign){
            this.initDateHelpSave = this.initDate;
            this.initEndDateHelpSave = this.initEndDate;
          }
          //      转换日期类型，并初始化到input
          if(this.type==="datetime"){
            var initTimeStart = this.getNewTimeHMS(d);
            var initTimeEnd = this.getNewTimeHMS(originEndDate);// 获取初始化时分秒
            this.initDate.hour = initTimeStart.hour;
            this.initDate.minute = initTimeStart.minute;
            this.initDate.second = initTimeStart.second;
            this.initEndDate.hour = initTimeEnd.hour;
            this.initEndDate.minute = initTimeEnd.minute;
            this.initEndDate.second = initTimeEnd.second;
            submitDate = {
              startDate: new Date(
                initDate.year,
                initDate.month-1,
                initDate.date,
                initTimeStart.hour,initTimeStart.minute,initTimeStart.second),
              endDate: new Date(
                this.initEndDate.year,
                this.initEndDate.month-1,
                this.initEndDate.date,
                initTimeEnd.hour,initTimeEnd.minute,initTimeEnd.second
              )};
            if(isFirst!=1){
              this.$emit("change",submitDate);//触发change事件
            }
            if(this.setGetDateType==2)
              submitDate = this.getTimestampJson(submitDate);
            var startDateOfInput = this.changeDateType(this.initDate);
            var endDateOfInput = this.changeDateType(this.initEndDate);
            if(this.originDate&&!isNaN(this.originDate.endDate)){
              var startTimeContent = this.getInputHMS(initTimeStart);
              var endTimeContent = this.getInputHMS(initTimeEnd);
              showInputDate = this.dateTimeRangeType(startDateOfInput,startTimeContent,endDateOfInput,endTimeContent);
            }else{
//              var timeContent = "00:00:00";
              var timeStringS = this.getInputHMS(this.initDate);
              var timeStringE = this.getInputHMS(this.initEndDate);
              showInputDate = this.dateTimeRangeType(startDateOfInput,timeStringS,endDateOfInput,timeStringE);
            }
          }else{
            submitDate = {
              startDate: new Date(
                initDate.year,
                initDate.month-1,
                initDate.date,
                0,0,0),
              endDate: new Date(
                this.initEndDate.year,
                this.initEndDate.month-1,
                this.initEndDate.date,
                0,0,0
              )
            }
            if(isFirst!=1){
              this.$emit("change",submitDate);//触发change事件
            }
            if(this.setGetDateType==2)
              submitDate = this.getTimestampJson(submitDate);

            showInputDate = this.dateRangeType(this.initDate, this.initEndDate);
          }
        }
        this.$emit("input",submitDate);  // 此处要传给父组件  三种
        this.showInputDate = showInputDate;//给input赋值
      },

//      点击日期后给input赋值，子组件修改日期，默认传入要修改日期对象包含年月日Date = {year: this.theYear, month: this.theMonth, date: date.day};
      setDate: function (chooseDate,isRightPanel) {
        if(chooseDate.changeType==="clickPanelChange"){
          this.clickPanelChange = true;
        }
//        点击日期，单表盘给input赋值
        if(this.type==="date"){
          var setDate = this.changeDateType(chooseDate);
          this.oneDateClear = false;
        }else{
          if(this.onalign){
            var chooseDateBZ = this.jsonToDate(chooseDate).getTime();
            // 时间做判断啊----------------------------------------------
            if(isRightPanel){
              var startTimestamp = this.jsonToDate(this.initDateHelpSave).getTime();
              if(!startTimestamp){//一开始没有预存initDateHelpSave时
                startTimestamp = this.jsonToDate(this.initDate).getTime();
              }
//              定义一个data判断清空了没，清空了就都可以点击，然后data还原
              if(startTimestamp<=chooseDateBZ||this.clearState){//开始比结束小
                this.initEndDateHelpSave = chooseDate;
                this.startTimestampOfIndex = startTimestamp;
                this.startDate = "";
                this.isClickStartDate = true;
              }
            }else{
              var endTimestamp = this.jsonToDate(this.initEndDateHelpSave).getTime();
              if(!endTimestamp){
                endTimestamp = this.jsonToDate(this.initEndDate).getTime();
              }
              if(chooseDateBZ<=endTimestamp||this.clearState){
                this.isClickStartDate = true;
                this.initDateHelpSave = chooseDate;
                this.startDate = this.changeDateType(chooseDate);
              }
            }
          }else{
            //          点击日期，范围选择时，给input赋值
            if(!this.startDate){
  //            点击后将已选择时间隐藏
              this.isClickStartDate = false;
              this.initDateHelpSave = chooseDate;
              this.startDate = this.changeDateType(chooseDate);
            }else{
              //            开始、结束日期时间戳
              var startTimestamp = this.jsonToDate(this.initDateHelpSave).getTime();
              var endTimestamp = this.jsonToDate(chooseDate).getTime();
  //            比较两次点击时间戳大小
              if(startTimestamp>endTimestamp){
                this.isClickStartDate = false;
                this.initDateHelpSave = chooseDate;
              }else{
                this.initEndDateHelpSave = chooseDate;
                this.startTimestampOfIndex = startTimestamp;
                this.startDate = "";
                this.isClickStartDate = true;
              }
            }
          }
        }
      },
//      点击input
      clickInput: function (e) {
        if(this.disabled) return false
        if(this.type==="date"){
//          this.selectionPosition();
        }
        this.changePanel(true);
        e.stopPropagation();
      },

      selectionPosition() {//根据点击范围 选中对应年或月或日
        var startPosition = this.refInput.selectionStart;  //开始光标位置
        var currentPosition = -1;  //当前光标位置
        if(startPosition>=0&&startPosition<=4){
          this.refInput.setSelectionRange(0,4);
        }else if(startPosition>=5&&startPosition<=7){
          this.refInput.setSelectionRange(5,7);
        }else{
          this.refInput.setSelectionRange(8,10);
        }
      },

      handleKeyup: function (e) {
        if(this.type!=="date") return
        var keyCode = e.keyCode;
        var indexStart = this.refInput.selectionStart;
        var indexEnd = this.refInput.selectionEnd;
        if(keyCode==38){//up
          this.keyHandleDate(indexStart,indexEnd,1);
        }else if(keyCode==40){//down
          // this.keyEnterHandle();
          this.keyHandleDate(indexStart,indexEnd,-1);
        }else if((keyCode<58 && keyCode>47) || (keyCode<106 && keyCode>95) || (e.shiftKey && keyCode==186)){
          // this.keyEnterHandle();
          //48-57是大键盘的数字键，96-105是小键盘的数字键，英文冒号键以及backspace键
          this.m_getNumKeyChange(indexStart,indexEnd,this.refInput.value);
        }else if(keyCode==9){//tab(暂时去掉)
//          this.keyTabHandle(indexStart,indexEnd);
        }else if(keyCode==13){//回车(暂时去掉)
//          this.keyEnterHandle();
          this.refInput.blur();
        }
       // this.keyEnterHandle();
        this.$emit("keyup",e);
      },

      keyEnterHandle(){//回车
        let value = this.refInput.value,
          year = value.substring(0,4),
          month = value.substring(5,7),
          date = value.substring(8,10);
        if(!value||!year||!month||!date||isNaN(Number(year))||isNaN(Number(month))||isNaN(Number(date))){//截取中不能含非数字
          this.initFunc();
          return false
        }
        year = parseInt(year,10);//转换成数字
        month = parseInt(month,10);
        date = parseInt(date,10);
        if(year<1000||year>3500||month>12||month<1||date<1||date>31){ //年月日限制
          this.initFunc();
          return false
        }
        this.changeYearByKey = year;//修改年份
        this.changeMonthByKey = month;
        this.changeDateByKey = date;
        this.initDate = {//修改初始化日期
          year: year,
          month: month,
          date: date
        }
        this.showInputDate = this.enterSpecialInput(value);//回车后处理一些特殊input情况
        if(this.oneDateJson.year==this.initDate.year &&
          this.oneDateJson.month==this.initDate.month &&
          this.oneDateJson.date==this.initDate.date){
          return//日期相等则return
        }
        this.oneDateJson = this.initDate;
//        this.changePanel(false);
      },
      enterSpecialInput(value){//        回车后处理一些特殊input情况
        if(value.length>10){//有多于字符则截掉
          value = value.substring(0,10);
        }
        let _index = value.indexOf("-",0);//获取第一个-位置
        if(_index>=0){
          let _index2 = value.indexOf("-",_index+1);//获取第二个-位置
          if(_index2 == -1){//不存在第二个'-' 则添加上去
            value = value.substring(0,7) + "-" + value.substring(7,9);
          }
          if(!value[_index2+2]){
            value = value.substring(0,8) + "0" + value.substring(8,9);
          }
        }
        return value;
      },

      keyTabHandle: function (keyStart,keyEnd) {//tab键
        var setKeyStart,setKeyEnd;
        if(keyStart>=0&&keyStart<=4){
          setKeyStart = 5;
          setKeyEnd = 7;
        }else if(keyStart>=5&&keyStart<=7){
          setKeyStart = 8;
          setKeyEnd = 10;
        }
//        else if(keyStart>=8&&keyStart<=10){
//          setKeyStart = 0;
//          setKeyEnd = 4;
//        }
        this.$nextTick(function () {
          this.refInput.setSelectionRange(setKeyStart,setKeyEnd);
        })
      },
      /**
       * 注意：substring（），传入量参数分别对应开始、结束索引，用于字符串剪切，剪切位置包含开头索引不包含结束
       * @param keyStart
       * @param keyEnd
       * @param inputVal
         */
      m_getNumKeyChange: function (keyStart,keyEnd,inputVal) {//input输入数字修改日期
//        todo  该处处理月份只有一个数字
        var referenceIndex = inputVal.indexOf("-");
        let _index2 = inputVal.indexOf("-",referenceIndex+1);//第二个'-'位置
        var inputLong = inputVal.length;
        if(keyStart<=4){//input修改年份时
          if(referenceIndex>4){
            if(keyStart==1){
              this.m_changeDateForData(0,1,2,inputLong,keyStart,"");
            }else if(keyStart==2){
              this.m_changeDateForData(0,2,3,inputLong,keyStart,"");
            }else if(keyStart==3){
              this.m_changeDateForData(0,3,4,inputLong,keyStart,"");
            }else if(keyStart==4){
              this.m_changeDateForData(0,4,5,inputLong,keyStart,"");
            }
          }else if(referenceIndex==4){//年份结束
            this.m_changeDateForData(0,4,4,inputLong,keyStart,"");
          }
        }else if(keyStart==5||keyStart==6){
          if(keyStart==6){
            if(keyEnd==8){// 是选中月份的时候
              var newWrite = inputVal.substring(6,8);
              this.m_changeDateForData(0,5,9,12,9,newWrite);
            }else{
              if(referenceIndex>=0 && _index2>=0 && (_index2 - referenceIndex == 2)){//两个-之间无值（无月份）
              }else{
                var newWrite = inputVal.substring(5,6);
                this.m_changeDateForData(0,4,7,inputLong,keyStart,newWrite);
              }
            }
          }else{
            var newWrite = inputVal.substring(4,5);
            this.m_changeDateForData(0,4,7,inputLong,keyStart+1,newWrite);
          }
        }else if(keyStart==7){
          if(referenceIndex>=0 && _index2>=0 && (_index2 - referenceIndex == 3)){//两个"-"之间只有一个值（月份只有一个数字）
          }else{
            var newWrite = inputVal.substring(6,7);
            this.m_changeDateForData(0,7,8,inputLong,keyStart,0);
          }
        }else if(keyStart==8||keyStart==9){
          if(keyStart==8){
            var newWrite = inputVal.substring(7,8);
            this.m_changeDateForData(0,7,inputLong-1,inputLong,keyStart+1,newWrite);
          }else{
            var newWrite = inputVal.substring(8,9);
            this.m_changeDateForData(0,7,inputLong-1,inputLong,keyStart,newWrite);
          }
        }else if(keyStart==10){
          this.m_changeDateForData(0,9,inputLong-2,inputLong-1,keyStart,0);
        }else if(keyStart>10){
          this.m_changeDateForData(0,10,0,0,keyStart,0);
        }
      },
      //获取输入input的数字，修改对应年月日变量,
      // param:(leftTextStart,leftTextEnd)截取左边字符串开始和结束光标
      //（rightTextStart,rightTextEnd）截取右边字符串开始和结束光标
      //（setKeyS,newWrite）设置光标位置；所截取的单个字符
      m_changeDateForData: function (leftTextStart,leftTextEnd,rightTextStart,rightTextEnd,setKeyS,newWrite) {
        var setKeyStart,setKeyEnd,yearText,yearOtherText;
        var inputVal = this.refInput.value;
        yearText = inputVal.substring(leftTextStart,leftTextEnd);
        yearOtherText = inputVal.substring(rightTextStart,rightTextEnd);
        setKeyStart = setKeyS;
        setKeyEnd = setKeyS;
        if(newWrite){
          yearOtherText = "-"+newWrite+yearOtherText;
        }
        if(!yearText) return

        this.showInputDate = this.capacityMakeDate(yearText,yearOtherText);//智能处理 单日期快捷输入;
        this.$nextTick(function () {
          this.refInput.setSelectionRange(setKeyStart,setKeyEnd);
//          this.keyEnterHandle();

        })
      },

      /**
       * 智能处理 单日期快捷输入
       */
      capacityMakeDate(yearText,yearOtherText){
        let cutLeftText = "", cutRightText = "", cutCenterText = "",//截取后左、右、中字符串
          inputValue = yearText+yearOtherText,//处理后input值
          firstCut = inputValue.indexOf("-"),//获取第一个-索引;
          secondCut = inputValue.indexOf("-",firstCut+1),//获取第二个-索引;
          monthfirstNum = inputValue.charAt(firstCut+1),//获取月份第一个数字
          monthSecondNum = inputValue.charAt(firstCut+2),//获取月份第二个数字
          datefirstNum = inputValue.charAt(secondCut+1),//获取号数第一个数字
          dateSecondNum = inputValue.charAt(secondCut+2);//获取号数第二个数字
        let type = 0;
        switch (true){
          //月份智能
          case monthfirstNum+monthSecondNum === "00"://月份为"00"的情况
            cutCenterText = "01";
            type = 1;
            break;
          case monthfirstNum>=2://月份第一个数字大于=2
            cutCenterText = "0" + (monthSecondNum==0 ? "1":monthSecondNum);
            type = 1;
            break;
          case monthfirstNum+monthSecondNum>12://月份大于12
            cutCenterText = "12";
            type = 1;
            break;
          //日期智能
          case datefirstNum+dateSecondNum === "00"://号数为"00"的情况
            cutCenterText = "01";
            type = 2;
            break;
          case datefirstNum>=4://号数第一个数字大于=4
            cutCenterText = "0"+ (dateSecondNum==0 ? "1":dateSecondNum);
            type = 2;
            break;
          case datefirstNum+dateSecondNum>31://号数大于31
            cutCenterText = "31";
            type = 2;
            break;
          default:
            cutLeftText = inputValue;
            break;
        }
        if(type==1){//切割月份的时候
          cutLeftText = inputValue.substring(0,5);
          cutRightText = inputValue.substring(7,10);
        }else if(type==2){//切割号数的时候
          cutLeftText = inputValue.substring(0,8);
        }
        return cutLeftText + cutCenterText + cutRightText;
      },

      keyHandleDate: function (keyStart,keyEnd,keyType) {//up/down控制日期
        var inputVal = this.refInput.value;//input中字符串
        if(keyStart>=0&&keyStart<=4){//选中年份
          var newYear = this.m_getKeyDate(0,4,keyType);
          var otherDate = inputVal.substring(4,10);
          this.initDate.year = newYear;
          this.changeYearByKey = newYear;//修改子组件年
          this.oneDateJson.year = newYear;//传递给父组件
//          this.oneDateJson = {year:2010,month: 10,date: 10}
          this.showInputDate = newYear+otherDate;
        }else if(keyStart>=5&&keyStart<=7){//选中月份
          var newMonth = this.m_getKeyDate(5,7,keyType);
          if(newMonth===13) newMonth = 1;
          if(newMonth===0) newMonth = 12;
          this.initDate.month = newMonth;
          this.changeMonthByKey = newMonth;//修改子组件月
          this.oneDateJson.month = newMonth;
            newMonth = newMonth/10>=1? newMonth : "0"+newMonth;
          var otherDateYear = inputVal.substring(0,5);
          var otherDateDay = inputVal.substring(7,10);
          this.showInputDate = otherDateYear+newMonth+otherDateDay;
        }else if(keyStart>=8&&keyStart<=10){//选中日期
          var newDate = this.m_getKeyDate(8,10,keyType);
          var newYear = this.m_getKeyDate(0,4,0);
          var newMonth = this.m_getKeyDate(5,7,0);
          var countDayOfMonth = this.getDayCountOfMonth(newYear,newMonth-1);//得到该年月有几天
          if(newDate===countDayOfMonth+1) newDate = 1;
          if(newDate===0) newDate = countDayOfMonth;
          this.initDate.date = newDate;
          this.changeDateByKey = newDate;//修改子组件日
          this.oneDateJson.date = newDate;
            newDate = newDate/10>=1? newDate : "0"+newDate;
          var otherDate = inputVal.substring(0,8);
          this.showInputDate = otherDate+newDate;
        }
        this.$nextTick( () => {//重新选中
          this.refInput.setSelectionRange(keyStart,keyEnd);
//          this.keyEnterHandle();
        });
      },

      m_getKeyDate: function (keyStart,keyEnd,keyType) {//获取上下键修改后日期
        var inputVal = this.refInput.value;//input中字符串
        var inputYear = parseInt(inputVal.substring(keyStart,keyEnd),10);
        if(typeof (inputYear)=="number"){
          var date = inputYear+keyType;
        }
        return date
      },

      handleKeydown(e){//keydown时阻止默认事件
        const keyCode = e.keyCode;
        switch (keyCode){
          case 27://ESC
            this.isShowPanel = false;
            this.refInput.blur(); //焦点离开
            e.stopPropagation();
            break;
          case 9://tab
            this.changePanel(false);
//            e.preventDefault();
            break;
          case 13://tab
            this.changePanel(false);
            break;
          case 38://up
          case 40://down
            e.preventDefault();
            break;
          default:
        }
        this.$emit("keydown",e);
      },

//      点击表盘阻止冒泡
      eStop: function (e) {
        e.stopPropagation();
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
      jsonToDate: function (json) {//对象转换成标准时间
        var date = new Date(
          json.year,
          json.month-1,
          json.date,
          0,0,0);
        return date
      },
      getInputHMS: function (dataJson) {//得到初始化时分秒字符串
        var hour,minute,second,time;
        hour = dataJson.hour>9? dataJson.hour : "0"+dataJson.hour;
        minute = dataJson.minute>9? dataJson.minute : "0"+dataJson.minute;
        second = dataJson.second>9? dataJson.second : "0"+dataJson.second;
        time = hour + ":" + minute + ":" + second;
        return time
      },

      getNewTimeHMS: function (date) {//得到初始化时分秒对象
        var jsonHMS = {
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds()
        }
        return jsonHMS;
      },

//      转换日期为范围类型
      dateRangeType: function (startDate, endDate) {
        var start = this.changeDateType(startDate);
        var end = this.changeDateType(endDate);
        return start+" - "+end;
      },

//      获取当前电脑日期格式为 yyyy-mm-dd
      getNewTime: function (d) {
        var year, month, date;
        year = d.getFullYear();
        month = d.getMonth() + 1;
        date = d.getDate();
        return {year: year, month: month, date: date}
      },

//      转换日期==》日、月是个位数时在前面添加零
      changeDateType: function (newDate) {
        var year, month, date;
        year = newDate.year;
        month = (newDate.month/10) < 1 ? "0"+newDate.month : newDate.month;
        date = (newDate.date/10) < 1 ? "0"+newDate.date : newDate.date;
        return year+"-"+month+"-"+date;
      },
      getStandardDate(json){//传入对象，获取标准日期
        if(json.hour && json.minute && json.second){
          return +new Date(json.year,json.month-1,json.date,json.hour,json.minute,json.second);
        }else{
          return +new Date(json.year,json.month-1,json.date);
        }
      },
      /**
       * emit事件  或父组件调用
       */
      //改变下拉框显示状态
      changePanel: function (isShow) {
        this.isShowPanel = isShow;
      },
      touchActiveEvent(){//提交当前按钮事件
        this.changePanel(false);
        this.$emit("click-now");
      },
      setTime(date){
        this.unEqualEmit(date);
        setTimeout(()=>{
          this.changePanel(true);
        },1);
      },
    }
  }
</script>
