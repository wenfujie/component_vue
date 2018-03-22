<template>
  <div>
    <div class="component_example">
      <h1>v-keyfocus 快捷键的使用</h1>
      <h2>常用的操作</h2>
      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content" v-keyfocus="keyfocusbox" :data-current="current">
          <zoehis-time-picker ref="keyfocus0" v-model="time2v" @focus="current='keyfocus0'"></zoehis-time-picker>
          <zoehis-button ref="keyfocus1" @focus="current='keyfocus1'">按钮</zoehis-button>
          <zoehis-checkbox v-model="checked" ref="keyfocus2" @focus="current='keyfocus2'">复选框</zoehis-checkbox>
          <zoehis-input v-model="input1" ref="keyfocus3" @focus="current='keyfocus3'" placeholder="单行文本框"></zoehis-input>
          <zoehis-input disabled type="textarea" v-model="textarea1" ref="keyfocus4" @focus="current='keyfocus4'" placeholder="多行文本框"></zoehis-input>
          <zoehis-select v-model="select1V" :selectdata="select1data" ref="keyfocus5" @focus="current='keyfocus5'"></zoehis-select>
          <zoehis-time-picker ref="keyfocus6" v-model="time1v" @focus="current='keyfocus6'"></zoehis-time-picker>
          <input type="text" @focus="current='keyfocus7'" ref="keyfocus7" placeholder="原始单行文本框">
          <textarea @focus="current='keyfocus8'" ref="keyfocus8" placeholder="原始多行文本框"></textarea>
        </div>
        <div class="item-detail">
      <div class="item-code"><pre><code>
        &lt;div class=&quot;item-content&quot; v-keyfocus=&quot;keyfocusbox&quot; :data-current=&quot;current&quot;&gt;
          &lt;zoehis-time-picker ref=&quot;keyfocus0&quot; v-model=&quot;time2v&quot; @focus=&quot;current=&#x27;keyfocus0&#x27;&quot;&gt;&lt;/zoehis-time-picker&gt;
          &lt;zoehis-button ref=&quot;keyfocus1&quot; @focus=&quot;current=&#x27;keyfocus1&#x27;&quot;&gt;按钮&lt;/zoehis-button&gt;
          &lt;zoehis-checkbox v-model=&quot;checked&quot; ref=&quot;keyfocus2&quot; @focus=&quot;current=&#x27;keyfocus2&#x27;&quot;&gt;复选框&lt;/zoehis-checkbox&gt;
          &lt;zoehis-input v-model=&quot;input1&quot; ref=&quot;keyfocus3&quot; @focus=&quot;current=&#x27;keyfocus3&#x27;&quot; placeholder=&quot;单行文本框&quot;&gt;&lt;/zoehis-input&gt;
          &lt;zoehis-input disabled type=&quot;textarea&quot; v-model=&quot;textarea1&quot; ref=&quot;keyfocus4&quot; @focus=&quot;current=&#x27;keyfocus4&#x27;&quot; placeholder=&quot;多行文本框&quot;&gt;&lt;/zoehis-input&gt;
          &lt;zoehis-select v-model=&quot;select1V&quot; :selectdata=&quot;select1data&quot; ref=&quot;keyfocus5&quot; @focus=&quot;current=&#x27;keyfocus5&#x27;&quot;&gt;&lt;/zoehis-select&gt;
          &lt;zoehis-time-picker ref=&quot;keyfocus6&quot; v-model=&quot;time1v&quot; @focus=&quot;current=&#x27;keyfocus6&#x27;&quot;&gt;&lt;/zoehis-time-picker&gt;
          &lt;input type=&quot;text&quot; @focus=&quot;current=&#x27;keyfocus7&#x27;&quot; ref=&quot;keyfocus7&quot; placeholder=&quot;原始单行文本框&quot;&gt;
          &lt;textarea @focus=&quot;current=&#x27;keyfocus8&#x27;&quot; ref=&quot;keyfocus8&quot; placeholder=&quot;原始多行文本框&quot;&gt;&lt;/textarea&gt;
        &lt;/div&gt;
        &lt;script&gt;
          data: function () {
            return {
              current:"",//快捷键的初始值
              keyfocusbox:{//v-keyfocus的变量 是Object类型   （第一种写法，没有keyRefs属性）
                prefix:"keyfocus", //ref名称的前缀             第二种写法，有keyRefs属性而且length大于0，则用keyRefs的值
                total:9           //总的ref的数量
              },
            }
          }
        &lt;/script&gt;
      </code></pre></div>
          <div class="item-desc">
            使用：在需要使用快捷键的容器里使用该自定义指令，如v-keyfocus； <br>
            在该容器里定义一个属性 :data-current（必须用的）用来设置当前焦点的位置； <br>
            v-keyfocus这是变量格式为 Object类型
            <pre><code>
              {
                keyRefs:[{
                  next:'selectRef1',
                  prev:'selectRef2',
                  ref:"selectRef"
                }],
                prefix: "keyfocus",
                total: 9
              }
            </code></pre>
            total: ref的总数 （若存在，则结合prefix自动生成 keyRefs；前提是在keyRefs属性不存在或者keyRefs.length==0的情况下） <br>
            prefix: 拼接ref名称的前缀 <br>
            keyRefs:[{ <br>
              next:'selectRef1', //next代表快捷键准备定位下一个组件ref名称；<br>
              prev:'selectRef2', //prev代表快捷键上一个组件ref名称；<br>
              ref:"selectRef" // ref代表各个组件的ref名称；<br>
            }] <br>
            注意：每个组件都要使用@focus来设置current的值；同时自定义指令keyfocus内部会去调用各个组件getDisabled()这个方法来获取当前组件是否可以聚焦，为不可编辑的话就跳到下一个
          </div>
        </div>
      </div>
      <div class="item">
        <h4>相应的事件</h4>
        <div class="item-content">
          <div style="border: 1px solid black; padding: 5px; margin-bottom: 10px;" v-keyfocus="keyfocusbox2" :data-current="current1"
               :before-next="onBeforeNext"
               :after-next="onAfterNext"
               :before-prev="onBeforePrev"
               :after-prev="onAfterPrev"
          >
            <h4>表一</h4>
            <zoehis-button ref="keyfocus10" @focus="current1='keyfocus10'">按钮</zoehis-button>
            <zoehis-input type="textarea" v-model="textarea11" ref="keyfocus11" @focus="current1='keyfocus11'" placeholder="跳到表二"></zoehis-input>
            <zoehis-select v-model="select1V" :selectdata="select1data" ref="keyfocus12" @focus="current1='keyfocus12'"></zoehis-select>
          </div>
          <div style="border:1px solid red; padding: 5px;">
            <h4>表二</h4>
            <zoehis-input v-model="input2v" ref="tb2Input"></zoehis-input>
          </div>
        </div>
        <div class="item-detail">
      <div class="item-code"><pre><code>
        &lt;div v-keyfocus=&quot;keyfocusbox2&quot; :data-current=&quot;current1&quot;
          :before-next=&quot;onBeforeNext&quot;
          :after-next=&quot;onAfterNext&quot;
          :before-prev=&quot;onBeforePrev&quot;
          :after-prev=&quot;onAfterPrev&quot;
        &gt;
          &lt;h4&gt;表一&lt;/h4&gt;
          &lt;zoehis-button ref=&quot;keyfocus10&quot; @focus=&quot;current1=&#x27;keyfocus10&#x27;&quot;&gt;按钮&lt;/zoehis-button&gt;
          &lt;zoehis-input type=&quot;textarea&quot; v-model=&quot;textarea11&quot; ref=&quot;keyfocus11&quot; @focus=&quot;current1=&#x27;keyfocus11&#x27;&quot; placeholder=&quot;跳到表二&quot;&gt;&lt;/zoehis-input&gt;
          &lt;zoehis-select v-model=&quot;select1V&quot; :selectdata=&quot;select1data&quot; ref=&quot;keyfocus12&quot; @focus=&quot;current1=&#x27;keyfocus12&#x27;&quot;&gt;&lt;/zoehis-select&gt;
        &lt;/div&gt;
        &lt;div style=&quot;border:1px solid red; padding: 5px;&quot;&gt;
          &lt;h4&gt;表二&lt;/h4&gt;
          &lt;zoehis-input v-model=&quot;input2v&quot; ref=&quot;tb2Input&quot;&gt;&lt;/zoehis-input&gt;
        &lt;/div&gt;
        &lt;script&gt;
          data: function () {
            return {
              current:-1,//快捷键的初始值
              keyfocusbox2:{
                keyRefs:[  //v-keyfocus的变量
                  {next:'keyfocus11',prev:'keyfocus12',ref:'keyfocus10'},
                  {next:'keyfocus12',prev:'keyfocus10',ref:'keyfocus11'},
                  {next:'keyfocus10',prev:'keyfocus11',ref:'keyfocus12'},
                ]
              }
            }
          }
          methods: {
            onBeforeNext(current){//current代表当前焦点的位置
              if(current=='keyfocus11'){
                this.$refs.tb2Input.focus();
                return false;
              }
            },
          }
        &lt;/script&gt;
      </code></pre></div>
          <div class="item-desc">
            如左边：与v-keyfocus同一节点上 绑了个事件 :before-next 表示快捷键定位之前的事件，主要用于自定义定位任何位置；
            :before-next: 快捷键顺向定位之前事件，有三个参数，第一个：current（还没有定位前的焦点的位置），第二即将定位时的组件vm ，第三.e<br>
            :after-next: 快捷键顺向定位后的回调事件，有两个参数，1.vm:  当前定位的组件的vm ，2.e<br>
            :before-prev: 快捷键逆向定位之前事件，有三个参数，第一个：current（还没有定位前的焦点的位置），第二即将定位时的组件vm，第三.e <br>
            :after-prev: 快捷键逆向定位后的回调事件，有两个参数，vm:  当前定位的组件的vm，第二.e <br>
            注意：before-next 与 before-prev 定位其他焦点的时候要return false
          </div>
        </div>
      </div>

      <div class="item">
        <h4>表格快捷键基本用法</h4>
        <div class="item-content">
          <table>
            <tbody v-gridkeyfocus="keyfocusbox3" :before-next="onBeforeNextGrid" data-prefix="table_" :data-current="current3">
              <tr v-for="(item,index) in tbData" :key="item.id">
                <td><zoehis-input v-model="item.text"  :ref="`table_${index}`" @focus="current3=`table_${index}[0]`;rowdata=item"></zoehis-input></td>
                <td><zoehis-input v-model="item.text2" :ref="`table_${index}`" @focus="current3=`table_${index}[1]`"></zoehis-input></td>
                <td><zoehis-select
                    itemcode="myId"
                    itemtext="myName"
                    v-model="item.myId"
                    :textvalue.sync="item.myName"
                    filterable
                    :selectdata="selectdatatb" :ref="`table_${index}`" @focus="current3=`table_${index}[2]`"></zoehis-select>
                </td>
                <td>
                  <zoehis-time-picker :ref="`table_${index}`" v-model="item.mytime" @focus="current3=`table_${index}[3]`"></zoehis-time-picker>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="btnClick('1')">删除一行</button>
          <button @click="btnClick('2')">添加一行</button>
          <button @click="btnClick('3')">插入一行</button>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;tbody v-gridkeyfocus=&quot;keyfocusbox3&quot; :before-next=&quot;onBeforeNextGrid&quot; data-prefix=&quot;table_&quot; :data-current=&quot;current3&quot;&gt;
      &lt;tr v-for=&quot;(item,index) in tbData&quot; :key=&quot;item.id&quot;&gt;
        &lt;td&gt;&lt;zoehis-input v-model=&quot;item.text&quot;  :ref=&quot;&#x60;table_${index}&#x60;&quot;
            @focus=&quot;current3=&#x60;table_${index}[0]&#x60;;rowdata=item&quot;&gt;&lt;/zoehis-input&gt;&lt;/td&gt;
        &lt;td&gt;&lt;zoehis-input v-model=&quot;item.text2&quot; :ref=&quot;&#x60;table_${index}&#x60;&quot;
            @focus=&quot;current3=&#x60;table_${index}[1]&#x60;&quot;&gt;&lt;/zoehis-input&gt;&lt;/td&gt;
        &lt;td&gt;&lt;zoehis-select
          itemcode=&quot;myId&quot;
          itemtext=&quot;myName&quot;
          v-model=&quot;item.myId&quot;
          :textvalue.sync=&quot;item.myName&quot;
          filterable
          :selectdata=&quot;selectdatatb&quot; :ref=&quot;&#x60;table_${index}&#x60;&quot; @focus=&quot;current3=&#x60;table_${index}[2]&#x60;&quot;&gt;&lt;/zoehis-select&gt;
        &lt;/td&gt;
        &lt;td&gt;&lt;zoehis-time-picker :ref=&quot;&#x60;table_${index}&#x60;&quot; v-model=&quot;item.mytime&quot;
              @focus=&quot;current3=&#x60;table_${index}[3]&#x60;&quot;&gt;&lt;/zoehis-time-picker&gt;
        &lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
    &lt;script&gt;
    data: function () {
      return {
        //表格参数
        tbData:[
          {id:1,text:"a1",text2:"a1",myId:1,mytime:new Date(),myName:"my1",disabled:false},
          {id:2,text:"a2",text2:"a2",myId:2,mytime:"2017.8.3",myName:"my2",disabled:true},
          {id:3,text:"a3",text2:"a3",myId:3,mytime:1505804859052,myName:"my3",disabled:false},
        ],
        keyfocusbox3: true,
      }
    }，
    //表格类的快捷键之前事件回调
    onBeforeNextGrid(curVm,theVm){
      if(curVm.colIndex===0){ //可以编辑的第一列 跳到 第三列
        this.$refs[curVm.rowRefName][2].focus();
        return false;
      }else if(theVm==null){//到达表格的最后一行的最后一列

      }
    },
    btnClick(parms){
      if(parms==="1"){
        this.tbData.splice(1,1);

      }else if(parms==="2"){
        this.tbData.push(
          {id:this.tbData.length+1,text:`a${this.tbData.length+1}`,text2:`a${this.tbData.length+1}`,
          myId:this.tbData.length+1,mytime:1505804859052,myName:`my${this.tbData.length+1}`,disabled:false}
          );
      }else if(parms ==3){
        this.tbData.splice(1,0, {id:this.tbData.length+1,text:`a${this.tbData.length+1}`,text2:`a${this.tbData.length+1}`,
        myId:this.tbData.length+1,mytime:1505804859052,myName:`my${this.tbData.length+1}`,disabled:false});
      }
      //非常重要，只有在快捷键有变化的时候才去改变，比如这边的添加一行相当于快捷键有变化了
      this.keyfocusbox3=!this.keyfocusbox3;
    },
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            必要参数： v-gridkeyfocus="keyFocusBox"  和 :data-current="current" 和 data-prefix="table_"
            可选参数： :data-rowdata='rowdata'
            //keyFocusBox格式 <br>
            keyFocusBox = true;  //true 或者false,主要是用于更新快捷键的数据（重要！只有快捷键顺序变了才去设置） <br>

            //current格式 <br>
            prefix + "_" + index + [colIndex] <br>
            如：@focus="current3=`table_${index}[colIndex]` <br>
            index:代表for循环中的索引，colIndex代表当前行的第几个可编辑的编号 <br>

            //data-prefix <br>
            代表快捷键的前缀，主要用在各个组件ref的命名上（一个表格一定要设置一个前缀）

            //:data-rowdata <br>
            假若需要在快捷键的回调事件里返回当前行的信息的话，则需要设置这个属性，然后再各个的组件的@focus里设置rowdata的值 <br>
            如： @focus='rowdata=item' <br>

            注意：每个组件都要使用@focus来设置current的值；同时自定义指令keyfocus内部会去调用各个组件getDisabled()这个方法来获取当前组件是否可以聚焦，为不可编辑的话就跳到下一个
          </div>
        </div>
      </div>

      <div class="item">
        <h4>除表格外的快捷键指令属性</h4>
        <table width="100%">
          <thead>
          <tr>
            <th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认</th>
          </tr>
          </thead>
          <tbody>
          <tr><td>v-keyfocus="keyFocusBox"</td><td>存放快捷键的相关的属性(必须的)</td><td>object</td><td>-</td><td>-</td></tr>
          <tr><td>total</td><td>keyFocusBox里面的属性，表示快捷键的总条数，用于自动生成快捷键ref的</td><td>number</td><td>-</td><td>-</td></tr>
          <tr><td>prefix</td><td>用于拼接ref名称时的前缀，默认为'keyRef_'</td><td>string</td><td>-</td><td>'keyRef'</td></tr>
          <tr><td>keyRefs</td><td>存放快捷键的各个组件的名称等属性(当keyRefs存在且keyRefs.length>0,则total跟prefix属性无无效)</td><td>array</td><td>-</td><td>'keyRef'</td></tr>
          <tr><td>:data-current</td><td>当前焦点的位置(必须的)</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>:before-next</td><td>顺向定位之前事件(注意：阻止默认，必须返回false)</td><td>function。返回参数：1.current代表还没有定位前的焦点的位置,2.vm代表即将定位的组件的vm；3.e</td><td>-</td><td>-</td></tr>
          <tr><td>:after-next</td><td>顺向定位之后事件</td><td>function。返回参数：1.vm代表即将定位的组件的vm；3.e</td><td>-</td><td>-</td></tr>
          <tr><td>:before-prev</td><td>逆向定位之前事件(注意：阻止默认必须返回false)</td><td>function.返回参数：1.current代表还没有定位前的焦点的位置；2.vm代表即将定位的组件的vm；3.e</td><td>-</td><td>-</td></tr>
          <tr><td>:after-prev</td><td>逆向定位之后事件</td><td>function。返回参数：1.vm代表即将定位的组件的vm；2.e</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
        <div style="clear: both"></div>
      </div>
      <div class="item">
        <h4>表格的快捷键属性（gridkeyfocus）</h4>
        <table width="100%">
          <thead>
          <tr>
            <th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认</th>
          </tr>
          </thead>
          <tbody>
          <tr><td>v-gridkeyfocus="updateGrid"</td><td>用于更新表格快捷键的（比如表格添加行后）</td><td>Boolean</td><td>true/false</td><td>-</td></tr>
          <tr><td>data-prefix</td><td>用于拼接ref名称时的前缀，默认为'keyRef_'（必填）</td><td>string</td><td>-</td><td>'keyRef_'</td></tr>
          <tr><td>:data-current</td><td>当前焦点的位置(必须的)</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>:before-next</td><td>顺向定位之前事件(注意：阻止默认，必须返回false)</td><td>function。返回参数：1.current代表还没有定位前的焦点的位置,2.vm代表即将定位的组件的vm；3.rowdata当前行数据（只有设置:data-rowdata属性才有效）；4.e</td><td>-</td><td>-</td></tr>
          <tr><td>:after-next</td><td>顺向定位之后事件</td><td>function。返回参数：1.vm代表即将定位的组件的vm；2.rowdata当前行数据（只有设置:data-rowdata属性才有效）；3.e</td><td>-</td><td>-</td></tr>
          <tr><td>:before-prev</td><td>逆向定位之前事件(注意：阻止默认必须返回false)</td><td>function.返回参数：1.current代表还没有定位前的焦点的位置；2.vm代表即将定位的组件的vm；3.rowdata当前行数据（只有设置:data-rowdata属性才有效）；4.e</td><td>-</td><td>-</td></tr>
          <tr><td>:after-prev</td><td>逆向定位之后事件</td><td>function。返回参数：1.vm代表即将定位的组件的vm；2.rowdata当前行数据（只有设置:data-rowdata属性才有效）；3.e</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default{
    name:'keyfocus1',
    data: function () {
      return {
        current:"",//快捷键的初始值
        keyfocusbox:{
          keyRefs:  //v-keyfocus的变量
            [
              {next:'keyfocus1',prev:'keyfocus18',ref:'keyfocus0'},
              {next:'keyfocus2',prev:'keyfocus0',ref:'keyfocus1'},
              {next:'keyfocus3',prev:'keyfocus1',ref:'keyfocus2'},// ref代表各个组件的ref名称；
              {next:'keyfocus4',prev:'keyfocus2',ref:'keyfocus3'},// next代表快捷键准备定位下一个组件的索引；
              {next:'keyfocus5',prev:'keyfocus3',ref:'keyfocus4'},//prev代表快捷键上一个索引；
              {next:'keyfocus6',prev:'keyfocus4',ref:'keyfocus5'},//next/prev属性没有设置的话 则按照数组的顺序来
              {next:'keyfocus7',prev:'keyfocus5',ref:'keyfocus6'},
              {next:'keyfocus8',prev:'keyfocus6',ref:'keyfocus7'},
              {next:'keyfocus110',prev:'keyfocus7',ref:'keyfocus8'}
            ],
          prefix:"keyfocus",
          total:9
        },
        keyfocusbox2:{
          keyRefs:  //v-keyfocus的变量
            [
              {next:'keyfocus11',prev:'keyfocus12',ref:'keyfocus10'},
              {next:'keyfocus12',prev:'keyfocus10',ref:'keyfocus11'},
              {next:'keyfocus10',prev:'keyfocus11',ref:'keyfocus12'},
            ]
        },
        current1:-1,//快捷键的初始值
        test1:"1",
        checked:true,
        input1:"",
        input2v:"",
        textarea1:"这个是不可编辑的",
        textarea11:"",
        time1v:"",
        time2v:new Date(),
        select1V:1,
        select1data:[
          {id:1,text:"龙虾"},
          {id:2,text:"大龙虾"},
          {id:3,text:"螃蟹"}
        ],

        //表格参数
        tbData:[
          {id:1,text:"a1",text2:"a1",myId:1,mytime:new Date(),myName:"my1",disabled:false},
          {id:2,text:"a2",text2:"a2",myId:2,mytime:"2017.8.3",myName:"my2",disabled:true},
          {id:3,text:"a3",text2:"a3",myId:3,mytime:1505804859052,myName:"my3",disabled:false},
        ],
        keyfocusbox3:true,
        selectdatatb:[
          {myId:1,myName:"my1"},
          {myId:2,myName:"my2"},
          {myId:3,myName:"my3"},
          {myId:4,myName:"my3"},
          {myId:5,myName:"my3"},
          {myId:6,myName:"my3"},
          {myId:7,myName:"my3"},
        ],
        current3:"",
        rowdata:"",
      };
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },
    methods: {

      btnClick(parms){
        if(parms==="1"){
          this.tbData.splice(1,1);

        }else if(parms==="2"){
          this.tbData.push(
            {id:this.tbData.length+1,text:`a${this.tbData.length+1}`,text2:`a${this.tbData.length+1}`,
            myId:this.tbData.length+1,mytime:1505804859052,myName:`my${this.tbData.length+1}`,disabled:false}
          );
        }else if(parms ==3){
          this.tbData.splice(1,0, {id:this.tbData.length+1,text:`a${this.tbData.length+1}`,text2:`a${this.tbData.length+1}`,
            myId:this.tbData.length+1,mytime:1505804859052,myName:`my${this.tbData.length+1}`,disabled:false});
        }
        this.keyfocusbox3=!this.keyfocusbox3;
      },
      onBeforeNext(current,vm){//current代表当前焦点的位置
        console.log('顺向之前的回调事件',current,vm)
        if(current=='keyfocus11'){
          this.$refs.tb2Input.focus();
          return false;
        }
      },
      onAfterNext(vm){//current代表当前焦点的位置
        console.log('顺向之后的回调事件',vm)
      },
      onBeforePrev(current,vm){//current代表当前焦点的位置
        console.log('逆向之前的回调事件',current,vm)
      },
      onAfterPrev(vm){//current代表当前焦点的位置
        console.log('逆向之后的回调事件',vm)
      },


      //表格类的快捷键之前事件回调
      onBeforeNextGrid(curVm,theVm,rowdata){
        if(curVm.colIndex===0){ //可以编辑的第一列 跳到 第三列
          this.$refs[curVm.rowRefName][2].focus();
          return false;
        }else if(theVm==null){//到达表格的最后一行的最后一列

        }
      }
    }
  }
</script>
