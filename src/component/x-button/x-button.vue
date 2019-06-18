<template>
  <div
    class="x-button tc noselect"
    :class="{disabled,type1,type2,type3}"
    @click="btnClk"
    :style="styleString"
  >
    <!-- type2：基佬紫+光影效果 -->
    <template v-if="type2">
      <img class="x-button__bg" :src="btn2" alt>
      <div class="x-button__txt tc">
        <slot></slot>
      </div>
    </template>
    <!-- 默认：type1 -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
<script>
import btn2 from "@/asset/btn2.png";
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
    },
    type: {
      type: [Number, String],
      default: 2
    }
  },
  data() {
    return {
      btn2,
      wHRatioMap: {
        type1: 2.2,
        type2: 2.8,
        type3: 2
      },
      bRadiusRatioMap: {
        type1: 0.5,
        type2: 0,
        type3: 0.5
      }
    };
  },
  methods: {
    btnClk() {
      if (!this.disabled) this.$emit("xclick");
    }
  },
  computed: {
    type1() {
      return this.type == 1;
    },
    type2() {
      return this.type == 2;
    },
    type3() {
      return this.type == 3;
    },
    styleString() {
      const typeName = `type${this.type}`;
      const whRatio = this.wHRatioMap[typeName];
      const bRadiusRatios = this.bRadiusRatioMap[typeName];

      if (this.width > 0) {
        const height = this.width / whRatio;
        return `height:${height}px;width:${this.width}px;
                line-height:${height - 1}px;
                border-radius:${height * bRadiusRatios}px;`;
      } else {
        return `height:${this.height}px;width:${this.height * whRatio}px;
                line-height:${this.height - 1}px;
                border-radius:${this.height * bRadiusRatios}px;`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.x-button {
  color: #fff;
  font-size: 16px;
  background: url(../../asset/btn1.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  -webkit-text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  &.type2 {
    background: none;
    background-size: 120% 120%;
    overflow: visible;
    box-shadow: none;
    -webkit-box-shadow: none;
    .x-button__bg {
      position: absolute;
      top: -4%;
      left: -4%;
      width: 110%;
      height: 123%;
      z-index: 1;
    }
    .x-button__txt {
      overflow: hidden;
      z-index: 2;
    }
  }
}
</style>


