<template>
  <div>
    <div class="component_example">
      <h1>Select 选择框</h1>
      <h2>常用的操作</h2>
      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-select v-model="value1" :selectdata="selectdata"></zoehis-select>
          <zoehis-select v-model="value2" :selectdata="selectdata"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;zoehis-select v-model=&quot;value1&quot; :selectdata=&quot;selectdata&quot;&gt;&lt;/zoehis-select&gt;
    &lt;zoehis-select v-model=&quot;value2&quot; :selectdata=&quot;selectdata&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    export default{
      data: function () {
        return {
          value1: &quot;&quot;,
          value2: 2,//这个设置了初始值
          selectdata: [
          {id: 1, text: &quot;龙虾&quot;},
          {id: 2, text: &quot;大龙虾&quot;},
          {id: 3, text: &quot;螃蟹&quot;}
          ]
        }
      }
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            v-model的值为当前被选中的值，可以通过v-model设置值的初始化 <br>
            selectdata 为select选择框的下拉数据
          </div>
        </div>
      </div>
      <div class="item">
        <h4>初始值</h4>
        <div class="item-content">
          <zoehis-select v-model="valueNone1" :textvalue.sync="textNone1" :selectdata="dataNone1" width="300"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;zoehis-select v-model=&quot;valueNone1&quot; :textvalue.sync=&quot;textNone1&quot; :selectdata=&quot;dataNone1&quot; width=&quot;300&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    export default{
      data: function () {
        return {
          valueNone1:1,
          textNone1:"这是初始值(下拉数据还没有加载)",
          dataNone1:[],
        }
      }
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            使用v-model  和  :textvalue.sync属性设置初始值
          </div>
        </div>
      </div>
      <div class="item">
        <h4>禁用状态</h4>
        <div class="item-content">
          <zoehis-select v-model="value1" disabled :selectdata="selectdata"></zoehis-select>
          <zoehis-select v-model="value2" disabled :selectdata="selectdata"></zoehis-select>
        </div>
        <div class="item-detail">
          <div class="item-code"><pre><code>
            &lt;zoehis-select v-model=&quot;value1&quot; disabled :selectdata=&quot;selectdata&quot;&gt;&lt;/zoehis-select&gt;
            &lt;zoehis-select v-model=&quot;value2&quot; disabled :selectdata=&quot;selectdata&quot;&gt;&lt;/zoehis-select&gt;
            &lt;script&gt;
          </code></pre></div>
          <div class="item-desc">
            沿用上一个例子，加了个disabled的属性
            disabled 用来设置select选择框是否可以用 <br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>自定义显示内容</h4>
        <div class="item-content">
          <span>自定义选项的显示内容</span>
          <zoehis-select v-model="value3" :selectdata="selectdata" :render-item="renderitem"></zoehis-select><br>
          <span>自定义输入框的显示内容</span>
          <zoehis-select v-model="value4" :width="250" :selectdata="selectdata1" :render-show-data="rendershowdata"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;span&gt;自定义选项的显示内容&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value3&quot; :selectdata=&quot;selectdata&quot; :render-item=&quot;renderitem&quot;&gt;&lt;/zoehis-select&gt;&lt;br&gt;
    &lt;span&gt;自定义输入框的显示内容&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value4&quot; :width=&quot;250&quot; :selectdata=&quot;selectdata1&quot; :render-show-data=&quot;rendershowdata&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    methods: {
      renderitem:function(item){ //下拉选项自定义显示内容
        return &#x27;&lt;span style=&quot;color: red;&quot;&gt;&#x27;+item.id+&#x27;&lt;/span&gt;&#x27; + item.text;
      },
      rendershowdata:function(item){ //输入框自定义显示的内容
        return "这是输入框显示的内容："+ item.text;
      }
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            render-item:function(item){return(*)}用来自定义下拉选项的显示内容,参数item是每条的数据 <br>
            render-show-data:function(item){return(*)}用来自定义输入框的显示内容,参数item是选中的这条数据 <br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>前端模糊查询（不经过调后端api的模糊匹配，核心在于 在html上显示/隐藏对应下拉的值，而selectdata属性的值一直保持不变）</h4>
        <div class="item-content">
          <span>1.(默认匹配名称、代码、拼音码、五笔码：前提是selectdata里有这几个字段)</span>
          <zoehis-select v-model="valueQ5" filterable :selectdata="selectdata2"></zoehis-select>
          <br>
          <span>2.自己设置要过滤的字段</span>
          <zoehis-select
            v-model="valueQ6" filterable :selectdata="selectdata2" :filter-field="['text']"
          ></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;zoehis-select v-model=&quot;valueQ5&quot; filterable :selectdata=&quot;selectdata2&quot;&gt;&lt;/zoehis-select&gt;
    &lt;zoehis-select v-model=&quot;valueQ6&quot; filterable :selectdata=&quot;selectdata2&quot; :filter-field=&quot;[&#x27;text&#x27;]&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    data(){
      return {
        selectdata2:[
        {id:'11',text:"工伤",spellCode:"GS",wbzxCode:"QW"},
        {id:'22',text:"工伤康复",spellCode:"GSKF",wbzxCode:"QWAF"},
        {id:'33',text:"合约新农合",spellCode:"HYXNH",wbzxCode:"HEXD"},
        {id:'44',text:"居民医保慢性病",spellCode:"JMYBMXB",wbzxCode:"UKS"},
        {id:'55',text:"新农合自费",spellCode:"XNHZF",wbzxCode:"OPG"},
        {id:'112',text:"中站区慢病",spellCode:"ZZQMB",wbzxCode:"LGY"},
        {id:'113',text:"解放区慢病",spellCode:"JFQMB",wbzxCode:"URC"},
        {id:'114',text:"博爱居民",spellCode:"BAJM",wbzxCode:"KKK"},
        {id:'115',text:"小扇贝",spellCode:"XSB",wbzxCode:"PPP"}
        ],
      }
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            filter-field：该属性主要用于设置需要匹配的字段，默认：名称、代码、拼音码、五笔码这四个字段<br>
            注意：1.此处是前端去匹配，只需要第一次 调用后端api去设置selectdata属性的值，之后会对selectdata这个数组做匹配操作（selectdata的值不变）<br>
            2.前端模糊查询不适用于分页的情况，需要分页的下拉框要使用filter-method属性
          </div>
        </div>
      </div>
      <div class="item">
        <h4>后端模糊查询（主要应用于分页，核心在于一直在设置selectdata属性的值）</h4>
        <div class="item-content">
          <span>没有延时的查询</span>
          <zoehis-select v-model="value6" ref="select6" filterable :filter-method="filtermethod1" :render-item="renderitem" :selectdata="selectdata3"></zoehis-select>
          <br>
          <span>有延时的查询</span>
          <zoehis-select v-model="value7" remote filterable :filter-method="filtermethod2" :selectdata="selectdata4"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;span&gt;没有延时的查询&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value6&quot; filterable :filter-method=&quot;filtermethod1&quot; :render-item=&quot;renderitem&quot; :selectdata=&quot;selectdata3&quot;&gt;&lt;/zoehis-select&gt;
    &lt;br&gt;
    &lt;span&gt;有延时的查询&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value7&quot; remote filterable :filter-method=&quot;filtermethod2&quot; :selectdata=&quot;selectdata4&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    methods: {
      renderitem:function(item){ //下拉选项自定义显示内容
        return &#x27;&lt;span style=&quot;color: red;&quot;&gt;&#x27;+item.id+&#x27;&lt;/span&gt;&#x27; + item.text;
      },
      filtermethod: function (query) {
        var thi=this;
      //此处 selectdata3的值一直在改变
        thi.selectdata3 = thi.selectdata2.filter(item => {
          return (item.id.toLowerCase()
            .indexOf(query.toLowerCase()) > -1 || query=="");
        });
      },
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            filterable：用于启用搜索功能，默认是跟select组件的itemtext属性值进行匹配<br>
            filter-method：用于其他的自定义匹配逻辑（在filter-method方法里对 selectdata的值做改变）<br>
            remote：用于是否延时搜索，主要用于要调用API的情况，解决太平凡调用API的问题；默认是200ms调用一次，可以用delaytiem配置<br>
            注意：因为ajax那边有做了noRepeatId属性的设置  所有这边remote就都不要去设置了
          </div>
        </div>
      </div>
      <div class="item">
        <h4>分页功能</h4>
        <div class="item-content">
          <span>有搜索功能</span>
          <zoehis-select v-model="value8" @scroll-to-bottom="scrolltobottom1" filterable :selectdata="selectdata6"></zoehis-select>
          <br>
          <span>没有搜索功能</span>
          <zoehis-select v-model="value9" @scroll-to-bottom="scrolltobottom2" @scroll-to-top="scrolltotop" @visible-change="visibleChange" :selectdata="selectdata7"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;span&gt;有搜索功能&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value6&quot; @scroll-to-bottom=&quot;scrolltobottom1&quot; filterable :selectdata=&quot;selectdata3&quot;&gt;&lt;/zoehis-select&gt;
    &lt;br&gt;
    &lt;span&gt;没有搜索功能&lt;/span&gt;
    &lt;zoehis-select v-model=&quot;value9&quot; @scroll-to-bottom=&quot;scrolltobottom2&quot; @scroll-to-top=&quot;scrolltotop&quot; @visible-change=&quot;visibleChange&quot; :selectdata=&quot;selectdata7&quot;&gt;&lt;/zoehis-select&gt;
    &lt;script&gt;
    methods: {
      visibleChange(show,vmObj){
        this.$nextTick(() => vmObj.scrollMove(10));
      },
      scrolltotop(query){
        console.log('滚动到顶啦！')
      },
      scrolltobottom1:function(val){
        var temp={id:'99',text:"a"};
        temp.id=(this.kk)+temp.id;
        temp.text=(this.kk++)+temp.text;
        this.selectdata3.push(temp)
      },
      scrolltobottom2:function(val){
        var temp={id:'99',text:"a"};
        temp.id=(this.kk)+temp.id;
        temp.text=(this.kk++)+temp.text;
        this.selectdata4.push(temp)
      }
    }
    &lt;/script&gt;
  </code></pre></div>
          <div class="item-desc">
            @scroll-to-bottom：用于启用分页功能，滚动条到底后会触发的事件<br>
            @scroll-to-top：用于启用分页功能，滚动条到顶后会触发的事件<br>
            @visible-change: 窗体显示影藏事件 <br>
            scrollMove(num): 滚动条设置位置方法 <br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>错误提示功能</h4>
        <div class="item-content">
          <zoehis-select v-model="value8" error-tip="这是错误的内容" filterable :selectdata="selectdata6"></zoehis-select>
        </div>
        <div class="item-detail">
  <div class="item-code"><pre><code>
    &lt;zoehis-select v-model=&quot;value8&quot; error-tip=&quot;这是错误的内容&quot; filterable :selectdata=&quot;selectdata3&quot;&gt;&lt;/zoehis-select&gt;
  </code></pre></div>
          <div class="item-desc">
            error-tip属性用于配置错误信息的提示语的，为空""时表示错误提示信息不显示 <br>
            注意：为空""是关键
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
          <tr><td>v-model="value"</td><td>下拉框的code值(必填)</td><td>string/number</td><td>-</td><td>-</td></tr>
          <tr><td>selectdata</td><td>select组件的所有数据(必填)</td><td>array</td><td>-</td><td>[]</td></tr>
          <tr><td>:textvalue.sync="textvalue"</td><td>下拉框的text值(非必填)</td><td>string/number</td><td>-</td><td>-</td></tr>
          <tr><td>placeholder</td><td>默认显示的提示文字</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>filterable</td><td>是否可以搜索</td><td>boolean</td><td>false/true</td><td>false</td></tr>
          <tr><td>filter-field</td><td>前端需要匹配的字段（filter-method属性没有设置才会生效）</td><td>array</td><td>-</td><td>[名称，代码，拼音码，五笔码]</td></tr>
          <tr><td>disabled</td><td>是否可以编辑</td><td>boolean</td><td>false/true</td><td>false</td></tr>
          <tr><td>no-match-text</td><td>匹配无结果时显示的文字</td><td>string</td><td>-</td><td>查无数据</td></tr>
          <tr><td>prevent-over-id</td><td>设置弹出框将要插入的容器（默认插入到body下），该值为ID，每个页面都是唯一的不能重复</td><td>string</td><td>-</td><td>-</td></tr>
          <tr><td>width</td><td>select组件的宽度,支持百分百（强烈建议使用百分比时 :append-to-body属性采用默认值）</td><td>string/number</td><td>比如：100 或者 20%</td><td>115</td></tr>
          <tr><td>dropdown-width</td><td>下拉框的宽度，注意：这个优先级最高，一旦设置了就以这个为准，建议不要设置</td><td>string/number</td><td>比如：100 或者 20%</td><td>-</td></tr>
          <tr><td>clearable</td><td>是否启用清空功能</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>defaultfirst</td><td>是否默认选中第一行</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>num-string</td><td>是否支持数字定位</td><td>string。有配置的话代表支持，并且通过这个字段去匹配</td><td>-</td><td>-</td></tr>
          <tr><td>itemcode</td><td>下拉选项的ID名称</td><td>string</td><td>-</td><td>id</td></tr>
          <tr><td>itemtext</td><td>下拉选项的Text名称</td><td>string</td><td>-</td><td>text</td></tr>
          <tr><td>itemkey</td><td>下拉选项的:key值，vue的:key属性，默认设置为itemcode的值(一般不需要自己设置)</td><td>string</td><td>-</td><td>itemcode的值</td></tr>
          <tr><td>error-tip</td><td>错误提示的内容,为""空时不显示</td><td>String</td><td>-</td><td>""</td></tr>
          <tr><td>no-clear-blur</td><td>焦点离开后是否不清空输入的数据</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>outclear</td><td>hoverIndex在其他地方时是不是要清空数据</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>remote</td><td>是否延时搜索（建议为false）</td><td>boolean</td><td>false/true</td><td>false</td></tr>
          <tr><td>filter-row-data</td><td>过滤前端的数据（selectdata属性的值不变）</td><td>function。返回参数：1.query:当前输入框的内容；2.item为当前行的数据。 return true的会显示，否则隐藏该条数据</td><td>-</td><td>-</td></tr>
          <tr><td>render-show-data</td><td>自定义输入框的显示内容，function(item){}</td><td>function。返回参数：1.item为当前选中的数据</td><td>-</td><td>-</td></tr>
          <tr><td>render-item</td><td>自定义下拉选项的显示内容，function(item){}</td><td>function。返回参数：1.item为当前选项的数据</td><td>-</td><td>-</td></tr>
          <tr><td>delay-time</td><td>延时搜索的事件，单位为ms</td><td>string/number</td><td>-</td><td>200</td></tr>
          <tr><td>getText()方法</td><td>获取下拉框的文本</td><td>无传入参数</td><td>-</td><td>-</td></tr>
          <tr><td>getSelected()方法</td><td>获取下拉框选中的数据</td><td>无传入参数</td><td>-</td><td>-</td></tr>
          <tr><td>scrollMove()方法</td><td>定位滚动条的位置</td><td>传入参数：1.{top:Number,left:Number}</td><td>-</td><td>-</td></tr>
          <tr><td>filter-method</td><td>自定义过滤方法（主要用于分页）</td><td>function。返回参数：1.query(当前要过滤的值)</td><td>-</td><td>-</td></tr>
          <tr><td>before-select</td><td>选中前事件 若返回false 则阻止选中</td><td>function。返回参数：1.当前v-model的值;2.当前选中行的值（rowdata 或者 null）</td><td>-</td><td>-</td></tr>
          <tr><td>@scroll-to-top</td><td>滚动条 快要 滚到顶触发的事件（主要用于分页）</td><td>返回参数：1.当前过滤的数据query；2.当前下拉框的vm对象</td><td>-</td><td>-</td></tr>
          <tr><td>@scroll-to-bottom</td><td>滚动条 快要 滚到底触发的事件（主要用于分页）</td><td>返回参数：1.当前过滤的数据query；2.当前下拉框的vm对象</td><td>-</td><td>-</td></tr>
          <tr><td>@scroll-after</td><td>滚动条滚动事件</td><td>返回参数：1.当前过滤的数据query；2.当前下拉框的vm对象</td><td>-</td><td>-</td></tr>
          <tr><td>@change</td><td>监听值改变事件</td><td>返回参数：1.当前v-model的值；2.当前选中行的值（rowdata 或者 null）</td><td>-</td><td>-</td></tr>
          <tr><td>@selected</td><td>选中事件（无论值是否改变都会触发）</td><td>返回参数：1.当前v-model的值;2.当前选中行的值（rowdata 或者 null）</td><td>-</td><td>-</td></tr>
          <tr><td>@visible-change</td><td>下拉框显示/隐藏的事件</td><td>返回参数1：显示隐藏表示；参数2:自身的vm对象</td><td>-</td><td>-</td></tr>
          <tr><td>@clickicon</td><td>点击图标事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
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
        valueNone1:1,
        textNone1:"这是初始值(下拉数据还没有加载)",
        dataNone1:[],
        value1:"",
        value2:2,
        value3:3,
        value4:1,
        value5:"",
        value6:"",
        value7:"",
        value8:"",
        value9:"",
        selectdata:[
          {id:1,text:"龙虾"},
          {id:2,text:"大龙虾"},
          {id:3,text:"螃蟹"}
        ],
        selectdata1:[
          {id:1,text:"龙虾"},
          {id:2,text:"大龙虾"},
          {id:3,text:"螃蟹"}
        ],
        valueQ5:"",
        valueQ6:"",
        selectdata2:[
          {id:'11',text:"工伤",spellCode:"GS",wbzxCode:"QW"},
          {id:'22',text:"工伤康复",spellCode:"GSKF",wbzxCode:"QWAF"},
          {id:'33',text:"合约新农合",spellCode:"HYXNH",wbzxCode:"HEXD"},
          {id:'44',text:"居民医保慢性病",spellCode:"JMYBMXB",wbzxCode:"UKS"},
          {id:'55',text:"新农合自费",spellCode:"XNHZF",wbzxCode:"OPG"},
          {id:'112',text:"中站区慢病",spellCode:"ZZQMB",wbzxCode:"LGY"},
          {id:'113',text:"解放区慢病",spellCode:"JFQMB",wbzxCode:"URC"},
          {id:'114',text:"博爱居民",spellCode:"BAJM",wbzxCode:"KKK"},
          {id:'115',text:"小扇贝",spellCode:"XSB",wbzxCode:"PPP"}
        ],

        selectdata3:[
          {id:'11',text:"龙虾"},
          {id:'22',text:"大龙虾"},
          {id:'33',text:"螃蟹"},
          {id:'44',text:"小螃蟹"},
          {id:'55',text:"大螃蟹"},
          {id:'112',text:"大小龙虾"},
          {id:'113',text:"大大龙虾"},
          {id:'114',text:"扇贝"},
          {id:'115',text:"小扇贝"}
        ],
        selectdata4:[
          {id:'11',text:"龙虾"},
          {id:'22',text:"大龙虾"},
          {id:'33',text:"螃蟹"},
          {id:'44',text:"小螃蟹"},
          {id:'55',text:"大螃蟹"},
          {id:'112',text:"大小龙虾"},
          {id:'113',text:"大大龙虾"},
          {id:'114',text:"扇贝"},
          {id:'115',text:"小扇贝"}
        ],
        selectdata5:[
          {id:'11',text:"龙虾"},
          {id:'22',text:"大龙虾"},
          {id:'33',text:"螃蟹"},
          {id:'44',text:"小螃蟹"},
          {id:'55',text:"大螃蟹"},
          {id:'112',text:"大小龙虾"},
          {id:'113',text:"大大龙虾"},
          {id:'114',text:"扇贝"},
          {id:'115',text:"小扇贝"}
        ],
        selectdata6:[
          {id:'11',text:"龙虾"},
          {id:'22',text:"大龙虾"},
          {id:'33',text:"螃蟹"},
          {id:'44',text:"小螃蟹"},
          {id:'55',text:"大螃蟹"},
          {id:'112',text:"大小龙虾"},
          {id:'113',text:"大大龙虾"},
          {id:'114',text:"扇贝"},
          {id:'115',text:"小扇贝"}
        ],
        selectdata7:[
          {id:'11',text:"龙虾"},
          {id:'22',text:"大龙虾"},
          {id:'33',text:"螃蟹"},
          {id:'44',text:"小螃蟹"},
          {id:'55',text:"大螃蟹"},
          {id:'112',text:"大小龙虾"},
          {id:'113',text:"大大龙虾"},
          {id:'114',text:"扇贝"},
          {id:'115',text:"小扇贝"}
        ],
        kk:1,
        width1:200
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },
    methods: {
      visibleChange(show,vmObj){
        this.$nextTick(() => vmObj.scrollMove(10));
      },
      scrolltotop(query){
        console.log('滚动到顶啦！')
      },
      filtermethod1: function (query) {
        var thi=this;
        thi.selectdata3 = thi.selectdata2.filter(item => {
          return (item.id.toLowerCase()
            .indexOf(query.toLowerCase()) > -1 || query=="");
        });
      },
      filtermethod2: function (query) {
        var thi=this;
        thi.selectdata4 = thi.selectdata2.filter(item => {
          return (item.id.toLowerCase()
            .indexOf(query.toLowerCase()) > -1 || query=="");
        });
      },
      renderitem:function(item){
        return '<span style="color: red;">'+item.id+'</span>' + item.text;
      },
      rendershowdata:function(item){
        return "这是输入框显示的内容："+ item.text;
      },
      scrolltobottom1:function(val){
        var temp={id:'99',text:"a"};
        temp.id=(this.kk)+temp.id;
        temp.text=(this.kk++)+temp.text;
        this.selectdata6.push(temp)

      },
      scrolltobottom2:function(val){
        var temp={id:'99',text:"a"};
        temp.id=(this.kk)+temp.id;
        temp.text=(this.kk++)+temp.text;
        this.selectdata7.push(temp)
      }
    }
  }
</script>
