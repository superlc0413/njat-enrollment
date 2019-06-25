<template>
  <div class="x-page ib-ctn">
    <div class="v-locator" :class="atTop?'v-top':'v-middle'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    atTop: {
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  height: 100%;
  background: url(../../asset/bg-run1.jpg) no-repeat;
  background-size: 105% 105%;
  > .v-locator {
    font-size: 12px;
    color: #fff;
    min-height: 70%;
    width: 100%;
    padding-top: 0.15rem;
    background: transparent;
    &.v-top {
      padding-top: 0;
      vertical-align: top;
      height: 100%;
    }
  }
}
</style>


