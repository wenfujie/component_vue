<template>
  <div class="zoehis_tree" :class="{ 'zoehis_tree__highlight_current': highlight }">
    <zoehis-tree-node
      v-for="child in root.childNodes"
      :renderhtml="renderhtml"
      :node="child"
      :props="props"
      :key="getNodeKey(child)"
      :rendercontent="rendercontent">
    </zoehis-tree-node>
    <div class="zoehis_tree__empty_block" v-if="!root.childNodes || root.childNodes.length===0">
      <span class="zoehis_tree__empty_text">{{ emptytext }}</span>
    </div>
  </div>
</template>

<script>
  import TreeStore from './model/tree-store';
  import emitter from '../../../src/mixins/emitter';
  import { toTree } from './model/util';
  import ZoehisTreeNode from './tree-node';

  export default {
    name: 'ZoehisTree',

    mixins: [emitter],

    components: {
      ZoehisTreeNode
    },

    props: {

      data: Array,
      highlightcurrent: {
        type: Boolean,
        default: true
      },
      lazy: {
        type: Boolean,
        default: false
      },
      emptytext: {
        type: String,
        default(){
          return this.$t('zoehisUI.tree.emptyText');

        }
      },
      expandselected: {
        type: Boolean,
        default: false
      },
      expandselectedchild:{
        type: Boolean,
        default: true
      },
      load: Function,
      currentnodekey: [String, Number],//当前选中节点的 key，只写属性
      checksrictly: Boolean,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      defaultcheckedkeys: Array,//默认勾选的节点的 key 的数组
      defaultexpandedkeys: Array,//默认展开的节点的 key 的数组
      autoexpandparent: {//展开子节点的时候是否自动展开父节点
        type: Boolean,
        default: true
      },
      expandonclicknode: {
        type: Boolean,
        default: false
      },
      defaultexpandall: Boolean,//是否默认展开所有节点
      filternodemethod: Function,
      rendercontent: Function,
      beforenodeselect: Function,
      showcheckbox: {
        type: Boolean,
        default: false
      },
      props: {
        default() {
          return {
            children: 'children',
            label: '',
            id: 'id',
            pid: 'pid',
            noleaf: ''
          };
        }
      },
      indent: {
        type: Number,
        default: 22
      },
      renderhtml: Function,
    },

    data() {
      return {
        store: null,
        root: null,
        currentNode: null,
        isShow: true
      };
    },

    watch: {
      data: {
        immediate: true,
        handler: function(data) {
            this.newStore();
        }
      }
    },

    computed: {
      highlight(){
        return !this.showcheckbox && this.highlightcurrent;
      },
      nodekey(){
        return this.props.id;
      }
    },

    methods: {
      getNodeKey(node, index) {
        const nodeKey = this.nodeKey;
        if (nodeKey && node) {
          return node.data[nodeKey];
        }
        return index;
      },
      //获取选中的节点
      getCheckedNodes(leafOnly) {
        return this.store.getCheckedNodes(leafOnly)
      },
      getCheckedKeys(leafOnly) {
        return this.store.getCheckedKeys(leafOnly);
      },
      setCheckedNodes(nodes, leafOnly) {
        if (!this.nodekey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedNodes(nodes, leafOnly);
      },
      setCheckedKeys(keys, leafOnly) {
        if (!this.nodekey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedKeys(keys, leafOnly);
      },
      appendNode(data, parentData){
        this.store.append(data, parentData)
      },
      removeNode(data){
        this.store.remove(data)
      },
      updateNode(data, newData){
        this.store.update(data, newData)
      },
      setUnselected(){
        this.store.currentNode = null;
      },
      setCurrentSelected(keys){
        let node = this.store.setCurrentNodeKey(keys);

        this.$emit('nodeselect',node.data, node);


        if (this.expandselected){
          if (node.expand && this.expandselectedchild){
            node.expand();
            this.$emit('nodeexpand', node.data, node);
          }
          while (node.parent){

            node.parent.expand();
            node = node.parent;
            this.$emit('nodeexpand', node.data, node);
          }
        }

      },
      getCurrentSelected(){
        return this.store.getCurrentNode();
      },
      newStore(){
        this.treedata = toTree(this.data, this.props.id ? this.props.id : 'id', this.props.pid ? this.props.pid : 'pid');

        this.isTree = true;
        this.store = new TreeStore({
          key: this.nodekey,//每个树节点用来作为唯一标识的属性，整颗树应该是唯一的
          data: this.treedata,
          lazy: this.lazy,
          props: {
            children: this.props.children ? this.props.children : 'children',
            label: this.props.label,
            noleaf: this.props.noleaf
          },//配置选项
          load: this.load,//加载子树数据的方法
          currentNodeKey: this.currentnodekey,//当前选中节点的 key，只写属性
          checkStrictly: this.checksrictly,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
          defaultCheckedKeys: this.defaultcheckedkeys,//默认勾选的节点的 key 的数组
          defaultExpandedKeys: this.defaultexpandedkeys,//默认展开的节点的 key 的数组
          autoExpandParent: this.autoexpandparent,//展开子节点的时候是否自动展开父节点
          defaultExpandAll: this.defaultexpandall,//是否默认展开所有节点
          filterNodeMethod: this.filternodemethod,//对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
          beforenodeselect: this.beforenodeselect,
        });
        this.root = this.store.root;
      }
    },

  };
</script>


