<template>
  <x-page class="enroll-over">
    <x-logo/>
    <h3 class="tc">报名人数已满，更多精彩活动敬请期待</h3>
    <h4 class="tc">咨询电话：025-86690000</h4>
    <x-button @xclick="toMyOrder">我的订单</x-button>
    <x-footer/>
  </x-page>
</template>
<script>
export default {
  methods: {
    toMyOrder() {
      location.hash = "/order-list";
    }
  }
};
</script>
<style lang="scss" scoped>
.enroll-over {
  h3 {
    margin-top: 1.5rem;
    font-size: 16px;
  }
  h4 {
    margin-top: 0.5rem;
    font-size: 14px;
  }
  .x-button {
    margin: 1rem auto 1.5rem;
  }
}
</style>

