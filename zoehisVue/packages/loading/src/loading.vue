<template>
  <transition
    name="zoehis_loading_fade"
    enter-class="zoehis_loading_fade_enter"
    leave-active-class="zoehis_loading_fade_leave_active"
    @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[customClass,{ 'is_fullscreen': fullscreen },{'zoehis_loading_mask':setVisible}]">
      <div class="zoehis_loading_spinner"
        :class="{'zoehis_loading_spinner_hasFont':text,
        'zoehis_loading_index':!setVisible}">
        <div class="zoehis_loading_logo"></div>
        <p v-if="text" class="zoehis_loading_font">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        fullscreen: true,
        visible: false,
        customClass: '',
        setVisible: false
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('afterleave');
      },
      setText(text) {
        this.text = text;
      },

      setVisibleTrue: function (val) {
        this.setVisible = val;
      }

    }
  };
</script>
