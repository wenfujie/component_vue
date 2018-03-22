<template>
  <div>

    <div class="component_example">
      <h1>Loading 加载</h1>
      <h2>常用的操作</h2>

      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <div class="loading_test_base" v-loading="loading1">
            我是loading测试组件我是loading测试组件我是loading测试组件我是loading测试组件
            我是loading测试组件我是loading测试组件我是loading测试组件我是loading测试组件
          </div>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;div class=&quot;loading_test_base&quot; v-loading=&quot;loading1&quot;&gt;
              我是loading测试组件我是loading测试组件我是loading测试组件我是loading
              测试组件我是loading测试组件我是loading测试组件我是loading测试组件我是
              loading测试组件
            &lt;/div&gt;

            &lt;script&gt;
              export default{
                data(){
                  return {
                    loading1: true
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在需要加载的节点标签上添加v-loading属性，并用该属性绑定一个boolean值，所绑定值为true
            时显示加载，否则不显示加载。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>有文案加载、显示遮罩</h4>
        <div class="item-content">
          <div class="loading_test_base" v-loading="loading1"
               loading-text="拼命加载中" :loading-shade="true">
            我是loading测试组件我是loading测试组件我是loading测试组件我是loading
            测试组件我是loading测试组件我是loading测试组件我是loading测试组件我是
            loading测试组件
          </div>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;div v-loading=&quot;loading1&quot; loading-text=&quot;拼命加载中&quot;:loading-shade="true"&gt;
              我是loading测试组件我是loading测试组件我是loading测试组件我是loading
              测试组件我是loading测试组件我是loading测试组件我是loading测试组件我是
              loading测试组件
            &lt;/div&gt;

            &lt;script&gt;
              export default{
                data(){
                  return {
                    loading1: true
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在绑定了v-loading属性的节点上添加loading-text属性，可在加载logo下添加文案，文案内容等于loading-text
            属性的值。（注意：loading-text只能配合v-loading属性使用）<br><br>
            遮罩：在绑定了v-loading属性的节点上添加:loading-shade="true"即可显示遮罩（默认不显示）。
          </div>
        </div>
      </div>

      <div class="item">
        <h4>加载遮罩至body</h4>
        <div class="item-content">
          <div class="loading_test_hasText" v-loading.body="loading2" loading-text="拼命加载中">
            我是loading测试组件我是loading测试组件我是loading测试组件
            我是loading测试组件我是loading测试组件我是loading测试组件
            我是loading测试组件
          </div>
          <div class="button" @click="changeLoadBody">
            加载/停止
          </div>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;div class=&quot;loading_test_hasText&quot; v-loading.body=&quot;loading2&quot;
              loading-text=&quot;拼命加载中&quot;&gt;
              我是loading测试组件我是loading测试组件我是loading测试组件
              我是loading测试组件我是loading测试组件我是loading测试组件
              我是loading测试组件
            &lt;/div&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在v-load属性加上修饰符.body可以让加载遮罩添加到body节点上，使得上下滚动滚动条时依然看得到加载。
            （可以点击加载按钮后上下滚动滚动条看效果）
          </div>
        </div>
      </div>

      <div class="item">
        <h4>全屏加载</h4>
        <div class="item-content">
          <div class="button" v-loading.fullscreen.lock="fullscreenLoading"
               @click="openFullScreen" loading-text="拼命加载中">
            全屏加载3秒
          </div>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;div  v-loading.fullscreen=&quot;fullscreenLoading&quot;
              @click=&quot;openFullScreen&quot; loading-text=&quot;拼命加载中&quot;&gt;
              全屏加载3秒
            &lt;/div&gt;

            &lt;script&gt;
              export default{
                data(){
                  return {
                    fullscreenLoading: false
                  }
                },

                methods: {
                  openFullScreen: function () {
                    this.fullscreenLoading = true;
                    setTimeout(() =&gt; {
                      this.fullscreenLoading = false;
                    }, 3000);
                  }
                }
              }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            使用：在v-loading属性后添加修饰符.fullscreen可以让加载变成全屏幕，v-loading.fullscreen
            跟v-loading一样绑定一个boolean值，所绑定值为true时显示全屏加载。（可点击按钮查看全屏加载效果）
          </div>
        </div>
      </div>

      <div class="item" id="loadingId">
        <h4>全局调用 this.$loading</h4>
        <div class="item-content">
          <zoehis-button @clickenter="openLoading">id=loading区域加载</zoehis-button>
          <zoehis-button @clickenter="openLoading1">body区域加载</zoehis-button>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            methods: {
              openLoading(){
                //返回的是这个对象
                let loadObj = this.$loading({
                  target:"#loadingId",//转转的区域
                  fullscreen:true,//满屏加载(只有在target没有设置的时候才有效果)
                  lock:true, //只有fullscreen=true的时候才生效（原理是将父元素overflow设置为hidden）
                  body:false,//是否加载层设置到body底下
                  text:"我再拼了老命加载...(3秒后关闭)",//显示的文本
                  customClass:"my-loading-class"//加载层自定义的class
                  setVisible: true,//设置是否有遮罩
                });
                setTimeout(()=>{
                  loadObj.close();
                },3000);
              },
              openLoading1(){
                let vThis=this;
                let loadObj2 = this.$loading({
                  fullscreen:true,//满屏加载(只有在target没有设置的时候才有效果)，注：为true时，只会存在一个加载器
                  lock:true, //只有fullscreen=true的时候才生效（原理是将父元素overflow设置为hidden）
                  body:true,//是否加载层设置到body底下
                });
                setTimeout(()=>{
                  loadObj2.close();
                },1000);
              }
            }
          </code></pre>
          </div>
          <div class="item-desc">
            target属性用来设置在哪加载的，内部是通过document.querySelector来获取对应的节点； <br>
            fullscreen与body结合着用，在body层加载的时候，才有效果，而且fullscreen为true，则只会存在一个loading对象 <br>
            lock:true, //只有fullscreen=true的时候才生效（原理是将父元素overflow设置为hidden）
            其他属性跟上面一样;<br>
            close()方法，用来关闭loading对象的
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
          <tr><td>v-loading</td><td>在节点上用该属性绑定一个boolean值，判断节点是否加载，true时加载</td><td>属性</td><td>-</td><td>-</td></tr>
          <tr><td>loading-text</td><td>在节点定义该属性，取值等于加载文案的内容（需要和v-loading组合使用）</td><td>属性</td><td>-</td><td>-</td></tr>
          <tr><td>v-loading.body</td><td>添加body修饰符，使遮罩加载至body上（用法与v-loading一样）</td><td>修饰符</td><td>-</td><td>-</td></tr>
          <tr><td>v-loading.fullscreen</td><td>添加fullscreen修饰符，全屏加载（用法与v-loading一样）</td><td>修饰符</td><td>-</td><td>-</td></tr>
          <tr>
            <td>target</td>
            <td>Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点</td>
            <td>object/string</td><td>-</td><td>document.body</td>
          </tr>
          <tr>
            <td>fullscreen</td>
            <td>满屏加载(只有在target没有设置的时候才有效果)</td>
            <td>boolean</td><td>true/false</td><td>true</td>
          </tr>
          <tr>
            <td>lock</td>
            <td>锁住滚动（原理是将父元素overflow设置为hidden）</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>body</td>
            <td>是否加载层设置到body底下</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>text</td>
            <td>显示文本</td>
            <td>string</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>customClass</td>
            <td>自定义class</td>
            <td>string</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>close()</td>
            <td>关闭loading对象</td>
            <td>function</td><td>-</td><td>-</td>
          </tr>
          <tr>
            <td>setVisible</td>
            <td>js调用时传入，是否显示遮罩</td>
            <td>boolean</td><td>true/false</td><td>false</td>
          </tr>
          <tr>
            <td>loading-shade</td>
            <td>在绑定v-loading的标签上:loading-shade="true"显示遮罩（不添加则不显示）。</td>
            <td>boolean</td><td>true/false</td><td>false</td>
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
    data(){
      return {
        loading1: true,
        loading2: false,
        fullscreenLoading: false
      }
    },

    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },

    methods: {
      openLoading(){
        //返回的是这个对象
        let loadObj = this.$loading({
          target:"#loadingId",//转转的区域
          fullscreen:true,//满屏加载(只有在target没有设置的时候才有效果)
          lock:true, //只有fullscreen=true的时候才生效（原理是将父元素overflow设置为hidden）
          body:false,//是否加载层设置到body底下
          text:"我再拼了老命加载...(3秒后关闭)",//显示的文本
          customClass:"my-loading-class",//加载层自定义的class
          setVisible: true,//设置是否有遮罩
        });
        setTimeout(()=>{
          loadObj.close();
        },3000);
      },
      openLoading1(){
        let vThis=this;
        let loadObj2 = this.$loading({
          fullscreen:true,//满屏加载(只有在target没有设置的时候才有效果)，注：为true时，只会存在一个加载器
          lock:true, //只有fullscreen=true的时候才生效（原理是将父元素overflow设置为hidden）
          body:true,//是否加载层设置到body底下
        });
        setTimeout(()=>{
          loadObj2.close();
        },1000);
      },
      openFullScreen: function () {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
      }, 3000);
      },

      changeLoadBody: function () {
        this.loading2 = !this.loading2;
      }

    }
  }
</script>
<style>
  .button{
    line-height: 35px;
    width: 120px;
    background-color: dodgerblue;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    display: inline-block;
  }
  .loading_test_base{
    width: 300px;
    height: 100px;
    border: 1px solid dodgerblue;
  }
  .loading_test_hasText{
    width: 300px;
    height: 100px;
    border: 1px solid dodgerblue;
    display: inline-block;
  }

</style>
