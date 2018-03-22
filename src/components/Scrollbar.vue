<template>

  <div id="test">
    <div class="component_example">
      <h1>Scrollbar 虚拟滚动条</h1>
      <h2>常用的滚动条操作</h2>
      <div class="item">
        <h4>方法与事件</h4>
        <div class="item-content">
          <div>当前滚动条位置X:{{scrollLeft}};y:{{scrollTop}}</div>
            <zoehis-scrollbar ref="scrollbarTest" @scrollafter="scrollafter" :noresize="true"  wrap-class="test1_scrollbar_wrap" class="test1_scrollbar_container">
              <div class="test1">
                滚动条接下来是什么
              </div>
            </zoehis-scrollbar>
          <zoehis-button @clickenter="clickenter" class="test_button">设置滚动条位置</zoehis-button>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-scrollbar ref=&quot;scrollbarTest&quot; @scrollafter=&quot;scrollafter&quot; :noresize=&quot;true&quot;  wrap-class=&quot;test1_scrollbar_wrap&quot; class=&quot;test1_scrollbar_container&quot;&gt;
              &lt;div class=&quot;test1&quot;&gt;
               滚动条接下来是什么
              &lt;/div&gt;
            &lt;/zoehis-scrollbar&gt;
            &lt;zoehis-button @clickenter=&quot;clickenter&quot; class=&quot;test_button&quot;&gt;设置滚动条位置&lt;/zoehis-button&gt;
            &lt;style&gt;
            .test1_scrollbar_wrap{height: 100px;}
            .test1_scrollbar_container{ width: 100px;border: 1px solid red;}
            .test1{border: 1px solid yellow;width: 200px;height: 400px;}
            &lt;/style&gt;
            &lt;script&gt;
              methods:{
                scrollafter:function(wrap){
                  console.log(wrap);
                  const [h,w,sh,sw,st]=[wrap.clientHeight,wrap.clientWidth,wrap.scrollHeight,wrap.scrollWidth,wrap.scrollTop];
                  this.scrollTop=st;
                  this.scrollLeft=wrap.scrollLeft;
                  if(st==0){
                  console.log(&quot;滚到顶部了&quot;);
                  return;
                  }
                  if(st&lt;10){
                  console.log(&quot;快滚到顶部了&quot;);
                  return;
                  }
                  if(sh-h-st==0){
                  console.log(&quot;滚到底部了&quot;);
                  return;
                  }
                  if(sh-h-st&lt;0){
                  console.log(&quot;滚到底部了&quot;);
                  return;
                  }
                },
                clickenter(){
                  this.$refs.scrollbarTest.move({top:100});
                }
              }
              &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            scrollresize:event 滚动条resize的时候触发的事件
            scrollafter:evnet，滚动后的事件，传入的参数是当前允许滚动的wrap
            move:function，设置滚动条位置，传入参数:Object 对象 ｛top：Number,left:Number｝
          </div>
        </div>
      </div>
      <div class="item">
          <h4>基本用法</h4>
          <div class="item-content">
            <zoehis-scrollbar :noresize="true"  wrap-class="test1_scrollbar_wrap" class="test1_scrollbar_container">
              <div class="test1">
                超长内容，哈哈哈哈哈
              </div>
            </zoehis-scrollbar>
          </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-scrollbar wrap-class=&quot;test1_scrollbar_wrap&quot; class=&quot;test1_scrollbar_container&quot;&gt;
              &lt;div class=&quot;test1&quot;&gt;
              超长内容，哈哈哈哈哈
              &lt;/div&gt;
            &lt;/zoehis-scrollbar&gt;
            &lt;style&gt;
            .test1_scrollbar_wrap{height: 100px;}
            .test1_scrollbar_container{ width: 100px;border: 1px solid red;}
            .test1{border: 1px solid yellow;width: 200px;height: 400px;}
            &lt;/style&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            wrapClass:装虚拟滚动条容器的样式，通常情况下都需要配置这个属性，外加一个当期需要用滚动条的容器的样式，如test1_scrollbar_container<br>
            noresize:属性为Boolean类型，默认false.如果滚动条container尺寸不会发生变化，最好设置它为true，可以优化性能<br>
            <img src="../assets/images/scroll_test1.jpg" style="width: 90%; height: auto;">
          </div>
        </div>
      </div>
      <div class="item">
      <h4>其他用法</h4>
      <div class="item-content">
        <zoehis-scrollbar tag="ul" wrap-class="test2_scrollbar_wrap" wrap-style="border: 1px solid red;" view-class="test2_scrollbar_view" view-style="margin:0" class="test2_scrollbar_container">
          <li class="test2">
            随着容器改变重新设置滚动条
          </li>
        </zoehis-scrollbar>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-scrollbar tag=&quot;ul&quot; wrap-class=&quot;test2_scrollbar_wrap&quot; wrap-style=&quot;border: 1px solid red;&quot; view-class=&quot;test2_scrollbar_view&quot; view-style=&quot;margin:0&quot; class=&quot;test2_scrollbar_container&quot;&gt;
            &lt;li class=&quot;test2&quot;&gt;
            随着容器改变重新设置滚动条
            &lt;/li&gt;
            &lt;/zoehis-scrollbar&gt;
            &lt;style&gt;
            .test2_scrollbar_wrap{height: 100px;box-sizing: border-box;}
            .test2_scrollbar_view{margin: 0;padding: 0;}
            .test2_scrollbar_container{width: 15%;max-width: 350px;}
            .test2{border: 1px solid yellow;width: 300px;height: 400px;}
            &lt;/style&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          tag:内容区域生成的dom元素，类型为string 默认为：div<br>
          wrapStyle:包含内容区域的style，支持对象、对象数组、字符串<br>
          viewClass:内容区域的Class,vue class 类型，常用字符串就够用了<br>
          viewStyle:内容区域的style，支持对象、对象数组、字符串<br>
          <img src="../assets/images/scroll_test2.jpg" style="width: 100%; height: auto;">
        </div>
      </div>
    </div>
      <div class="item" style="height: 40%">
        <h4>其他用法</h4>
        <div class="item-content" style="height: 100%">

          <zoehis-scrollbar   :wrap-style="maxheight" style="width: 150px;height: 100%">
            <div class="ceshi">
              随着容器改变重新设置滚动条
            </div>
          </zoehis-scrollbar>

        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        noresize:true,//不去监听容器大小是否改变
        scrollLeft:0,
        scrollTop:0,
        maxheight:'height: -webkit-calc(100% + 17px);',
      };
    },
    computed:{
//      wraph:function(){
//        console.log(`max-height:${this.maxheight}px`);
//        return `max-height:${this.maxheight}px`;
//      }
    },
    methods:{
      scrollafter:function(wrap){
        //console.log(wrap);
        const [h,w,sh,sw,st]=[wrap.clientHeight,wrap.clientWidth,wrap.scrollHeight,wrap.scrollWidth,wrap.scrollTop];
        this.scrollTop=st;
        this.scrollLeft=wrap.scrollLeft;
        if(st==0){
          console.log("滚到顶部了");
          return;
        }
        if(st<10){
          console.log("快滚到顶部了");
          return;
        }
        if(sh-h-st==0){
          console.log("滚到底部了");
          return;
        }
        if(sh-h-st<10){
          console.log("滚到底部了");
          return;
        }
      },
      clickenter(){
        this.$refs.scrollbarTest.move({top:100});
      }
    },

    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      $(window).resize(()=>{
        if(!this.resizeTime ){//做了400毫秒的延迟，优化性能
        this.resizeTime=setTimeout(()=>{
            //this.setOffsize();
      },400);
      }
    })
    }
    //components: { Bar }
  }
</script>
<style>
  .ceshiwrap{height: -webkit-calc(10% + 17px);}
  .ceshi{border: 1px solid yellow;width: 300px;height: 2000px;}
  .test1_scrollbar_wrap{height: 100px;}
  .test2_scrollbar_wrap{height: 100px;box-sizing: border-box;}
  .test2_scrollbar_view{margin: 0;padding: 0;}
</style>
<style scoped>
  #test{height: 100%;}
  .test_button{margin-top: 15px;}
  .test1_scrollbar_container{ width: 100px;border: 1px solid red; }
  .test1{border: 1px solid yellow;width: 200px;height: 400px;}
  .test2_scrollbar_container{width: 15%;max-width: 350px;}
  .test2{border: 1px solid yellow;width: 300px;height: 400px;}
</style>
