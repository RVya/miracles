<template>
  <div class="filterWrap">
    <el-input
      class="inputItem bigInputItem marginRight"
      aria-placeholder="true"
      :placeholder="$t('filter.orderId.placeholder')"
      @input="orderIdChange"
      v-model="orderId"
    />
    <el-input
      class="inputItem marginRight"
      aria-placeholder="true"
      :placeholder="$t('filter.wireless.number.placeholder')"
      v-model="seriesNumber"
      @input="wirelessChange"
      v-if="!hideWireless"
    />
    <fmc-select-button
      :content="$t('filter.all')"
      class="dateBtn marginRight"
      :isActive="!isManual && range === 'all'"
      :doSeclect="selectRange"
      :sourceData="{type: 'all'}"
    />
    <fmc-select-button
      :content="$t('filter.month')"
      class="dateBtn marginRight"
      :isActive="!isManual && range === 'currentMonth'"
      :doSeclect="selectRange"
      :sourceData="{type: 'currentMonth'}"
    />
    <el-date-picker
      type="date"
      :placeholder="$t('filter.date')"
      class="dateItem marginRight"
      value-format="yyyy-MM-dd"
      v-model="startDate"
    ></el-date-picker>
    <span class="division marginRight">-</span>
    <el-date-picker
      type="date"
      :placeholder="$t('filter.date')"
      class="dateItem marginRight"
      value-format="yyyy-MM-dd"
      v-model="endDate"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <el-button class="search operator marginRight" @click="search">{{$t('filter.search')}}</el-button>
    <el-button class="reset operator marginRight" @click="reset">{{$t('filter.reset')}}</el-button>
  </div>
</template>

<script>
import { onlyNumberFilter } from "@/utils";

import { getFirstDateAndLastDate, isSameDay, formatString } from "./helper";
export default {
  data() {
    return {
      orderId: "",
      seriesNumber: "",
      range: "all",
      startDate: "",
      endDate: "",
      pickerOptions: this.getDisabledDate()
    };
  },
  props: {
    searchData: {
      type: Function,
      default: () => {}
    },
    resetSearch: {
      type: Function,
      default: () => {}
    },
    dataChange: {
      type: Function,
      default: () => {}
    },
    hideWireless: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    startDate: function(date) {
      if (
        this.endDate &&
        new Date(this.endDate).getTime() < new Date(date).getTime()
      ) {
        this.endDate = formatString(date);
      }
    }
  },
  computed: {
    isManual() {
      return this.endDate || this.startDate;
    },
    filterData() {
      const dates = getFirstDateAndLastDate();
      let startDate = "";
      let endDate = "";
      if (!this.isManual && this.range === "all") {
        startDate = "";
        endDate = "";
      } else if (!this.isManual && this.range === "currentMonth") {
        startDate = dates.startDate;
        endDate = dates.endDate;
      } else {
        startDate = this.startDate;
        endDate = this.endDate;
      }
      const data = {
        orderId: this.orderId,
        seriesNumber: this.seriesNumber,
        startDate: startDate,
        endDate: endDate
      };
      return data;
    }
  },
  methods: {
    getDisabledDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (!self.startDate) {
            return false;
          } else {
            if (isSameDay(self.startDate, time)) {
              return false;
            } else {
              return (
                new Date(self.startDate).getTime() > new Date(time).getTime()
              );
            }
          }
        }
      };
    },
    orderIdChange(orderId) {
      this.$nextTick(function() {
        this.orderId = onlyNumberFilter(orderId);
      });
    },

    wirelessChange(wirelessNum) {
      this.$nextTick(function() {
        this.seriesNumber = onlyNumberFilter(wirelessNum);
      });
    },
    isValidDate(date) {
      return new Date(date).toString() !== "Invalid Date";
    },

    endDateChange(endDate) {
      this.endDate = endDate;
    },
    selectRange(item) {
      this.startDate = "";
      this.endDate = "";
      this.range = item.type;
    },
    search() {
      this.searchData(this.filterData);
    },
    reset() {
      this.resetSearch();
      this.orderId = "";
      this.seriesNumber = "";
      this.range = "all";
      this.startDate = "";
      this.endDate = "";
    }
  },
  updated() {
    this.dataChange(this.filterData);
  }
};
</script>

<style scoped lang="scss">
.marginRight {
  margin: 0 10px 0 0;
}
.filterWrap {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-shrink: 0;

  .inputItem {
    width: 120px;
  }

  .bigInputItem {
    width: 150px;
  }

  .dateBtn {
    width: 120px;
    flex-shrink: 0;
  }

  .dateItem {
    width: 148px;
  }

  .operator {
    text-align: center;
  }

  .search {
    background: #FF7D41;
    color: white;
  }
}
</style>