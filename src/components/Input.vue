<template>
  <div class="component_example">
    <h1>Input 输入框</h1>
    <h2>常用的操作</h2>
    <div class="item">
      <h4>基本用法</h4>
      <div class="item-content">
        <zoehis-input clickselect placeholder="这是默认显示的" type="text" v-model="input1"></zoehis-input>
        <zoehis-input placeholder="这是默认显示的" type="textarea" v-model="textarea1"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
        &lt;zoehis-input placeholder=&quot;这是默认显示的&quot; type=&quot;text&quot; v-model=&quot;input1&quot;&gt;&lt;/zoehis-input&gt;
        &lt;zoehis-input placeholder=&quot;这是默认显示的&quot; type=&quot;textarea&quot; v-model=&quot;textarea1&quot;&gt;&lt;/zoehis-input&gt;
        &lt;script&gt;
          data () {
            return {
              input1:"这是初始值",
              textarea1:"",
            }
          }
        &lt;script&gt;
        </code></pre>
        </div>
        <div class="item-desc">
          type属性有2种：text/textarea（文本/多行文本）<br>
          v-model='value'：文本/多行文本的值，可以用来设置初始值<br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>禁用/只读状态</h4>
      <div class="item-content">
        <zoehis-input disabled icon="z_delete_normal" type="text" v-model="input3"></zoehis-input>
        <zoehis-input readonly type="textarea" v-model="textarea3"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
            &lt;zoehis-input disabled icon=&quot;z_delete_normal&quot; type=&quot;text&quot;  v-model=&quot;input3&quot;&gt;&lt;/zoehis-input&gt;
            &lt;zoehis-input readonly type=&quot;textarea&quot;  v-model=&quot;textarea3&quot;&gt;&lt;/zoehis-input&gt;
        </code></pre></div>
        <div class="item-desc">
          disabled 属性设置input组件不能编辑 <br>
          readonly 属性设置input组件只读状态，点击XX图标删除不了内容（设置clearreadonly属性则可以点击X图标删除内容）
        </div>
      </div>
    </div>
    <div class="item">
      <h4>设置跟获取值</h4>
      <div class="item-content">
        <zoehis-input placeholder="输入值" type="text" v-model="input4" ref="inputSetGet"></zoehis-input>
        <zoehis-button @clickenter="clickSetValue">设置值</zoehis-button><zoehis-button @clickenter="clickGetValue">获取值</zoehis-button><input placeholder="输入需要设置的值" type="text" v-model="setGetValue">
      </div>
      <div class="item-detail">
      <div class="item-code"><pre><code>
      &lt;zoehis-input placeholder=&quot;输入值&quot; type=&quot;text&quot; v-model=&quot;input1&quot; ref=&quot;inputSetGet&quot;&gt;&lt;/zoehis-input&gt;
      &lt;script&gt;
        clickSetValue:function(){
          this.$refs.inputSetGet.setValue(this.setGetValue);
        },
        clickGetValue:function(){
          this.setGetValue=this.$refs.inputSetGet.getValue();
        },
      &lt;script&gt;
      </code></pre></div>
        <div class="item-desc">
          使用ref属性,在父组件里用this.$refs.inputGetSet获取子组件的对象，在进行调用
        </div>
      </div>
    </div>
    <div class="item">
      <h4>输入框的图标</h4>
      <div class="item-content">
        <zoehis-input placeholder="清空按钮的图标" type="text" v-model="input5"></zoehis-input>
        <zoehis-input placeholder="输入框配置的图标" icon="z_delete_normal" type="text" v-model="textarea5" :reg="/^([1-9][0-9]*)?(\.[0]{0,2})?$/"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
        &lt;zoehis-input placeholder=&quot;清空按钮的图标&quot; type=&quot;text&quot; v-model=&quot;input5&quot;&gt;&lt;/zoehis-input&gt;
        &lt;zoehis-input placeholder=&quot;输入框配置的图标&quot; icon=&quot;z_delete_normal&quot; type=&quot;text&quot; v-model=&quot;textarea5&quot;&gt;&lt;/zoehis-input&gt;
        </code></pre></div>
        <div class="item-desc">
          icon属性用来配置其他图标的
        </div>
      </div>
    </div>
    <div class="item">
      <h4>错误提示操作</h4>
      <div class="item-content">
        <zoehis-input type="text" v-model="input5" error-tip="这就是错误提示"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
          &lt;zoehis-input
            type=&quot;text&quot; v-model=&quot;input5&quot; error-tip=&quot;这就是错误提示&quot;
          &gt;&lt;/zoehis-input&gt;
        </code></pre></div>
        <div class="item-desc">
          error-tip属性用于配置错误信息的提示语的，为空""时表示错误提示信息不显示 <br>
          注意：为空""是关键
        </div>
      </div>
    </div>
    <div class="item">
      <h4>数值的正则校验</h4>
      <div class="item-content">
        <span>num型（digit-length属性有效）：</span><zoehis-input check-type="num" type="text" v-model="input6"></zoehis-input>
        <br>
        <span>int型（digit-length/positive属性有效）：</span><zoehis-input check-type="int" type="text" v-model="input7"></zoehis-input>
        <br>
        <span>float型（decimal-length/digit-length/positive属性有效）：</span><zoehis-input check-type="float" type="text" v-model="input8"></zoehis-input>
        <br>
        <span>digit型（digit-length属性有效）：</span><zoehis-input check-type="digit" type="text" v-model="input9"></zoehis-input>
      </div>
      <div class="item-detail">
        <div class="item-code"><pre><code>
          &lt;span&gt;num型（digit-length属性有效）：&lt;/span&gt;
          &lt;zoehis-input
            check-type=&quot;num&quot; type=&quot;text&quot; v-model=&quot;input6&quot;
          &gt;&lt;/zoehis-input&gt;
          &lt;br&gt;
          &lt;span&gt;int型（digit-length/positive属性有效）：&lt;/span&gt;
          &lt;zoehis-input
            check-type=&quot;int&quot; type=&quot;text&quot; v-model=&quot;input7&quot;
          &gt;&lt;/zoehis-input&gt;
          &lt;br&gt;
          &lt;span&gt;float型（decimal-length/digit-length/positive属性有效）：&lt;/span&gt;
          &lt;zoehis-input
            check-type=&quot;float&quot; type=&quot;text&quot; v-model=&quot;input8&quot;
          &gt;&lt;/zoehis-input&gt;
          &lt;br&gt;
          &lt;span&gt;digit型（digit-length属性有效）：&lt;/span&gt;
          &lt;zoehis-input
            check-type=&quot;digit&quot; type=&quot;text&quot; v-model=&quot;input9&quot;
          &gt;&lt;/zoehis-input&gt;
        </code></pre></div>
        <div class="item-desc">
          check-type="checkType" ：checkType值的情况如下：<br>
          "num": 正整数类型（包括0）,如：0、1、2..... <br>
          "int": 整数类型（包括0）,如：0、1、2、-1、-2.... <br>
          "float": 浮点类型,如：0、1.1、1、2、-1、-1.2、-2.... <br>
          "digit": 纯数字类型（包括0000...）,如：0、1、2、00.... <br>
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
        <tr><td>:type</td><td>文本类型</td><td>string</td><td>text/textarea/password</td><td>text</td></tr>
        <tr><td>v-model='value'</td><td>输入框的值（有设置值的话为默认值）（*）</td><td>-</td><td>-</td><td>-</td></tr>
        <tr><td>icon</td><td>图标的名称,若存在close属性，则close属性优先级比较高</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>error-tip</td><td>错误提示的内容,为""空时不显示</td><td>String</td><td>-</td><td>""</td></tr>
        <tr><td>reg</td><td>自定义正则校验(正则表达式)</td><td>RegExp</td><td>-</td><td>-</td></tr>
        <tr><td>check-type</td><td>input检验类型</td><td>string：正整数/整数/浮点数/纯数字（都包括 0 ）</td><td>num/int/float/digit</td><td>-</td></tr>
        <tr><td>digit-length</td><td>保留整数的位数</td><td>number</td><td>-</td><td>-</td></tr>
        <tr><td>positive</td><td>只能为正数</td><td>Boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>checkzero</td><td>要不要保留0（针对check-type=num/int）</td><td>Boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>decimal-length</td><td>保留小数的位数</td><td>number</td><td>-</td><td>-</td></tr>
        <tr><td>disabled</td><td>可不用</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>readonly</td><td>启用只读状态</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>clearable</td><td>启用点击X图标清空数据</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>showclose</td><td>有清空功能的时候是否优先显示XX图标</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>clickselect</td><td>单击的时候文字全选,默认全选</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>text-align</td><td>input的text-align位置属性</td><td>string</td><td>-</td><td>left</td></tr>
        <tr><td>placeholder</td><td>默认的显示文字</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>width</td><td>输入框的宽度,支持百分百比，auto</td><td>number/string</td><td>-</td><td>115</td></tr>
        <tr><td>height</td><td>输入框的高度,支持百分百比，auto</td><td>number/string</td><td>-</td><td>-</td></tr>
        <tr><td>@focus</td><td>focus事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
        <tr><td>@blur</td><td>blur事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
        <tr><td>@clear</td><td>clear清空事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
        <tr><td>@change</td><td>值改变事件</td><td>返回参数：1.当前的值</td><td>-</td><td>-</td></tr>
        <tr><td>@inputnative</td><td>类似原生的input事件（设置值的时候不会触发）</td><td>返回参数：1.当前的值</td><td>-</td><td>-</td></tr>
        <tr><td>@clickicon</td><td>点击图标事件</td><td>返回参数：1.e</td><td>-</td><td>-</td></tr>
        <tr><td>getValue()</td><td>获取值的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
        <tr><td>setValue()</td><td>设置值的方法</td><td>传入参数：1.要设置的值</td><td>-</td><td>-</td></tr>
        <tr><td>focus()</td><td>焦点定位的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
        </tbody>
      </table>
      <div style="clear: both"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'input',
    data () {
      return {
        input1:"这是初始值",
        textarea1:"",
        input2:"",
        textarea2:"",
        input3:"",
        textarea3:"textarea",
        input5:"input",
        textarea5:"textarea",
        input4:"",
        setGetValue:"",
        input6:'333',
        input7:'-333',
        input8:'-3.33',
        input9:'0000',
      }
    },
    methods:{
      clickSetValue:function(){
        this.$refs.inputSetGet.setValue(this.setGetValue);
      },
      clickGetValue:function(){
        this.setGetValue=this.$refs.inputSetGet.getValue();
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
</script>
