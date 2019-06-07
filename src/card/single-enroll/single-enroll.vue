<template>
  <x-page>
    <!-- <x-logo/> -->
    <dl class="switch ib-ctn tc">
      <dd>单人报名</dd>
    </dl>
    <enroll-form ref="form1" :groupList="groupList"></enroll-form>
    <x-button @xclick="confirm">报名缴费</x-button>
  </x-page>
</template>

<script>
import EnrollForm from "@/card/enroll-form/enroll-form";
import wxPay from "@/common/mixin/wx-pay.js";

export default {
  data() {
    return {
      groupList: [
        { value: "A", text: "A组: 2010年及以后出生" },
        { value: "B", text: "B组: 2009年出生" },
        { value: "C", text: "C组: 2007~2008年出生" },
        { value: "D", text: "D组: 2005~2006年出生" },
        { value: "E", text: "E组: 2003~2004年出生" }
      ]
    };
  },
  methods: {
    confirm() {
      let info = this.$refs.form1.getData();
      if (info.err) {
        this.msg(info.err);
      } else {
        // 调用接口提交报名数据，t:0表示个人，1表示亲子
        this.loading();
        this.$http
          .post("/join_bm.php", Object.assign({}, info, { t: "1" }))
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
            this.msg("连接失败，请稍后再试")
          });
      }
    }
  },
  components: {
    EnrollForm
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  .switch {
    margin-top: 0.4rem;
    z-index: 2;
    &:first-child {
      // 上面没东西的时候不要上边距
      margin-top: 0;
    }
    dd {
      color: #fcbb2c;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .enroll-form {
    margin: 0.4rem auto 0;
  }
  .x-button {
    margin: 0.45rem auto 0;
  }
}
</style>


