<template>
  <transition>
    <div v-if="visible" class="x-popper ib-ctn">
      <div class="center">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.x-popper {
  position: fixed !important;
  display: block !important;
  z-index: 100;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  background: transparent;
  .center {
    font-size: 12px;
    text-align: left;
    width: 100%;
  }
  &.dark {
    background: rgba(0, 0, 0, 0.6);
  }
}

// 渐变动画
.v-enter-active {
  transition: 0.15s ease-out;
}

.v-leave-active {
  transition: 0.1s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
</style>
