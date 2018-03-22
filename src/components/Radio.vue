<template>
  <div>
    <div class="component_example">
      <h1>Radio 单选框</h1>
      <h2>常用的操作</h2>
      <div class="item">
        <h4>基本用法(只有两个单选按钮)推荐以单选组形式使用</h4>
        <div class="item-content">
          <zoehis-radio v-model="test1"  name="水果" label="1">香蕉</zoehis-radio>
          <zoehis-radio  v-model="test1" name="水果" label="2">芭乐</zoehis-radio>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-radio v-model=&quot;radio&quot;  name=&quot;水果&quot; label=&quot;1&quot;&gt;香蕉&lt;/zoehis-radio&gt;
            &lt;zoehis-radio  v-model=&quot;radio&quot; name=&quot;水果&quot; label=&quot;2&quot;&gt;芭乐&lt;/zoehis-radio&gt;

            &lt;script&gt;
            export default {
              data () {
                return {
                  radio: &#x27;1&#x27;
                };
              }
            }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：只需要设置v-model绑定变量，选中意味着所绑变量radio的值等于相应label属性的值。<br>
            获取当前选中的值：只需this.“v-model所绑值”即可，如案例中用this.radio获得最终选择的值。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>单选组（适用于在多个互斥的选项中选择的场景）</h4>
        <div class="item-content">
          <zoehis-radio-group v-model="test3" @change="change">
            <zoehis-radio name="size" label="1">小号</zoehis-radio>
            <zoehis-radio name="size" label="2">中号</zoehis-radio>
            <zoehis-radio name="size" label="3">大号</zoehis-radio>
            <zoehis-radio name="size" label="4">巨号</zoehis-radio>
          </zoehis-radio-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-radio-group v-model=&quot;test3&quot; @change=&quot;change&quot;&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;1&quot;&gt;小号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;2&quot;&gt;中号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;3&quot;&gt;大号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;4&quot;&gt;巨号&lt;/zoehis-radio&gt;
            &lt;/zoehis-radio-group&gt;

            &lt;script&gt;
            export default {
              data () {
                return {
                  test3: &#x27;1&#x27;
                };
              },

              methods: {
                change: function (value) {
                  alert(&#x27;别以为我不知道你切换了radio&#x27;);
                },
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            实现：结合zoehis-radio-group元素和子元素zoehis-radio可以实现单选组。<br><br>
            用法：先在zoehis-radio-group中绑定v-model，然后在zoehis-radio中设置好label即可，无需再给每一个zoehis-radio绑定变量。<br><br>
            获取选中值：同样用this."v-model所绑值"即可，如案例用this.test3获取。<br><br>
            另外，单选组还提供了change事件来响应变化，它会传入一个参数value,value等于当前所选label值。只需在zoehis-radio-group
            标签上添加绑定@change="所绑定函数"，"所绑定函数"要在methods中定义，每当单选组中的radio切换都会触发该"所绑定函数"；
          </div>
        </div>
      </div>

      <div class="item">
        <h4>禁用状态</h4>
        <div class="item-content">
          <zoehis-radio-group v-model="test2" disabled>
            <zoehis-radio name="size" label="1">小号</zoehis-radio>
            <zoehis-radio name="size" label="2">中号</zoehis-radio>
            <zoehis-radio name="size" label="3">大号</zoehis-radio>
            <zoehis-radio name="size" label="4">巨号</zoehis-radio>
          </zoehis-radio-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-radio-group v-model=&quot;test2&quot; disabled&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;1&quot;&gt;小号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;2&quot;&gt;中号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;3&quot;&gt;大号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;4&quot;&gt;巨号&lt;/zoehis-radio&gt;
            &lt;/zoehis-radio-group&gt;

            &lt;script&gt;
            export default {
              data () {
                return {
                  test3: &#x27;1&#x27;
                };
              }
            }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            禁用状态：设置单个radio禁用只要在zoehis-radio元素中设置disabled属性即可，若要让整个单选组都禁用只需在单选组zoehis-radio-group
            中添加属性disabled<br><br>
            注意：请牢记，选中的条件是v-model绑定的变量值等于label中的值。
          </div>
        </div>
      </div>

      <!--<div class="item">-->
        <!--<h4>是否显示聚焦效果</h4>-->
        <!--<div class="item-content">-->
          <!--<zoehis-radio-group v-model="test5":isShowFocus="true">-->
            <!--<zoehis-radio name="size" label="1">小号</zoehis-radio>-->
            <!--<zoehis-radio name="size" label="2">中号</zoehis-radio>-->
          <!--</zoehis-radio-group>-->
        <!--</div>-->
        <!--<div class="item-detail">-->
          <!--<div class="item-code">-->
          <!--<pre><code>-->
            <!--&lt;zoehis-radio-group v-model=&quot;test5&quot; :isShowFocus=&quot;true&quot;&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;1&quot;&gt;小号&lt;/zoehis-radio&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;2&quot;&gt;中号&lt;/zoehis-radio&gt;-->
            <!--&lt;/zoehis-radio-group&gt;-->
          <!--</code></pre>-->
          <!--</div>-->
          <!--<div class="item-desc">-->
            <!--绑定isShowFocus属性为true，此时选中radio显示聚焦效果，不绑定则默认不显示聚焦效果。<br><br>-->
            <!--以上效果如果不是在组使用时要逐个绑定才有效果。-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <div class="item">
        <h4>事件</h4>
        <div class="item-content">
          <zoehis-radio-group v-model="test5" :beforeClick="beforeClick" @change="change">
            <zoehis-radio name="size" label="1">小号</zoehis-radio>
            <zoehis-radio name="size" label="2">中号</zoehis-radio>
          </zoehis-radio-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-radio-group v-model=&quot;test5&quot; :beforeClick=&quot;beforeClick&quot; @change=&quot;change&quot;&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;1&quot;&gt;小号&lt;/zoehis-radio&gt;
              &lt;zoehis-radio name=&quot;size&quot; label=&quot;2&quot;&gt;中号&lt;/zoehis-radio&gt;
            &lt;/zoehis-radio-group&gt;

            methods: {
              beforeClick(nowLabel,oldLabel){
                console.log(&quot;Radio的beforeClick事件&quot;,nowLabel,oldLabel)
                return true
              },
              change: function (val,oldVal) {
                console.log(&quot;Radio的change事件&quot;,val,oldVal)
              },
            }
          </code></pre>
          </div>
          <div class="item-desc">
            :beforeClick：点击前事件,return true才会继续触发值修改<br><br>
            @change: 值变化事件
          </div>
        </div>
      </div>

      <!--<div class="item">-->
        <!--<h4>快捷键(Tab + 空格)</h4>-->
        <!--<div class="item-content">-->
          <!--<zoehis-radio-group v-model="test4">-->
            <!--<zoehis-radio name="size" label="1">小号</zoehis-radio>-->
            <!--<zoehis-radio name="size" label="2">中号</zoehis-radio>-->
            <!--<zoehis-radio name="size" label="3">大号</zoehis-radio>-->
            <!--<zoehis-radio name="size" label="4">巨号</zoehis-radio>-->
          <!--</zoehis-radio-group>-->
        <!--</div>-->
        <!--<div class="item-detail">-->
          <!--<div class="item-code">-->
          <!--<pre><code>-->
            <!--&lt;zoehis-radio-group v-model=&quot;test4&quot;&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;1&quot;&gt;小号&lt;/zoehis-radio&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;2&quot;&gt;中号&lt;/zoehis-radio&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;3&quot;&gt;大号&lt;/zoehis-radio&gt;-->
              <!--&lt;zoehis-radio name=&quot;size&quot; label=&quot;4&quot;&gt;巨号&lt;/zoehis-radio&gt;-->
            <!--&lt;/zoehis-radio-group&gt;-->

            <!--&lt;script&gt;-->
            <!--export default {-->
              <!--data () {-->
                <!--return {-->
                  <!--test4: &#x27;1&#x27;-->
                <!--}-->
              <!--}-->
            <!--}-->
            <!--&lt;/script&gt;-->
          <!--</code></pre>-->
          <!--</div>-->
          <!--<div class="item-desc">-->
            <!--tab键逐个将单选按钮聚焦，空格按钮将聚焦的radio选中。禁用了的radio无法触发快捷键<br><br>-->
            <!--保留原本聚焦后上下左右键操作。-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

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
          <tr>
            <td>isShowFocus</td>
            <td>是否显示聚焦样式</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
            <td>:beforeClick</td>
            <td>用于绑定方法，会在点击前执行,return true才会继续执行值修改、change事件</td>
            <td>function,返回参数：1.点击的label;2.点击前label;</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>@change</td>
            <td>改变radio选项时触发</td>
            <td>function,返回参数：1.点击的label;2.点击前label;</td><td>-</td><td>-</td>
          </tr>
          </tbody>
        </table>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'radio',
    data(){
      return{
        test1: '1',
        test2: "1",
        test3: '1',
        test4: '1',
        test5: "1",
        input1: 1,
        textarea5: ""
      }
    },
    watch: {
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },
    methods: {
      beforeClick(nowLabel,oldLabel){
        console.log("Radio的beforeClick事件",nowLabel,oldLabel)
      },
      change: function (val,oldVal) {
        console.log("Radio的change事件",val,oldVal)
      },
    }
  }
</script>

<style></style>
