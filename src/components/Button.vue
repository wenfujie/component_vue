<template>
  <div class="component_example">
    <h1>Button 按钮</h1>
    <h2>常用的按钮操作</h2>
    <div class="item">
      <h4>基本用法</h4>
      <div class="item-content" id="testtest">
        <zoehis-button icon="z_delete_normal">有图标的按钮</zoehis-button>

        <zoehis-button type="primary" icon="z_delete_normal">有图标的按钮</zoehis-button>
        <zoehis-button>默认按钮</zoehis-button><zoehis-button type="primary">主要按钮</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button icon=&quot;z_delete_normal&quot;&gt;有图标的按钮&lt;/zoehis-button&gt;

            &lt;zoehis-button type=&quot;primary&quot; icon=&quot;z_delete_normal&quot;&gt;有图标的按钮&lt;/zoehis-button&gt;
            &lt;zoehis-button&gt;默认按钮&lt;/zoehis-button&gt;&lt;zoehis-button type=&quot;primary&quot;&gt;主要按钮&lt;/zoehis-button&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          type属性有2种：default/primary（默认/主要）<br>
          icon属性是来设置有没有图标的<br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>不可点击状态</h4>
      <div class="item-content">
        <zoehis-button type="primary" :disabled="false" icon="z_delete_normal">图标按钮(可以点击)</zoehis-button>
        <zoehis-button type="primary" :disabled="true" icon="z_delete_normal">图标按钮(不可点击)</zoehis-button>
        <zoehis-button :disabled="false">默认按钮</zoehis-button><zoehis-button type="primary" :disabled="true">主要按钮</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button type="primary" :disabled="true" &gt;主要按钮&lt;/zoehis-button&gt;<br/>
            &lt;zoehis-button :disabled="true" &gt;默认按钮&lt;/zoehis-button&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          disabled属性有2种：true/false（不可点击/可以点击） <br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>不同尺寸</h4>
      <div class="item-content">
        <zoehis-button type="primary">正常按钮</zoehis-button><zoehis-button type="primary" size="small">小型按钮</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button type="primary"  &gt;正常按钮&lt;/zoehis-button&gt;<br/>
            &lt;zoehis-button type="primary" size="small" &gt;小型按钮&lt;/zoehis-button&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          size属性有2种：normal/small（正常按钮/小型按钮） <br>
          默认为： normal
        </div>
      </div>
    </div>
    <div class="item">
      <h4>快捷键描述</h4>
      <div class="item-content">
        <zoehis-button type="primary" icon="z_delete_normal" keyboard="0">图标按钮(带快捷键描述)</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button type=&quot;primary&quot; icon=&quot;z_delete_normal&quot; keyboard=&quot;0&quot;&gt;图标按钮(带快捷键描述)&lt;/zoehis-button&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          keyboard属性为String类型：用于显示快捷键描述的
        </div>
      </div>
    </div>
    <div class="item">
      <h4>按钮点击/enter事件</h4>
      <div class="item-content">
        <zoehis-button type="primary" icon="z_delete_normal" @clickenter="myClickEnterEve">图标按钮</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button @clickenter="myClickEnterEve"&gt;图标按钮&lt;/zoehis-button&gt;<br/>
            &lt;zoehis-button type="primary" @clickenter="myClickEnterEve"&gt;主要按钮&lt;/zoehis-button&gt;<br/>
          </code></pre>
          <pre><code>
            //父组件写法：
            methods:{
              myClickEnterEve:function(evt){
                alert("这是点击事件");
              }
            }
          </code></pre>
        </div>
        <div class="item-desc">
          @clickenter="myClickEnterEve",组件触发点击事件/或者enter事件（需要焦点在按钮上才会触发enter事件） <br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>按钮组</h4>
      <div class="item-content">
        <zoehis-button-group>
          <zoehis-button type="primary" icon="z_delete_normal">图标按钮</zoehis-button><zoehis-button type="default">默认按钮</zoehis-button>
        </zoehis-button-group>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button-group&gt;
              &lt;zoehis-button type=&quot;primary&quot; icon=&quot;z_delete_normal&quot;&gt;图标按钮&lt;/zoehis-button&gt;
              &lt;zoehis-button type=&quot;default&quot;&gt;默认按钮&lt;/zoehis-button&gt;
            &lt;/zoehis-button-group&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          用zoehis-button-group包起来
        </div>
      </div>
    </div>
    <div class="item">
      <h4>改变按钮内容</h4>
      <div class="item-content">
        <zoehis-button type="primary" :keyboard="keyboard" icon="z_delete_normal">{{featuresName}}</zoehis-button><zoehis-button type="default">{{defaultName}}</zoehis-button>
        <zoehis-button @clickenter="changeBtnCt" type="primary">改变按钮内容</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button type=&quot;primary&quot; :keyboard=&quot;keyboard&quot; icon=&quot;z_delete_normal&quot;&gt;{{featuresName}&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;default&quot;&gt;{{defaultName}&lt;/zoehis-button&gt;
          </code></pre>
          <pre><code>
            data() {
              return {
                featuresName:"底部图标",
                defaultName:"默认图标",
                keyboard:"2"
              }
            },
            methods:{
              changeBtnCt:function(evt){
                this.defaultName="新的图标内容";
                this.featuresName="新的图标内容";
                ++this.keyboard;
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          主要去改变keyboard 跟变量defaultName、featuresName的值
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
        <tr><td>type</td><td>按钮类型</td><td>string</td><td>default/primary（默认/主要）</td><td>default</td></tr>
        <tr><td>icon</td><td>设置字体图标</td><td>string</td><td></td><td>-</td></tr>
        <tr><td>disabled</td><td>可不用状态</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>size</td><td>按钮大小尺寸</td><td>string</td><td>'normal'/'small'</td><td>'normal'</td></tr>
        <tr><td>keyboard</td><td>用于显示快捷键描述的</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>@clickenter</td><td>点击/enter事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
        <tr><td>focus()</td><td>焦点定位的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
        </tbody>
      </table>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'button',
    data() {
      return {
        featuresName:"底部图标",
        defaultName:"默认图标",
        keyboard:"2"
      }
    },
    methods:{
      changeBtnCt:function(evt){
        this.defaultName="新的图标内容";
        this.featuresName="新的图标内容";
        ++this.keyboard;
      },
      myClickEnterEve:function(evt){
        alert("这是点击事件/或者enter事件");
      },
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
