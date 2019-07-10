<template>
  <x-page class="enroll-entry" :at-top="true">
    <x-header/>
    <template v-if="rejected">
      <div class="reject-txt tc">您必须先同意参赛须知</div>
      <x-button @xclick="back2Notice">返回同意</x-button>
    </template>
    <template v-else>
      <x-button class="btn1" @xclick="goToEnroll">开始报名</x-button>
      <x-button @xclick="checkMyOrder">我的订单</x-button>
    </template>
    <x-footer/>
  </x-page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      rejected: false
    };
  },
  methods: {
    goToEnroll() {
      location.hash = "/enroll-page";
    },
    checkMyOrder() {
      location.hash = "/order-list";
    },
    back2Notice() {
      location.hash = "/enroll-notice";
    }
  },
  created() {
    localStorage.setItem("enroll-over","0")
    this.rejected = localStorage.getItem("notice-rejected") == 1;
    this.rejected = false
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.enroll-entry {
  .reject-txt {
    font-size: 16px;
    color: #fff;
    line-height: 30px;
    margin-top: 1.8rem;
  }
  .x-button {
    margin: 1.5rem auto 0;
    &.btn1 {
      margin-top: 1.6rem;
    }
  }
  .x-footer {
    margin-top: 1.3rem;
  }
}
</style>
