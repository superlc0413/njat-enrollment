<template>
  <div class="x-page ib-ctn">
    <div class="v-mid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.x-page {
  height: 100%;
  background: url(../../asset/bg-blue.jpg) no-repeat;
  background-size: 100% 100%;
  > .v-mid {
    font-size: 12px;
    color: #fff;
    min-height: 70%;
    width: 100%;
    padding-top: 0.15rem;
    background: transparent;
  }
}
</style>


