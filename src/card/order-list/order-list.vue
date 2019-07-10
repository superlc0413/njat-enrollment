<template>
  <x-page :at-top="true">
    <x-header></x-header>
    <!-- 有数据 -->
    <div v-if="orderList.length>0" class="my-order">
      <div class="title tc">点击个人信息展示参赛二维码</div>
      <ul class="info-list">
        <li v-for="(_,i) in orderList" :key="i" @click="showQrCode(_.familyId)">
          <div>
            <x-data-item class="col-7" caption="家长姓名">{{_.name}}</x-data-item>
            <x-data-item class="col-5" caption="家长年龄">{{_.age}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="家长身份证">{{_.idCard}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="家长手机号">{{_.phone}}</x-data-item>
          </div>
          <div>
            <x-data-item class="col-7" caption="孩子姓名">{{_.childName}}</x-data-item>
            <x-data-item class="col-5" caption="孩子年龄">{{_.childAge}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="孩子身份证">{{_.childIdCard}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="孩子手机号">{{_.childPhone}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="报名序号" class="strong">{{_.sequence}}</x-data-item>
          </div>
        </li>
      </ul>
      <x-footer />
    </div>
    <!-- 无数据 -->
    <div v-else class="my-empty">
      <x-info icon="no-order.png" title="您暂无任何订单" :desc="desc"></x-info>
      <x-button class="go-back" @xclick="goBack">{{btnTxt}}</x-button>
      <x-footer />
    </div>
    <!-- 二维码弹层 -->
    <div class="qr-popper ib-ctn tc" v-if="qrVisible" @click="hideQrCode">
      <div @click.stop>
        <qrcode :value="qrValue" :options="{width:280}"></qrcode>
      </div>
    </div>
  </x-page>
</template>

<script>
import orderList from "@/card/model/order-data-20190618";

const sexLabels = ["", "男", "女"];

export default {
  data() {
    return {
      devMode: false,
      enrollOver: false,
      orderList: [],
      qrValue: "",
      qrVisible: false
    };
  },
  methods: {
    goBack() {
      location.hash = this.enrollOver ? "/enroll-over" : "/enroll-entry";
    },
    preprocess(data) {
      return data.map(_ => _);
    },
    showQrCode(val) {
      this.qrValue = val;
      this.qrVisible = true;
    },
    hideQrCode() {
      this.qrVisible = false;
    }
  },
  computed: {
    desc() {
      return this.enrollOver ? "报名已经截止" : "请返回首页报名";
    },
    btnTxt() {
      return this.enrollOver ? "返回首页" : "返回报名";
    }
  },
  created() {
    this.enrollOver = localStorage.getItem("enroll-over") === "1";
  },
  mounted() {
    if (this.devMode) {
      // 假数据
      this.orderList = this.preprocess(orderList);
      return;
    }

    // 入参data
    const data = {};
    this.loading();
    this.$http
      .post("/order.php", data)
      .then(resp => {
        this.endLoading();
        if (
          resp &&
          resp.data &&
          resp.data.code == 200 &&
          Array.isArray(resp.data.data)
        ) {
          this.orderList = this.preprocess(resp.data.data);
        } else {
          const msg = resp && resp.data && resp.data.msg;
          this.msg(msg || "获取数据失败");
        }
      })
      .catch(e => {
        this.endLoading();
        this.msg("连接失败，请稍后再试");
      });
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  .my-order {
    .title {
      color: #b2f534;
      font-size: 18px;
      font-weight: bold;
      margin: 0.6rem auto 0;
    }
    .info-list {
      width: 90%;
      margin: 0.5rem auto 0;
      height: 4.5rem;
      overflow-x: hidden;
      overflow-y: auto;
      > li {
        margin-top: 12px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #fff;
        &:first-child {
          margin-top: 0px;
        }
        > div {
          font-size: 0;
          margin-top: 5px;
          .x-data-item {
            /deep/ {
              .x-data-item__caption {
                text-align: left;
              }
            }
          }
        }
      }
    }
    .x-footer {
      margin-top: 0.5rem;
    }
  }
  .my-empty {
    .x-info {
      margin-top: 0rem;
    }
    .go-back {
      margin: 0.75rem auto 0;
    }
    .x-footer {
      margin-top: 1rem;
    }
  }
  .qr-popper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>


