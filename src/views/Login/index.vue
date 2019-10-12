<template>
  <div class="loginWrap">
    <!-- <el-button class="langBtn" circle plain @click="changeLanguage">{{targetLang}}</el-button> -->
    <div class="main-content">
      <div class="form-wrap">
        <el-row type="flex" justify="space-between">
          <el-col :span="12" class="image-group">
            <img class="home" src="../../assets/tree.png" />
          </el-col>
          <el-col :span="12" class="account-wrap">
            <el-input
              class="login-input"
              :placeholder="$t('login.user.placeholder')"
              v-model="email"
            />
            <el-input
              class="login-input"
              :placeholder="$t('login.password.placeholder')"
              v-model="password"
              type="password"
            />
            <el-button
              class="login-button"
              type="primary"
              @click="login"
              :loading="loading"
              :disabled="disabled"
            >{{loading ? $t('login.button.ing') : $t('login.button')}}</el-button>

            <div class="forget-tip" v-if="false">
              <span>忘记密码</span>
              <i class="el-icon-arrow-right" />
            </div>
          </el-col>
        </el-row>
      </div>

      <fmc-divider :extraStyle="{margin: '30px 0 10px'}" />
      <div class="footer-wrap">
        <div class="right-wrap">
          <span>{{$t('login.company.info')}}</span>
          <span>{{$t('login.right.info')}}</span>
        </div>
        <div class="quick-wrap" v-if="false">
          <span>について</span>
          <fmc-divider direction="vertical" />
          <span>ライセンス規約</span>
          <fmc-divider direction="vertical" />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const version = require("../../../package.json").version;
const API_BASE = ''

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      targetLang: this.getLangFromSession(),
      version: version,
      disabled: false
    };
  },
  methods: {
    login() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.$axios
        .post("http://localhost:8868/api/user/login", {
          email: this.email,
          password: this.password,
          type: 1
        })
        .then(() => {
          sessionStorage.setItem("secretUser", "fake");
          this.$router.push({
            path: "/index"
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getLangFromSession() {
      const last = sessionStorage.getItem("locale") || "ja-JP";

      return last == "ja-JP" ? "CN" : "JP";
    },

    changeLanguage() {
      this.disabled = true;
      const lang = this.targetLang == "JP" ? "CN" : "JP";

      const locale = this.targetLang == "JP" ? "ja-JP" : "zh-CN";

      this.$i18n.locale = locale;

      sessionStorage.setItem("locale", locale);

      this.targetLang = lang;

      this.$notify({
        message: this.$t("language.change.success"),
        duration: 2 * 1000,
        type: "success"
      });
      // FIXME: 不能热加载
      location.reload();
      this.disabled = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.loginWrap {
  user-select: none;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(../../assets/login-bg.jpg);
  background-position: center;
  justify-content: center;
  align-items: center;
}

.langBtn {
  color: white;
  font-weight: 600;
  width: 58px;
  height: 58px;
  background: #63636e;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
}

.main-content {
  margin-top: -200px;
}

.image-group {
  text-align: left;
  .home {
    width: 300px
  }
}

.tip {
  font-size: $F14;
  margin: 10px 0 30px;
  color: white;
}

.account-wrap {
  padding-left: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-input {
  margin: 10px 0;
}

.login-button {
  margin-top: 10px;
}

.forget-tip {
  text-align: right;
  margin: 10px 0 0;
  cursor: pointer;
  user-select: none;
}

.footer-wrap {
  font-size: $F12;
  display: flex;
  flex: 1;
  line-height: 20px;
  cursor: pointer;
  & .right-wrap {
    color: $FMC-Gray-Help;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  & .quick-wrap {
    margin-left: 40px;
    height: 20px;
    flex: 1;
    display: flex;
    justify-content: space-around;
  }
}
</style>
