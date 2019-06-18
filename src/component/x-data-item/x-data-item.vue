<template>
  <div class="x-data-item ib-ctn">
    <div class="x-data-item__caption">{{caption}}：</div>
    <div class="x-data-item__value">
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
  white-space: nowrap;
  overflow: hidden;
  .x-data-item__caption {
    font-size: 14px;
    color: #fff;
    white-space: nowrap;
    width: 6em;
    text-align: right;
  }
  .x-data-item__value {
    font-size: 14px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
