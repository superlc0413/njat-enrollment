<template>
  <x-page>
    <x-header></x-header>
    <div v-if="orderList.length>0" class="my-order">
      <div class="title tc">订单查询</div>
      <ul class="info-list">
        <li v-for="(_,i) in orderList" :key="i">
          <div>
            <x-data-item class="col-8" caption="姓名">{{_.name}}</x-data-item>
            <x-data-item class="col-4" caption="年龄">{{_.age}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="身份证号">{{_.idCard}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="联系电话">{{_.phone}}</x-data-item>
          </div>
          <div>
            <x-data-item caption="期别">{{_.term}}</x-data-item>
          </div>
          <div>
            <x-data-item class="col-6" caption="上午课程">{{_.lesson_am}}</x-data-item>
            <x-data-item class="col-6" caption="下午课程">{{_.lesson_pm}}</x-data-item>
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

const sexLabels = ["", "男", "女"];
const termLabels = ["", "第一期", "第二期", "第三期"];
const lessonLabels = ["", "游泳", "滑冰", "棒球", "网球", "乒乓球", "足球"];

export default {
  data() {
    return {
      devMode: true,
      enrollOver: false,
      orderList: []
    };
  },
  methods: {
    goBack() {
      location.hash = this.enrollOver ? "/enroll-over" : "/enroll-entry";
    },
    preprocess(data) {
      return data.map(_ => {
        return {
          // 基础数据
          name: _.name,
          age: _.age,
          idCard: _.idCard,
          phone: _.phone,
          // select数据，不确定后台给的是中文还是数字
          // sex: parseInt(_.sex) > 0 ? sexLabels[_.sex] : _.sex,
          term: parseInt(_.period) > 0 ? termLabels[_.period] : _.period,
          lesson_am:
            parseInt(_.forenoon) > 0 ? lessonLabels[_.forenoon] : _.forenoon,
          lesson_pm:
            parseInt(_.afternoon) > 0 ? lessonLabels[_.afternoon] : _.afternoon
        };
      });
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
    if (this.devMode) {
      // 假数据
      this.orderList = this.preprocess(orderList);
      return;
    }

    // 入参data
    const data = {};
    this.loading();
    this.$http
      .post("/order2.php", data)
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
        > div {
          font-size: 0;
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


