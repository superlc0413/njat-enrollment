<template>
  <x-popper ref="popper" class="x-msg">
    <div class="content tc">
      <div class="inner single-row light">{{content}}</div>
    </div>
  </x-popper>
</template>
<script>
import XPopper from "@/component/x-popper/x-popper";

let timer = -1;

export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    show(msg) {
      this.content = msg;
      const $popper = this.$refs.popper;
      $popper.show(true);
      // 针对多次调用
      clearTimeout(timer);
      // 2秒后自动消失
      timer = setTimeout(() => {
        $popper.hide(true);
        clearTimeout(timer);
      }, 2000);
    }
  },
  created() {},
  components: { XPopper }
};
</script>
<style lang="scss" scoped>
@import "../../common/style/base.scss";

.x-msg {
  .content {
    margin: 0 auto;
    font-size: 0;
    .inner {
      display: inline-block;
      font-size: 16px;
      line-height: 1.5;
      color: #fff;
      background: #000;
      max-width: 300px;
      padding: 10px 20px;
      @include borderRadius(5px);
      &.light {
        color: #333;
        background: #fff;
      }
    }
  }
}
</style>

