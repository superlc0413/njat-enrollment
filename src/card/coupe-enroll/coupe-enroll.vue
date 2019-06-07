<template>
  <x-page>
    <dl class="switch ib-ctn tc">
      <dd :class="{focus:formVisi==1}" @click="formVisi=1">选手1</dd>
      <dt></dt>
      <dd :class="{focus:formVisi==2}" @click="formVisi=2">选手2</dd>
    </dl>
    <div class="forms">
      <enroll-form v-show="formVisi==1" ref="form1" :groupList="groupList"></enroll-form>
      <enroll-form v-show="formVisi==2" ref="form2" no-sex></enroll-form>
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
      formVisi: 1,
      groupList: [
        { value: "A", text: "A组: 2009年及以后出生" },
        { value: "B", text: "B组: 2007~2008年出生" },
        { value: "C", text: "C组: 2005~2006年出生" },
        { value: "D", text: "D组: 2003~2004年出生" }
      ]
    };
  },
  methods: {
    confirm() {
      const person1 = this.$refs.form1.getData();
      const person2 = this.$refs.form2.getData();
      const err = person1.err || person2.err;

      if (err) {
        this.msg(err);
      } else {
        const info = Object.assign({}, person1, {
          name2: person2.name,
          idCard2: person2.idCard,
          age2: person2.age,
          phone2: person2.phone,
          // 双打必须性别一致，组别一致
          sex2: person1.sex,
          group2: person1.group,
          t: "2"
        });

        // 调用接口提交报名数据
        this.loading();
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
      // 上面没东西的时候不要上边距
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
    margin: 0.3rem auto 0;
  }
  .confirm {
    width: 85%;
    margin: 0.18rem auto 0;
  }
}
</style>


