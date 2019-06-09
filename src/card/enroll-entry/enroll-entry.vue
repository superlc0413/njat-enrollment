<template>
  <x-page class="enroll-entry">
    <x-header/>
    <x-view x-pos="center">
      <x-button @xclick="goToEnroll">开始报名</x-button>
      <x-button @xclick="checkMyOrder">我的订单</x-button>
    </x-view>
    <x-footer/>
  </x-page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    goToEnroll() {
      location.hash = "/normal-enroll";
    },
    checkMyOrder() {
      location.hash = "/order-list";
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.enroll-entry {
  .x-button {
    margin-top: 0.75rem;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
