<template>
  <div class="navbar">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" v-if="!homePage && false">{{$t('sidebar.order.hall')}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in paths" :key="index">{{item.title || ''}}</el-breadcrumb-item>
      <audio id="noticeMusic" class="bg-music" controls="false" download="false">
        <source src="../../assets/notice.mp3" />
      </audio>
    </el-breadcrumb>
    <div class="user">
      <el-popover
        placement="bottom"
        width="320"
        trigger="click"
        v-model="visible"
        popper-class="userPoppver"
        transition="el-zoom-in-top"
      >
        <el-button round slot="reference" @click="visible = !!visible ">
          <div class="dropdownWrap">
            <svg-icon iconClass="person" />
            <div class="colItem el-dropdown-link dropdown-trigger">{{user.username}}</div>
            <i :class="iconName" />
          </div>
        </el-button>
        <div class="popArea">
          <div class="context">{{user.email || ""}}</div>

          <div class="context">{{'用户信息'}}</div>
          <div class="btnGroup">
            <el-button size="mini" v-if="false">
              <svg-icon iconClass="modifyPassword"></svg-icon>
              {{"更新密码"}}
            </el-button>
            <el-button @click="logout" size="mini">
              <svg-icon iconClass="quit"></svg-icon>
              {{"登出"}}
            </el-button>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { constantRouterMap } from "../../router/index";
import { resolveRouter } from "./helper";
const API_BASE = ''

export default {
  name: "Navbar",
  data() {
    return {
      routes: constantRouterMap,
      visible: false,
      user: {
        admin_name: "",
        company_id: "",
        company_name: "",
        email: "",
        phone: "",
        username: ""
      },
      userInfo: ""
    };
  },
  methods: {
    handleDropDownItemClick() {},
    logout() {
      sessionStorage.removeItem("secretUser");
      this.$axios.get(API_BASE + "/v2/logout").then(res => {
        if (res.errno * 1 != -1) {
          this.$notify({
            message: this.$t("logout.success"),
            duration: 2 * 1000,
            type: "success"
          });
          this.$router.push("/login");
        }
      });
    }
  },
  computed: {
    homePage() {
      return this.$route.path === "/index";
    },
    paths() {
      const routerMap = resolveRouter(this.routes);
      const path = this.$route.path;
      return routerMap.get(path) || [];
    },
    iconName() {
      return this.visible
        ? "el-icon-arrow-up svg-icon"
        : "el-icon-arrow-down svg-icon";
    }
  },
  created() {

    const email = sessionStorage.getItem('email')
    this.$axios
      .get(API_BASE + "/api/user/search" + `?email=${email}`)
      .then(res => {
        if (res.errno !== -1) {
          this.user = res.data;
          sessionStorage.setItem("secretUser", JSON.stringify(this.user));
        }
      })
      .catch(() => {});
  }
};
</script>

<style scoped lang="scss">
#noticeMusic {
  display: none;
}
.navbar {
  flex: 1;
  line-height: 40px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user {
  height: 40px;
  border-radius: 20px;
  background: #eee;
  cursor: pointer;
}

.userPoppver {
  margin-top: 8px;

  .popArea {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;

    .btnGroup {
      display: flex;
      flex: 1;
      margin: 10px 0;
      justify-content: space-between;
      align-items: center;
    }
    .context {
      text-align: left;
      margin: 5px 0;
    }

    .quit-icon {
      width: 12px;
      height: 12px;
    }
  }
}

.dropdownWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .svg-icon {
    margin: 0 4px;
  }
}

.dropdownItem {
  width: 100px;
}
</style>
