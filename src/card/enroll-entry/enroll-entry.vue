<template>
  <x-page>
    <!-- logo行 -->
    <x-logo/>
    <!-- 拒绝同意报名须知以后的提示信息 -->
    <div v-if="noticeRejected" class="rejected">
      <div class="txt tc">您必须先同意报名须知，才能参加报名哦</div>
      <x-button @xclick="openNotice">去同意</x-button>
    </div>
    <!-- 家庭报名和个人报名入口 -->
    <template v-else>
      <div class="btns">
        <x-button @xclick="singleEnroll()">单人报名</x-button>
        <x-button @xclick="coupeEnroll()">双人报名</x-button>
        <x-button @xclick="familyEnroll()">亲子报名</x-button>
      </div>
      <div class="my-order tc ib-ctn" @click="checkMyOrder()">
        <img :src="arrLPng" class="opacity50">
        <img :src="arrLPng" class="opacity80">
        <img :src="arrLPng" class="margin0">
        <div>订单查询</div>
        <img :src="arrRPng">
        <img :src="arrRPng" class="opacity80">
        <img :src="arrRPng" class="opacity50 margin0">
      </div>
    </template>
    <x-footer :class="{'notice-reject':noticeRejected}"/>
  </x-page>
</template>

<script>
import orderList from "@/card/model/order-data";
import arrLPng from "@/asset/arr-l1.png";
import arrRPng from "@/asset/arr-r1.png";

const ALWAYS_SHOW_NOTICE = true;

export default {
  name: "index",
  data() {
    return {
      arrLPng,
      arrRPng,
      noticeRejected: true,
      orderList: []
    };
  },
  methods: {
    singleEnroll() {
      location.hash = "/single-enroll";
    },
    familyEnroll() {
      location.hash = "/family-enroll";
    },
    coupeEnroll() {
      location.hash = "/coupe-enroll";
    },
    openNotice() {
      location.hash = "/enroll-notice";
    },
    checkMyOrder() {
      location.hash = "/order-list";
    }
  },
  created() {
    this.noticeRejected = localStorage.getItem("notice-rejected") == 1;
  },
  mounted() {
    // TODO: 找不到更合适的实际插入loading
    // this.loading()
    // this.endLoading()
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  .rejected {
    .txt {
      color: #fcbb2c;
      font-size: 0.32rem;
      font-weight: bold;
      line-height: 18px;
      margin-top: 2rem;
    }
    .x-button {
      margin: 2rem auto 0;
    }
  }
  .btns {
    margin: 1rem auto 0;
    .x-button {
      margin: 0.75rem auto 0;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  .my-order {
    margin-top: 0.75rem;
    line-height: 16px;
    img {
      margin-right: 0.1rem;
      width: 6px;
    }
    div {
      color: #fcbb2c;
      font-size: 14px;
      margin: 0 0.16rem;
    }
  }
  .x-footer {
    margin-top: 1rem;
    &.notice-reject {
      margin-top: 2rem;
    }
  }
}
</style>
