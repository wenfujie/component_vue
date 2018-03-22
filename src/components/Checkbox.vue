<template>
  <div class="component_example">
    <h1>Checkbox 按钮</h1>
    <h2>常用的按钮操作</h2>
    <div class="item">
      <h4>基本用法</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked">小龙虾</zoehis-checkbox><zoehis-checkbox ref="input2" v-model="checked1" checked>大龙虾</zoehis-checkbox>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
          &lt;zoehis-checkbox v-model=&quot;checked&quot;&gt;小龙虾&lt;/zoehis-checkbox&gt;
          &lt;zoehis-checkbox v-model=&quot;checked1&quot; checked&gt;大龙虾&lt;/zoehis-checkbox&gt;
          &lt;script&gt;
          data () {
            return {
              checked:true,//true代表选中 false代表不选中
              checked1:false
            }
          }
          &lt;/script&gt;
        </code></pre></div>
        <div class="item-desc">
          v-model="checked";用v-model去设置初始值，变量checked在data那边设置初始化的值 <br>
          你也可以直接添加 checked属性来初始化值
        </div>
      </div>
    </div>
    <div class="item">
      <h4>不可点击状态</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked2" disabled>小龙虾</zoehis-checkbox><zoehis-checkbox v-model="checked3" disabled>大龙虾</zoehis-checkbox>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox v-model=&quot;checked2&quot; disabled&gt;小龙虾&lt;/zoehis-checkbox&gt;
            &lt;zoehis-checkbox v-model=&quot;checked3&quot; disabled&gt;大龙虾&lt;/zoehis-checkbox&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          用disabled来设置复选框的
        </div>
      </div>
    </div>
    <div class="item">
      <h4>设置焦点的方法</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked4" ref="input3">小龙虾</zoehis-checkbox><zoehis-button @clickenter="setFocus">设置焦点</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox v-model=&quot;checked4&quot; ref=&quot;input3&quot;&gt;小龙虾&lt;/zoehis-checkbox&gt;
            &lt;zoehis-button @clickenter=&quot;setFocus&quot;&gt;设置焦点&lt;/zoehis-button&gt;
          </code></pre>
          <pre><code>
             methods:{
               setFocus(val){//设置焦点
                this.$refs.input3.focus();
               }
             }
          </code></pre>
        </div>
        <div class="item-desc">
          调用子组件的focus方法来给子组件加焦点状态
          this.$refs.input3.focus();
        </div>
      </div>
    </div>
    <div class="item">
      <h4>按钮的显示的内容</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked5" label="只是用label属性"></zoehis-checkbox>
        <zoehis-checkbox v-model="checked6">这是直接写在按钮元素的中间</zoehis-checkbox>
        <zoehis-checkbox v-model="checked7" label="这是label">这是包含在中间的</zoehis-checkbox>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox v-model=&quot;checked5&quot; label=&quot;只是用label属性&quot;&gt;&lt;/zoehis-checkbox&gt;
            &lt;zoehis-checkbox v-model=&quot;checked6&quot;&gt;这是直接写在按钮元素的中间&lt;/zoehis-checkbox&gt;
            &lt;zoehis-checkbox v-model=&quot;checked7&quot; label=&quot;这是label&quot;&gt;这是包含在中间的&lt;/zoehis-checkbox&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          1.label属性是用来显示文字的；<br>
          2.也可以直接包含在zoehis-checkbox里 <br>
          3.两个同时存在时，第二种优先级比较高
        </div>
      </div>
    </div>
    <div class="item">
      <h4>按钮的事件</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked5" @change="myInput">选项D</zoehis-checkbox>
        <br>
        <zoehis-input ref="textInput"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox v-model=&quot;checked5&quot; @change=&quot;myInput&quot;&gt;选项D&lt;/zoehis-checkbox&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          1.主要有change事件 <br>
          2.按钮组也一样，主要有change事件
        </div>
      </div>
    </div>
    <div class="item">
      <h4>自定义true/false的值</h4>
      <div class="item-content">
        <zoehis-checkbox v-model="checked8" trueflag="0" falseflag="1">0为选中 1为不选中</zoehis-checkbox>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox v-model=&quot;checked8&quot; trueflag=&quot;0&quot; falseflag=&quot;1&quot; &gt;0为选中 1为不选中&lt;/zoehis-checkbox&gt;
          </code></pre>
          <pre><code>
            data:{
              return{
                checked8:"0"
              }
            }
          </code></pre>
        </div>
        <div class="item-desc">
          trueflag用于定义true代表的值，(可选类型为 Boolean/String/Number)<br>
          flaseflag用于定义false代表的值，(可选类型为 Boolean/String/Number)<br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>按钮组</h4>
      <div class="item-content">
        <zoehis-checkbox-group v-model="checkboxList" @change="myInput">
          <zoehis-checkbox label="1">复选A</zoehis-checkbox>
          <zoehis-checkbox label="复选B"></zoehis-checkbox>
          <zoehis-checkbox label="复选C"></zoehis-checkbox>
          <zoehis-checkbox label="复选D" disabled></zoehis-checkbox>
        </zoehis-checkbox-group>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-checkbox-group v-model=&quot;checkboxList&quot; @change=&quot;myInput&quot;&gt;
              &lt;zoehis-checkbox label=&quot;1&quot ;&gt;复选A&lt;/zoehis-checkbox&gt;
              &lt;zoehis-checkbox label=&quot;复选B&quot;&gt;&lt;/zoehis-checkbox&gt;
              &lt;zoehis-checkbox label=&quot;复选C&quot;&gt;&lt;/zoehis-checkbox&gt;
              &lt;zoehis-checkbox label=&quot;复选D&quot; disabled&gt;&lt;/zoehis-checkbox&gt;
            &lt;/zoehis-checkbox-group&gt;
          </code></pre>
          <pre><code>
            data () {
              return {
                checkboxList:["复选B","复选B"]
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          按钮组主要用v-model="checkboxList";checkboxList类型是数组
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
        <tr><td>v-model='value'</td><td>check组件的值，可以用来设置初始化（成组的会这个可以不用设置）</td><td>boolean/string/number</td><td>-</td><td>-</td></tr>
        <tr><td>checked</td><td>设置check组件初始化为选中(主要用于设置初始化)</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>trueflag</td><td>配置选中时v-model的值</td><td>boolean/string/number</td><td>-</td><td>true</td></tr>
        <tr><td>falseflag</td><td>配置未选中时v-model的值</td><td>boolean/string/number</td><td>-</td><td>false</td></tr>
        <tr><td>strictflag</td><td>trueflag/falseflag 是否需要全等(默认不需要全等)</td><td>boolean</td><td>-</td><td>false</td></tr>
        <tr><td>disabled</td><td>可不用状态</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>readonly</td><td>启用只读状态</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>before-select</td><td>选中前事件 若返回false 则阻止选中（注意：不支持复选组的）</td><td>function。返回参数：1.当前v-model的值;</td><td>-</td><td>-</td></tr>
        <tr><td>@change</td><td>check值改变事件</td><td>返回参数：1.当前选中的值（成组的话就是成组的值：跟v-model的值对应）</td><td>-</td><td>-</td></tr>
        <tr><td>@inputnative</td><td>类似原生的input事件（设置值的时候不会触发）</td><td>返回参数：1.当前选中的值（成组的话就是成组的值：跟v-model的值对应）</td><td>-</td><td>-</td></tr>
        <tr><td>focus()</td><td>焦点定位的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
        </tbody>
      </table>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    data () {
      return {
        checked8:"0",
        checked:false,
        checked1:false,
        checked2:false,
        checked3:false,
        checked4:false,
        checked5:false,
        checked6:false,
        checked7:false,
        checkboxList:["复选B","复选D"]
      }
    },
    methods:{
      setFocus(val){//设置焦点
        this.$refs.input3.focus();
      },
      myInput(val){
        this.$refs.textInput.setValue("这是input事件"+val);
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
