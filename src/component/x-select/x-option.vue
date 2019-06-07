<template>
  <div class="x-option noselect" :class="{highlight}" @click.stop="itemClk" :value="value">{{label}}</div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: [String, Number]
    }
  },
  data() {
    return {
      highlight: false
    };
  },
  methods: {
    itemClk() {
      this.slotOwner && this.slotOwner.modifyValue(this);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.x-option {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
  white-space: nowrap;
  line-height: 28px;
  padding: 0 10px;
  cursor: pointer;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  &.highlight {
    background: #025;
  }
}
</style>


