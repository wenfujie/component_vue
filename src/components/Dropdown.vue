<template>
  <div>
    <div class="component_example">
      <h1>Dropdown 下拉菜单</h1>
      <h2>常用的操作</h2>

      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-dropdown>
            <span>下拉菜单<i class="zoeIconfont z_dropD_form zoehis_dropdown_iDistance"></i></span>
            <zoehis-dropdown-menu slot="dropdown" class="droplist_width" @visible-change="aaa">
              <zoehis-dropdown-item>香蕉</zoehis-dropdown-item>
              <zoehis-dropdown-item>芭乐</zoehis-dropdown-item>
              <zoehis-dropdown-item>葡萄</zoehis-dropdown-item>
              <zoehis-dropdown-item>西瓜</zoehis-dropdown-item>
              <zoehis-dropdown-item>猴子</zoehis-dropdown-item>
            </zoehis-dropdown-menu>
          </zoehis-dropdown>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dropdown&gt;
              &lt;span&gt;
                下拉菜单
                &lt;i class=&quot;zoeIconfont z_dropD_form zoehis_dropdown_iDistance&quot;&gt;&lt;/i&gt;
              &lt;/span&gt;
              &lt;zoehis-dropdown-menu slot=&quot;dropdown&quot; class=&quot;droplist_width&quot;&gt;
                &lt;zoehis-dropdown-item&gt;香蕉&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;芭乐&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;葡萄&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;西瓜&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;猴子&lt;/zoehis-dropdown-item&gt;
              &lt;/zoehis-dropdown-menu&gt;
            &lt;/zoehis-dropdown&gt;

            .droplist_width{
              width: 75px;
            }
          </code></pre>
          </div>
          <div class="item-desc">
            使用：如案例所示，在span标签中设置下拉菜单文字，i标签为右侧下拉图标(可自行更换)；<br><br>
            在zoehis-dropdown-menu标签中设置必要属性slot="dropdown"，自定义一个class来设置下拉框的宽度，
            如案例中添加class="droplist_width"设置宽度75px（不设置宽度则宽度为默认文字撑开宽度）；<br><br>
            最后在zoehis-dropdown-item标签中设置对应下拉项文字
          </div>
        </div>
      </div>

      <div class="item">
        <h4>禁用、分割线</h4>
        <div class="item-content">
          <zoehis-dropdown>
            <span>下拉菜单<i class="zoeIconfont z_dropD_form zoehis_dropdown_iDistance"></i></span>
            <zoehis-dropdown-menu slot="dropdown" class="droplist_width">
              <zoehis-dropdown-item>香蕉</zoehis-dropdown-item>
              <zoehis-dropdown-item>芭乐</zoehis-dropdown-item>
              <zoehis-dropdown-item>葡萄</zoehis-dropdown-item>
              <zoehis-dropdown-item divided>西瓜</zoehis-dropdown-item>
              <zoehis-dropdown-item disabled>猴子</zoehis-dropdown-item>
            </zoehis-dropdown-menu>
          </zoehis-dropdown>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dropdown&gt;
              &lt;span&gt;
                下拉菜单
                &lt;i class=&quot;zoeIconfont z_dropD_form zoehis_dropdown_iDistance&quot;&gt;&lt;/i&gt;
              &lt;/span&gt;
              &lt;zoehis-dropdown-menu slot=&quot;dropdown&quot; class=&quot;droplist_width&quot;&gt;
                &lt;zoehis-dropdown-item&gt;香蕉&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;芭乐&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;葡萄&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item divided&gt;西瓜&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item disabled&gt;猴子&lt;/zoehis-dropdown-item&gt;
              &lt;/zoehis-dropdown-menu&gt;
            &lt;/zoehis-dropdown&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：禁用功能：在需禁用项对应zoehis-dropdown-item标签添加disabled属性即可；<br><br>
            分割线：在需分隔项对应zoehis-dropdown-item标签添加divided属性就会在该项上部添加分割线；
          </div>
        </div>
      </div>

      <div class="item">
        <h4>设置click显示下拉框、点击下拉项后不隐藏</h4>
        <div class="item-content">
          <zoehis-dropdown trigger="click" :hide-on-click="false">
            <span>下拉菜单<i class="zoeIconfont z_dropD_form zoehis_dropdown_iDistance"></i></span>
            <zoehis-dropdown-menu slot="dropdown" class="droplist_width">
              <zoehis-dropdown-item>香蕉</zoehis-dropdown-item>
              <zoehis-dropdown-item>芭乐</zoehis-dropdown-item>
              <zoehis-dropdown-item>葡萄</zoehis-dropdown-item>
              <zoehis-dropdown-item>西瓜</zoehis-dropdown-item>
              <zoehis-dropdown-item>猴子</zoehis-dropdown-item>
            </zoehis-dropdown-menu>
          </zoehis-dropdown>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dropdown trigger=&quot;click&quot; :hide-on-click=&quot;false&quot;&gt;
              &lt;span&gt;
                下拉菜单
                &lt;i class=&quot;zoeIconfont z_dropD_form zoehis_dropdown_iDistance&quot;&gt;&lt;/i&gt;
              &lt;/span&gt;
              &lt;zoehis-dropdown-menu slot=&quot;dropdown&quot; class=&quot;droplist_width&quot;&gt;
                &lt;zoehis-dropdown-item&gt;香蕉&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;芭乐&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;葡萄&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;西瓜&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item&gt;猴子&lt;/zoehis-dropdown-item&gt;
              &lt;/zoehis-dropdown-menu&gt;
            &lt;/zoehis-dropdown&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：click显示下拉框：在zoehis-dropdown标签下添加属性trigger="click"则下拉菜单只能通过click显示隐藏；<br><br>
            点击下拉项后不隐藏：在zoehis-dropdown标签下绑定属性:hide-on-click="false"则点击下拉项后下拉菜单不会隐藏。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>下拉项点击事件</h4>
        <div class="item-content">
          <zoehis-dropdown @command="handleCommand">
            <span>下拉菜单<i class="zoeIconfont z_dropD_form zoehis_dropdown_iDistance"></i></span>
            <zoehis-dropdown-menu slot="dropdown" class="droplist_width">
              <zoehis-dropdown-item command="A">香蕉</zoehis-dropdown-item>
              <zoehis-dropdown-item command="B">芭乐</zoehis-dropdown-item>
              <zoehis-dropdown-item command="C">葡萄</zoehis-dropdown-item>
              <zoehis-dropdown-item command="D">西瓜</zoehis-dropdown-item>
              <zoehis-dropdown-item command="E">猴子</zoehis-dropdown-item>
            </zoehis-dropdown-menu>
          </zoehis-dropdown>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dropdown @command=&quot;handleCommand&quot;&gt;
              &lt;span&gt;
                下拉菜单
                &lt;i class=&quot;zoeIconfont z_dropD_form zoehis_dropdown_iDistance&quot;&gt;&lt;/i&gt;
              &lt;/span&gt;
              &lt;zoehis-dropdown-menu slot=&quot;dropdown&quot; class=&quot;droplist_width&quot;&gt;
                &lt;zoehis-dropdown-item command=&quot;A&quot;&gt;香蕉&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item command=&quot;B&quot;&gt;芭乐&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item command=&quot;C&quot;&gt;葡萄&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item command=&quot;D&quot;&gt;西瓜&lt;/zoehis-dropdown-item&gt;
                &lt;zoehis-dropdown-item command=&quot;E&quot;&gt;猴子&lt;/zoehis-dropdown-item&gt;
              &lt;/zoehis-dropdown-menu&gt;
            &lt;/zoehis-dropdown&gt;

            methods: {
              handleCommand(command) {
                alert(&#x27;传入的参数是：&#x27; + command);
              }
            }
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在zoehis-dropdown标签中通过@command绑定一个自定义方法，并在每一个zoehis-dropdown-item标签上添加command
            属性，当点击下拉项时就会触发该方法并传入一个参数，该参数为所点击对应项的command值。
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
            <td>slot</td>
            <td>必有属性，在zoehis-dropdown-menu标签添加slot="dropdown"（用于内部获取）。</td>
            <td>String</td><td>dropdown</td><td>-</td>
          </tr>
          <tr>
            <td>disabled</td><td>可选属性，在zoehis-dropdown或zoehis-dropdown-item标签添加该属性实现禁用。</td><td>Boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>divided</td><td>可选属性，在zoehis-dropdown-item标签添加该属性在对影响上部加分隔线。</td><td>Boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr><td>prevent-over-id</td><td>在zoehis-dropdown-menu 里设置弹出框将要插入的容器（默认插入到body下），该值为ID，每个页面都是唯一的不能重复</td><td>string</td><td>-</td><td>-</td></tr>
          <tr>
            <td>trigger</td><td>在zoehis-dropdown标签添加trigger="click"(默认hover)，切换触发下拉框方式。</td><td>String</td><td>hover/click</td><td>hover</td>
          </tr>
          <tr>
            <td>:hide-on-click</td><td>在zoehis-dropdown标签添加:hide-on-click="false"(默认true)设置点击下拉项不隐藏下拉框。</td><td>Boolean</td><td>true/false</td><td>true</td>
          </tr>
          <tr>
            <td>@command</td><td>在zoehis-dropdown绑定方法，点击下拉项触发该方法,默认传入点击下拉项command值。</td>
            <td>返回参数：1.对应项command值；2点击项vm对象；3.事件参数e</td><td>-</td><td>传参“command值”</td>
          </tr>
          <tr>
            <td>@visible-change</td><td>在zoehis-dropdown-menu使用，下拉菜单显示/隐藏的事件。</td>
            <td>返回参数：1.判断显示隐藏字段（boolean）；2.自身的vm对象；</td><td>-</td><td>-</td>
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
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },

    methods: {
      aaa(boo,vm){
//        console.log("你这个",boo,vm)
      },
      handleCommand(command,dom,e) {
        console.log('传入的参数是： ', command,dom,e);
      }
    }
  }
</script>

<style>
  .droplist_width{width: 75px;}
</style>
