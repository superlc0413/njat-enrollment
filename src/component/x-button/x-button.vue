<template>
  <div
    class="x-button tc noselect"
    @click="btnClk"
    :class="{disabled}"
    :style="{height:`${height}px`, lineHeight:`${height}px`, width:`${height*2.2}px`, borderRadius:`${height*0.5}px`}"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 42
    }
  },
  data() {
    return {};
  },
  methods: {
    btnClk() {
      if (!this.disabled) this.$emit("xclick");
    }
  }
};
</script>
<style lang="scss" scoped>
.x-button {
  color: #fff;
  background: url(../../asset/btn2.png) no-repeat;
  background-size: 100% 100%;
  font-size: 16px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  -webkit-text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>


