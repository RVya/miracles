<template>
  <div class="side-bar-wrap">
    <div class="logo-wrap">
      <img src="../../assets/logo.png" />
    </div>
    <p class="version">Demo{{version}}</p>
    <el-menu
      :default-active="defaultActive"
      :collapse="false"
      background-color="#29292f"
      text-color="#fff"
      class="menu-item-no-border-right"
      active-text-color="#ff7d41"
    >
      <!-- Children More Than Two -->
      <template v-for="(item, index) in sidebarData">
        <el-submenu
          :index="item.path"
          :key="index"
          class="menu-item-no-border-right left-align"
          v-if="showSubmenu(item)"
        >
          <!-- Top Level Title -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </template>

          <!-- Submenu Item -->
          <template v-for="(submenuItem, i) in item.children">
            <el-menu-item
              :key="i"
              :index="submenuItem.path"
              v-if="!submenuItem.hidden"
              class="menu-item-no-border-right left-align"
            >
              <router-link tag="li" :to="submenuItem.path">
                <span>{{ submenuItem.meta.title || '' }}</span>
              </router-link>
            </el-menu-item>
          </template>
        </el-submenu>

        <!-- Children Group Only One Child -->
        <el-menu-item
          :index="item.children[0].path"
          :key="index"
          class="menu-item-no-border-right left-align"
          v-if="showMenuItem(item)"
        >
          <router-link tag="div" :to="item.children[0].path">
            <svg-icon :iconClass="getSvgClass(item)" />
            <span>{{ item.children[0].meta.title || '' }}</span>
          </router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { constantRouterMap } from "../../router/index";
const version = require("../../../package.json").version;

export default {
  data() {
    return {
      sidebarData: constantRouterMap,
      version: version
    };
  },
  methods: {
    showSubmenu(sidebarItem) {
      return (
        !sidebarItem.hidden &&
        (sidebarItem.children && sidebarItem.children.length > 1)
      );
    },

    showMenuItem(sidebarItem) {
      return (
        !sidebarItem.hidden &&
        (sidebarItem.children && sidebarItem.children.length === 1)
      );
    },

    getSvgClass(item) {
      // 容错
      return item.children[0] && item.children[0].meta && item.children[0].meta
        ? item.children[0].meta.icon
        : "call-center";
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
.side-bar-wrap {
  flex-shrink: 0;
  width: 160px;
  background-color: #29292f;
  color: white;
  height: 100%;
  border-right: solid 1px #e6e6e6;
  overflow: hidden;
  font-weight: 600;

  .version {
    text-align: left;
    width: 100%;
    padding: 0 20px;
    font-size: 10px;
    margin: 10px 0;
  }
}

.logo-wrap {
  height: 80px;
  text-align: center;
  font-size: 20px;
  line-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 100px;
}

.menu-item-no-border-right {
  border-right: none !important;
  background-color: white;
}

.el-menu-item:hover {
  background: #212126 !important;
}

.el-submenu .el-menu-item {
  padding: 0 0;
}

.left-align {
  text-align: left;
}
</style>