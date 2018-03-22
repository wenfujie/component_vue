<template>
  <div>
    <div class="component_example">
      <h1>Dialog 弹窗</h1>
      <h2>常用的弹窗操作</h2>
      <div class="item">
        <h4>基本用法</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible=true">点击显示弹窗</zoehis-button>
          <zoehis-button @clickenter="dialogVisible1=true">点击显示弹窗（无标题跟没有按钮的）</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible" title="这是标题" width="420" height="200">
            <form action="#">
              <zoehis-input>姓名</zoehis-input><br>
              <zoehis-input>密码</zoehis-input>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
              <p>aa</p>
            </form>
          </zoehis-dialog>
          <zoehis-dialog :visible.sync="dialogVisible1" title="" :close-on-click-modal="true">
            这是没有标题也没有按钮的
            <form action="#">
              <zoehis-radio v-model="radio" label="1">男</zoehis-radio>
              <zoehis-radio v-model="radio" label="2">女</zoehis-radio><br>
              <zoehis-checkbox>复选</zoehis-checkbox>
            </form>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible&quot;title=&quot;这是标题&quot;&gt;
              &lt;form action=&quot;#&quot;&gt;
                &lt;zoehis-input&gt;姓名&lt;/zoehis-input&gt;&lt;br&gt;
                &lt;zoehis-input&gt;密码&lt;/zoehis-input&gt;&lt;br&gt;
              &lt;/form&gt;
              &lt;div slot=&quot;footer&quot; class=&quot;dialog-footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;dialogVisible=false&quot;&gt;关闭&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible1&quot; title=&quot;&quot; :close-on-click-modal=&quot;true&quot;&gt;
              这是没有标题也没有按钮的
              &lt;zoehis-radio v-model=&quot;radio&quot; label=&quot;1&quot;&gt;男&lt;/zoehis-radio&gt;
              &lt;zoehis-radio v-model=&quot;radio&quot; label=&quot;2&quot;&gt;女&lt;/zoehis-radio&gt;&lt;br&gt;
              &lt;zoehis-checkbox&gt;复选&lt;/zoehis-checkbox&gt;
            &lt;/zoehis-dialog&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            visible变量表示是否显示 Dialog，需要用.sync 修饰符；类型为Boolean类型；通过改变visible变量的值来显示隐藏弹窗 <br>
            div slot="footer" 表示的是按钮区,没有设置，说明没有按钮<br>
            标题可以用属性title表示  默认为“提示”，设置为 title=""时没有标题
          </div>
        </div>
      </div>
      <div class="item">
        <h4>关闭弹窗属性</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible2=true">点击显示弹窗</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible2" :close-on-click-modal="true" :close-on-press-escape="true">
            支持快捷键Esc关闭弹窗(默认为true)、支持点击弹窗外关闭弹窗
            <zoehis-input>姓名</zoehis-input><br>
            <zoehis-input>密码</zoehis-input><br>
            <zoehis-checkbox>记住密码</zoehis-checkbox>
            <div slot="footer" class="dialog-footer">
              <zoehis-button @clickenter="dialogVisible2=false">关闭</zoehis-button>
            </div>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible2&quot; :close-on-click-modal=&quot;true&quot; :close-on-press-escape=&quot;true&quot;&gt;
              支持快捷键Esc关闭弹窗(默认为true)、支持点击弹窗外关闭弹窗
              &lt;zoehis-input&gt;姓名&lt;/zoehis-input&gt;&lt;br&gt;
              &lt;zoehis-input&gt;密码&lt;/zoehis-input&gt;&lt;br&gt;
              &lt;zoehis-checkbox&gt;记住密码&lt;/zoehis-checkbox&gt;
              &lt;div slot=&quot;footer&quot; class=&quot;dialog-footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;dialogVisible2=false&quot;&gt;关闭&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            close-on-click-modal：点击弹窗外关闭弹窗 <br>
            close-on-press-escape：按快捷键esc关闭弹窗
          </div>
        </div>
      </div>
      <div class="item">
        <h4>关闭弹窗前事件</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible3=true">点击显示弹窗</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible3" :close-on-click-modal="true" :before-close="beforeClick">
            属性before-close为关闭弹窗前事件<br>
            （快捷键esc关闭弹窗、点击遮罩关闭弹窗） <br>
            <zoehis-input>密码</zoehis-input>
            <zoehis-button>保存密码</zoehis-button>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible3&quot; :close-on-click-modal=&quot;true&quot; :before-close=&quot;beforeClick&quot;&gt;
              属性beforeClose为关闭弹窗前事件&lt;br&gt;
              （快捷键esc关闭弹窗、点击遮罩关闭弹窗） &lt;br&gt;
              &lt;zoehis-input&gt;密码&lt;/zoehis-input&gt;
              &lt;zoehis-button&gt;保存密码&lt;/zoehis-button&gt;
            &lt;/zoehis-dialog&gt;
            &lt;script&gt;
            methods:{
              beforeClick(hide){
                if (confirm(&quot;内容还未保存，是否直接关闭弹窗&quot;) == true) {
                  hide();
                }
              }
            }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            before-close：表示关闭弹窗前会触发的方法（参数是关闭的方法）<br>
          </div>
        </div>
      </div>
      <div class="item">
        <h4>弹窗尺寸属性</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible4=true">点击显示弹窗</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible4" :width="width" :height="height">
            <zoehis-input>账号</zoehis-input><br>
            <zoehis-input>密码</zoehis-input>
            <div slot="footer">
              <zoehis-button>确认</zoehis-button>
            </div>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible4&quot;:width=&quot;width&quot; :height=&quot;height&quot;&gt;
              &lt;zoehis-input&gt;账号&lt;/zoehis-input&gt;&lt;br&gt;
              &lt;zoehis-input&gt;密码&lt;/zoehis-input&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button&gt;确认&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;
            &lt;script&gt;
            data(){
              return {
                width:200,
                height:200
              }
            },
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            :width/:height这两个属性分别用来设置宽度跟高度
          </div>
        </div>
      </div>
      <div class="item">
        <h4>弹窗Error区</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible5=true">点击显示弹窗</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible5">
            <zoehis-radio v-model="radio" label="1">读卡</zoehis-radio><br>
            <zoehis-radio v-model="radio" label="2"></zoehis-radio><zoehis-input placeholder="请输入卡号"></zoehis-input>
            <div slot="footer">
              <zoehis-button @clickenter="errorShow=!errorShow">显示关闭Error</zoehis-button>
            </div>
            <div slot="error" v-if="errorShow">这是Error详细区</div>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible5&quot;&gt;
              &lt;zoehis-radio v-model=&quot;radio&quot; label=&quot;1&quot;&gt;读卡&lt;/zoehis-radio&gt;&lt;br&gt;
              &lt;zoehis-radio v-model=&quot;radio&quot; label=&quot;2&quot;&gt;&lt;/zoehis-radio&gt;
              &lt;zoehis-input placeholder=&quot;请输入卡号&quot;&gt;&lt;/zoehis-input&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;errorShow=!errorShow&quot;&gt;显示关闭Error&lt;/zoehis-button&gt;
              &lt;/div&gt;
              &lt;div slot=&quot;error&quot; v-if=&quot;errorShow&quot;&gt;这是Error详细区&lt;/div&gt;
            &lt;/zoehis-dialog&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            slot='error'表示显示error的详细区
          </div>
        </div>
      </div>
      <div class="item">
        <h4>弹窗多层</h4>
        <div class="item-content">
          <zoehis-button @clickenter="dialogVisible6=true">显示弹窗</zoehis-button>
          <zoehis-dialog :visible.sync="dialogVisible6" :width="width1" :height="height1">
            <zoehis-input placeholder="请输入卡号" ref="inputCard"></zoehis-input>
            <zoehis-button @clickenter="dialogVisible7=true">读卡</zoehis-button>
            <div slot="footer">
              <zoehis-button @clickenter="errorShow=!errorShow">显示/关闭Error</zoehis-button>
              <zoehis-button @clickenter="dialogVisible6=false">关闭弹窗</zoehis-button>
            </div>
            <div slot="error" v-if="errorShow">这是Error详细区</div>
          </zoehis-dialog>
          <zoehis-dialog :visible.sync="dialogVisible7">
            <zoehis-input placeholder="请输入完成" ref="getCard"></zoehis-input>
            <div slot="footer">
              <zoehis-button @clickenter="dialogVisible7=false">关闭</zoehis-button>
              <zoehis-button @clickenter="successCard">完成</zoehis-button>
            </div>
          </zoehis-dialog>
        </div>
        <div class="item-detail">
          <div class="item-code">
          <pre><code>
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible6&quot; :width=&quot;width1&quot; :height=&quot;height1&quot;&gt;
              &lt;zoehis-input placeholder=&quot;请输入卡号&quot; ref=&quot;inputCard&quot;&gt;&lt;/zoehis-input&gt;
              &lt;zoehis-button @clickenter=&quot;dialogVisible7=true&quot;&gt;读卡&lt;/zoehis-button&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;errorShow=!errorShow&quot;&gt;显示/关闭Error&lt;/zoehis-button&gt;
                &lt;zoehis-button @clickenter=&quot;dialogVisible6=false&quot;&gt;关闭弹窗&lt;/zoehis-button&gt;
              &lt;/div&gt;
              &lt;div slot=&quot;error&quot; v-if=&quot;errorShow&quot;&gt;这是Error详细区&lt;/div&gt;
            &lt;/zoehis-dialog&gt;
            &lt;zoehis-dialog :visible.sync=&quot;dialogVisible7&quot;&gt;
              &lt;zoehis-input placeholder=&quot;请输入完成&quot; ref=&quot;getCard&quot;&gt;&lt;/zoehis-input&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;dialogVisible7=false&quot;&gt;关闭&lt;/zoehis-button&gt;
                &lt;zoehis-button @clickenter=&quot;successCard&quot;&gt;完成&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;
            &lt;script&gt;
            methods:{
              successCard(hide){
                this.dialogVisible7=false;
                this.$refs.inputCard.setValue(this.$refs.getCard.getValue());
              }
            }
            &lt;/script&gt;
          </code></pre>
          </div>
          <div class="item-desc">
            可以弹多个弹窗，只需另外定义一个弹窗，直接显示即可
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
          <tr><td>:visible.sync</td><td>是否显示 Dialog，用.sync 修饰符</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>title</td><td>Dialog 的标题,title=""代表不显示标题，没有title，默认显示“提示”</td><td>string</td><td>-</td><td>"提示"</td></tr>
          <tr><td>modal</td><td>是否显示黑色遮罩</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>close-on-click-modal</td><td>点击遮罩是否关闭弹窗</td><td>boolean</td><td>true/false</td><td>false</td></tr>
          <tr><td>close-on-press-escape</td><td>按快捷键esc是否关闭弹窗</td><td>boolean</td><td>true/false</td><td>true</td></tr>
          <tr><td>error-slide-down-name</td><td>用于详细错误区的描述文字(展开)</td><td>string</td><td>-</td><td>展开详情信息</td></tr>
          <tr><td>error-slide-up-name</td><td>用于详细错误区的描述文字(收起)</td><td>string</td><td>-</td><td>收起详情信息</td></tr>
          <tr><td>headerclose</td><td>显示头部的关闭按钮</td><td>Boolean</td><td>-</td><td>false</td></tr>
          <tr><td>:width</td><td>Dialog的宽度(不支持百分比)</td><td>number/string</td><td>-</td><td>420</td></tr>
          <tr><td>:height</td><td>Dialog的高度（不支持百分比）</td><td>number/string</td><td>-</td><td>235</td></tr>
          <tr><td>:before-close="beCloseEvn(hide)"</td><td>Dialog 关闭前的方法</td><td>返回参数：1.hide，若直接执行的话hide()就关闭弹窗</td><td>-</td><td>-</td></tr>
          <tr><td>slot="footer"</td><td>显示底部按钮</td><td>-</td><td>-</td><td>-</td></tr>
          <tr><td>slot="error"</td><td>显示错误区</td><td>-</td><td>-</td><td>-</td></tr>
          <tr><td>@open="openEvn"</td><td>Dialog显示时触发的事件</td><td>无返回参数</td><td>-</td><td>-</td></tr>
          <tr><td>@close="closeEvn"</td><td>Dialog关闭时触发的事件</td><td>无返回参数</td><td>-</td><td>-</td></tr>
          <tr><td>@headerclose</td><td>点击头部关闭图标时触发的事件</td><td>无返回参数</td><td>-</td><td>-</td></tr>
          <tr><td>toggleErrorDetail(isShow)</td><td>展开error详细内容的方法</td><td>传入参数：1.isShow（若为true展开error，为false关闭error内容）</td><td>-</td><td>-</td></tr>
          <tr><td>show()</td><td>显示弹窗的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
          <tr><td>hide()</td><td>关闭弹窗的方法</td><td>无传入参数</td><td>-</td><td>-</td></tr>
          <tr><td>scrollMove({left:0,top:0})</td><td>弹窗滚动条的位置</td><td>{left:0,top:0}</td><td>-</td><td>-</td></tr>
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
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        dialogVisible5:false,
        dialogVisible6:false,
        dialogVisible7:false,
        errorShow:false,
        title:"hs",
        radio:"1",
        width:300,
        height:200,
        width1:700,
        height1:500
      }
    },
    methods:{
      beforeClick(hide){
        if(confirm("内容还未保存，是否直接关闭弹窗")==true){
          hide();
        }
      },
      successCard(hide){
        this.dialogVisible7=false;
        this.$refs.inputCard.setValue(this.$refs.getCard.getValue());
      }
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
</script>
