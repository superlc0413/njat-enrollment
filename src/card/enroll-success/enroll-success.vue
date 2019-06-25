<template>
  <x-page :at-top="true">
    <x-header/>
    <x-info icon="success.png" title="报名成功" desc="请关注微信公众号相关信息"/>
    <x-button @xclick="back2Entry">返回入口</x-button>
    <x-footer/>
  </x-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back2Entry() {
      location.hash = "/enroll-entry";
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.x-page {
  .x-info {
    margin-top: 0;
  }
  .x-button {
    margin: 0.75rem auto 0;
  }
  .x-footer {
    margin-top: 1rem;
  }
}
</style>


