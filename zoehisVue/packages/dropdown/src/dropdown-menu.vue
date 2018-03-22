<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul class="zoehis_dropdown_menu" v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Popper from '../../../src/utils/vue-popper';

  export default {
    name: 'ZoehisDropdownMenu',

    componentName: 'ZoehisDropdownMenu',

    mixins: [Popper],

    props:{
      preventOverId: { //
        type: String,
        default: ""
      }
    },

    created() {
      this.$on('updatePopper', () => {
        if (this.showPopper) this.updatePopper();
    });
      this.$on('visible', val => {
        this.showPopper = val;
    });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$el;
    },

    watch: {
      showPopper(boo){
        this.$emit("visible-change",boo,this);
      },
      '$parent.menuAlign': {
        immediate: true,
        handler(val) {
          this.currentPlacement = `bottom-${val}`;
        }
      }
    }
  };
</script>
