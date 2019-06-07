<template>
  <div class="x-select ib-ctn tc">
    <div :class="{must}" class="star tc">*</div>
    <div class="select-body">
      <div @click.stop="switchOption" class="x-label ib-ctn">
        <div class="placeholder">{{placeholder}}</div>
        <div class="selected">{{curLabel}}</div>
        <div class="arrow" :class="{open}"></div>
      </div>
      <transition>
        <div v-show="open" class="x-options">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import GlobalClkMixin from "@/common/mixin/global-click";

export default {
  props: {
    placeholder: {
      type: [String, Number],
      default: ""
    },
    curVal: {
      type: [String, Number],
      default: ""
    },
    must: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: "curVal",
    event: "change"
  },
  mixins: [GlobalClkMixin],
  data() {
    return {
      open: false,
      // 当前的label
      curLabel: "",
      curOption: null
    };
  },
  methods: {
    switchOption() {
      this.open = !this.open;
      this.excuteGlobalClkExceptMe();
    },
    hideOption() {
      this.open = false;
    },
    showOption() {
      this.open = true;
    },
    initSlots() {
      if (this.$slots.default) {
        this.$slots.default.forEach(_ => {
          const com = _.componentInstance;
          if (this.curVal == com.value) {
            this.curLabel = com.label;
            com.highlight = true;
            this.curOption = com;
          }
          com.slotOwner = this;
        });
      }
    },
    modifyValue(option) {
      if (this.curVal != option.value) {
        this.curLabel = option.label;
        this.$emit("change", option.value);
        // 切换option高亮
        this.curOption.highlight = false;
        this.curOption = option;
        this.curOption.highlight = true;
      }
      this.hideOption();
    }
  },
  created() {
    // 注册全局click事件
    this.registerGlobalClk(() => {
      this.hideOption();
    });
  },
  mounted() {
    this.initSlots();
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/base.scss";
.x-select {
  .star {
    color: transparent;
    font-size: 22px;
    width: 15px;
    padding-top: 2px;
    &.must {
      color: #fcbb2c;
    }
  }
  .select-body {
    width: 256px;
    height: 36px;
    line-height: 36px;
    margin-left: 5px;
    padding-left: 22px;
    background: rgba(0, 10, 45, 0.68);
    border-radius: 18px;
    .placeholder {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      width: 38px;
    }
    .selected {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin-left: 10px;
      max-width: 152px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .arrow {
      position: absolute;
      right: 12px;
      top: 11px;
      background: url(../../asset/arr2-d.png) no-repeat;
      width: 15px;
      height: 15px;
      background-size: 100%;
      transition: transform 0.2s ease-out;
      &.open {
        @include transform(rotate(180deg));
      }
    }
    .x-options {
      position: absolute;
      bottom: 40px;
      right: 2px;
      z-index: 50;
      width: 75%;
      max-height: 120px;
      overflow-y: auto;
      overflow-x: hidden;
      background: #003;
      border: 1px solid #bcc;
      border-radius: 8px;

      &.v-enter,
      &.v-leave-to {
        opacity: 0;
        transform: translateY(10%);
      }
      &.v-enter-active,
      &.v-leave-active {
        transition: 0.2s ease-out;
      }
      &.v-enter-to,
      &.v-leave {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>


