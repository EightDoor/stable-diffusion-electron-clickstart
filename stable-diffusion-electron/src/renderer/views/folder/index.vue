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

import Config from "@/config";
import logger from "@/utils/logger";
import IpcRenderer from "@/utils/IpcRenderer";

const basePath = Config.baseFolderName
const list = [
  {
    title: "根目录",
    desc: ".",
    path: `${basePath}`,
  },
  {
    title: "扩展文件夹",
    desc: "extensions",
    path: `${basePath}/extensions`,
  },
  {
    title: "临时文件夹",
    desc: "tmp",
    path: `${basePath}/tmp`,
  },
  {
    title: "超分输出",
    desc: "extras-images",
    path: `${basePath}/outputs/extras-images`,
  },
  {
    title: "文生图(网格)",
    desc: "txt2img-grids",
    path: `${basePath}/outputs/txt2img-grids`,
  },
  {
    title: "文生图(单图)",
    desc: "txt2img-images",
    path: `${basePath}/outputs/txt2img-images`,
  },
  {
    title: "图生图(网格)",
    desc: "img2img-grids",
    path: `${basePath}/outputs/img2img-grids`,
  },
  {
    title: "图生图(单图)",
    desc: "img2img-images",
    path: `${basePath}/outputs/img2img-images`,
  },
]

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
