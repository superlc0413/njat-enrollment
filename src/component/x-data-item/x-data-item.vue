<template>
  <div class="x-data-item ib-ctn">
    <div class="caption tr">{{caption}}：</div>
    <div class="value">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: "数据项"
    }
  }
};
</script>


<style lang="scss">
.x-data-item {
  display: inline-block;
  .caption {
    font-size: 14px;
    color: #fff;
    white-space: nowrap;
    width: 5em;
  }
  .value {
    font-size: 14px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>
