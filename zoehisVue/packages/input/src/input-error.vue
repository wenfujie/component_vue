<template >
      <div class="zoehis_input_error_tip" :style="{width: width+'px'}">{{errorTip}}</div>
</template>

<script type="text/babel">
  import Popper from '../../../src/utils/vue-popper';

  export default {
    name: 'ZoehisInputError',

    componentName: 'ZoehisInputError',

    mixins: [Popper],

    props: {
      placement: {
        default: 'top-start'
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
      errorTip: { //错误的提示内容 为 "" 时表示关闭错误的提示
        type: String,
        default: ""
      },
      preventOverId:{
        type:String,
        default:""
      },
      width:{
        default:"120"
      }
    },

    data() {
      return {

      };
    },

    computed: {

    },

    watch: {

    },

    mounted() {
      this.referenceElm = this.$parent.$refs.reference; //父组件的input输入框的dom元素
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', () => {
        if (this.$parent.showError) this.updatePopper();
      });
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>

