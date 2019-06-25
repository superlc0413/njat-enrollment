<template>
  <x-page>
    <!-- 标题行 -->
    <div class="title-row"></div>
    <!-- 多重表单 -->
    <enroll-form ref="form"/>
    <!-- 按钮行 -->
    <x-button @xclick="goToConfirmOrder">填写完成</x-button>
  </x-page>
</template>

<script>
import EnrollForm from "./enroll-form";

export default {
  data() {
    return {};
  },
  methods: {
    goToConfirmOrder() {
      const info = this.$refs.form.getData();
      if (info.err) {
        this.msg(info.err);
        return;
      }
      // 跳转到订单确认界面
      this.global.person = info;
      location.hash = "/confirm-order";
    }
  },
  components: {
    EnrollForm
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  .title-row {
    font-size: 16px;
    font-weight: bold;
    color: #fcbb2c;
    z-index: 2;
  }
  .enroll-form {
    margin-top: 0.1rem;
  }
  .x-button {
    margin: 0.25rem auto 0;
  }
}
</style>


