<template>
  <x-page>
    <dl class="switch ib-ctn tc">
      <dd :class="{focus:formVisi==3}" @click="formVisi=3">孩子信息</dd>
      <dt></dt>
      <dd :class="{focus:formVisi==1}" @click="formVisi=1">家长信息</dd>
    </dl>
    <div class="forms">
      <enroll-form v-show="formVisi==1" ref="form1"></enroll-form>
      <enroll-form v-show="formVisi==3" ref="form3" :groupList="groupList" :is-child="true"></enroll-form>
    </div>
    <x-button class="confirm" @xclick="confirm">缴费报名</x-button>
  </x-page>
</template>

<script>
import EnrollForm from "@/card/enroll-form/enroll-form";
import wxPay from "@/common/mixin/wx-pay.js";

export default {
  data() {
    return {
      formVisi: 3,
      groupList: [
        { value: "A", text: "甲组: 男孩2008年及以后出生" },
        { value: "B", text: "甲组: 女孩2008年及以后出生" },
        { value: "C", text: "乙组: 男孩2005~2007年出生" },
        { value: "D", text: "乙组: 女孩2005~2007年出生" }
      ]
    };
  },
  methods: {
    confirm() {
      const parent1 = this.$refs.form1.getData();
      const child = this.$refs.form3.getData();
      const err = parent1.err || child.err;

      if (err) {
        this.msg(err);
      } else {
        const info = Object.assign({}, parent1, {
          childName: child.name,
          childIdCard: child.idCard,
          childAge: child.age,
          childPhone: child.phone,
          childSex: child.sex,
          childGroup: child.group,
          // 家长组别必须跟孩子一致
          group: child.group,
          t: "3"
        });

        // 调用接口提交报名数据
        this.loading()
        this.$http
          .post("/join_bm.php", info)
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
      margin-top: 0;
    }
    dd {
      color: #fcbb2c;
      font-size: 16px;
      &.focus {
        font-weight: bold;
      }
    }
    dt {
      width: 1px;
      height: 12px;
      background: #fcbb2c;
      margin: 0 0.4rem;
    }
  }
  .forms {
    z-index: 1;
    margin: 0.4rem auto 0;
  }
  .confirm {
    width: 85%;
    margin: 0.18rem auto 0;
  }
}
</style>


