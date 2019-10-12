<template>
  <div class="loadingWrap">
    <div class="loading">
      <div class="dotGroup"/>
    </div>
    <div class="content" v-if="isValidNumber">{{leftNumber}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftNumber: 0,
      timer: null
    };
  },
  props: {
    countDown: {
      type: Number,
      default: 0
    },
    completeCb: {
      type: Function,
      default: () => {}
    }
  },

  computed: {
    isValidNumber() {
      return (
        this.countDown &&
        typeof this.countDown === "number" &&
        this.countDown > 0
      );
    }
  },
  mounted() {
    if (this.isValidNumber) {
      this.leftNumber = this.countDown;
      this.timer = setInterval(() => {
        if (this.leftNumber == 0) {
          clearInterval(this.timer);
          this.completeCb();
          return false;
        }
        this.leftNumber = this.leftNumber - 1;
      }, 1000);
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped lang="scss">
.loadingWrap {
  position: relative;
  width: 40px;
  height: 40px;
}
.loading {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #ff7d41;
  position: relative;
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  .dotGroup {
    position: absolute;
    width: 4px;
    background: white;
    height: 4px;
    top: 50%;
    left: -4px;
    margin-top: -2px;
    border-radius: 50% 50%;

    z-index: 1;
    overflow: hidden;
  }
}
.content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}

@keyframes rotate {
  0% {
    // transition: 0.5s ease-in;
    transition: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>