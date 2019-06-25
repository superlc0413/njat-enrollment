<template>
  <x-page :at-top="true">
    <x-header></x-header>
    <div class="title tc">参赛声明及安全须知</div>
    <ul class="notices">
      <li v-for="(sentence, i) in notices" :key="i" class="ib-ctn tl">
        <div class="star ib-ctn">
          <img :src="star1">
        </div>
        <div class="txt">{{`（${i+1}）${sentence}`}}</div>
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
        "活动对象：仅限儿童4-10周岁及60周岁以下法定监护人，年龄以身份证日期为准。",
        "对孩子做好安全教育，做好跑前热身，跑后拉伸。",
        "活动时，家长时刻关注和陪同孩子，在活动中如发现异常，及时联系现场工作人员和医护人员。",
        "活动现场会使用安全泡沫，参赛者在跑步及互动中，皮肤、鞋子、衣服会接触到泡沫。主办方提供湿巾等清洁工具，如您对此依旧有顾虑，请根据自己的情况准备装备，如眼镜、头巾或毛巾等。活动中的泡沫主要成分为水，建议所有参加者活动后及时擦干。",
        "有以下身体状况者不宜参加比赛：心肌炎、先天性心脏病和其它心脏病，高血压和脑血管疾病，冠状动脉病和严重心率不齐，血糖过高或过低的糖尿病其它不合适运动的疾病，孕妇。"
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


