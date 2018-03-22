<template>
  <div class="zoehis_menu_group"
    :class="{'zoehis_menu_group_bg':isStyle2,
      'zoehis_menu_group_style3':isStyle3}">
    <div class="zoehis_menu_group_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: "ZoehisMenuGroup",
    componentName: "ZoehisMenuGroup",

    props: {
      activeName: {},
      value: {},
      type: {},
      disabled: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      beforeClick:Function
    },

    data() {
      return {
      };
    },

    computed: {
      isStyle2(){
        return this.type === "style2"
      },
      isStyle3(){
        return this.type === "style3"
      },
    },

    watch: {
      value(value,oldValue){
        this.$emit('change', value,oldValue);
        if(this.disabled) return false;
      }
    }
  }
</script>
