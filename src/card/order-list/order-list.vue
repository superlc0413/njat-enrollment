<template>
  <x-page>
    <x-header></x-header>
    <div v-if="orderList.length>0" class="my-order">
      <div class="title tc">订单查询</div>
      <ul class="info-list">
        <li v-for="(_,i) in orderList" :key="i">
          <div class="ib-ctn single-row tl">
            <span class="cap txt">身份证号：</span>
            <span class="txt">{{_.idCard}}</span>
          </div>
          <div class="ib-ctn single-row tl">
            <span class="cap txt">姓名：</span>
            <span class="wfixed txt">{{_.name}}</span>
            <span class="cap txt">性别：</span>
            <span class="txt">{{_.sexLabel}}</span>
          </div>
          <div class="ib-ctn single-row tl">
            <span class="cap txt">参赛项目：</span>
            <span class="wfixed txt">{{_.typeLabel}}</span>
            <span class="cap txt">组别：</span>
            <span class="txt">{{_.groups}}</span>
          </div>
        </li>
      </ul>
      <x-footer/>
    </div>
    <div v-else class="my-empty">
      <x-info icon="no-order.png" title="您暂无任何订单" :desc="desc"></x-info>
      <x-button class="go-back" @xclick="goBack">{{btnTxt}}</x-button>
      <x-footer/>
    </div>
  </x-page>
</template>

<script>
import orderList from "@/card/model/order-data";
const sexMap = { "1": "男", "2": "女" };
const typeMap = { "1": "单打", "2": "双打", "3": "亲子" };

export default {
  data() {
    return {
      orderList: [],
      enrollOver: false
    };
  },
  methods: {
    goBack() {
      location.hash = this.enrollOver ? "/enroll-over" : "/enroll-entry";
    },
    preprocess(data) {
      data.forEach(_ => {
        // 不确定性别、组别，后台给的是中文还是数字
        const isSexNum = parseInt(_.sex) > 0;
        _.sexLabel = isSexNum ? sexMap[_.sex] : _.sex;
        const isTypeNum = parseInt(_.type) > 0;
        _.typeLabel = isTypeNum ? typeMap[_.type] : _.type;
      });
      return data;
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
  mounted() {
    // 假数据
    // this.orderList = this.preprocess(orderList);

    // 入参data
    const data = {};
    this.loading();
    this.$http
      .post("/order_bm.php", data)
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
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      margin: 0.6rem auto 0;
    }
    .info-list {
      width: 85%;
      margin: 0.5rem auto 0;
      height: 6rem;
      overflow-x: hidden;
      overflow-y: auto;
      > li {
        margin-top: 12px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #fff;
        &:first-child {
          margin-top: 0px;
        }
        div {
          margin-top: 8px;
          &:first-child {
            margin-top: 0px;
          }
          .txt {
            font-size: 12px;
            &.wfixed {
              width: 2.4rem;
            }
          }
          .cap {
            width: 64px;
            margin-left: 10px;
            text-align: right;
            font-weight: bold;
            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }
    .switch {
      width: 85%;
      margin: 25px auto 0;
    }
    .x-footer {
      margin-top: 0.5rem;
    }
  }
  .my-empty {
    .x-info {
      margin-top: 1rem;
    }
    .go-back {
      margin: 1.45rem auto 0;
    }
    .x-footer {
      margin-top: 0.8rem;
    }
  }
}
</style>


