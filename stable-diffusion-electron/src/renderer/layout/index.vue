<template>
  <div class="layout-container">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="layout-menu"
        default-active="/home"
        menu-trigger="click"
        popper-effect="dark"
        router
        text-color="#fff"
        @close="handleClose"
        @open="handleOpen"
    >
      <el-menu-item v-for="(item, index) of list" :key="index" :index="item.path">
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
const list = [
  {
    title: "首页",
    path: "/home"
  },
  {
    title: "模型",
    path: "/model"
  },
  {
    title: "交流群",
    path: "/communicationGroups"
  },
  {
    title: "关于",
    path: "/about"
  },
]

function handleOpen() {

}

function handleClose() {

}
</script>
<style lang="scss">
@import "@/assets/comm";

$layoutWidth: 80px;
.layout-container {
  @include flex(row, flex-start, flex-start);
  width: 100%;
  height: 100vh;

  .content {
    width: calc(100% - $layoutWidth);
    height: 100%;
    padding: 20px;
  }

  .layout-menu {
    width: $layoutWidth;
    height: 100%;
  }
}
</style>
