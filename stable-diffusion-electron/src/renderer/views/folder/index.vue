<template>
  <div class="folder-container">
    <el-row :gutter="12">
      <el-col v-for="(item, index ) of list" :key="index" :span="8" class="item" @click="openFolder(item)">
        <el-card shadow="hover">{{ item.title }}（{{ item.desc }}）</el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>

import logger from "@/utils/logger";
import IpcRenderer from "@/utils/IpcRenderer";
import {onMounted, ref} from 'vue';


const list = ref([])

onMounted(() => {
  getList()
})

async function getList() {
  list.value = [
    {
      title: "根目录",
      desc: ".",
      path: `.`,
    },
    {
      title: "扩展文件夹",
      desc: "extensions",
      path: `/extensions`,
    },
    {
      title: "临时文件夹",
      desc: "tmp",
      path: `/tmp`,
    },
    {
      title: "超分输出",
      desc: "extras-images",
      path: `/outputs/extras-images`,
    },
    {
      title: "文生图(网格)",
      desc: "txt2img-grids",
      path: `/outputs/txt2img-grids`,
    },
    {
      title: "文生图(单图)",
      desc: "txt2img-images",
      path: `/outputs/txt2img-images`,
    },
    {
      title: "图生图(网格)",
      desc: "img2img-grids",
      path: `/outputs/img2img-grids`,
    },
    {
      title: "图生图(单图)",
      desc: "img2img-images",
      path: `/outputs/img2img-images`,
    },
  ]
}

function openFolder(item) {
  logger.info(item, '当前点击项')
  IpcRenderer.openFolder(item.path)
}
</script>
<style lang="scss" scoped>
.folder-container {
  .item {
    margin-top: 15px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
