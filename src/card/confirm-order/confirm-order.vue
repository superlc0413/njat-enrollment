<template>
  <x-page class="confirm-order">
    <div class="tc title">请确认您的报名信息</div>
    <!-- 列表信息 -->
    <div class="scroll-ctnr">
      <ul class="info" v-for="(f,i) in families" :key="i">
        <li>
          <x-data-item class="name" caption="家长姓名">{{f.parentName}}</x-data-item>
        </li>
        <li>
          <x-data-item class="age" caption="家长年龄">{{f.parentAge}}</x-data-item>
        </li>
        <li>
          <x-data-item class="idcard" caption="家长身份证">{{f.parentIdCard}}</x-data-item>
        </li>
        <li>
          <x-data-item class="phone" caption="家长手机号">{{f.parentPhone}}</x-data-item>
        </li>
        <li>
          <x-data-item class="name" caption="孩子姓名">{{f.childName}}</x-data-item>
        </li>
        <li>
          <x-data-item class="age" caption="孩子年龄">{{f.childAge}}</x-data-item>
        </li>
        <li>
          <x-data-item class="idcard" caption="孩子身份证">{{f.childIdCard}}</x-data-item>
        </li>
        <li v-if="!!f.childPhone">
          <x-data-item class="phone" caption="孩子手机号">{{f.childPhone}}</x-data-item>
        </li>
      </ul>
      <!-- 总计信息 -->
      <ul class="total-info">
        <li>
          <x-data-item class="price" caption="每对亲子">￥{{singlePrice}}元</x-data-item>
        </li>
        <li>
          <x-data-item class="price" caption="共需付款">￥{{toPay}}元</x-data-item>
        </li>
      </ul>
    </div>
    <div class="btns ib-ctn">
      <x-button class="back-btn" @xclick="back2Form">重新填写</x-button>
      <x-button class="confirm-btn" @xclick="confirmZOrder">去付款</x-button>
    </div>
  </x-page>
</template>

<script>
import wxPay from "@/common/mixin/wx-pay.js";

const businessId = "qinzipao.confirm_order.family";

export default {
  data() {
    return {
      families: []
    };
  },
  methods: {
    getParamsFromGlobal() {
      const list = this.global.enrollingList;
      if (Array.isArray(list)) {
        this.families.push(...list);
        // 缓存新信息
        localStorage.setItem(businessId, JSON.stringify(list));
      } else {
        // 读取缓存
        const fJSON = localStorage.getItem(businessId);
        if (fJSON) {
          const list = JSON.parse(fJSON);
          const len = this.families.length;
          this.families.splice(0, len, ...list);
        }
      }
    },
    back2Form() {
      // localStorage.setItem(businessId, "");
      location.hash = "/enroll-page";
    },
    confirmZOrder() {
      const params = this.families.map(_ => {
        return {
          name: _.parentName,
          idCard: _.parentIdCard,
          phone: _.parentPhone,
          age: _.parentAge,
          childName: _.childName,
          childIdCard: _.childIdCard,
          childPhone: _.childPhone,
          childAge: _.childAge
        };
      });
      // 调用接口提交报名数据
      this.loading();
      this.$http
        .post("/join.php", Object.assign({}, params, {}))
        .then(resp => {
          if (resp && resp.data && resp.data.code == 200) {
            // js调启支付
            wxPay(resp.data.data, success => {
              this.endLoading();
              if (success) {
                this.checkOrder(resp.data.order_no);
              } else {
                this.msg("支付失败");
              }
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
    },
    calcSex(idCard) {
      const sexNum = parseInt(idCard.substr(16, 1));
      return sexNum % 2 == 0 ? "女" : "男";
    }
  },
  computed: {
    singlePrice() {
      return this.families.length < 2 ? 118 : 99;
    },
    toPay() {
      return this.singlePrice * this.families.length;
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getParamsFromGlobal();
  }
};
</script>

<style lang="scss">
.confirm-order {
  padding-top: 0;
  .title {
    color: gold;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
  }
  .scroll-ctnr {
    height: 9rem;
    overflow-x: hidden;
    overflow-y: scroll;
    .info {
      width: 90%;
      margin: 0 auto;
      padding: 0.35rem 0;
      border-bottom: 1px dashed #fff;
      &:first-child {
        margin-top: 0.3rem;
      }
      > li {
        font-size: 0;
        padding: 0 5%;
        text-align: left;
        margin-top: 0.5rem;
        &:first-child {
          margin-top: 0;
        }
      }
    }
    .total-info {
      margin-top: 0.6rem;
      > li {
        font-size: 0;
        padding: 0 10%;
        text-align: left;
        margin-top: 0.4rem;
        &:first-child {
          margin-top: 0;
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

