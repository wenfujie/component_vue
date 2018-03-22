<template>
  <div>

    <div class="component_example">
      <h1>Page 分页</h1>
      <h2>常用的操作</h2>

      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-page unit-text="方" :stripCount="stripCount" :current_page.sync="currrentPage" :set_strip.sync="setStrip" :beforeClick="beforeClickFirst">
          </zoehis-page>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-page :stripCount=&quot;stripCount&quot; :current_page.sync=&quot;currrentPage&quot; :set_strip.sync=&quot;setStrip&quot;&gt;
            &lt;/zoehis-page&gt;

            &lt;script&gt;
              export default{
                data: function () {
                  return {
                    stripCount: 40,
                    currrentPage: 1,
                    setStrip: 5
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在zoehis-page标签上绑定必要属性stripCount。绑定值类型是number，它代表总条目数。<br><br>
            绑定current_page.sync，类型是number，表示当前页。<br><br>
            绑定set_strip.sync，类型是number，表示当前每页显示条数。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>设置属性</h4>
        <div class="item-content">
          <zoehis-page :stripArr="stripArr" :stripCount="stripCount"
                       :set_strip.sync="setStrip" :current_page.sync="currrentPage">
          </zoehis-page>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-page :stripArr=&quot;stripArr&quot; :stripCount=&quot;stripCount&quot;
            :set_strip.sync=&quot;setStrip&quot; :current_page.sync=&quot;currrentPage&quot;&gt;
            &lt;/zoehis-page&gt;

            &lt;script&gt;
              export default{
                data: function () {
                  return {
                    stripArr: [5,10,15],  //可选条目数组
                    stripCount: 40,  //总条目数
                    setStrip: 5,  //当前显示条目数
                    currrentPage: 1
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在zoehis-page标签可设置三个可选属性。<br><br>
            1.绑定stripArr属性为一个数组，该数组用于遍历设置每页显示条数的下拉列表,数组每一项都要是数字；<br>
            默认为[10,20,30,40]<br><br>
            2.绑定current_page.sync属性为一个数字，该数字用于设置默认页数<br>
            默认值为1<br><br>
            3.绑定set_strip.sync属性为一个数字，该数字为默认每页显示条数。<br>
            默认值为10
          </div>
        </div>
      </div>

      <div class="item">
        <h4>隐藏设置显示条数功能</h4>
        <div class="item-content">
          <zoehis-page :stripCount="stripCount" :set_strip.sync="setStrip" :current_page.sync="currrentPage"
                       :isSetStrip="false">
          </zoehis-page>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-page :stripCount=&quot;stripCount&quot; :set_strip.sync=&quot;setStrip&quot; :current_page.sync=&quot;currrentPage&quot;
            :isSetStrip=&quot;false&quot;&gt;
            &lt;/zoehis-page&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：绑定isSetStrip属性为boolean,当该值为false时不显示“设置每页显示条数功能”。<br><br>
            如果不绑定该属性则默认为显示。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>可绑定事件</h4>
        <div class="item-content">
          <zoehis-page :stripArr="stripArr" :stripCount="stripCount"
                       :set_strip.sync="setStrip" :current_page.sync="currrentPage"
                       @changeStrip="changeStrip" @changePage="changePage" :beforeClick="beforeClick">
          </zoehis-page>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-page :stripArr=&quot;stripArr&quot; :stripCount=&quot;stripCount&quot;
              :set_strip.sync=&quot;setStrip&quot; :current_page.sync=&quot;currrentPage&quot;
              @changeStrip=&quot;changeStrip&quot; @changePage=&quot;changePage&quot;&gt;
            &lt;/zoehis-page&gt;

            methods: {
              changeStrip: function (strip) {
                console.log(&#x27;修改显示条数为&#x27;+strip+&#x27;条&#x27;);
              },

              changePage: function (page) {
                console.log(&#x27;跳转到第&#x27;+page+&#x27;页&#x27;);
              }

            }
          </code></pre>
          </div>
          <div class="item-desc">
            使用：该标签有changeStrip和changePage事件可以绑定。<br><br>
            1.@changeStrip在改变每页显示条数时触发该事件所绑定方法，所绑定方法默认会传入一个参数，该
            参数为修改显示条数的数量。<br><br>
            2.@changePage在修改当前显示页数会触发该事件所绑定方法，所绑方法默认会传入一个参数，该参数
            为要跳转的页数。

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
            <td>:stripArr</td>
            <td>绑定stripArr属性为一个数组，该数组用于遍历设置每页显示条数的下拉列表,数组每一项都要是数字</td>
            <td>数组</td><td>-</td><td>[10,20,30,40]</td>
          </tr>
          <tr>
            <td>unit-text</td><td>可选，设置单位字体，如：传入'方'，则变成每页显示1方，总5方。</td><td>string</td><td>-</td><td>条</td>
          </tr>
          <tr>
            <td>:stripCount</td><td>必要，绑定stripCount属性为一个数字，该数字为总的条数</td><td>num</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>:set_strip.sync</td><td>必要，绑定set_strip.sync属性为一个数字，该数字为默认每页显示条数</td><td>num</td><td>-</td><td>10</td>
          </tr>
          <tr>
            <td>:current_page.sync</td><td>必要，绑定current_page.sync属性为一个数字，该数字为默认页数</td><td>num</td><td>-</td><td>1</td>
          </tr>
          <tr>
            <td>:isSetStrip</td><td>绑定isSetStrip属性为boolean,当该值为false时不显示“设置每页显示条数功能”</td><td>boolean</td><td>-</td><td>true</td>
          </tr>
          <tr>
            <td>:beforeClick</td><td>点击上下页图标前触发方法，return true才能执行点击事件</td><td>function</td><td>返回参数：1.新页码2.旧页码</td><td>-</td>
          </tr>
          <tr>
            <td>@changeStrip</td><td>@changeStrip在改变每页显示条数时触发该事件所绑定方法，并将“要改变每页显示条数数量”参数传入方法</td><td>事件</td><td>-</td><td>传参“条数”</td>
          </tr>
          <tr>
            <td>@changePage</td><td>@changePage在修改当前显示页数会触发该事件所绑定方法，方法会把将“要跳转页数”参数传入</td><td>事件</td><td>-</td><td>传参“页数”</td>
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
    data: function () {
      return {
        stripArr: [5,10,15],  //可选条目数组
        stripCount: 40,  //总条目数（必须传）
        setStrip: 5,  //当前显示条目数
        currrentPage: 1,
      }
    },

    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },

    methods: {
      beforeClickFirst(newP,oldP){
//        console.log("触发了啊",newP,oldP)
        return true
      },
      beforeClick(newPage,oldPage){
        console.log(newPage,oldPage)
        return true
      },
      changeStrip: function (strip) {
        console.log('修改显示条数为'+strip+'条');
      },

      changePage: function (page) {
        console.log('跳转到第'+page+'页');
      }

    }
  }
</script>
