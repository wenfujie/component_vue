<template>
  <div>
    <div class="component_example">
      <h1>TimePicker 时间选择器</h1>
      <h2>常用的操作</h2>
      <div class="item" id="textId">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-time-picker prevent-over-id="textId" ref="picker1" v-model="value1" :clearable="false" format="HH:mm" @keyup.tab.native="tabEven"></zoehis-time-picker>
          <zoehis-button @clickenter="getPickerValue">获取值</zoehis-button>
          <zoehis-button @clickenter="setPickerValue">设置值 2017/6/10 13:16:16</zoehis-button>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-time-picker ref=&quot;picker1&quot; v-model=&quot;value1&quot; format=&quot;HH:mm&quot; :clearable=&quot;false&quot;&gt;&lt;/zoehis-time-picker&gt;
            &lt;script&gt;
            data: function () {
              return {
                value1:new Date()
              };
            },
            getPickerValue(){
              console.log('v-model=value1',this.value1);
              console.log('格式化后的值',this.$refs.picker1.getTime("HH:mm:ss"));
              console.log('国际化的值',this.$refs.picker1.getTime());
            },
            setPickerValue(){
              this.$refs.picker1.setTime(new Date());
            },
            &lt;/script&gt;
          </code></pre></div>
          <div class="item-desc">
            (1)v-model的值为当前被选中的值，可以通过v-model设置值的初始化 <br>
            (2)支持上下键改变时间 <br>
            (3)支持手动输入自动格式化
            (4)setTime(val)/getTime()设置值跟获取值；
            getTime(isDisplay)获取组件的值,isDisplay参数为true的话，返回的是格式化的值(不带年月的值，如 10:16:16)，不传或者为false返回标准时间
            (5)format 格式化数据（默认"HH:mm:ss"） 经常用的就是"HH:mm:ss" 和 "HH:mm" 不建议使用其他的
          </div>
        </div>
      </div>
      <div class="item">
        <h4>清空功能</h4>
        <div class="item-content">
          <zoehis-time-picker v-model="value2"></zoehis-time-picker>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-time-picker v-model=&quot;value2&quot;&gt;&lt;/zoehis-time-picker&gt;
            &lt;script&gt;
            data: function () {
              return {
                value2:new Date("2016-6-6")
              };
            },
            &lt;/script&gt;
          </code></pre></div>
          <div class="item-desc">
            (1)clearable 属性用于设置是否启动清空功能 默认为true
          </div>
        </div>
      </div>
      <div class="item">
        <h4>位置设置</h4>
        <div class="item-content">
          <zoehis-time-picker v-model="value3" :width="133" :picker-width="200" align="left"></zoehis-time-picker>
          <zoehis-time-picker v-model="value3" :width="133" :picker-width="200" align="center"></zoehis-time-picker>
          <zoehis-time-picker v-model="value3" :width="133" :picker-width="200" align="right"></zoehis-time-picker>
          <zoehis-time-picker v-model="value3" :width="133"></zoehis-time-picker>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-time-picker v-model=&quot;value2&quot;&gt;&lt;/zoehis-time-picker&gt;
            &lt;script&gt;
            data: function () {
              return {
                value3:new Date()
              };
            },
            &lt;/script&gt;
          </code></pre></div>
          <div class="item-desc">
            :width属性为设置输入框的width 默认为133<br>
            :picker-width属性为设置时间弹窗的width  默认为没有设置，没有设置的话大小就跟随输入框的大小<br>
            :align属性为设置位置对齐的方式 默认为left<br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>错误提示功能</h4>
        <div class="item-content">
          <zoehis-time-picker error-tip="这是错误的提示信息！" v-model="value3"></zoehis-time-picker>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-time-picker v-model=&quot;value3&quot; error-tip&quot;这是错误的提示信息&quot;&gt;&lt;/zoehis-time-picker&gt;
          </code></pre></div>
          <div class="item-desc">
            error-tip属性用于配置错误信息的提示语的，为空""时表示错误提示信息不显示 <br>
            注意：为空""是关键
          </div>
        </div>
      </div>
      <div class="item">
        <h4>设置时间、点击当前按钮事件来设置时间</h4>
        <div class="item-content">
          <zoehis-time-picker @click-now="handleClickEnter" ref="nowTime" v-model="value4"></zoehis-time-picker>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-time-picker
              @click-now=&quot;handleClickEnter&quot; ref=&quot;nowTime&quot; v-model=&quot;value4&quot;
            &gt;&lt;/zoehis-time-picker&gt;
            &lt;script&gt;
            handleClickEnter(){
              this.$refs.nowTime.setTime(new Date(&quot;2018-2-2 21:22:1&quot;));
            },
            &lt;/script&gt;
          </code></pre></div>
          <div class="item-desc">
            @click-now：当前按钮点击事件（用于设置当前服务器时间，结合setTime方法） <br>
            setTime(time): 用于设置时间控件的时间
          </div>
        </div>
      </div>
      <div class="item">
        <h4>属性</h4>
        <table width="100%">
          <thead>
          <tr>
            <th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认</th>
          </tr>
          </thead>
          <tbody>
          <tr><td>v-model="value"</td><td>time组件的值(必填),new Date("..."),用于设置初始值</td><td>Date/时间戳</td><td>-</td><td>-</td></tr>
          <tr><td>:standardtype="false"</td><td>用于返回v-model的值的格式的,true:代表返回国际化，false代表返回字符串</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>clearable</td><td> 属性用于设置是否启动清空功能 默认为true</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>showclose</td><td> 属性用于设置鼠标移上去是否优先显示XX</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>icon</td><td>配置输入框的图标</td><td>string</td><td>-</td><td>z_timeA_normal</td></tr>
          <tr><td>prevent-over-id</td><td>设置弹出框将要插入的容器（默认插入到body下），该值为ID，每个页面都是唯一的不能重复</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>:width</td><td>width属性为设置输入框的width 默认为133</td><td>number</td><td>true/false</td><td>true</td></tr>
          <tr><td>:picker-width</td><td>picker-width属性设置弹出窗的宽度，默认不进行设置，宽度跟随输入框的宽度</td><td>number</td><td>-</td><td>-</td></tr>
          <tr><td>:align</td><td>设置弹出窗的位置（左对齐、居中对齐、右对齐）</td><td>string</td><td>left/center/right</td><td>left</td></tr>
          <tr><td>format</td><td>格式化数据，默认是"HH:mm:ss"</td><td>string</td><td>-</td><td>"HH:mm:ss"</td></tr>
          <tr><td>error-tip</td><td>错误提示的内容,为""空时不显示</td><td>String</td><td>-</td><td>""</td></tr>
          <tr><td>readonly</td><td>设置输入框禁止手动输入</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>disabled</td><td>设置输入框不可编辑状态</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>popper-class</td><td>添加弹出窗的class</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>tab-inner</td><td>tab键是否进行时分秒切换(内部切换)</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>getTime()</td><td>getTime(isDisplay)获取组件的值</td><td>传入参数：1.boolean(true：返回的是格式化的值(不带年月的值)； false或不传：返回标准时间)</td><td>-</td><td>-</td></tr>
          <tr><td>setTime(time)</td><td>设置组件的值</td><td>传入参数：1.time(有两种格式：new Date()/时间戳)</td><td></td><td>-</td></tr>
          <tr><td>@click-now</td><td>点击当前按钮的事件</td><td>返回参数：无</td><td></td><td>-</td></tr>
          <tr><td>@tab</td><td>tab事件</td><td>返回参数：1.当前的值</td><td></td><td>-</td></tr>
          <tr><td>@enter</td><td>enter事件</td><td>返回参数：1.当前的值</td><td></td><td>-</td></tr>
          <tr><td>@inputnative</td><td>选中后关闭弹窗时若值有改变则触发这个事件（设置值的时候不会触发）</td><td>返回参数：1.当前选中的值（跟v-model的值对应）</td><td>-</td><td>-</td></tr>
          <tr><td>@show</td><td>显示时间弹窗时触发的事件</td><td>返回参数：1.当前选中的值（跟v-model的值对应）</td><td>-</td><td>-</td></tr>
          <tr><td>@hide</td><td>隐藏时间弹窗时触发的事件</td><td>返回参数：1.当前选中的值（跟v-model的值对应）</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data: function () {
      return {
        value1:new Date("2016-6-6 10:10:10"),
        value2:new Date("2016-6-6"),
        value3:new Date(),
        value4:new Date()
      };
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },
    methods: {
      handleClickEnter(){
        this.$refs.nowTime.setTime(new Date("2018-2-2 21:22:1"));
      },
      getPickerValue(){
        console.log('v-model=value1',this.value1);
        console.log('格式化后的值',this.$refs.picker1.getTime("HH:mm:ss"));
        console.log('国际化的值',this.$refs.picker1.getTime());
      },
      setPickerValue(){
        this.$refs.picker1.setTime(new Date("2016-6-6 10:10:10"));
      },
      tabEven(curVal){
        console.log("tab",curVal);
      }
    }
  }
</script>
