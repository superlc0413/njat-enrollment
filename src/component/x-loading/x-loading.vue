<template>
  <x-popper ref="popper" class="dark x-loading">
    <div class="content ib-ctn tc">
      <img class="loading-img" :src="loadingPng">
    </div>
  </x-popper>
</template>
<script>
import XPopper from "@/component/x-popper/x-popper";
import loadingPng from "@/asset/loading.png";

let timer = -1;

export default {
  data() {
    return {
      loadingPng
    };
  },
  methods: {
    show(msg) {
      this.$refs.popper.show();
    },
    hide(msg) {
      this.$refs.popper.hide();
    }
  },
  mounted() {},
  components: { XPopper }
};
</script>
<style lang="scss" scoped>
@import "../../common/style/base.scss";

@keyframes loadingRotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loadingRotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.x-loading {
  .content {
    margin: 0 auto;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 5px;
    .loading-img {
      animation: loadingRotation 1s infinite linear;
      -webkit-animation: loadingRotation 1s infinite linear;
      width: 32px;
      height: 32px;
    }
  }
}
</style>

