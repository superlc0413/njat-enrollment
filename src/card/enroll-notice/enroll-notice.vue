<template>
  <x-page :at-top="true">
    <x-header></x-header>
    <div class="title tc">参赛声明及安全须知</div>
    <ul class="notices">
      <li v-for="(_, i) in notices" :key="i" class="ib-ctn tl">
        <div class="star ib-ctn">
          <img :src="star1">
        </div>
        <div class="txt">{{_}}</div>
      </li>
    </ul>
    <div class="btns ib-ctn">
      <x-button class="cancel" @xclick="reject">取消</x-button>
      <x-button class="ok" @xclick="accept">同意</x-button>
    </div>
    <x-footer/>
  </x-page>
</template>

<script>
import star1 from "@/asset/star1.png";

export default {
  data() {
    return {
      star1,
      notices: [
        "（1）学员不得逞能、隐瞒，患有重大疾病、传染疾病和其他特殊病症，入营期间如身体生病不适或其它情况，要及时向老师们报告，应向老师们提前说明，绝对不可隐患病史，防止造成意外;",
        "（2）学员必须按照老师们的要求，统一地点，统一时间，统一行动；",
        "（3）任何时候、任何人不得离开团体擅自行动，必须跟随集体，特殊情况必须向老师报告;",
        "（4）严禁在课程中嬉笑打闹,严禁转场时在园区内逗留、玩闹;",
        "（5）遇有困难及时向老师们报告;",
        "（6）遇有危险时，迅速呼救，牢记组委会、老师与家人的联系方式。同学之间发生矛盾要报告教官或老师解决，不允许发生不文明现象;",
        "（7）注意好个人的财物安全;",
        "（8）如损坏夏令营公用物品，除将受到批评外还要原价赔偿;"
      ]
    };
  },
  methods: {
    accept() {
      localStorage.setItem("notice-rejected", 0);
      location.hash = "/enroll-entry";
    },
    reject() {
      localStorage.setItem("notice-rejected", 1);
      location.hash = "/enroll-entry";
    }
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin-top: 0.4rem;
  }
  .notices {
    max-height: 3.5rem;
    width: 90%;
    margin: 0.3rem auto 0;
    overflow-x: hidden;
    overflow-y: scroll;
    li {
      margin-top: 0.1rem;
      white-space: nowrap;
      line-height: 21px;
      &:first-child {
        margin-top: 0;
      }
      .star {
        vertical-align: top;
        margin-right: 5px;
        img {
          width: 10px;
          height: 11px;
        }
      }
      .txt {
        font-size: 14px;
        color: #fff;
        vertical-align: top;
        width: calc(100% - 18px);
        white-space: normal;
        text-align: justify;
      }
    }
  }
  .btns {
    margin-top: 0.5rem;
    text-align: center;
    .x-button {
      line-height: 20px;
      height: 22px;
    }
    .ok {
      margin-left: 0.8rem;
    }
  }
  .x-footer {
    margin-top: 0.38rem;
  }
}
</style>


