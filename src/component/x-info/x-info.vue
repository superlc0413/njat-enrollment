<template>
  <div class="x-info" :style="{backgroundImage: `url(/static/${icon})`}">
    <div class="title single-row tc">{{title}}</div>
    <div class="desc single-row tc">{{desc}}</div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "提示"
    },
    desc: {
      type: String,
      default: "暂无描述"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.x-info {
  background-size: auto 125px;
  color: #fff;
  padding-top: 110px;
  background-repeat: no-repeat;
  background-position: 50% 0;
  .title {
    font-size: 24px;
    line-height: 26px;
  }
  .desc {
    margin-top: 0.23rem;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>


