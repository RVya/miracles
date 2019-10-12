<template>
  <div class="app-wrap">
    <!-- Main Wrap -->
    <div class="main-wrap">
      <!-- SideBar -->
      <SideBar />
      <div class="main-view">
        <div class="navbar-wrap">
          <Navbar />
        </div>
        <div class="router-view-wrap">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import Navbar from "./Navbar";

export default {
  components: {
    SideBar,
    Navbar
  }
};
</script>

<style scoped>
.app-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.main-wrap {
  flex: 1;
  overflow: hidden;
  display: flex;
}

.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.router-view-wrap {
  flex: 1;
  display: flex;
}
</style>