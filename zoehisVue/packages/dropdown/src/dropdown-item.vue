<template>
  <li
    class="zoehis_dropdown_item"
    :class="{
      'zoehis_is_disabled': disabled,
      'zoehis_is_divided': divided
    }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'ZoehisDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean
    },

    methods: {
      handleClick(e) {
        if(this.disabled) return false
        this.$emit("click",this.command);
        this.dispatch('ZoehisDropdown', 'menu-item-click', [this.command, this,e]);
      }
    }
  };
</script>
