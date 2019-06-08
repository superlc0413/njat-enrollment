<template>
  <x-page>
    <!-- 标题行 -->
    <div class="title-row"></div>
    <!-- 多重表单 -->
    <enroll-form ref="form"/>
    <!-- 按钮行 -->
    <x-button @xclick="confirm">填写完成</x-button>
  </x-page>
</template>

<script>
import EnrollForm from "@/card/enroll-form/enroll-form";
import wxPay from "@/common/mixin/wx-pay.js";

export default {
  data() {
    return {};
  },
  methods: {
    confirm() {
      const info = this.$refs.form.getData();
      if (info.err) {
        this.msg(info.err);
        return;
      }

      // 调用接口提交报名数据
      this.loading();
      this.$http
        .post("/join_bm.php", Object.assign({}, infoList, {}))
        .then(resp => {
          if (resp && resp.data && resp.data.code == 200) {
            // js调启支付
            wxPay(resp.data.data, success => {
              this.endLoading();
              if (success) this.checkOrder(resp.data.order_no);
              else this.msg("支付失败");
            });
          } else {
            this.endLoading();
            const msg = resp && resp.data && resp.data.msg;
            this.msg(msg || "报名失败");
          }
        })
        .catch(e => {
          this.endLoading();
          this.msg("连接失败，请稍后再试");
        });
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


