<template>
  <div id="pagination" v-if="total">
    <span v-html="$t('pagination.name', {count:total })" class="totalNumber"></span>
    <el-pagination
      id="pagination-wrap"
      :page-size="10"
      layout="prev, pager, next"
      :total="total"
      background
      @current-change="pageChange"
      :current-page="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    handlePageChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    pageChange(page) {
      this.handlePageChange(page);
    }
  }
};
</script>

<style global lang="scss">
$FontColor: #4a4a4a;
$Border: #dddddd;

#pagination {
  flex-shrink: 0;
  user-select: none;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .totalNumber {
    font-size: 18px;
  }

  .specColor {
    color: #ff7d41;
    margin: 0 4px;
  }
}

#pagination-wrap {
  text-align: right;

  .el-pager li {
    border: 1px solid $Border !important;
    background: white !important;
    border-radius: 4px !important;
  }
  &.el-pagination.is-background .el-pager li.active {
    background-color: $FontColor !important;
    color: white !important;
  }
}
</style>