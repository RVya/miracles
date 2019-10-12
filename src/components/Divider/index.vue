<template>
  <div :class="className" :style="style"></div>
</template>

<script>
export default {
  name: "Divider",
  props: {
    direction: {
      type: String, // "horizontal" || "vertical"
      default: "horizontal"
    },
    extraClass: {
      type: String,
      default: ""
    },
    extraStyle: {
      type: Object,
default: () => {}
    }
  },

  computed: {
    className() {
      const classMap = {
        horizontal: "horizontal",
        vertical: "vertical"
      };
      return `${classMap[this.direction]} ${this.extraClass}`;
    },
    style() {
      return {
        ...this.extraStyle
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

// default 水平
.horizontal {
  width: 100%;
  height: 1px;
  border-top: 1px solid $FMC-Gray;
  margin: 5px 0;
}

// 垂直
.vertical {
  height: 100%;
  width: 1px;
  border-left: 1px solid $FMC-Gray;
  margin: 0 5px;
}
</style>
