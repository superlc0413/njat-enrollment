<template>
  <div class="x-logo">
    <ul v-if="!useImgTitle" class="txt-title">
      <li>2019南京奥体中心</li>
      <li>“三菱重工空调杯”</li>
      <li>青少年羽毛球邀请赛</li>
    </ul>
    <img v-if="useImgTitle" class="img-title" :src="titlePng">
    <div v-if="raceDate" class="date-row ib-ctn tc">
      <img :src="starPng" class="star opacity50">
      <img :src="starPng" class="star opacity80">
      <img :src="starPng" class="star margin0">
      <div class="race-date">{{raceDate}}</div>
      <img :src="starPng" class="star">
      <img :src="starPng" class="star opacity80">
      <img :src="starPng" class="star opacity50 margin0">
    </div>
  </div>
</template>
<script>
import titlePng from "@/asset/title-img.png";
import starPng from "@/asset/star1.png";

export default {
  data() {
    return {
      titlePng,
      starPng,
      useImgTitle: false,
      raceDate: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
$logoRowMargin: 0.26rem;

.x-logo {
  margin: 0 auto;
  .txt-title {
    li {
      color: #fff;
      font-size: 0.45rem;
      font-weight: bold;
      line-height: 1;
      text-align: center;
      margin-top: $logoRowMargin;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  .img-title {
    display: block;
    width: 85%;
    margin: 0 auto 0;
  }
  .date-row {
    margin-top: $logoRowMargin;
    .star {
      width: 5px;
      height: 6px;
      margin-right: 0.1rem;
    }
    .race-date {
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      line-height: 1;
      margin: 0 10px;
    }
  }
}
</style>


