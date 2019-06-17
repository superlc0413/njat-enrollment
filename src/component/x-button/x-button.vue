<template>
  <div class="x-button tc noselect" @click="btnClk" :class="{disabled}" :style="styleString">
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
      type: [Number, String],
      default: 42
    },
    width: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    btnClk() {
      if (!this.disabled) this.$emit("xclick");
    }
  },
  computed: {
    styleString() {
      if (this.width > 0) {
        const height = this.width / 2.2;
        return `height:${height}px;width:${this.width}px;
                line-height:${height}px;
                border-radius:${height * 0.5}px;`;
      } else {
        return `height:${this.height}px;width:${this.height * 2.2}px;
                line-height:${this.height}px;
                border-radius:${this.height * 0.5}px;`;
      }
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


