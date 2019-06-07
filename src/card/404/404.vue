<template>
  <x-page>
    <div class="center">
      <div class="title tc">没有该页面哦!</div>
      <div class="timer tc">{{countDown}}</div>
    </div>
  </x-page>
</template>

<script>
export default {
  data() {
    return {
      countDown: 0
    };
  },
  created() {
    this.countDown = 3;
  },
  mounted() {
    let timer = setInterval(() => {
      this.countDown--;
      if (this.countDown <= 0) {
        clearTimeout(timer);
        location.hash = "/";
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.center {
  min-height: 50% !important;
  .title {
    font-size: 28px;
  }
  .timer {
    margin-top: 50px;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>


