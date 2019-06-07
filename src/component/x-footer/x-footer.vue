<template>
  <div class="x-footer">
    <img class="logo" :src="njatLogo">
    <div class="ch tc single-row">南京奥体中心经营管理有限公司</div>
    <div class="en tc single-row">Nanjing Olympic Sports Center Management Co., Ltd.</div>
  </div>
</template>
<script>
import njatLogo from "@/asset/logo3.png";

export default {
  data() {
    return {
      njatLogo
    };
  }
};
</script>
<style lang="scss" scoped>
.x-footer {
  margin-top: 0.3rem;
  opacity: 0.65;
  .logo {
    display: block;
    margin: 0 auto;
  }
  .ch {
    color: #fff;
    font-size: 12px;
    margin-top: 0.16rem;
  }
  .en {
    color: #fff;
    font-size: 12px;
    margin-top: 0.12rem;
  }
}
</style>


