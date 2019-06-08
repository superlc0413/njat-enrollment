<template>
  <x-page class="enroll-entry">
    <x-header/>
    <x-view x-pos="center">
      <x-button @xclick="goToEnroll">开始报名</x-button>
    </x-view>
    <x-footer/>
  </x-page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    goToEnroll() {
      location.hash = "/normal-enroll";
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.enroll-entry {
}
</style>
