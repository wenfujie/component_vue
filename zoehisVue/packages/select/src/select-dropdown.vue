<template>
  <div
    class="zoehis_select_dropdown"
    :style="{minWidth:minWidth}"
  >
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Popper from '../../../src/utils/vue-popper';

  export default {
    name: 'ZoehisSelectDropdown',

    componentName: 'ZoehisSelectDropdown',

    mixins: [Popper],

    props: {
      placement: {
        default: 'bottom-start'
      },

      boundariesPadding: {
        default: 0
      },

      popperOptions: {
        default() {
          return {
            forceAbsolute: true,
            gpuAcceleration: false
          };
        }
      },
      preventOverId:{
        type:String,
        default:""
      },
      minWidth: String,//最小宽度（带单位的）
    },

    data() {
      return {

      };
    },

    computed: {
      popperClass() {
        return this.$parent.popperClass; //父组件的popperClass属性
      },
    },

    watch: {

    },

    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el; //父组件的input输入框的dom元素
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', () => {
        if (this.$parent.visible) this.updatePopper();
      });
//      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>
