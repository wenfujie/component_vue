<template>
  <label
    class="zoehis_switch"
    :class="{ 'is_disabled': disabled, 'zoehis_switch_wide': hasText, 'is_checked': checked }">

    <div
      class="zoehis_switch_mask"
      v-show="disabled">
    </div>

    <input
      class="zoehis_switch_input"
      type="checkbox"
      ref="input"
      :name="name"
      :true-value="onvalue"
      :false-value="offvalue"
      :disabled="disabled"
      @change="handleChange">

    <span
      class="zoehis_switch_core"
      ref="core"
      :style="{ 'width': coreWidth + 'px' }">
      <span
        class="zoehis_switch_button"
        :style="{ transform }">
      </span>
    </span>

    <transition name="label_fade">
        <div
         class="zoehis_switch_label zoehis_switch_label_left"
         v-show="checked"
         :style="{ 'width': coreWidth + 'px' }">
          <span class="zoehis_switch_ontext" v-if="ontext">{{ ontext }}</span>
        </div>
    </transition>

    <transition name="label_fade">
      <div
        class="zoehis_switch_label zoehis_switch_label_right"
        v-show="!checked"
        :style="{ 'width': coreWidth + 'px' }">
        <span class="zoehis_switch_offtext" v-if="offtext">{{ offtext }}</span>
      </div>
    </transition>
    <slot></slot>
  </label>
</template>

<script>
  export default {
    name: 'ZoehisSwitch',
    componentName: 'ZoehisSwitch',
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      ontext: {
        type: String,
        default: ''
      },
      offtext: {
        type: String,
        default: ''
      },
      oncolor: {
        type: String,
        default: ''
      },
      offcolor: {
        type: String,
        default: ''
      },
      onvalue: {
        type: [Boolean, String, Number],
        default: true
      },
      offvalue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        coreWidth: this.width
      }
    },
    computed: {
      checked(){
        return this.value === this.onvalue;
      },
      hasText(){
        return this.ontext || this.offtext;
      },
      transform(){
        return this.checked ? `translate(${ this.coreWidth - 20 }px, 2px)` : 'translate(2px, 2px)';
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.oncolor || this.offcolor) {
          this.setBackgroundColor();
        }
      }
    },
    created() {
      if (!~[this.onvalue, this.offvalue].indexOf(this.value)) {
        this.$emit('input', this.offvalue);
      }
    },
    methods: {
      handleChange(){
        this.$emit('input', this.checked ? this.offvalue : this.onvalue);
        this.$emit('change', this.checked ? this.offvalue : this.onvalue);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      },
      setBackgroundColor(){
        let newColor = this.checked ? this.oncolor : this.offcolor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },

    },
    mounted(){
      if (this.width === 0){
        this.coreWidth = this.hasText ? 58 : 46;
      }
      if (this.oncolor || this.offcolor){
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  }
</script>
