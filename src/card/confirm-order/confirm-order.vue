<template>
  <x-page class="confirm-order">
    <div class="tc title">请确认您的报名信息</div>
    <ul class="info">
      <li>
        <x-data-item class="name" caption="姓名">{{name}}</x-data-item>
      </li>
      <li>
        <x-data-item class="age" caption="年龄">{{age}}</x-data-item>
      </li>
      <li>
        <x-data-item class="idcard" caption="身份证号">{{idCard}}</x-data-item>
      </li>
      <li>
        <x-data-item class="phone" caption="联系电话">{{phone}}</x-data-item>
      </li>
      <li>
        <x-data-item class="term" caption="期别">{{term.label}}</x-data-item>
      </li>
      <li>
        <x-data-item class="lesson_am" caption="上午课程">{{lesson_am.label}}</x-data-item>
      </li>
      <li>
        <x-data-item class="lesson_pm" caption="下午课程">{{lesson_pm.label}}</x-data-item>
      </li>
      <li>
        <x-data-item class="price" caption="需付款">￥{{toPay}}元</x-data-item>
      </li>
    </ul>
    <div class="btns ib-ctn">
      <x-button class="back-btn" @xclick="back2Form">重新填写</x-button>
      <x-button class="confirm-btn" @xclick="confirmZOrder">去付款</x-button>
    </div>
  </x-page>
</template>

<script>
import wxPay from "@/common/mixin/wx-pay.js";

const businessId = "confirm_order.person";

export default {
  data() {
    return {
      name: "",
      age: "",
      idCard: "",
      phone: "",
      term: {},
      lesson_am: {},
      lesson_pm: {},
      toPay: 0
    };
  },
  methods: {
    getParamsFromGlobal() {
      const p = this.global.person;
      if (p) {
        // input信息
        this.name = p.name || "";
        this.age = p.age || "";
        this.idCard = p.idCard || "";
        this.phone = p.phone || "";
        // select信息
        this.term = p.term || {};
        this.lesson_am = p.lesson_am || {};
        this.lesson_pm = p.lesson_pm || {};
        // 缓存信息
        localStorage.setItem(
          businessId,
          JSON.stringify({
            name: this.name,
            age: this.age,
            idCard: this.idCard,
            phone: this.phone,
            term: this.term,
            lesson_am: this.lesson_am,
            lesson_pm: this.lesson_pm
          })
        );
      } else {
        let pJSON = localStorage.getItem(businessId);
        if (pJSON) {
          const p = JSON.parse(pJSON);
          // input信息
          this.name = p.name;
          this.age = p.age;
          this.idCard = p.idCard;
          this.phone = p.phone;
          // select信息
          this.term = p.term || {};
          this.lesson_am = p.lesson_am || {};
          this.lesson_pm = p.lesson_pm || {};
        }
      }
    },
    back2Form() {
      localStorage.setItem(businessId, "");
      location.hash = "/normal-enroll";
    },
    confirmZOrder() {
      const params = {
        name: this.name,
        age: this.age,
        idCard: this.idCard,
        phone: this.phone,
        period: this.term.value,
        forenoon: this.lesson_am.value,
        afternoon: this.lesson_pm.value
      };
      // 调用接口提交报名数据
      this.loading();
      this.$http
        .post("/join2.php", Object.assign({}, params, {}))
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getParamsFromGlobal();
  }
};
</script>

<style lang="scss">
.confirm-order {
  .title {
    color: gold;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
  }
  .info {
    margin-top: 1rem;
    > li {
      font-size: 0;
      padding: 0 10%;
      text-align: left;
      line-height: 0.85rem;
      .x-data-item {
        &.half,
        &.half + .x-data-item {
          width: 50%;
        }
        &.quarter {
          width: 25%;
        }
        &.quarter + .x-data-item {
          width: 75%;
        }
      }
    }
  }
  .btns {
    text-align: center;
    margin: 0.6rem auto 0;
    .confirm-btn {
      margin-left: 1rem;
    }
  }
}
</style>

