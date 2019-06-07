<template>
  <x-page>
    <x-logo/>
    <x-info icon="success.png" title="报名成功" desc="请按公众号信息及时领取赛事包"/>
    <x-footer/>
  </x-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.x-page {
  .x-info{
    margin-top: 1.5rem;
  }
  .x-footer {
    margin-top: 3.0rem;
  }
}
</style>


