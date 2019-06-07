<template>
  <x-page>
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
        "（1）参赛运动员承诺在比赛期间尊重和遵守比赛规则和规定，公平竞赛。为保证所有参赛运动员的安全，在规定区域内观摩比赛，不得干扰裁判，以免影响运动员成绩，如有违反须承担相应责任。",
        "（2）本人了解，比赛组织者或参与、协助本次比赛组织工作的个人可能因不可遇见的情况致使本人遭受人身伤害或者财产损失。本人已充分了解此类风险，且自愿承担相应后果。",
        "（3）参赛运动员应遵守场馆的各项规章制度，请勿将宠物，含酒精的饮料，有色饮料，玻璃器皿，尖锐物品以及危险物品带入场馆。严禁在场馆寻衅滋事，打架斗殴，追逐打闹，大声喧哗，由此照成伤害事故的，取消比赛资格并依法承担相应法律责任。",
        "（4）参赛运动员需身体健康，如发生运动损伤，应立即终止比赛进行治疗，如出现意外伤害，责任由选手自负。赛事将提供现场急救医生及药物以应对选手身体突发情况，后续治疗由选手自行负责。",
        "（5）参赛运动员同意接受主办方在比赛期间提供的现场急救性质的医务治疗。本人理解，任何医疗救治都存在风险。如需医院救治等发生的相关费用由本人负责。",
        "（6）如参赛运动员本人未满十八周岁，请参赛人员家长/法定监护人确认：（1）本人是参赛人员的父母或法定监护人。（2）本人代表未成年人进行确认，上述免责声明对我与未成年人均有约束力。"
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
    max-height: 5rem;
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
      margin-left: 1rem;
    }
  }
  .x-footer {
    margin-top: 0.38rem;
  }
}
</style>


