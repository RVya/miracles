<template>
  <el-button :class="wrapClass" @click="select" id="select-button" :style="wrapStyle">
    <span class="content">{{content}}</span>
    <svg-icon :iconClass="iconClass" class="anchor"></svg-icon>
  </el-button>
</template>

<script>
export default {
  name: "Select-Button",
  props: {
    content: {
      type: String,
      default: "默认"
    },
    isActive: {
      type: Boolean,
      default: false
    },
    doSeclect: {
      type: Function,
      default: () => {}
    },
    sourceData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    iconClass() {
      return !this.isActive ? "unActive" : "active";
    },

    wrapClass() {
      return !this.isActive ? "unActiveWrap wrap" : "activeWrap wrap";
    },

    wrapStyle() {
      return this.isActive ? { borderColor: "#ff7d41" } : {};
    }
  },
  methods: {
    select() {
      this.doSeclect(this.sourceData);
    }
  }
};
</script>

<style global lang="scss">
#select-button {
  .wrap {
    span {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
    }

    &.activeWrap {
      border-color: #ff7d41 !important;
    }
  }

  .anchor {
    margin-left: 10px;
  }
}
</style>