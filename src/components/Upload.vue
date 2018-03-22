<template>
  <div class="component_example">
    <h1>Upload 上传</h1>
    <h2>常用的操作</h2>
    <div class="item">
      <h4>基本用法</h4>
      <div class="item-content">
        <zoehis-upload
          action="/upload"
          :onsuccess="handlesuccess"
          :onprogress="handleprogress"
          :onerror="handleerror"
        >
          <zoehis-button size="small">点击上传</zoehis-button>
        </zoehis-upload>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>

            &lt;zoehis-upload
              action=&quot;/upload&quot;
              :onsuccess=&quot;handlesuccess&quot;
              :onprogress=&quot;handleprogress&quot;&gt;
              :onerror=&quot;handleerror&quot;&gt;
              &lt;zoehis-button size=&quot;small&quot;&gt;点击上传&lt;/zoehis-button&gt;
            &lt;/zoehis-upload&gt;

            methods: {
              handlesuccess(res, file){
                console.log('success');
              },
              handleprogress(res, file){
                console.log('progress...');
              },
              handleerror(err,file){
                console.log('error')
              }
            }
          </code></pre>
        </div>
        <div class="item-desc">
          <h4>Attributes</h4>
          <ul>
            <li>{ String }　[ action ]　必选参数, 上传的地址</li>
            <li>{ Boolean }　[ multiple=true ]　可选参数, 是否支持多选文件</li>
            <li>{ Function }　[ onsuccess ]　可选参数, 文件上传成功时的钩子</li>
            <li>{ Function }　[ onerror ]　可选参数, 文件上传失败时的钩子</li>
            <li>{ Function }　[ progress ]　可选参数, 文件上传时的钩子</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
      handlesuccess(res, file){
        console.log('success');
      },
      handleprogress(res, file){
        console.log('progress...');
      },
      handleerror(err,file){
        console.log('error')
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
</script>


