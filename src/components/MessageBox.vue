<template>
  <div class="component_example">
    <h1>MessageBox 弹窗提示</h1>
    <h2>常用的操作</h2>
    <div class="item" id="textId">
      <h4>基本用法</h4>
      <div class="item-content">
        <zoehis-button @clickenter="myClickEnterEve">打开messageBox</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            methods:{
              myClickEnterEve:function(evt){
                this.$messageBox({
                  type:"success",
                  preventOverId:"textId",//生成弹窗所插入的位置 的dom节点 ID
                  message:"这是要提示的内容!&lt;h1&gt;这是包含h1标签的&lt;/h1&gt;"
                });
              },
            },
          </code></pre>
        </div>
        <div class="item-desc">
          调用this.$messageBox方法即可打开消息的提示（通过Vue.prototype.$messageBox = MessageBox;扩展了Vue的$messageBox方法）；
          参数是一个对象，属性message：表示messageBox的提示内容；可以包含一些html元素<br>
          type:表示图标的类型 (success/warn/question/error,默认""为空，代表无图标) <br>
          preventOverId: 要插入位置容器的ID 默认是插入到body下，特殊情况下才使用这个元素
        </div>
      </div>
    </div>
    <div class="item">
      <h4>常用变量属性</h4>
      <div class="item-content">
        <zoehis-button @clickenter="myClickEnterEve1">打开messageBox</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            methods:{
              myClickEnterEve1:function(evt){
                var g=this;
                this.$messageBox({
                  title:"这是标题",
                  closeOnClickModal:true,//点击遮罩是否关闭messageBox，默认false
                  closeOnPressEscape:false,//快捷键Esc关闭messageBox,默认true
                  showConfirmButton:true,//是否显示确认按钮，默认显示
                  showNoButton:true,//是否显示 “否”按钮，默认不显示，主要用于question类型的messageBox
                  showCancelButton:true,//是否显示取消按钮，默认显示
                  confirmButtonText: '确认按钮',//确认按钮的显示文本，默认"确认"
                  noButtonText: '否按钮',      //否按钮的显示文本，默认"否"
                  cancelButtonText: '取消按钮',//取消按钮的显示文本，默认"取消"
                  type:"success",
                  message:"这是要提示的内容!"
                });
              },
            },
          </code></pre>
        </div>
        <div class="item-desc">
          参数如左边的注释说明 <br>
          注：title=''时，将不存在标题部分
        </div>
      </div>
    </div>
    <div class="item">
      <h4>常用事件属性</h4>
      <div class="item-content">
        <zoehis-button @clickenter="myClickEnterEve2">打开messageBox</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            methods:{
              myClickEnterEve2:function(evt){
                var g=this;
                this.$messageBox({
                  title:"事件说明",
                  message:"1.关闭前事件.beforeClose；2.关闭后的事件回调.callback；请看控制台的输出",
                  beforeClose:function(action,thisVm,done){
                    console.log("这是关闭前事件.beforeClose")
                    done();
                  },
                  callback:function(action,thisVm){
                    console.log("关闭后的事件回调.callback")
                  },
                });
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">
          （1）beforeClose:function(action,thisVm,done);MessageBox 关闭前的回调，会暂停实例的关闭<br>
          action的值为："confirm/no/cancel"；<br>
          thisVm：为 MessageBox 实例，可以通过它访问实例上的属性和方法；<br>
          done：用于关闭 MessageBox 实例 <br>
          （2）callback:function(action,thisVm); MessageBox 关闭后的回调<br>
          action的值为："confirm/no/cancel"；<br>
          thisVm：为 MessageBox 实例，可以通过它访问实例上的属性和方法；<br>
        </div>
      </div>
    </div>
    <div class="item">
      <h4>常见的几种messageBox提示框</h4>
      <div class="item-content">
        <zoehis-button @clickenter="myClickEnterEve3" type="primary">success</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve4">error</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve5">warn</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve6">question</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve7">confirm</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve8">confirm2</zoehis-button>
        <zoehis-button @clickenter="myClickEnterEve9">timeoutPopup</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            methods:{
              myClickEnterEve3:function(evt){
                this.$messageBox.success("这是一个成功提示！（success类型）",{
                  confirmButtonText:"自定义按钮文本"
                });
              },
              myClickEnterEve4:function(evt){
                this.$messageBox.error("这是一个错误提示！（error类型）");
              },
              myClickEnterEve5:function(evt){
                this.$messageBox.warn("这是一个警告！（warn类型）");
              },
              myClickEnterEve6:function(evt){
                this.$messageBox.question("有数据还未保存，是否进行保存并跳转？（question类型）");
              },
              myClickEnterEve7:function(evt){
                this.$messageBox.confirm("确定要保存当前数据吗?（confirm类型）");
              },
              myClickEnterEve8:function(evt){
                this.$messageBox.confirm2("是否要保存当前数据吗?（confirm2类型)");
              },
              myClickEnterEve9:function(evt){
                this.$messageBox.timeoutPopup("这个是会自动关闭弹窗的?（timeoutPopup类型)");
              }
            }
          </code></pre>
        </div>
        <div class="item-desc">
          使用this.$messageBox.success(message,options)即可得到某一类型的messageBox提示框； <br>
          参数 message:代表要显示的内容 <br>
          options: 代表messageBox提示框的配置参数
        </div>
      </div>
    </div>
    <div class="item">
      <h4>messageBox与dialog的合作</h4>
      <div class="item-content">
        <zoehis-button @clickenter="showMsgSuccess">showMsgSuccess</zoehis-button>
        <zoehis-dialog :visible.sync="visibleDlg1" :width="width" :height="height">
          这是dialog弹窗1 <br>
          <zoehis-input placeholder="请输入卡号"></zoehis-input>
          <zoehis-button>读卡</zoehis-button>
          <div slot="footer">
            <zoehis-button @clickenter="dlgSure" type="primary">确认</zoehis-button>
            <zoehis-button @clickenter="visibleDlg1=false">关闭</zoehis-button>
          </div>
        </zoehis-dialog>
        <zoehis-dialog :visible.sync="visibleDlg2"  :width="width1" :height="height1">
          这是dialog弹窗2 <br>
          <zoehis-input placeholder="请输入姓名"></zoehis-input>
          <div slot="footer">
            <zoehis-button @clickenter="visibleDlg2=false">关闭</zoehis-button>
          </div>
        </zoehis-dialog>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-button @clickenter=&quot;showMsgSuccess&quot;&gt;showMsgSuccess&lt;/zoehis-button&gt;
            &lt;zoehis-dialog :visible.sync=&quot;visibleDlg1&quot; :width=&quot;width&quot; :height=&quot;height&quot;&gt;
              这是dialog弹窗1 &lt;br&gt;
              &lt;zoehis-input placeholder=&quot;请输入卡号&quot;&gt;&lt;/zoehis-input&gt;
              &lt;zoehis-button&gt;读卡&lt;/zoehis-button&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;dlgSure&quot; type=&quot;primary&quot;&gt;确认&lt;/zoehis-button&gt;
                &lt;zoehis-button @clickenter=&quot;visibleDlg1=false&quot;&gt;关闭&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;
            &lt;zoehis-dialog :visible.sync=&quot;visibleDlg2&quot;  :width=&quot;width1&quot; :height=&quot;height1&quot;&gt;
              这是dialog弹窗2 &lt;br&gt;
              &lt;zoehis-input placeholder=&quot;请输入姓名&quot;&gt;&lt;/zoehis-input&gt;
              &lt;div slot=&quot;footer&quot;&gt;
                &lt;zoehis-button @clickenter=&quot;visibleDlg2=false&quot;&gt;关闭&lt;/zoehis-button&gt;
              &lt;/div&gt;
            &lt;/zoehis-dialog&gt;

            &lt;script&gt;
            methods:{
              showMsgSuccess:function () {
                this.visibleDlg1 = true;
              },
              dlgSure:function () {
                let vThis = this;
                this.$messageBox.success(&quot;这是个成功的提示！&quot;, {
                  showCancelButton: true,
                  confirmButtonText: &#x27;第二个弹窗&#x27;,
                  beforeClose: function (action, thisVm, done) {
                    if (action == &quot;confirm&quot;) {
                      vThis.visibleDlg2 = true
                    } else {
                      done();
                    }
                  }
                });
              }
            }
            &lt;/script&gt;
          </code></pre>
        </div>
        <div class="item-desc">
          messageBox永远只能显示一个；而dialog弹窗可以显示很多个 <br>
          所以用可以两个结合着使用
        </div>
      </div>
    </div>
    <div class="item">
      <h4>错误详情区</h4>
      <div class="item-content">
        <zoehis-button @clickenter="showMsgError">showMsgError</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            methods:{
              showMsgError:function(){
                this.$messageBox.error("这是个带详情的错误的提示！",{
                  errorMessage:"这是错误的详细内容！",
                  errorSlideDown:false//错误详情是否展开，true代表展开，false代表关闭
                });
              }
            }
          </code></pre>
        </div>
        <div class="item-desc">
          errorMessage:代表的是错误的详细内容 <br>
          errorSlideDown:代表错误详细是否展开，true代表展开，false代表关闭（只有errorMessage!=""才有效）
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
        <tr><td>title</td><td>MessageBox 标题</td><td>string</td><td>-</td><td>提示</td></tr>
        <tr><td>message</td><td>MessageBox 消息正文内容</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>type</td><td>消息类型，用于显示图标</td><td>string</td><td>success/error/warn/question</td><td>-</td></tr>
        <tr><td>customClass</td><td>messageBox的自定义class</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>showConfirmButton</td><td>是否显示确定按钮</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>showNoButton</td><td>是否显示否按钮</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>showCancelButton</td><td>是否显示取消按钮</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>confirmButtonText</td><td>确定按钮的文本内容</td><td>string</td><td>-</td><td>确认</td></tr>
        <tr><td>confirmType</td><td>确认弹窗按钮文本内容不同,"1":确认/取消  "2"是/否</td><td>string</td><td>1/2</td><td>1</td></tr>
        <tr><td>noButtonText</td><td>是否显示否按钮</td><td>string</td><td>-</td><td>否</td></tr>
        <tr><td>cancelButtonText</td><td>是否显示取消按钮</td><td>string</td><td>-</td><td>取消</td></tr>
        <tr><td>closeOnClickModal</td><td>是否可通过点击遮罩关闭 MessageBox</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>closeOnPressEscape</td><td>是否可通过按下 ESC 键关闭 MessageBox</td><td>boolean</td><td>true/false</td><td>true</td></tr>
        <tr><td>preventOverId</td><td>设置弹出框将要插入的容器（默认插入到body下），该值为ID，当前页面都是唯一的不能重复</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>errorMessage</td><td>错误的详细内容</td><td>string</td><td>-</td><td>-</td></tr>
        <tr><td>errorSlideDown</td><td>错误详细是否展开，true代表展开，false代表关闭（只有errorMessage!=""才有效）</td><td>string</td><td>-</td><td>false</td></tr>
        <tr><td>isSetTimeout</td><td>是否启用自动关闭弹窗功能，true代表启用 false代表不启用</td><td>boolean</td><td>true/false</td><td>false</td></tr>
        <tr><td>timeoutNum</td><td>代表多少毫米后自动关闭弹窗(默认1000毫秒)</td><td>number</td><td>-</td><td>1000</td></tr>
        <tr>
          <td>callback</td><td>MessageBox 关闭后的回调</td><td>function。返回参数：1.action 按钮的类型（'confirm/no/cancel'）。2. thisVm 为 MessageBox 实例，可以通过它访问实例上的属性和方法</td>
          <td>-</td><td>-</td>
        </tr>
        <tr>
          <td>beforeClose</td><td>MessageBox 关闭前的回调，会暂停实例的关闭</td>
          <td>function。返回参数：1.action 按钮的类型（'confirm/no/cancel'）。2. thisVm 为 MessageBox 实例，可以通过它访问实例上的属性和方法 3.done 用于关闭 MessageBox 实例</td>
          <td>-</td><td>-</td>
        </tr>
        <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
        </tbody>
      </table>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'messageBox',
    data() {
      return {
        width:650,
        height:450,
        width1:350,
        height1:200,
        visibleDlg1:false,
        visibleDlg2:false
      }
    },
    methods:{
      showMsgError:function(){
        this.$messageBox.error("这是个带详情的错误的提示！",{
          errorMessage:"这是错误的详细内容！",
          errorSlideDown:false//错误详情是否展开，true代表展开，false代表关闭
        });
      },

      showMsgSuccess:function(){
        this.visibleDlg1=true;
      },
      dlgSure:function(){
        let vThis = this;
        this.$messageBox.success("这是个成功的提示！",{
          showCancelButton: true,
          confirmButtonText: '第二个弹窗',
          beforeClose:function(action,thisVm,done){
            if(action=="confirm"){
              vThis.visibleDlg2=true
            }else {
              done();
            }
          }
        });
      },
      myClickEnterEve:function(evt){
        var g=this;
        this.$messageBox({
          type:"success",
          preventOverId:"textId",
          message:"这是要提示的内容!<h1>这是包含h1标签的</h1>",
          customClass:"asdkjhaksd asdasd"
        });
      },
      myClickEnterEve1:function(evt){
        var g=this;
        this.$messageBox({
          title:"这是标题",
          closeOnClickModal:true,//点击遮罩是否关闭messageBox，默认false
          closeOnPressEscape:false,//快捷键Esc关闭messageBox,默认true
          showConfirmButton:true,//是否显示确认按钮，默认显示
          showNoButton:true,//是否显示 “否”按钮，默认不显示，主要用于question类型的messageBox
          showCancelButton:true,//是否显示取消按钮，默认显示
          confirmButtonText: '确认按钮',//确认按钮的显示文本
          noButtonText: '否按钮',      //否按钮的显示文本
          cancelButtonText: '取消按钮',//取消按钮的显示文本
          type:"success",
          message:"这是要提示的内容!"
        });
      },
      myClickEnterEve2:function(evt){
        var g=this;
        this.$messageBox({
          title:"事件说明",
          message:"1.关闭前事件.beforeClose；2.关闭后的事件回调.callback；请看控制台的输出",
          beforeClose:function(action,thisVm,done){
            console.log("这是关闭前事件.beforeClose")
            done();
          },
          callback:function(action,thisVm){
            console.log("关闭后的事件回调.callback")
          }
        });
      },
      myClickEnterEve3:function(evt){
        this.$messageBox.success("这是一个成功提示！（success类型）",{
          confirmButtonText:"自定义按钮文本"
        });
      },
      myClickEnterEve4:function(evt){
        this.$messageBox.error("这是一个错误提示！（error类型）");
      },
      myClickEnterEve5:function(evt){
        this.$messageBox.warn("这是一个警告！（warn类型）");
      },
      myClickEnterEve6:function(evt){
        this.$messageBox.question("有数据还未保存，是否进行保存并跳转？（question类型）");
      },
      myClickEnterEve7:function(evt){
        this.$messageBox.confirm("确定要保存当前数据吗?（confirm类型）");
      },
      myClickEnterEve8:function(evt){
        this.$messageBox.confirm2("是否要保存当前数据吗?（confirm2类型）");
      },
      myClickEnterEve9:function(evt){
        this.$messageBox.timeoutPopup("这个是会自动关闭弹窗的?（timeoutPopup类型)");
      }

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
