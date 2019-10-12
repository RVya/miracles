<template>
  <p>
    <slot name="description"></slot>
    <span v-if="!flag">{{time}}</span>
    <span v-else>{{$t('hall.table.content.order.timer.expired')}}</span>
  </p>
</template>

<script>
export default {
  props: {
    endTime: {
      type: String,
      default: new Date()
    },
    expiredCb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      time: "00 : 00 : 00",
      flag: false,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.flag == true || this.isInvalidDate) {
        this.flag = true;
        this.timer && clearInterval(this.timer);
        return;
      }
      this.timeDown();
    }, 1000);
  },
  computed: {
    isInvalidDate() {
      const isValid =
        new Date(this.endTime).toString() === "Invalid Date" ||
        new Date().getTime() - new Date(this.endTime).getTime() >= 0;

      if (new Date(this.endTime).toString() === "Invalid Date") {
        /* eslint-disable */
        console.warn("Invalid Date:", this.endTime);
      }

      if (new Date().getTime() - new Date(this.endTime).getTime() >= 0) {
        /* eslint-disable */
        console.warn("Expired Date: ", this.endTime);
      }
      return isValid;
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      let m = this.formate(parseInt((leftTime / 60) % 60));
      let s = this.formate(parseInt(leftTime % 60));
      if (leftTime <= 0) {
        this.flag = true;
        if (typeof this.expiredCb === "function") {
          this.expiredCb();
        }
      }
      this.time = `${d ? d + this.$t("count.down.day") : ""}${h}${this.$t(
        "count.down.hour"
      )}${m}${this.$t("count.down.minutes")}${s}${this.$t(
        "count.down.seconds"
      )}`;
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  },
  destroyed() {
    window.clearInterval(this.timer);
  }
};
</script>
