<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) of tabsList" :key="index" :label="item.label" :name="item.name">

        <el-button type="primary" @click="openFolder(item.path)">
          <el-icon class="space-right">
            <Folder/>
          </el-icon>
          打开文件夹
        </el-button>
        <el-button type="warning" @click="refreshPage(itemh)">
          <el-icon class="space-right">
            <Refresh/>
          </el-icon>
          刷新列表
        </el-button>
        <el-button type="success" @click="addModel(item)">
          <el-icon class="space-right">
            <DocumentAdd/>
          </el-icon>
          添加模型
        </el-button>

        <el-table :data="item.list" empty-text="没有文件" style="width: 100%">
          <el-table-column label="文件名称" prop="name"/>
          <el-table-column label="文件类型" prop="fileType">
            <template #default="scope">
              <el-tag :type="formatType(scope.row.fileType)">{{ scope.row.fileType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="大小" prop="size"/>
          <el-table-column label="创建时间" prop="createTime"/>
          <el-table-column label="更新时间" prop="updateTime"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import IpcRenderer from "@/utils/IpcRenderer";
import logger from "@/utils/logger";
import Utils from "@/utils";
import {DocumentAdd, Folder, Refresh} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import Config from "@/config";


const activeName = ref("ckpt")
const baseFolderName = Config.baseFolderName
const tabsList = ref([
  {
    label: "Stable Diffusion模型(ckpt)",
    name: "ckpt",
    list: [],
    path: `${baseFolderName}/models/Stable-diffusion`
  },
  {
    label: "LoRA",
    name: "lora",
    list: [],
    path: `${baseFolderName}/models/Lora`
  },
  {
    label: "嵌入式(Embedding)",
    name: "embedding",
    list: [],
    path: `${baseFolderName}/embeddings`
  },
  {
    label: "超网格(Hypernetwork)",
    name: "Hypernetwork",
    list: [],
    path: `${baseFolderName}/models/hypernetworks`
  }
])

function handleClick(e) {
  console.log(e)
  activeName.value = e.paneName;
  getActiveNameFiles()
}

function getActiveItem(name) {
  return tabsList.value.find((item) => item.name === name)
}

async function getFiles(path) {
  return new Promise((resolve, reject) => {
    IpcRenderer.getFolderFiles(path).then(res => {
      logger.info(res, '获取文件列表成功')
      resolve(res);
    }).catch(err => {
      logger.error(err, '获取文件列表失败')
      reject([]);
    })
  })
}

async function getActiveNameFiles() {
  let index = tabsList.value.findIndex((item) => item.name === activeName.value)
  if (index === -1) {
    index = 0
  }
  let result = []
  const currentItem = tabsList.value[index];
  const list = await getFiles(currentItem.path);
  result = list.map((item) => {
    item.size = Utils.getFileSize(item.size);
    item.createTime = Utils.formatTime(item.createTime);
    item.updateTime = Utils.formatTime(item.updateTime);
    return item;
  })
  tabsList.value[index].list = result;
  console.log(tabsList.value)
}

function formatType(val) {
  let type = 'info';
  if (val === '文件') {
    type = 'success'
  }
  return type;
}

function openFolder(folder) {
  IpcRenderer.openFolder(folder)
}

function refreshPage(item) {
  getActiveNameFiles()
  ElMessage({
    message: "刷新成功",
    type: 'success'
  })
}

function addModel() {
  const info = getActiveItem(activeName.value)
  // 添加模型
  IpcRenderer.saveFile(info.path, '保存模型').then((res) => {
    ElMessage({
      type: res.type,
      message: res.msg
    })
    getActiveNameFiles();
  }).catch(err => {
    logger.error(err, '保存文件失败')
    ElMessage.error({
      message: "保存失败，请重试"
    })
  });
}

onMounted(() => {
  getActiveNameFiles(activeName.value)
})
</script>

<style lang="scss" scoped>
.space-right {
  margin-right: 5px;
}
</style>
