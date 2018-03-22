<template>
  <div class="zoehis_tree_node"
    @click.stop="handleClick"
    @dblclick.stop="handleDblclick"
    @contextmenu.stop="rightClick"
    v-show="node.visible"
    :class="{
      'is-expanded': childNodeRendered && expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible
    }">
    <div class="zoehis_tree_node__content"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <span
        class="zoeIconfont zoe_tree_node__icon"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: isExpand, 'z_open_form': !isExpand, 'z_stop_form': isExpand }">
      </span>

      <zoehis-checkbox
        v-if="showcheckbox"
        v-model="node.checked"
        @click.native.stop
        @input="handleCheckChange">
      </zoehis-checkbox>

      <span
        class="zoehis_tree_node__label_item"
        :class="{zoehis_tree_node_selected: node.checked}"
      >
        <node-content :node="node" v-if="!renderhtml"></node-content>
        <span v-html="renderString"></span>
      </span>
    </div>
      <div
        class="zoehis_tree_node__children"
        v-show="expanded">
        <zoehis-tree-node
          :renderhtml="renderhtml"
          :rendercontent="rendercontent"
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </zoehis-tree-node>
      </div>
  </div>
</template>

<script type="text/jsx">
  import ZoehisCheckbox from '../../checkbox/src/checkbox';
  import emitter from '../../../src/mixins/emitter';

  export default {

    name: 'ZoehisTreeNode',

    componentName: 'ZoehisTreeNode',

    mixins: [emitter],

    props: {
      node: {
        default() {
          return {};
        }
      },
      renderhtml: Function,
      props: {

      },
      rendercontent: Function,
    },

    components: {
      ZoehisCheckbox,
      NodeContent: {
        props: {
          node: {
            required: true
          }
        },
        render(h) {
          const parent = this.$parent;
          const node = this.node;
          const data = node.data;
          const store = node.store;
          return (
            parent.rendercontent
              ? parent.rendercontent.call(parent._renderProxy, data, h)
              : <span class="zoehis_tree_node__label" title={ this.node.label }>{ this.node.label }</span>
          );
        }
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        showcheckbox: false,
        oldChecked: null,
        oldIndeterminate: null,
      };
    },
    computed: {
      renderString(){
        return typeof this.renderhtml === 'function' ? this.renderhtml(this.node.data) : '';
      },
      isExpand(){
        return !this.node.isLeaf && this.expanded;
      }
    },
    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val);
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate);
      },

      'node.expanded'(val) {
        this.expanded = val;
        if (val) {
          this.childNodeRendered = true;
        }
      }
    },

    methods: {
      getNodeKey(node, index) {
        const nodeKey = this.tree.nodeKey;
        if (nodeKey && node) {
          return node.data[nodeKey];
        }
        return index;
      },
      setCheckedKeys(keys, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedKeys(keys, leafOnly);
      },
      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('checkchange', this.node.data, checked, indeterminate);
        }
        this.oldChecked = checked;
        this.indeterminate = indeterminate;
      },
      handleDblclick(){
          this.tree.$emit('nodedblclick',this.node.data, this.node, this);
      },
      rightClick() {
          this.tree.$emit('nodeRightClick',this.node.data, this.node, this);
      },
      handleClick() {
        const store = this.tree.store;
        if (typeof store.beforenodeselect === 'function'){
          if (store.beforenodeselect(this.node) === false){
            return
          }
        }
        store.setCurrentNode(this.node);
//        this.tree.$emit('currentchange', store.currentNode ? store.currentNode.data : null, store.currentNode);
        this.tree.currentNode = this;
        if (this.tree.expandonclicknode) {
          this.handleExpandIconClick();
        }
        this.tree.$emit('nodeclick', this.node.data, this.node, this);
        this.tree.$emit('nodeselect',this.node.data, this.node);
      },

      handleExpandIconClick() {

        if (this.node.isLeaf) return;
        if (this.expanded) {
          this.tree.$emit('nodecollapse', this.node.data, this.node, this);
          this.node.collapse();
        } else {
          this.node.expand();
          this.tree.$emit('nodeexpand', this.node.data, this.node, this);
        }
      },

      handleCheckChange(ev) {
        this.tree.$emit('currentchange', this.node.data, this.node, this);
        this.node.setChecked(ev, !this.tree.checkStrictly);
      },

      handleChildNodeExpand(nodeData, node, instance) {
        this.broadcast('ElTreeNode', 'tree-node-expand', node);
        this.tree.$emit('node-expand', nodeData, node, instance);
      }
    },

    created() {

      const parent = this.$parent;

      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }

      const tree = this.tree;
      if (!tree) {
        console.warn('Can not find node\'s tree.');
      }

      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren();
      });

      this.showcheckbox = tree.showcheckbox;

      if (this.node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }

      if(this.tree.accordion) {
        this.$on('tree-node-expand', node => {
          if(this.node !== node) {
            this.node.collapse();
          }
        });
      }
    }
  };
</script>
