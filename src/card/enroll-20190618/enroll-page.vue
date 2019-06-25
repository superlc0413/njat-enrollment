<template>
  <x-page :at-top="true">
    <!-- 标题行 -->
    <div class="title-row">注：单次报名十组及以上可以享受团购价</div>
    <!-- 多重表单 -->
    <ul class="form-ctnr">
      <li v-for="(_, i) in formData" :key="i" :class="`form${i+1}`">
        <div class="caption">报名家庭{{i+1}}</div>
        <enroll-form ref="forms"/>
      </li>
    </ul>
    <!-- 按钮行 -->
    <div class="x-btns ib-ctn tc">
      <x-button @xclick="addFamily">添加新组</x-button>
      <x-button @xclick="goToConfirmOrder">填写完成</x-button>
    </div>
  </x-page>
</template>

<script>
import EnrollForm from "./enroll-form";

export default {
  data() {
    return {
      formData: []
    };
  },
  methods: {
    goToConfirmOrder() {
      this.global.enrollingList = this.formData.reduce((infos, _, i) => {
        const info = this.$refs.forms[i].getData();
        if (!info.err) {
          infos.push(info);
        }
        return infos;
      }, []);

      if (!this.global.enrollingList.length) {
        this.msg("信息填写有误!!!");
        return;
      }

      // 跳转到订单确认界面
      location.hash = "/confirm-order";
    },
    addFamily() {
      this.formData.push({ empty: true });
      this.$nextTick(() => {
        const jq_formCtnr = this.jq(".form-ctnr");
        const jq_lastForm = jq_formCtnr.find(">li:last-child");
        const top_lastForm = jq_lastForm.position().top;
        const scrollTop_curr = jq_formCtnr.scrollTop();
        jq_formCtnr.scrollTop(scrollTop_curr + top_lastForm);
      });
    }
  },
  components: {
    EnrollForm
  },
  created() {
    let families = localStorage.getItem("qinzipao.confirm_order.family");
    if (families) {
      families = JSON.parse(families);
      if (Array.isArray(families)) {
        this.formData = families;
      }
    }
    // 如果缓存中取不到任何信息，添加一个空表格
    if (!this.formData.length) {
      this.formData.push({ empty: true });
    }
  },
  mounted() {
    this.formData.forEach((_, i) => {
      if (!_.empty) {
        this.$refs.forms[i].setData(_);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.x-page {
  padding-top: 0.6rem;
  .title-row {
    font-size: 16px;
    font-weight: bold;
    color: #fcbb2c;
    text-align: center;
    z-index: 2;
  }
  .form-ctnr {
    margin-top: 0.3rem;
    height: 9rem;
    overflow-x: hidden;
    overflow-y: scroll;
    .caption {
      margin-top: 0.5rem;
      font-size: 14px;
      text-align: center;
      &:first-child {
        margin-top: 0;
      }
    }
    .enroll-form {
      margin-top: 0.3rem;
    }
  }
  .x-btns {
    margin: 0.5rem auto 0;
    .x-button {
      &:first-child {
        margin: 0;
      }
      margin-left: 0.6rem;
    }
  }
}
</style>


