// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import $ from "jquery"
import axios from "axios"
import VueAxios from "vue-axios"
// app & router
import App from "./App"
import router from "./router"
// js工具对象
import eventBus from "@/common/unique/event-bus.js"
import { getUrlParam } from "@/common/unique/util.js"
// ui组件
import XButton from "@/component/x-button/x-button"
import XInput from "@/component/x-input/x-input"
import XPopper from "@/component/x-popper/x-popper"
import XSelect from "@/component/x-select/x-select"
import XOption from "@/component/x-select/x-option"
import XHeader from "@/component/x-header/x-header"
import XFooter from "@/component/x-footer/x-footer"
import XInfo from "@/component/x-info/x-info"
import XPage from "@/component/x-page/x-page"

// const openid = getUrlParam('openid')
// if (openid) {
//   localStorage.setItem('openid', openid)
// } else {
//   alert('微信登录失败')
// }

Vue.config.productionTip = false

// 集成axios到vue实例中
// Vue.axios
// this.axios
// this.$http 三种写法
Vue.use(
  VueAxios,
  axios.create({
    baseURL: "http://njat.kevinlu.cc/lll",
    // transformRequest: [() => {}],
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
)

// 全局混入
Vue.mixin({
  data(){
    return {
      eventBus
    }
  },
  methods: {
    jq() {
      // this.jq能局部使用jquery
      return $.fn.find.apply($(this.$el), arguments)
    },
    msg(str) {
      // msg组件在根vue实例中调用
      this.eventBus.$emit("showMsg", str)
    },
    loading(){
      this.eventBus.$emit("showLoading")
    },
    endLoading(){
      this.eventBus.$emit("hideLoading")
    },
    // 根据订单号校验
    checkOrder(num) {
      this.$http.post("/orderstatus.php", { orderNo: num }).then(resp => {
        if (resp && resp.data && resp.data.code == 200) {
          location.hash = "/enroll-success"
        } else {
          this.msg("支付失败")
        }
      })
    }
  },
  components: {
    XButton,
    XInput,
    XPopper,
    XSelect,
    XOption,
    XHeader,
    XFooter,
    XInfo,
    XPage
  }
})

//设计图宽度
const designWdith = 750

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  mounted() {
    $("html").css("font-size", `${100 / (designWdith / $(window).width())}px`)
  }
})
