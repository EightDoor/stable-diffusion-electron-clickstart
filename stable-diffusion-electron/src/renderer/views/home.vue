<template>
  <div class="home-title">
    {{ Config.homeTitle }}
  </div>
  <div class="home-container">
    <div class="title">支持平台</div>
    <el-divider></el-divider>
    <ul class="platform-ui">
      <li v-for="(item, index) of platformList" :key="index">
        <el-tag :type="item.type">
          {{ item.title }}
        </el-tag>
      </li>
    </ul>
    <div class="title">
      <div>
        系统信息
      </div>
      <div
          v-if="!loading"
          class="refresh-icon"
          @click="getDeviceInfo">
        <el-icon>
          <Refresh/>
        </el-icon>
      </div>
    </div>
    <el-divider></el-divider>
    <div v-loading="loading"
         class="systeminfo"
         element-loading-text="获取系统信息中..."
    >
      <div v-if="systemInfo">
        <el-descriptions title="操作系统">
          <el-descriptions-item label="系统名称">
            <el-tag type="primary">{{ systemInfo.osInfo.hostname }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="平台">
            <el-tag type="primary">{{ systemInfo.osInfo.platform }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作系统名称">
            <el-tag type="primary">{{ systemInfo.osInfo.distro }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="版本">
            <el-tag type="primary"> {{ systemInfo.osInfo.release }} {{ systemInfo.osInfo.build }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="cpu">
          <el-descriptions-item label="制造商">
            <el-tag type="primary">{{ systemInfo.cpu.manufacturer }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="型号">
            <el-tag type="primary">{{ systemInfo.cpu.brand }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="基准速度">
            <el-tag type="primary">{{ systemInfo.cpu.speed }} GHz</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="内核">
            <el-tag type="primary">{{ systemInfo.cpu.physicalCores }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="逻辑处理器">
            <el-tag type="primary">{{ systemInfo.cpu.cores }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="内存">
          <el-descriptions-item label="总的物理内存">
            <el-tag type="primary"> {{ formatSize(systemInfo.mem.total) }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="3" direction="vertical" title="显卡">
          <ul>
            <li v-for="(item, index) of systemInfo?.graphics?.controllers" :key="index">
              <template v-if="item.vram">
                <el-descriptions-item label="制造商">
                  <el-tag type="primary"> {{ item.vendor }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="型号">
                  <el-tag type="primary"> {{ item.model }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="显存(VRAM)">
                  <el-tag type="primary"> {{ formatVRAM(item.vram) }}GB</el-tag>
                </el-descriptions-item>
              </template>
            </li>
          </ul>
        </el-descriptions>
        <el-empty v-if="systemInfo?.graphics?.controllers?.length === 0"
                  description="没有找到显卡设备信息，请检查是否安装驱动"/>
      </div>
    </div>
  </div>
  <div class="action">
    <el-button size="large" type="success" @click="oneClickStart">一键启动</el-button>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import IpcRenderer from "@/utils/IpcRenderer";
import logger from "@/utils/logger";
import Utils from "@/utils";
import Config from "@/config";
import {Refresh} from "@element-plus/icons-vue"

onMounted(() => {
  getDeviceInfo();
})

const loading = ref(false)
const systemInfo = ref()

async function getDeviceInfo() {
  loading.value = true
  const result = await IpcRenderer.getDeviceInfo()
  systemInfo.value = result;
  loading.value = false;
  logger.info(result, "获取设备信息")
}

function formatSize(val) {
  return Utils.getFileSize(val)
}

function formatVRAM(val) {
  return Utils.vRam(val)
}

const platformList = [
  {
    title: "windows AMD显卡",
    type: "success"
  }
]

async function oneClickStart() {
  const result = await IpcRenderer.oneClickStart();
  logger.info(result, '一键启动结果')
}
</script>

<style lang="scss" scoped>
.home-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}

.home-container {
  overflow-y: auto;

  .platform-ui {
    margin-bottom: 30px;
  }

  .title {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > div:nth-child(1) {
      margin-right: 15px;


    }

    .refresh-icon {
      margin-top: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .systeminfo {
    min-height: 300px;
  }
}

.action {
  position: fixed;
  bottom: 15px;
  right: 30px;
  z-index: 2;
}
</style>
