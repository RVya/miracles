<template>
  <div class="sortWrapper">
    <span>{{content}}</span>
    <div class="sortGroup">
      <i
        class="sort-caret ascending cursor"
        :class="{ active: active == 'asc'}"
        @click="sortClick('asc')"
      ></i>
      <i
        class="sort-caret descending cursor"
        :class="{ active: active == 'desc'}"
        @click="sortClick('desc')"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ""
    },
    sortCb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      active: "desc"
    };
  },

  methods: {
    sortClick(item) {
      this.active = item;
      this.sortCb && this.sortCb(item);
    }
  }
};
</script>

<style scoped lang="scss">
$ActiveColor: #ff7d41;
$UnActiveColor: #c0c4cc;

.sortWrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .cursor {
    cursor: pointer;
  }

  .sortGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 4px;

    .ascending {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 4px 6px 4px;
      border-color: transparent transparent $UnActiveColor transparent;

      &.active {
        border-bottom-color: $ActiveColor;
      }
    }

    .descending {
      margin-top: 4px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 4px 0 4px;
      border-color: $UnActiveColor transparent transparent transparent;

      &.active {
        border-top-color: $ActiveColor;
      }
    }
  }
}
</style>