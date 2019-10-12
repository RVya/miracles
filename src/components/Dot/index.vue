<template>
  <div class="dot" :style="bgStyle"></div>
</template>

<script>
export default {
  name: "Dot",
  props: {
    color: {
      type: String,
      default: "#4DCDA4"
    }
  },
  computed: {
    bgStyle() {
      return {
        backgroundColor: this.color
      };
    }
  }
};
</script>

<style scoped>
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>