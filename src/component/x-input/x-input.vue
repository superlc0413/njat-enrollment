<template>
  <div class="x-input ib-ctn tc">
    <div :class="{must}" class="star tc">*</div>
    <div class="input-body ib-ctn" @click="focusMe">
      <div class="placeholder single-row" v-html="placeholder"></div>
      <input
        :type="type"
        :maxlength="maxlength"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        :placeholder="`请输入${placeholder}`"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: [String, Number],
      default: ""
    },
    maxlength: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      default: ""
    },
    must: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    focusMe() {
      this.jq("input").focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.x-input {
  .star {
    color: transparent;
    font-size: 22px;
    width: 15px;
    padding-top: 2px;
    &.must {
      color: #fcbb2c;
    }
  }
  .input-body {
    width: 256px;
    height: 36px;
    line-height: 32px;
    padding-left: 16px;
    margin-left: 5px;
    background: rgba(8, 18, 80, 0.6);
    border-radius: 20px;
    border: 2px solid rgba(2555, 255, 255, 0.5);
    .placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      width: 63px;
    }
    input {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      margin-left: 10px;
      line-height: 20px;
      width: 150px;
      background: transparent;
    }
    ::placeholder {
      color: rgba(255, 255, 255, 0.48);
    }
  }
}
</style>


