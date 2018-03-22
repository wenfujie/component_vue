<template>
  <div class="component_example">
    <h1>Switch 开关</h1>
    <h2>常用的操作</h2>
    <div class="item">
      <h4>基本用法</h4>
      <div class="item-content">
        <zoehis-switch
          v-model="value1"
          @change="change1">
        </zoehis-switch>
        <span style="margin-left: 20px"></span>
        <zoehis-switch
          v-model="value2"
          oncolor="#13ce66"
          offcolor="#dcdcdc"
          ontext="ON"
          offtext="OFF">
        </zoehis-switch>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-switch
              v-model=&quot;value1&quot;
              @change=&quot;change1&quot;&gt;
            &lt;/zoehis-switch&gt;

            &lt;zoehis-switch
              v-model=&quot;value2&quot;
              oncolor=&quot;#13ce66&quot;
              offcolor=&quot;#dcdcdc&quot;
              ontext=&quot;ON&quot;
              offtext=&quot;OFF&quot;&gt;
            &lt;/zoehis-switch&gt;

            data(){
              return {
                value1: true,
                value2: true,
              }
            },
            methods: {
              changeValue(value){
                console.log(value)
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          <div>
            <h4>Attributes</h4>
              <ul>
                <li>{ String }　[ oncolor='#00A3E7' ]　switch 打开时的背景色</li>
                <li>{ String }　[ offcolor='#FFF' ]　switch 关闭时的背景色</li>
                <li>{ String }　[ ontext='' ]　switch 打开时的文字</li>
                <li>{ String }　[ offtext='' ]　switch 关闭时的文字</li>
              </ul>
            <h4>Events</h4>
            <ul>
              <li>{ Function }　change　switch状态发生变化时的回调函数 回调参数为新状态的值</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>扩展的 value 类型</h4>
      <div class="item-content">
        <zoehis-switch
          v-model="value3"
          onvalue="100"
          offvalue="1"
          @change="change2"
        >
        </zoehis-switch>
        <span style="margin-left: 20px;">值为：{{ value3 }}</span>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-switch
              v-model=&quot;value3&quot;
              onvalue=&quot;100&quot;
              offvalue=&quot;1&quot;
              @change=&quot;change2&quot;
            &gt;
            &lt;/zoehis-switch&gt;

            data(){
              return {
                value3: '100'
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          <h4>Attributes</h4>
          <ul>
            <li>{ Boolean / String / Number }　[ onvalue=true ]　switch 打开时的值</li>
            <li>{ Boolean / String / Number }　[ offvalue=false ]　switch 打开时的值</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>禁用状态</h4>
      <div class="item-content">
        <zoehis-switch
          v-model="value4"
          disabled>
        </zoehis-switch>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-switch
              v-model=&quot;value4&quot;
              disabled
            &lt;/zoehis-switch&gt;

            data(){
              return {
                value4: true
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          <h4>Attributes</h4>
          <ul>
            <li>{ Boolean }　[ disabled=false ]　是否禁用</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value1: true,
        value2: true,
        value3: '100',
        value4: true,
      }
    },
    methods: {
      change1(value){
        console.log(value)
      },
      change2(value){
        console.log(value)
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
</script>
