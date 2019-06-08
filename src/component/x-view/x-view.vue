<template>
  <div class="x-view ib-ctn" :style="outerStyle">
    <div class="x-view__inner" :style="innerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    yPos: {
      type: String,
      default: ""
    },
    xPos: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    _yPos() {
      let yPos = "middle";
      const yPosValidVal = { top: true, bottom: true };
      if (yPosValidVal[this.yPos]) {
        yPos = this.yPos;
      }
      return yPos;
    },
    _xPos() {
      let xPos = "left";
      const xPosValidVal = { center: true, right: true, justify: true };
      if (xPosValidVal[this.xPos]) {
        xPos = this.xPos;
      }
      return xPos;
    },
    _width() {
      return this.width > 0 ? this.width + "px" : "100%";
    },
    _height() {
      return this.height > 0 ? this.height + "px" : "240px";
    },
    outerStyle() {
      return `width:${this._width};height:${this._height};text-align:${
        this._xPos
      }`;
    },
    innerStyle() {
      return `vertical-align:${this._yPos}`;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.x-view {
}
</style>

