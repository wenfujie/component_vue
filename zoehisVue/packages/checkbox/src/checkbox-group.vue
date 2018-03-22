<template>
  <div class="zoehis_checkbox_group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ZoehisCheckboxGroup',
    componentName: 'ZoehisCheckboxGroup',
    props: {
      value: {}
    },
    watch:{
      value(val){
        this.$emit("change",[val]);
      }
    }
  };
</script>
