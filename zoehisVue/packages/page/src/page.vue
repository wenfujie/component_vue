<template>
  <div class="zoehis_page">
    <div class="zoehis_page_content" :class="{'zoehis_page_content_width' : !isSetStrip}">
      <div class="zoehis_page_size" v-if="isSetStrip">
        <span>{{pagesize}}</span>
        <!-- <div class="zoehis_page_size_select" @click="showDropList">
        {{setStrip}}
        <ul class="zoehis_page_list" v-show="isStripShow">
          <li class="zoehis_page_li" v-for="item in stripArr" @click="setStripFunc">{{item}}</li>
        </ul>
      </div> -->
      <span class="dropdown_box">
        <zoehis-select :clearable="false" width="45" v-model="setStrip" :selectdata="stripArrAddId"></zoehis-select>
      </span>
      <span>{{unitText}}，</span>
      </div>
      <div class="zoehis_page_total">
        {{count}}<span>{{stripCount}}</span>{{unitText}}
      </div>
      <div class="zoehis_page_current" onselectstart="return false">
        <div class="zoehis_page_current_wrap">
          <i class="zoeIconfont z_arrowTTL_normal zoehis_page_prev"
             :class="{'zoehis_page_prev_false':isPrev}"
             @click="prevPage"></i>
          <!--正则限制输入-->
          <input type="text" v-model="setPage" @keyup.enter="enterChangePage" @blur="enterChangePage"
                 :class="{'zoehis_page_input_invariant' : !isPrev && !isNext}" :disabled="!isPrev && !isNext"
                 onkeyup="value=value.replace(/[^\d]/g,'') "
                 onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                 ID="zoehis_page_input" NAME="zoehis_page_input">
          <span class="zoehis_page_bias">/</span>
          <span class="zoehis_page_count">{{pageCount}}</span>
          <i class="zoeIconfont z_arrowTTR_normal zoehis_page_prev"
             :class="{'zoehis_page_prev_false':isNext}"
             @click="nextPage"></i>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {on} from '../../../src/utils/dom.js';
  export default{
    name: "ZoehisPage",
    componentName: "ZoehisPage",

    data: function () {
      return {
        currentPage: this.current_page,  //当前页 --用户输入的页数
        setStrip: this.set_strip,  //设置条数
        setPage: this.current_page,  //设置页数  --实际跳转的页数

        isStripShow: false,  //判断设置显示条数下拉列表显示
      }
    },

    props: {
      stripArr: {  //设置可选条目数组
        type: Array,
        default: function () {
          return [10,20,30,40]
        }
      },
      stripCount: Number,  //总条数
      current_page: {  //当前页----对应data中currentPage
        type: Number,
        default: 1
      },
      set_strip: {  //当前显示条数----对应data中setStrip
        type: Number,
        default: 10
      },
      isSetStrip: {
        type: Boolean,
        default: true
      },
      beforeClick:"",//点击前事件
      unitText: {//单位文字，
        type:String,
        default(){
          return this.$t('zoehisUI.page.strip');
        }
      },
    },

    computed: {
      stripArrAddId(){//给每页显示条数数组加id
        let arrs = [];
        this.stripArr.map((item,index)=>{
          arrs.push({
            text:item,
            id:item
          })
        })
        return arrs
      },
//      总页数
      pageCount: function () {
        var pageCount = this.stripCount/this.setStrip;
//          是小数则小数清零并+1
          if(String(pageCount).indexOf(".")>-1){
            pageCount = parseInt(pageCount,10);
            pageCount++;
          }else if(pageCount==0){
            pageCount = 1;
          }
        return pageCount;
      },

      //判断上一页按钮颜色
      isPrev: function () {
        if(this.currentPage == 1) return false
        return true
      },
      //判断下一页按钮颜色
      isNext: function () {
        if(this.currentPage == this.pageCount) return false
        return true
      }
    },

    watch: {
      current_page(val){
        if(this.currentPage != val){
          this.currentPage = val;
          this.setPage = val;
        }
      },
      currentPage: function (currentPage) {
        let submitPage = parseInt(currentPage);
        this.$emit("update:current_page",submitPage);
        this.$emit('changePage',submitPage);
      },
      setStrip: function (setStrip) {
        this.$emit("update:set_strip",setStrip);
        this.$emit('changeStrip',setStrip);
      },
//      总页数改变，当前页数对应变换
      pageCount: function () {
        if(this.pageCount<this.currentPage || this.pageCount<this.setPage){
          this.currentPage = this.pageCount;
          this.setPage = this.pageCount;
        }
      }
    },

    created: function () {
      var _this = this;
//    点击document隐藏分页下拉框
      on(document,'click',function () {
        _this.isStripShow = false;
      });
//        获取i18n中的中文值
      this.pagesize = this.$t('zoehisUI.page.pagesize');  //每页显示
      this.count = this.$t('zoehisUI.page.count');  //总
    },

    methods: {
      setStripFunc: function (e) {
        var setStrip = e.currentTarget.innerHTML;
        setStrip = parseInt(setStrip,10);
        this.setStrip = setStrip;
      },

      showDropList: function (e) {
        this.isStripShow = !this.isStripShow;
        e.stopPropagation();
      },

      prevPage: function () {//上一页
        if(!this.isPrev) return false
        this.before(this.currentPage-1,this.currentPage);
      },

      nextPage: function () {//下一页
        if(!this.isNext) return false
        this.before(this.currentPage+1,this.currentPage);
      },

      before(newPage,oldPage,type=0){//enterChangePage回车跳转调用该方法会传入type=1 将页码设置回输入之前
        if(this.beforeClick&&typeof this.beforeClick=="function"){
          let isTrue =  this.beforeClick(newPage,oldPage);
          if(isTrue){
            this.goOn(newPage);
          }else{
            type == 1 && (this.setPage = oldPage);//
          }
        }else{
          this.goOn(newPage);
        }
      },

      goOn(newPage){//执行切换页  newPage要跳转页码
        this.currentPage = newPage;
        this.setPage = newPage;
      },

      enterChangePage() {
        var _this = this;
        let toPage = 1;
        if(!isNaN(_this.setPage)){//判断输入是否是数字
          switch(true){
            case _this.setPage>_this.pageCount://输入比总页数大就等于总页数
              toPage = _this.pageCount;
              break;
            case _this.setPage<1://输入比1小就等于1
              toPage = 1;
              break;
            default:
              toPage = parseInt(_this.setPage,10);
              break;
          }
        }
        this.before(toPage,this.currentPage,1);
      }
    }
  }
</script>
