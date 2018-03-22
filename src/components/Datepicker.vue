<template>
  <div>
    <!--type判断是选择单日期还是范围日期，默认date单个，daterange范围-->
    <div class="component_example">
      <h1>Datepicker 日期选择器</h1>
      <h2>常用的操作</h2>

      <div class="item">
        <h4>选择单个日期</h4>
        <div class="item-content" v-keyfocus="keyfocusbox" :data-current="current">
          <zoehis-input placeholder="这是默认显示的" type="text" v-model="input1" ref="keyfocus0" @focus="current='keyfocus0'"></zoehis-input>
          <zoehis-date-picker
            type="date"
            v-model="getDate1"
            placeholder="选择日期"
            :disabled="false"
            ref="keyfocus1"
            @change="change1"
            @focus="current='keyfocus1'"></zoehis-date-picker>
          <zoehis-time-picker v-model="value1" :clearable="false" ref="keyfocus2" @focus="current='keyfocus2'" @inputnative="change1"></zoehis-time-picker>
          <zoehis-input placeholder="这是默认显示的" type="text" v-model="input1" ref="keyfocus3" @focus="current='keyfocus3'"></zoehis-input>
          <button @click="getDate1 = 1514739661000">asdadasd</button>
          <button @click="disabled = !disabled">设置禁用</button>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-date-picker type=&quot;date&quot; placeholder=&quot;你选个日期呗&quot;
            v-model=&quot;getDate1&quot; &gt;&lt;/zoehis-date-picker&gt;

            &lt;script&gt;
              export default{

                watch: {
                  getDate1(val){
                    console.log(val,&quot;选择的国际时间&quot;);
                  }
                }

              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            type="date"代表选择日期类型为单选日期，用v-model绑定变量，该变量表示所选日期的国际时间。<br><br>
            placeholder设置提示语。<br><br>
          </div>
        </div>
      </div>

      <div class="item">
        <h4>属性、快捷键、禁用的使用</h4>
        <div class="item-content">
          <div style="display: inline-block; margin-left: 200px;">
            <zoehis-date-picker hasTime type="date" v-model="getDate" placeholder="你选个日期呗" align="right" ref="reference7" hasTime @change="change2"></zoehis-date-picker>
            <button @click="getDate=1518109261000">2222</button>
            <zoehis-date-picker type="date" v-model="getDate5" disabled></zoehis-date-picker>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-date-picker type=&quot;date&quot; v-model=&quot;getDate&quot; placeholder=&quot;你选个日期呗&quot;
            align=&quot;right&quot; ref=&quot;reference&quot; disabled&gt;&lt;/zoehis-date-picker&gt;

            &lt;zoehis-date-picker type=&quot;date&quot; v-model=&quot;getDate&quot; disabled&gt;
            &lt;/zoehis-date-picker&gt;

            &lt;script&gt;
              export default{

                watch: {
                  getDate1(val){
                    var inputText = this.$refs.reference.$data.showInputDate
                    console.log(val,&quot;选择的国际时间&quot;,inputText);
                  }
                }

            }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            align属性可以设置下拉框跟input的对齐方式为right，默认是left。<br><br>
            如果想获取input中字符串日期，可像案例中在标签上添加属性ref，
            并利用this.$refs.reference.$data.showInputDate
            调用内部获取 <br><br>
            快捷键：点击input时，会判断点击点去默认选中年、月、日，此时可用上下键控制日期，也可以直接修改，
            输入完成按回车会判断输入是否正确，正确则触发修改日期 <br><br>
            禁用：添加disabled属性即可禁用，如案例中第二个zoehis-date-picker所示
          </div>
        </div>
      </div>

      <div class="item">
        <h4>范围日期</h4>
        <div class="item-content">
          <button @click="getDate2 = {startDate:1514739661000,endDate:1514739661000}">设置值</button>
          <zoehis-date-picker :disabled="false" type="daterange" v-model="getDate2" ref="reference3" @change="change2"></zoehis-date-picker>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-date-picker type=&quot;daterange&quot; v-model=&quot;getDate2&quot;
            &gt;&lt;/zoehis-date-picker&gt;

            &lt;script&gt;
              export default{
                data: (){
                  return {
                    getDate2: {
                      startDate: 1510369871000,
                      endDate: 1510369871000
                    }
                  }
                },
                watch: {
                  getDate2(val){
                    console.log(val,&quot;选择的国际时间&quot;);
                  }
                }

              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            type="daterange"代表选择日期类型为范围日期;<br><br>
            v-model所绑定变量代表所选范围时间，它是一个对象包含开始和结束日期，
            {startDate: "开始日期",endDate: "结束日期"}<br><br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>错误提示功能</h4>
        <div class="item-content">
          <zoehis-date-picker error-tip="这是错误的提示信息！" type="date" v-model="getDate5"></zoehis-date-picker>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-date-picker error-tip=&quot;这是错误的提示信息&quot; type=&quot;date&quot; v-model=&quot;getDate&quot; &gt;
            &lt;/zoehis-date-picker&gt;
          </code></pre></div>
          <div class="item-desc">
            error-tip属性用于配置错误信息的提示语的，为空""时表示错误提示信息不显示 <br>
            注意：为空""是关键
          </div>
        </div>
      </div>
      <div class="item">
        <h4>范围日期精确到时分秒</h4>
        <div class="item-content">
          <zoehis-date-picker now-btn-text="从前啊啊啊啊啊啊啊啊啊啊啊啊" now-btn @click-now="setActiveDate" type="datetime" v-model="getDate3" ref="reference4" @change="change3"></zoehis-date-picker>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-date-picker type=&quot;datetime&quot; v-model=&quot;getDate3&quot; &gt;&lt;/zoehis-date-picker&gt;

            &lt;script&gt;
              export default{

                watch: {
                  getDate3(val){
                    console.log(val,&quot;选择的国际时间&quot;);
                  }
                }

              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            type="datetime"代表选择日期类型为范围日期（精确到时分秒）;<br><br>
            v-model所绑定变量代表所选范围时间，它是一个对象包含开始和结束日期，
            {startDate: "开始日期",endDate: "结束日期"}
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
          <tr>
            <td>type</td>
            <td>必须，type属性有三个可选值，分别设置为不同的日期选择器</td>
            <td>string</td><td>"date","daterange","datetime"</td><td>"date"</td>
          </tr>
          <tr>
            <td>hasTime</td>
            <td>设置单选日期具有时分秒（仅有设置type=date时可用）</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>v-model</td>
            <td>
              绑定一个变量，该变量代表当前选中日期（初始绑定值为false时无默认选中日期），单日期时类型为Date；范围日期是对象{startDate,endDate},
              可直接修改该变量来修改选中日期（修改值只能是时间戳或Date）。
            </td>
            <td>Date/对象</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>配置input右边图标，icon="''"时表示不显示图标</td>
            <td>string</td><td>-</td><td>"z_time_normal"</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>配置input只读（仅单选日期组件可用）</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>启用点击X图标清空数据和增加下拉框底部清除按钮</td>
            <td>boolean</td><td>true/false</td><td>true</td>
          </tr>
          <tr>
            <td>:setGetDateType</td><td>设置v-model获取时间为国际时间或时间戳</td><td>number</td><td>1(Date)/2(时间戳)</td><td>1</td>
          </tr>
          <tr>
            <td>align</td><td>设置下拉框跟input对齐方式</td><td>string</td><td>"left","right"</td><td>"left"</td>
          </tr>
          <tr>
            <td>placeholder</td><td>设置input的提示语</td><td>string</td><td>-</td><td>-</td>
          </tr>
          <tr><td>prevent-over-id</td><td>设置弹出框将要插入的容器（默认插入到body下），该值为ID，每个页面都是唯一的不能重复</td><td>string</td><td>-</td><td>-</td></tr>
          <tr>
            <td>disabled</td><td>设置是否禁用时间选择控件</td><td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>width</td><td>设置input宽度</td><td>number</td><td>-</td><td>-</td>
          </tr>
          <!--<tr>-->
            <!--<td>:originDate</td><td>绑定一个对象设置默认选中日期，对象包含startDate开始、endDate结束日期的时间戳。（单选日期只要设startDate）</td>-->
            <!--<td>时间戳可以是字符串型数字</td><td>-</td><td>-</td>-->
          <!--</tr>-->
          <tr>
            <td>clickClearDate(true)</td><td>调用内部方法清空时间，要传入布尔值true</td>
            <td>function</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>initFunc()</td><td>this.$refs.reference.initFunc(a,b)修改时间，a是开始时间（单选日期只传a），b是结束时间；（支持数字或字符串时间戳，Date）
            不传参数则初始为当前时间</td>
            <td>function</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>onalign</td><td>设置范围日期选择日期方式，固定左边为起始日期右边为结束日期</td><td>boolean</td><td>true/false</td><td>true</td>
          </tr>
          <tr><td>error-tip</td><td>错误提示的内容,为""空时不显示</td><td>String</td><td>-</td><td>""</td></tr>
          <tr>
            <td>:beforeClick</td><td>点击确定前事件，函数中return false阻止选中</td>
            <td>function</td><td>返回参数：1新日期2旧日期（时间戳）</td><td>-</td>
          </tr>
          <tr>
            <td>@change</td><td>日期改变触发事件</td><td>function</td><td>返回值：单选日期返回选中日期国际时间；范围日期返回对象包含开始结束时间。</td><td>-</td>
          </tr>
          <tr>
            <td>@show</td><td>下拉框显示事件</td><td>function</td><td>返回值：无。</td><td>-</td>
          </tr>
          <tr>
            <td>@hide</td><td>下拉框隐藏事件</td><td>function</td><td>返回值：无。</td><td>-</td>
          </tr>
          <tr>
            <td>now-btn</td>
            <td>增加当前按钮(按钮text为"当前",可通过now-btn-text传入string配置按钮text)</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>@click-now</td><td>点击‘当前’按钮回调,在该函数使用setTime()方法设置时间,需传入参数Date或{startDate,endDate}</td><td>function</td><td>返回值：无。</td><td>-</td>
          </tr>
          </tbody>
        </table>
        <div style="clear: both"></div>
      </div>


    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    methods: {
      setActiveDate(){
          let newDate = {
            startDate: 1514739661000,
            endDate: 1519739661000
          };
          this.$refs.reference4.setTime(newDate);
      },
      change1(val){//单日期组件 的change
        console.log(this.getDate1,5555555)
      },

      change2(val){
        console.log(this.getDate2,"范围日期的change方法")
      },
      change3(val){
        console.log(this.getDate3,"3精确到时分秒组件的change方法")
      },
    },

    created: function () {
    },
    data: function () {
      return {
        current:"",//快捷键的初始值
        keyfocusbox:{//v-keyfocus的变量 是Object类型   （第一种写法，没有keyRefs属性）
          prefix:"keyfocus", //ref名称的前缀             第二种写法，有keyRefs属性而且length大于0，则用keyRefs的值
          total:9           //总的ref的数量
        },
        value1: new Date(),
        input1:"",
        select:"",
        selectdata:[{id:1,text:"lalal"},{id:2,text:"l222"}],

        getDate: "",
        getDate1: 1514739661000,
        getDate2: {startDate: false,endDate: false},//范围日期无默认事件
        getDate3: null,
        getDate5: null,

        disabled:false,
      }
    },

    mounted:function() { //用于高亮显示代码
      this.disabled = !this.disabled;
//      this.getDate2 = {
//        startDate: 1510369871000,
//        endDate: 1510369871000
//      }
//      this.$refs.reference3.clickClearDate(true);
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
//      this.getDate = 1518109261000;
    },

    watch: {
      getDate(val){
        console.log("属性、快捷键、禁用的使用的值变化事件",val)
      },
      getDate1(val){
//        console.log(val,"文档组件中watch，选中的单选日期");
      },
    }
  }
</script>
