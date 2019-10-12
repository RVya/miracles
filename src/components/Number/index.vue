<template>
  <div class="NumberWrap">
    <span class="number">
      <fmc-magic-number :value="formatNumber"/>
    </span>
    <span class="desc">{{desc}}</span>
  </div>
</template>

<script>
export default {
  name: "Number",
  props: {
    number: {
      type: String,
      default: "0"
    },
    desc: {
      type: String || String,
      default: ""
    }
  },
  computed: {
    formatNumber() {
      const number = parseInt(this.number);
      return number > 0 ? number : 0;
    }
  }
};
</script>

<style scoped lang="stylus">
.NumberWrap
  width: 200px;
  color: #4a4a4a;
  display: flex;
  flex-direction: column;
  align-items: center;

.number
  font-weight: 800;
  line-height: 50px;
  font-size: 40px;
</style>