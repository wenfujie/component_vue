<template>
  <div>
    <div class="component_example">
      <h1>Menu 菜单栏</h1>
      <h2>常用的操作</h2>
      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu1">
            <zoehis-menu label="one">长期医嘱单</zoehis-menu>
            <zoehis-menu label="two">检查申请</zoehis-menu>
            <zoehis-menu label="three">中药处方</zoehis-menu>
            <zoehis-menu label="four">出院带药</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu1&quot;&gt;
              &lt;zoehis-menu label=&quot;one&quot;&gt;长期医嘱单&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;three&quot;&gt;中药处方&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;four&quot;&gt;出院带药&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;

            data: function () {
              return {
                activeMenu1: &quot;one&quot;
              }
            },
          </code></pre>
          </div>
          <div class="item-desc">
            使用：用菜单组标签zoehis-menu-group包裹着单个菜单标签zoehis-menu，组标签用v-model绑定一个变量，zoehis-menu
            标签定义不相同的label属性，当选中对应zoehis-menu菜单栏时该变量等于此时的label。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>不同类型menu</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu2" type="style2">
            <zoehis-menu label="one">type="style2"</zoehis-menu>
            <zoehis-menu label="two">检查申请</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu8" type="style3">
            <zoehis-menu label="one">type="style3"</zoehis-menu>
            <zoehis-menu label="two">检查申请</zoehis-menu>
            <zoehis-menu label="three">中药处方</zoehis-menu>
            <zoehis-menu label="four">出院带药</zoehis-menu>
          </zoehis-menu-group>
        </div>

        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu2&quot; type=&quot;style2&quot;&gt;
              &lt;zoehis-menu label=&quot;one&quot;&gt;改字体大小&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：只需在zoehis-menu-group标签上添加属性type="style2"或type="style3"即可改变样式风格。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>组合使用</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu3">
            <zoehis-menu label="one">长期医嘱单</zoehis-menu>
            <zoehis-menu label="two">检查申请</zoehis-menu>
            <zoehis-menu label="three">中药处方</zoehis-menu>
            <zoehis-menu label="four">出院带药</zoehis-menu>
          </zoehis-menu-group>
          <zoehis-menu-group v-model="activeMenu4" type="style2">
            <zoehis-menu label="one">改变字体</zoehis-menu>
            <zoehis-menu label="two">检查申请</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu3&quot;&gt;
              &lt;zoehis-menu label=&quot;one&quot;&gt;长期医嘱单&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;three&quot;&gt;中药处方&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;four&quot;&gt;出院带药&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;
            &lt;zoehis-menu-group v-model=&quot;activeMenu4&quot; type=&quot;style2&quot;&gt;
              &lt;zoehis-menu label=&quot;one&quot;&gt;改变字体&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：当有多层菜单栏时，可以用基本类型菜单栏与type="style2"类型的菜单栏组合使用。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>hover效果、禁用功能</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu5" hover disabled>
            <zoehis-menu  label="one">长期医嘱单</zoehis-menu>
            <zoehis-menu  label="two">检查申请</zoehis-menu>
            <zoehis-menu  label="three">中药处方</zoehis-menu>
            <zoehis-menu  label="four">出院带药</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu5&quot; hover disabled&gt;
              &lt;zoehis-menu  label=&quot;one&quot;&gt;长期医嘱单&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;three&quot;&gt;中药处方&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;four&quot;&gt;出院带药&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            hover效果使用：只需在zoehis-menu-group标签上添加hover属性即可具有标签hover的效果。<br><br>
            禁用功能使用：只需只需在zoehis-menu-group标签上添加disabled属性即可让所有菜单禁用，若加在
            zoehis-menu标签上即单个菜单禁用。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>自定义class设置样式</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu6" class="setStyle">
            <zoehis-menu  label="one">长期医嘱单</zoehis-menu>
            <zoehis-menu  label="two">检查申请</zoehis-menu>
            <zoehis-menu  label="three">中药处方</zoehis-menu>
            <zoehis-menu  label="four">出院带药</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu6&quot; class=&quot;setStyle&quot;&gt;
              &lt;zoehis-menu  label=&quot;one&quot;&gt;长期医嘱单&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;two&quot;&gt;检查申请&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;three&quot;&gt;中药处方&lt;/zoehis-menu&gt;
              &lt;zoehis-menu  label=&quot;four&quot;&gt;出院带药&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;

            &lt;style&gt;
              .setStyle{
                width: 600px;
                border: 1px solid dodgerblue;
                padding-top: 0;
              }
              .setStyle .zoehis_menu_css{
                font-size: 18px;
                color: dodgerblue;
                line-height: 45px;
                margin-top: 0;
                padding-left: 30px;
                padding-right: 30px;
                border-top: none;
              }
            &lt;/style&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            修改组菜单栏样式：可以在zoehis-menu-group标签自定义一个class,如案例中定义了class="setStyle",可以在该类中设置
            整个菜单栏的样式；<br><br>
            修改单个菜单栏样式：修改单个菜单栏的样式只要修改内部类“.zoehis_menu_css”的样式，避免全局污染，
            修改单个菜单栏采用css子选择器方式修改。<br>
            如案例中用.setStyle .zoehis_menu_css去修改每个子菜单栏。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>方法事件</h4>
        <div class="item-content">
          <zoehis-menu-group v-model="activeMenu7" type="style2" hover @change="change" :beforeClick="beforeClick">
            <zoehis-menu label="one" @menuClick="menuClick">前台挂号</zoehis-menu>
            <zoehis-menu label="two">取号排队</zoehis-menu>
            <zoehis-menu label="three">看病门诊</zoehis-menu>
            <zoehis-menu label="four" @menuClick="menuClick">重大急症</zoehis-menu>
          </zoehis-menu-group>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-menu-group v-model=&quot;activeMenu7&quot; type=&quot;style2&quot; hover @change=&quot;change&quot; :beforeClick=&quot;beforeClick&quot;&gt;
              &lt;zoehis-menu label=&quot;one&quot; @menuClick=&quot;menuClick&quot;&gt;前台挂号&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;two&quot;&gt;取号排队&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;three&quot;&gt;看病门诊&lt;/zoehis-menu&gt;
              &lt;zoehis-menu label=&quot;four&quot;&gt;重大急症&lt;/zoehis-menu&gt;
            &lt;/zoehis-menu-group&gt;

            &lt;script&gt;
              export default{
                methods: {
                  beforeClick(goOn,label){
                    console.log(&quot;点击事件执行前的事件&quot;,label);
                    goOn();
                  },
                  menuClick: function (value) {
                    alert(&#x27;我是menuClick事件，我会传入当前所点击menu的label,当前label值：&#x27;+value);
                  },
                  change: function (value) {
                    console.log(&quot;我是change事件，我会传入当前所点击menu的label,当前label值：&quot;+value);
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            @menuClick使用：在zoehis-menu标签绑定一个自定义方法，如案例中在第一个菜单栏中绑定了menuClick方法，该菜单栏
            被点击则触发该方法，该方法默认会把所点击label,未点击label传入。<br><br>
            @change使用：在zoehis-menu-group标签绑定一个自定义方法，如案例中绑定了一个change方法，只要切换了菜单栏就会
            触发该方法该方法默认会把所点击label传入。<br><br>
            :beforeClick属性使用：在zoehis-menu-group标签绑定一个方法在beforeClick属性上，如案例中绑定了一个beforeClick
            方法在beforeClick属性上，该方法会在触发菜单栏点击事件之前触发，并默认传入一个方法参数、对应点击label、未点击label，在方法中执行方法参数
            才会继续触发以上menuClick、change的点击事件，否则不触发。<br>
            没有绑定该属性则默认会触发menuClick、change点击事件
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default{
    name: 'menu',
    data: function () {
      return {
        activeMenu: "two",
        activeMenu1: "one",
        activeMenu2: "two",
        activeMenu3: "one",
        activeMenu4: "one",
        activeMenu5: "one",
        activeMenu6: "one",
        activeMenu7: "one",
        activeMenu8: "one"
      }
    },

    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },

    methods: {
      beforeClick(goOn,label,beforeLabel){
        console.log("点击事件执行前的事件",label,beforeLabel);
        goOn();
      },
      menuClick: function (value,oldVal) {
        console.log('我是menuClick事件，我会传入当前所点击menu的label,当前label值：',value,oldVal);
      },
      change: function (value) {
//        console.log("我是change事件，我会传入当前所点击menu的label,当前label值：",value,this.activeMenu7);
      },
    },

  }
</script>
<style>
  .setStyle{
    width: 600px;
    border: 1px solid dodgerblue;
    padding-top: 0;
  }
  .setStyle .zoehis_menu_css{
    font-size: 18px;
    color: dodgerblue;
    line-height: 45px;
    margin-top: 0;
    padding-left: 30px;
    padding-right: 30px;
    border-top: none;
  }
</style>
