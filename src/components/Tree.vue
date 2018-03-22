<template>

  <div class="component_example">
    <h1>Tree 树形控件</h1>
    <h2>常用的操作</h2>
    <div class="item">
      <h4>基础用法</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data1"
          :props="props1"
          highlightcurrent
          defaultexpandall
          ref="tree0"
        ></zoehis-tree>

      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-tree
                :data=&quot;data1&quot;
                :props=&quot;props1&quot;
                highlightcurrent
                defaultexpandall
                ref=&quot;tree0&quot;
            &gt;&lt;/zoehis-tree&gt;

            props1: {
                label: &#x27;patientName&#x27;
            },
            data1: [{&quot;id&quot;:&quot;12300&quot;,&quot;pid&quot;:&quot;##&quot;,&quot;deptName&quot;:&quot;测试科&quot;,&quot;patientName&quot;: &quot;测试科&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;黄小晏的小弟&quot;,&quot;patientSex&quot;:&quot;2&quot;,&quot;inpRateTypeCode&quot;:&quot;4&quot;,&quot;patientId&quot;:&quot;11&quot;,&quot;bedNo&quot;:&quot;1&quot;,&quot;resiRateTypeName&quot;:&quot;体检（新）&quot;,&quot;patientSexName&quot;:&quot;女性&quot;,&quot;eventNo&quot;:&quot;44001&quot;,&quot;pid&quot;:&quot;110&quot;},{id: &quot;110&quot;, &quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;黄小晏&quot;,&quot;patientSex&quot;:&quot;2&quot;,&quot;inpRateTypeCode&quot;:&quot;4&quot;,&quot;patientId&quot;:&quot;11&quot;,&quot;bedNo&quot;:&quot;1&quot;,&quot;resiRateTypeName&quot;:&quot;体检（新）&quot;,&quot;patientSexName&quot;:&quot;女性&quot;,&quot;eventNo&quot;:&quot;44001&quot;,&quot;pid&quot;:&quot;12300&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;唐浩巍&quot;,&quot;patientSex&quot;:&quot;1&quot;,&quot;inpRateTypeCode&quot;:&quot;1&quot;,&quot;patientId&quot;:&quot;19&quot;,&quot;bedNo&quot;:&quot;2&quot;,&quot;resiRateTypeName&quot;:&quot;工伤&quot;,&quot;patientSexName&quot;:&quot;男性&quot;,&quot;eventNo&quot;:&quot;46001&quot;,&quot;pid&quot;:&quot;12300&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;秦好河&quot;,&quot;patientSex&quot;:&quot;1&quot;,&quot;inpRateTypeCode&quot;:&quot;F&quot;,&quot;patientId&quot;:&quot;0000002707&quot;,&quot;bedNo&quot;:&quot;3&quot;,&quot;resiRateTypeName&quot;:&quot;焦作市居民&quot;,&quot;patientSexName&quot;:&quot;男性&quot;,&quot;eventNo&quot;:&quot;0231205001&quot;,&quot;pid&quot;:&quot;12300&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;李文浩&quot;,&quot;patientSex&quot;:&quot;1&quot;,&quot;inpRateTypeCode&quot;:&quot;K&quot;,&quot;patientId&quot;:&quot;0000002847&quot;,&quot;bedNo&quot;:&quot;11&quot;,&quot;resiRateTypeName&quot;:&quot;新农合&quot;,&quot;patientSexName&quot;:&quot;男性&quot;,&quot;eventNo&quot;:&quot;0231219001&quot;,&quot;pid&quot;:&quot;12300&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;罗玉珍&quot;,&quot;patientSex&quot;:&quot;2&quot;,&quot;inpRateTypeCode&quot;:&quot;Y&quot;,&quot;patientId&quot;:&quot;0000002766&quot;,&quot;bedNo&quot;:&quot;12&quot;,&quot;resiRateTypeName&quot;:&quot;市直（职工）&quot;,&quot;patientSexName&quot;:&quot;女性&quot;,&quot;eventNo&quot;:&quot;0231212001&quot;,&quot;pid&quot;:&quot;12300&quot;},{&quot;operateFlag&quot;:0,&quot;patientName&quot;:&quot;柴沿汐&quot;,&quot;patientSex&quot;:&quot;1&quot;,&quot;inpRateTypeCode&quot;:&quot;S&quot;,&quot;patientId&quot;:&quot;0000002554&quot;,&quot;bedNo&quot;:&quot;13&quot;,&quot;resiRateTypeName&quot;:&quot;自费(普通)&quot;,&quot;patientSexName&quot;:&quot;男性&quot;,&quot;eventNo&quot;:&quot;0231179001&quot;,&quot;pid&quot;:&quot;12300&quot;}],

            setUnselected(){
              this.$refs.tree0.setUnselected();
            }
          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>

    <div class="item">
      <h4>props.noleaf</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data6"
          :props="props4"
          highlightcurrent
        ></zoehis-tree>

      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-tree
                :data=&quot;data6&quot;
                :props=&quot;props4&quot;
                highlightcurrent
            &gt;&lt;/zoehis-tree&gt;

            props4: {
                label: &#x27;patientName&#x27;,
                noleaf: &#x27;noleafFlag&#x27;
            },
            data6: [{&quot;id&quot;:&quot;12300&quot;,&quot;pid&quot;:&quot;##&quot;,&quot;deptName&quot;:&quot;测试科&quot;,&quot;patientName&quot;: &quot;测试科&quot;, noleafFlag: true }],

          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>

    <div class="item">
      <h4>入门用法</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data2"
          showcheckbox
          defaultexpandall

          :props="props2"
          parentidfieldname="pKey">
        </zoehis-tree>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-tree
                :data=&quot;data2&quot;
                showcheckbox
                defaultexpandall
                :props=&quot;props2&quot;
            &lt;/zoehis-tree&gt;


            props2: {
              label: &#x27;element&#x27;,
              id: &#x27;key&#x27;,
              pid: &#x27;pKey&#x27;
            },
            data2: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }]
          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>

    <!--<div class="item">-->
      <!--<h4>自定义节点内容：方法一</h4>-->
      <!--<div class="item-content">-->
        <!--<zoehis-tree-->
          <!--:data="data3"-->
          <!--showcheckbox-->
          <!--defaultexpandall-->
          <!--:props="props2"-->
          <!--:rendercontent="rendercontent"-->
        <!--&gt;-->
        <!--</zoehis-tree>-->
      <!--</div>-->
      <!--<div class="item-detail">-->
        <!--<div class="item-code">-->
          <!--<pre><code>-->
            <!--&lt;zoehis-tree-->
                <!--:data=&quot;data3&quot;-->
                <!--showcheckbox-->
                <!--defaultexpandall-->
                <!--:props=&quot;props2&quot;-->
                <!--:rendercontent=&quot;rendercontent&quot;-->
            <!--&gt;-->
            <!--&lt;/zoehis-tree&gt;-->

            <!--data(){-->
              <!--return {-->
                <!--props2: {-->
                  <!--label: &#x27;element&#x27;,-->
                  <!--id: &#x27;key&#x27;,-->
                  <!--pid: &#x27;pKey&#x27;-->
                <!--},-->
                <!--data3: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }],-->
              <!--};-->
            <!--},-->
            <!--methods: {-->
              <!--rendercontent(data){-->
                <!--return &lt;span&gt;{ &#x27; key: &#x27; + data.key + &#x27;　name: &#x27; + data.element }&lt;/span&gt;;-->
              <!--}-->
            <!--},-->
          <!--</code></pre>-->
        <!--</div>-->
        <!--<div class="item-desc">-->
          <!--<p style="text-indent: 28px;">使用rendercontent指定渲染函数，该函数返回需要的节点区内容即可, 注意：返回值使用了JSX语法。</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="item">
      <h4>自定义节点内容</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data3"
          showcheckbox
          defaultexpandall
          :props="props2"
          :renderhtml="renderhtml"
        >
        </zoehis-tree>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-tree
                :data=&quot;data3&quot;
                showcheckbox
                defaultexpandall
                :props=&quot;props2&quot;
                :renderhtml=&quot;renderhtml&quot;
            >
            &lt;/zoehis-tree&gt;

            data(){
              return {
                props2: {
                  label: &#x27;element&#x27;,
                  id: &#x27;key&#x27;,
                  pid: &#x27;pKey&#x27;
                },
                data3: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }],
              };
            },
            methods: {
              renderhtml(data){
                return &#x27;&lt;span&gt; key: &#x27; + data.key + &#x27;　name: &#x27; + data.element+ &#x27;  来自render方法&lt;/span&gt;&#x27;;
              },
            },
          </code></pre>
        </div>
        <div class="item-desc">
          <p style="text-indent: 28px;">使用renderhtml指定渲染函数，该函数返回需要的节点区内容即可, 注意：返回值为html字符串。</p>
        </div>
      </div>
    </div>

    <div class="item">
      <h4>常用事件</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data4"
          showcheckbox
          defaultexpandall
          :props="props2"
          @nodedblclick="nodedblclick"
          @nodeRightClick="nodeRightClick"
          @nodeclick="nodeclick"
          @nodecollapse="nodecollapse"
          @nodeexpand="nodeexpand"
          @checkchange="checkchange"
          @currentchange="currentchange"
        >
        </zoehis-tree>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>

            &lt;zoehis-tree
                :data=&quot;data4&quot;
                showcheckbox
                defaultexpandall
                :props=&quot;props2&quot;
                @nodeclick=&quot;nodeclick&quot;
                @nodecollapse=&quot;nodecollapse&quot;
                @nodeexpand=&quot;nodeexpand&quot;
                @checkchange=&quot;checkchange&quot;
                @currentchange=&quot;currentchange&quot;
            >
            &lt;/zoehis-tree&gt;

            data(){
              return {
                props2: {
                  label: &#x27;element&#x27;,
                  id: &#x27;key&#x27;,
                  pid: &#x27;pKey&#x27;
                },
                data4: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }],
              };
            },
            methods: {
              nodeclick(data){
                console.log(&#x27;node click&#x27;)
              },
              nodecollapse(data){
                console.log(&#x27;node collapse&#x27;)
              },
              nodeexpand(data){
                console.log(&#x27;node expand&#x27;)
              },
              checkchange(data){
              //        console.log(&#x27;check change&#x27;)
              },
              currentchange(data,node,that){
                console.log(&#x27;current change&#x27;)
              }
            },

          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>

    <div class="item">
      <h4>常用方法（复选）</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data5"
          showcheckbox
          defaultexpandall
          :props="props2"
          ref="tree"
        >
        </zoehis-tree>
        <zoehis-button type="primary" size="small" @clickenter="getcheckednodes">通过node获取选中的节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="getcheckedkeys">通过key获取选中的节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="setcheckednodes">通过node选择节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="setcheckedkeys">通过key选择节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="resetchecked">清空</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>

            &lt;zoehis-tree
                :data=&quot;data5&quot;
                showcheckbox
                defaultexpandall
                :props=&quot;props2&quot;
                ref=&quot;tree&quot;

            >
            &lt;/zoehis-tree&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;getcheckednodes&quot;&gt;通过node获取选中的节点&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;getcheckedkeys&quot;&gt;通过key获取选中的节点&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;setcheckednodes&quot;&gt;通过node选择节点&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;setcheckedkeys&quot;&gt;通过key选择节点&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;resetchecked&quot;&gt;清空&lt;/zoehis-button&gt;


            data(){
              return {
                props2: {
                  label: &#x27;element&#x27;,
                  id: &#x27;key&#x27;,
                  pid: &#x27;pKey&#x27;
                },
                data5: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }],
              };
            },
            methods: {
              getcheckednodes(){
                console.log(this.$refs.tree.getCheckedNodes());
              },
              getcheckedkeys(){
                console.log(this.$refs.tree.getCheckedKeys());
              },

              setcheckednodes(){
                this.$refs.tree.setCheckedNodes([{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; }]);
              },
              setcheckedkeys(){
                this.$refs.tree.setCheckedKeys([2])
              },
              resetchecked(){
                this.$refs.tree.setCheckedKeys([])
              },
            },


          </code></pre>
        </div>
        <div class="item-desc">
          key为props中的id，默认值为"id"
        </div>
      </div>
    </div>

    <div class="item">
      <h4>常用方法（单选）</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data5"
          :props="props2"
          ref="tree10"
          @nodeselect="nodeselect"
          :beforenodeselect="beforenodeselect"
          @nodeexpand="nodeexpand1"
          expandselected
        >
        </zoehis-tree>
        <zoehis-button type="primary" size="small" @clickenter="setCurrentSelected">设置当前选中的节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="getCurrentSelected">获取当前选中的节点</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="setUnselected">清除当前选中</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="updateNode">更新节点数据</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>

            &lt;zoehis-tree
                :data=&quot;data5&quot;
                defaultexpandall
                :props=&quot;props2&quot;
                ref=&quot;tree10&quot;
                @nodeselect=&quot;nodeselect&quot;
            &gt;

            getCurrentSelected(){
              console.log(this.$refs.tree10.getCurrentSelected());
            },
            setCurrentSelected(){
              this.$refs.tree10.setCurrentSelected(2);
            },
            setUnselected(){
              this.$refs.tree10.setUnselected();
            },
            nodeselect(node){
              console.log(node)
            },
            updateNode(){
              this.$refs.tree10.updateNode(4,{element: 'newtitle'})
            },
          </code></pre>
        </div>
        <div class="item-desc">
          key为props中的id，默认值为"id"
        </div>
      </div>
    </div>

    <div class="item">
      <h4>增加/删除节点</h4>
      <div class="item-content">
        <zoehis-tree
          :data="data5"
          showcheckbox
          defaultexpandall
          :props="props2"
          ref="tree2"
        ></zoehis-tree>

        <zoehis-button type="primary" size="small" @clickenter="appendnode">增加</zoehis-button>
        <zoehis-button type="primary" size="small" @clickenter="removenode">删除</zoehis-button>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>

            &lt;zoehis-tree
                :data=&quot;data5&quot;
                showcheckbox
                defaultexpandall
                :props=&quot;props2&quot;
                nodekey=&quot;key&quot;
                ref=&quot;tree2&quot;
            >
            &lt;/zoehis-tree&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;appendnode&quot;&gt;增加&lt;/zoehis-button&gt;
            &lt;zoehis-button type=&quot;primary&quot; size=&quot;small&quot; @clickenter=&quot;removenode&quot;&gt;删除&lt;/zoehis-button&gt;


            data(){
              return {
                props2: {
                  label: &#x27;element&#x27;,
                  id: &#x27;key&#x27;,
                  pid: &#x27;pKey&#x27;
                },
                data5: [{ key: &#x27;1&#x27;, pKey: &#x27;&#x27;, element: &#x27;html&#x27; },{ key: &#x27;2&#x27;, pKey: &#x27;1&#x27;, element: &#x27;head&#x27; },{ key: &#x27;3&#x27;, pKey: &#x27;1&#x27;, element: &#x27;body&#x27; },{ key: &#x27;4&#x27;, pKey: &#x27;2&#x27;, element: &#x27;title&#x27; },{ key: &#x27;5&#x27;, pKey: &#x27;3&#x27;, element: &#x27;header&#x27; },{ key: &#x27;6&#x27;, pKey: &#x27;3&#x27;, element: &#x27;section&#x27; },{ key: &#x27;7&#x27;, pKey: &#x27;3&#x27;, element: &#x27;footer&#x27; }],
              };
            },
            methods: {

              appendnode(){
                this.$refs.tree2.appendNode({ key: &#x27;111&#x27;, pKey: &#x27;1&#x27;, element: &#x27;he1ad&#x27; },2);
              },
              removenode(){
                this.$refs.tree2.removeNode(2);
              }
            },
          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>


    <div class="item">
      <h4>延迟加载</h4>
      <div class="item-content">
        <zoehis-tree
          ref="lazytree"
          :data="lazydata"
          :props="props3"
          highlightcurrent
          :lazy="lazy"
          :load="loadNode"
          @nodeselect="lazynodeselect"
        ></zoehis-tree>
      </div>
      <div class="item-detail">
        <div class="item-code">
          <pre><code>
            &lt;zoehis-tree
                :data=&quot;data0&quot;
                :props=&quot;props3&quot;
                highlightcurrent
                lazy
                :load=&quot;loadNode&quot;
            &gt;&lt;/zoehis-tree&gt;

            data0: [],

            loadNode(node,resolve){

              if (node.level === 0) {
                return resolve([{ text :&quot;第一级&quot;,id: 1 }]);
              }
              if (node.level === 1){
                return resolve([{ text :&quot;第二级&quot;,id: 2 },{ text :&quot;第二级&quot;,id: 3 },{ text :&quot;第二级&quot;,id: 4 }]);
              }
              if (node.level === 2){

                if (node.data.id === 3){
                  return resolve([{ text :&quot;第三级&quot;,id: 5 },{ text :&quot;第三级&quot;,id: 6 },{ text :&quot;第三级&quot;,id: 7 },{ text :&quot;第三级&quot;,id: 8 }])
                }else {
                  return resolve([]);
                }

              }
              if (node.level === 3){
                return resolve([]);
              }
            },

          </code></pre>
        </div>
        <div class="item-desc">

        </div>
      </div>
    </div>





    <div class="item">
      <h4>属性</h4>
      <table width="100%">
        <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>data</td>
          <td>展示数据</td>
          <td>Array</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>emptytext</td>
          <td>数据为空的提示</td>
          <td>String</td>
          <td>-</td>
          <td>暂无数据</td>
        </tr>
        <tr>
          <td>showcheckbox</td>
          <td>显示复选框</td>
          <td>Boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
        <tr>
          <td>defaultexpandall</td>
          <td>是否默认展开所有节点</td>
          <td>Boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
        <tr>
          <td>expandselected</td>
          <td>设置选中时（单选），展开此节点所有父节点</td>
          <td>Boolean</td>
          <td>-</td>
          <td>true</td>
        </tr>
        <tr>
          <td>expandselectedchild</td>
          <td>设置选中时（单选），展开此节点所有父节点时，是否展开此节点</td>
          <td>Boolean</td>
          <td>-</td>
          <td>true</td>
        </tr>
        <tr>
          <td>props</td>
          <td>配置选项，具体看下表</td>
          <td>Object</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <!--<tr>-->
          <!--<td>rendercontent</td>-->
          <!--<td>树节点的内容区的渲染函数,返回值为JSX语法</td>-->
          <!--<td>Function</td>-->
          <!--<td>-</td>-->
          <!--<td>-</td>-->
        <!--</tr>-->
        <tr>
          <td>renderhtml</td>
          <td>树节点的内容区的渲染函数,返回值为html字符串,使用此方法时rendercontent将失效</td>
          <td>Function</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>highlightcurrent</td>
          <td>是否高亮当前选中节点</td>
          <td>Boolean</td>
          <td>-</td>
          <td>true</td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>是否延迟加载</td>
          <td>Boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
        <tr>
          <td>load</td>
          <td>延迟加载子树数据的方法( 参数：node 当前树节点，resolve(data) 创建子节点方法,data为子节点数据 )</td>
          <td>Function(node, resolve)</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>beforenodeselect</td>
          <td>节点选中前会调用此方法，若返回值为false，则阻止选中</td>
          <td>Function(node)</td>
          <td>-</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="item">
      <h4>props</h4>
      <table width="100%">
        <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>label</td>
          <td>指定节点显示的值为节点对象的某个属性值</td>
          <td>String</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>id</td>
          <td>节点id</td>
          <td>String</td>
          <td>-</td>
          <td>id</td>
        </tr>
        <tr>
          <td>pid</td>
          <td>父节点id</td>
          <td>String</td>
          <td>-</td>
          <td>pid</td>
        </tr>
        <tr>
          <td>noleaf</td>
          <td>不为叶子节点的属性名称(值不能为空字符串或者false,具体看例二)</td>
          <td>String</td>
          <td>-</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="item">
      <h4>事件</h4>
      <table width="100%">
        <thead>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>回调参数</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>nodeclick</td>
          <td>节点被点击时的回调</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>nodedblclick</td>
          <td>节点双击时的回调</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>nodeRightClick</td>
          <td>节点右击时的回调</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>checkchange</td>
          <td>节点选中状态发生变化时的回调,触发多次</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点</td>
        </tr>
        <tr>
          <td>currentchange</td>
          <td>当前选中节点变化时触发的事件,触发一次</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>nodeexpand</td>
          <td>节点展开时触发的事件</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>nodecollapse</td>
          <td>节点收缩时触发的事件</td>
          <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
        </tr>
        <tr>
          <td>nodeselect</td>
          <td>节点选中事件（主要用于单选）</td>
          <td>共二个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="item">
      <h4>方法</h4>
      <table width="100%">
        <thead>
        <tr>
          <th>名称</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>getCheckedNodes</td>
          <td>(复选)返回目前被选中的节点所组成的数组</td>
          <td>(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点，默认值为 false</td>
        </tr>
        <tr>
          <td>setCheckedNodes</td>
          <td>（复选）设置目前勾选的节点</td>
          <td>(nodes) 接收勾选节点数据的数组</td>
        </tr>
        <tr>
          <td>getCheckedKeys</td>
          <td>（复选）返回目前被选中的节点所组成的数组</td>
          <td>(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false</td>
        </tr>
        <tr>
          <td>setCheckedKeys</td>
          <td>（复选）通过 keys 设置目前勾选的节点</td>
          <td>(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false</td>
        </tr>
        <tr>
          <td>appendNode</td>
          <td>增加节点</td>
          <td>(data, parentData) 接收两个参数，1.要添加的节点数据 2.父节点的id或者数据</td>
        </tr>
        <tr>
          <td>removeNode</td>
          <td>删除节点</td>
          <td>(data) 接收一个参数，1. 节点的id或者是数据</td>
        </tr>
        <tr>
          <td>updateNode</td>
          <td>更新节点</td>
          <td>(data, newData) 接收一个参数，1. 节点的id或者是数据 2.此节点新的数据（Object）</td>
        </tr>
        <tr>
          <td>setCurrentSelected</td>
          <td>（单选）设置当前选中</td>
          <td>接收一个参数，节点的id（key） </td>
        </tr>
        <tr>
          <td>getCurrentSelected</td>
          <td>（单选）获取当前选中</td>
          <td>-</td>
        </tr>
        <tr>
          <td>setUnselected</td>
          <td>（单选）不选中任何节点</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>






</template>

<script>
  export default{
    data(){
      return {

        props1: {
          label: 'patientName'
        },
        props3: {
          id: 'id',
          label: 'text',
          noleaf: 'noleafFlag'
        },
        lazy: true,
        props2: {
          label: 'element',
          id: 'key',
          pid: 'pKey'
        },
        props4: {
          label: 'patientName',
          noleaf: 'noleafFlag'
        },
        lazydata: [],
        data0: [],
        data1: [{"id":"12300","pid":"##","deptName":"测试科","patientName": "测试科"},{"operateFlag":0,"patientName":"黄小晏的小弟","patientSex":"2","inpRateTypeCode":"4","patientId":"11","bedNo":"1","resiRateTypeName":"体检（新）","patientSexName":"女性","eventNo":"44001","pid":"110"},{id: "110", "operateFlag":0,"patientName":"黄小晏","patientSex":"2","inpRateTypeCode":"4","patientId":"11","bedNo":"1","resiRateTypeName":"体检（新）","patientSexName":"女性","eventNo":"44001","pid":"12300"},{"operateFlag":0,"patientName":"唐浩巍","patientSex":"1","inpRateTypeCode":"1","patientId":"19","bedNo":"2","resiRateTypeName":"工伤","patientSexName":"男性","eventNo":"46001","pid":"12300"},{"operateFlag":0,"patientName":"秦好河","patientSex":"1","inpRateTypeCode":"F","patientId":"0000002707","bedNo":"3","resiRateTypeName":"焦作市居民","patientSexName":"男性","eventNo":"0231205001","pid":"12300"},{"operateFlag":0,"patientName":"李文浩","patientSex":"1","inpRateTypeCode":"K","patientId":"0000002847","bedNo":"11","resiRateTypeName":"新农合","patientSexName":"男性","eventNo":"0231219001","pid":"12300"},{"operateFlag":0,"patientName":"罗玉珍","patientSex":"2","inpRateTypeCode":"Y","patientId":"0000002766","bedNo":"12","resiRateTypeName":"市直（职工）","patientSexName":"女性","eventNo":"0231212001","pid":"12300"},{"operateFlag":0,"patientName":"柴沿汐","patientSex":"1","inpRateTypeCode":"S","patientId":"0000002554","bedNo":"13","resiRateTypeName":"自费(普通)","patientSexName":"男性","eventNo":"0231179001","pid":"12300"}],
        data2: [{ key: '1', pKey: '', element: 'html' },{ key: '2', pKey: '1', element: 'head' },{ key: '3', pKey: '1', element: 'body' },{ key: '4', pKey: '2', element: 'title' },{ key: '5', pKey: '3', element: 'header' },{ key: '6', pKey: '3', element: 'section' },{ key: '7', pKey: '3', element: 'footer' }],
        data3: [{ key: '1', pKey: '', element: 'html' },{ key: '2', pKey: '1', element: 'head' },{ key: '3', pKey: '1', element: 'body' },{ key: '4', pKey: '2', element: 'title' },{ key: '5', pKey: '3', element: 'header' },{ key: '6', pKey: '3', element: 'section' },{ key: '7', pKey: '3', element: 'footer' }],
        data4: [{ key: '1', pKey: '', element: 'html' },{ key: '2', pKey: '1', element: 'head' },{ key: '3', pKey: '1', element: 'body' },{ key: '4', pKey: '2', element: 'title' },{ key: '5', pKey: '3', element: 'header' },{ key: '6', pKey: '3', element: 'section' },{ key: '7', pKey: '3', element: 'footer' }],
        data5: [{ key: '1', pKey: '', element: 'html' },{ key: '2', pKey: '1', element: 'head' },{ key: '3', pKey: '1', element: 'body' },{ key: '4', pKey: '2', element: 'title' },{ key: '5', pKey: '3', element: 'header' },{ key: '6', pKey: '3', element: 'section' },{ key: '7', pKey: '3', element: 'footer' }],
        data6: [{"id":"12300","pid":"##","deptName":"测试科","patientName": "测试科", noleafFlag: true }],
      };
    },
    methods: {

      getCurrentSelected(){
        console.log(this.$refs.tree10.getCurrentSelected());
      },
      setCurrentSelected(){
        this.$refs.tree10.setCurrentSelected(2);
      },
      setUnselected(){
        this.$refs.tree10.setUnselected();
      },
      nodeselect(data,node){
        console.log(node)
      },
      treeClick(){

      },
      renderhtml(data){
        return 'key: ' + data.key + '　name: ' + data.element+ '  来自renderhtml方法';
      },
      getcheckednodes(){
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getcheckedkeys(){
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setcheckednodes(){
        this.$refs.tree.setCheckedNodes([{ key: '2', pKey: '1', element: 'head' }]);
      },
      setcheckedkeys(){
        this.$refs.tree.setCheckedKeys([2])
      },
      resetchecked(){
        this.$refs.tree.setCheckedKeys([])
      },
      rendercontent(data){
          return <span>{ ' key: ' + data.key + '　name: ' + data.element }</span>;
      },
      nodeclick(data){
        console.log('node click')
      },
      nodecollapse(data){
        console.log('node collapse')
      },
      beforenodeselect(node){
        if (node.data.element == 'header'){
          return false
        }
      },
      updateNode(){
        this.$refs.tree10.updateNode(4,{element: 'newtitle'})
      },
      lazynodeselect(node){
        console.log(node)
      },
      nodedblclick(data,node){
         console.log(data,node)
      },
      nodeRightClick(data,node){
         console.log(data,node)
      },
      nodeexpand(data){
        console.log('node expand')
      },
      nodeexpand1(data,node){
        console.log(111)
          console.log(data);
        console.log(node)
      },
      checkchange(data){
//        console.log('check change')
      },
      currentchange(data,node,that){
        console.log('current change')
      },
      appendnode(){
        this.$refs.tree2.appendNode({ key: '111', pKey: '1', element: 'he1ad' },2);;
      },
      removenode(){
        this.$refs.tree2.removeNode(2);
      },
      setLazyTreeData(){
//        this.lazy = false;
        this.lazydata = [{"id":"12300","pid":"##","text":"测试科","patientName": "测试科"}];
      },
      loadNode(node,resolve){

        if (node.level === 0) {
          return resolve([{ text :"第一级",id: 1}]);
        }
        if (node.level === 1){
          return resolve([{ text :"第二级",id: 2 },{ text :"第二级",id: 3 },{ text :"第二级",id: 4, noleafFlag: false }]);
        }
        if (node.level === 2){

          if (node.data.id === 3){
            return resolve([{ text :"第三级",id: 5 },{ text :"第三级",id: 6 },{ text :"第三级",id: 7 },{ text :"第三级",id: 8 }])
          }else {
            return resolve([]);
          }

        }
        if (node.level === 3){
          return resolve([]);
        }
      },
    },
    mounted:function() { //用于高亮显示代码
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

        this.$refs.lazytree.setCurrentSelected(1)

    },
  }
</script>

<style scoped>
  table tr{
    height: 35px;
  }
  table tr:hover{
    background-color: #eaeefb;
  }
</style>
