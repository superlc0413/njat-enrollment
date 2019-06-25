<template>
  <div class="x-select ib-ctn tc">
    <div :class="{must}" class="star tc">*</div>
    <div class="select-body">
      <div @click.stop="toggleOption" class="x-label ib-ctn">
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
      curLabel: null,
      curOption: null
    };
  },
  computed: {},
  watch: {
    curOption(newVal, oldVal) {
      // 切换展示值和选项的高光
      this.curLabel = newVal.label || "";
      oldVal && (oldVal.highlight = false);
      newVal.highlight = true;
    }
  },
  methods: {
    toggleOption() {
      this.open = !this.open;
      this.excuteGlobalClkExceptMe();
    },
    hideOption() {
      this.open = false;
    },
    showOption() {
      this.open = true;
    },
    optionCreated(vm_option) {
      if (this.curVal == vm_option.value) {
        this.curOption = vm_option;
      }
    },
    changeSelected(vm_option) {
      if (this.curVal != vm_option.value) {
        this.curOption = vm_option;
        // 双向绑定：内向外
        this.$emit("change", vm_option.value);
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
  mounted() {}
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
    line-height: 32px;
    margin-left: 5px;
    padding-left: 16px;
    // background: rgba(0, 10, 45, 0.68);
    background: rgba(8, 18, 80, 0.6);
    border: 2px solid rgba(2555, 255, 255, 0.5);
    border-radius: 18px;
    .placeholder {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      width: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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


