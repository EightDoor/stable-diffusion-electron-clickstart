<template>
  <div class="header-banner">
    <div class="title">
      {{ $t("home.title") }}
    </div>
    <div class="title1">
      {{ $t("home.title1") }}
    </div>
    <div class="desc">
      {{ $t("home.desc") }}
    </div>
  </div>
  <div class="home-container">
    <el-descriptions :column="2" :title="$t('home.supportingPlatforms')">
      <el-descriptions-item v-for="(item, index) of platformList" :key="index">
        <el-tag :type="item.type">
          {{ item.title }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <!--    <div class="title">-->
    <!--      <div>-->
    <!--        系统信息-->
    <!--      </div>-->
    <!--      <div-->
    <!--          v-if="!loading"-->
    <!--          class="refresh-icon"-->
    <!--          @click="getDeviceInfo">-->
    <!--        <el-icon>-->
    <!--          <Refresh/>-->
    <!--        </el-icon>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-loading="loading"
         class="systeminfo"
         element-loading-text="获取系统信息中..."
    >
      <div v-if="systemInfo">
        <!--        <el-descriptions title="操作系统">-->
        <!--          <el-descriptions-item label="系统名称">-->
        <!--            <el-tag type="primary">{{ systemInfo.osInfo.hostname }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="平台">-->
        <!--            <el-tag type="primary">{{ systemInfo.osInfo.platform }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="操作系统名称">-->
        <!--            <el-tag type="primary">{{ systemInfo.osInfo.distro }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="版本">-->
        <!--            <el-tag type="primary"> {{ systemInfo.osInfo.release }} {{ systemInfo.osInfo.build }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--        </el-descriptions>-->
        <!--        <el-descriptions title="cpu">-->
        <!--          <el-descriptions-item label="制造商">-->
        <!--            <el-tag type="primary">{{ systemInfo.cpu.manufacturer }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="型号">-->
        <!--            <el-tag type="primary">{{ systemInfo.cpu.brand }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="基准速度">-->
        <!--            <el-tag type="primary">{{ systemInfo.cpu.speed }} GHz</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="内核">-->
        <!--            <el-tag type="primary">{{ systemInfo.cpu.physicalCores }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--          <el-descriptions-item label="逻辑处理器">-->
        <!--            <el-tag type="primary">{{ systemInfo.cpu.cores }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--        </el-descriptions>-->
        <!--        <el-descriptions title="内存">-->
        <!--          <el-descriptions-item label="总的物理内存">-->
        <!--            <el-tag type="primary"> {{ formatSize(systemInfo.mem.total) }}</el-tag>-->
        <!--          </el-descriptions-item>-->
        <!--        </el-descriptions>-->
        <el-descriptions :column="3" :title="$t('home.graphicsCard')" direction="vertical">
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
  <div class="notice-container">
    <el-descriptions :column="1" :title="$t('home.notice')">
      <template #default>
        <el-descriptions-item>
          {{ $t("home.notice1") }}
        </el-descriptions-item>
        <el-descriptions-item>
          {{ $t("home.notice2") }}
        </el-descriptions-item>
        <el-descriptions-item>
          {{ $t("home.notice3") }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
  <!--  <div v-if="!startBtnStatus">-->
  <!--    <Terminal ref="termialRef"/>-->
  <!--  </div>-->
  <div class="action">
    <div v-if="startBtnStatus" class="action-btn" @click="oneClickStart">
      一键启动
    </div>
    <div v-if="!startBtnStatus" class="action-btn action-btn-red" @click="oneClickClose">
      停止
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import IpcRenderer from "@/utils/IpcRenderer";
import ipcRenderer from "@/utils/IpcRenderer";
import logger from "@/utils/logger";
import Utils from "@/utils";
import {ElMessage} from "element-plus";


onMounted(() => {
  getDeviceInfo();
  updateStableDiffusionChildVal();
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


const startBtnStatus = ref(true);
const termialRef = ref();
const childProcessData = ref()

function oneClickStart() {
  IpcRenderer.oneClickStart();
}

async function oneClickClose() {
  const pid = childProcessData.value?.pid;
  if (pid) {
    try {
      const result = await IpcRenderer.oneClickClose(pid);
      startBtnStatus.value = true;
      if (result) {
        ElMessage({
          message: "关闭成功",
          type: "success"
        })
      } else {
        ElMessage({
          message: "关闭失败，请手动关闭",
          type: "error"
        })
      }
    } catch (e) {
      ElMessage({
        message: e.message,
        type: "error"
      })
    }
  } else {
    ElMessage.error({
      message: "pid获取失败，请手动关闭",
    })
  }
}

function updateStableDiffusionChildVal() {
  ipcRenderer.updateStableDiffusionChildVal((msg) => {
    const result = Utils.jsonDeCode(msg);
    console.log(result, 'result')
    startBtnStatus.value = true;
    switch (result.type) {
      case "start":
        childProcessData.value = result;
        startBtnStatus.value = false;
        break;
      case "error":
        ElMessage.error("运行出错")
        startBtnStatus.value = false;
        break;
      case "close":
        startBtnStatus.value = true;
        break;
      case "msg":
        break;
    }
    // termialRef.value.addItem(result)
  })
}

</script>

<style lang="scss" scoped>
.header-banner {
  color: white;
  width: 100%;
  height: 150px;
  background: url("@/assets/images/header-banner.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  padding: 30px 20px;

  .title {
    font-size: 15px;
  }

  .title1 {
    font-size: 22px;
    margin: 10px 0;
  }

  .desc {
    font-size: 15px;
  }
}

.home-title {
  height: 50px;
  text-align: center;
  font-size: 30px;
  //margin-bottom: 30px;
}

.notice-container {
  margin-top: 10px;
  border-radius: 4px;
  font-weight: bold;
}

.home-container {
  margin-top: 20px;
  overflow-y: auto;


  .platform-ui {
    //margin-bottom: 30px;
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
    margin-top: 10px;
  }
}


.action-btn {
  margin: 0 auto;
  margin-top: 50px;
  width: 300px;
  text-align: center;
  line-height: 60px;
  height: 60px;
  background: #67c23a;
  color: white;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
}

.action-btn-red {
  @extend .action-btn;
  background: red;
}
</style>
