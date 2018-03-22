<template>
  <div class="zoehis_radio_group">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    name: "ZoehisRadioGroup",

    componentName: "ZoehisRadioGroup",

    props: {
      value: {},
      disabled: Boolean,
      isShowFocus: {
        type: Boolean,
        default: false
      },
      beforeClick: ""
    },

    watch: {
      value(value,oldValue) {
        this.$emit('change', value,oldValue);
      }
    },
    methods: {
    }
  }

</script>
