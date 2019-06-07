<template>
  <div id="app">
    <!-- <transition name="route-view"> -->
    <router-view/>
    <!-- </transition> -->
    <x-msg ref="messagger"/>
    <x-loading ref="loading"/>
  </div>
</template>

<script>
import XMsg from "@/component/x-msg/x-msg";
import XLoading from "@/component/x-loading/x-loading";

export default {
  name: "App",
  components: {
    XMsg,
    XLoading
  },
  methods: {
    showMsg(str) {
      this.$refs.messagger.show(str);
    },
    showLoading(){
      this.$refs.loading.show()
    },
    hideLoading(){
      this.$refs.loading.hide()
    }
  },
  created() {
    // 监听“显示消息”事件
    this.eventBus.$on("showMsg", str => {
      this.showMsg(str);
    });
    this.eventBus.$on("showLoading", () => {
      this.showLoading();
    });
    this.eventBus.$on("hideLoading", () => {
      this.hideLoading();
    });
  }
};
</script>

<style lang="scss">
@import "./common/style/base.scss";
@import "./common/style/style.scss";
.route-view-enter {
  opacity: 0;
}
.route-view-leave-to {
  opacity: 0;
}
.route-view-enter-to {
  opacity: 1;
}
.route-view-leave {
  opacity: 1;
}

.route-view-enter-active,
.route-view-leave-active {
  transition: 0.03s ease-out;
}
</style>
