<script type="text/ecmascript-6">
  import Clickoutside from '../../../src/utils/clickoutside';
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'ZoehisDropdown',

    componentName: 'ZoehisDropdown',

    mixins: [Emitter],

    directives: { Clickoutside },

    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      menuAlign: {
        type: String,
        default: 'end'
      },
      type: String,
      size: String,
      splitButton: Boolean,
      hideOnClick: {
        type: Boolean,
        default: true
      },
      disabled:{
        default: false,
        type:Boolean
      },
    },

    data() {
      return {
        timeout: null,
        visible: false
      };
    },

    mounted() {
      this.$on('menu-item-click', this.handleMenuItemClick);
      this.initEvent();
    },

    watch: {
      visible(val) {
        if(this.disabled) return
        this.broadcast('ZoehisDropdownMenu', 'visible', val);
        this.$emit('visible-change', val);
      }
    },

    methods: {
      show() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = true;
      }, 250);
      },
      hide() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
      }, 150);
      },
      handleClick() {
        this.visible = !this.visible;
      },
      initEvent() {
        let { trigger, show, hide, handleClick, splitButton } = this;
        let triggerElm = this.$slots.default[0].elm;
        if (trigger === 'hover') {
          triggerElm.addEventListener('mouseenter', show);
          triggerElm.addEventListener('mouseleave', hide);

          let dropdownElm = this.$slots.dropdown[0].elm;
          dropdownElm.addEventListener('mouseenter', show);
          dropdownElm.addEventListener('mouseleave', hide);
        } else if (trigger === 'click') {
          triggerElm.addEventListener('click', handleClick);
        }
      },
      handleMenuItemClick(command, instance) {
        if (this.hideOnClick) {
          this.visible = false;
        }
        this.$emit('command', command, instance);
      }
    },

    render(h) {
      let { hide, splitButton, type, size } = this;

      var handleClick = _ => {
        this.$emit('click');
      };
      return <div class="zoehis_dropdown" v-clickoutside={hide}>
        {this.$slots.default}
        {this.$slots.dropdown}
      </div>
    }
  };
</script>
