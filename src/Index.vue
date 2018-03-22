<template>
  <div class="contain">
   <div class="menu">
     <ul>
       <li><router-link to="/button">Button 按钮</router-link></li>
       <li><router-link to="/checkbox">Checkbox 复选框</router-link></li>
       <li><router-link to="/input">Input 输入框</router-link></li>
       <li><router-link to="/radio">Radio 单选框</router-link></li>
       <li><router-link to="/tree">Tree 树形控件</router-link></li>
       <li><router-link to="/dialog">Dialog 弹窗</router-link></li>
       <li><router-link to="/menu">menu 菜单栏</router-link></li>
       <li><router-link to="/scrollbar">scrollbar 虚拟滚动条</router-link></li>
       <li><router-link to="/loading">loading 加载</router-link></li>
       <li><router-link to="/page">page 分页</router-link></li>
       <li><router-link to="/message-box">MessageBox 弹框</router-link></li>
       <li><router-link to="/select">Select 选择框</router-link></li>
       <li><router-link to="/switch">Switch 开关</router-link></li>
       <li><router-link to="/upload">Upload 上传</router-link></li>
       <li><router-link to="/dropdown">Dropdown 下拉菜单</router-link></li>
       <li><router-link to="/datepicker">DatePicker 日期选择器</router-link></li>
       <li><router-link to="/time-picker">TimePicker 时间选择器</router-link></li>
       <li><router-link to="/key-focus">快捷键</router-link></li>
     </ul>
   </div>
    <div class="content">
        <div class="wrap">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'his5',
    data () {
      return {
        msg: 'his5 vue 例子'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contain{ display: flex;  flex-flow: row;align-items:stretch;width: 100%; font-size: 15px; height: 100%;overflow: hidden;}
  .contain .wrap{width: 100%;height: 100%;overflow: auto;display: block;box-sizing: border-box;padding: 15px;}
  .contain li {  display: list-item;  }
  .contain  a:link,a:visited,a:hover{ text-decoration:none; outline: none;}
  .contain ul,li{ list-style:none;}
  .contain .menu{width: 200px;flex: 0 0 auto; padding: 20px 20px; border-right: 1px solid #ddd; }
.contain .content{flex: 1 1 auto;width: 100%;height: 100%;min-width: 800px;}
.contain .menu li{color:#34495e;margin-top: 5px;line-height: 25px;}
.contain .menu li:hover a{border-bottom: 2px solid #42b983; }
  .contain .menu li a:visited ,.contain .menu li a:link{color: #34495e;}
</style>
