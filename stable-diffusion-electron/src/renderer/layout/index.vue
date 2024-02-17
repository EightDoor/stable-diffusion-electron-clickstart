<template>
  <div class="layout-container">
    <el-menu
        class="layout-menu"
        default-active="/home"
        menu-trigger="click"
        popper-effect="dark"
        router
        @close="handleClose"
        @open="handleOpen"
    >
      <el-menu-item index="/home">
        首页
      </el-menu-item>
      <el-menu-item index="/model">
        模型
      </el-menu-item>
      <el-menu-item index="/about">
        关于
      </el-menu-item>
      <el-menu-item @click="switchTheme()">
        <el-icon v-if="!isDark">
          <Sunny/>
        </el-icon>
        <el-icon v-else>
          <Moon/>
        </el-icon>

        灯泡
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view v-slot="{Component}">
        <keep-alive :include="cacheList">
          <component :is="Component"/>
        </keep-alive>
      </router-view>
      <!--      <router-view></router-view>-->
    </div>
  </div>
  <Footer/>
</template>
<script setup>
import Footer from "@/components/Footer.vue";
import {Moon, Sunny} from "@element-plus/icons-vue";
import {useDark, useToggle} from '@vueuse/core'
import Constant from "@/utils/Constant";
import {useChangeTheme} from '@/stores';


const cacheList = ["home"]
const changeTheme = useChangeTheme()

const isDark = useDark(
    {
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
      storageKey: Constant.colorTheme
    }
)

function switchTheme() {
  changeTheme.change(isDark)
  const toggle = useToggle(isDark)
  toggle()
}

function handleOpen() {

}

function handleClose() {

}
</script>
<style lang="scss">
@import "@/assets/comm";

$layoutWidth: 100px;
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
