<template>
  <el-descriptions title="QQ群">
    <el-descriptions-item label="群号码">{{ qqInfo.groupId }}
      <el-button bg size="small" style="margin-left: 15px" text type="primary" @click="copyGroupId(qqInfo.groupId)">
        复制
      </el-button>
    </el-descriptions-item>
    <el-descriptions-item label="群名称">{{ qqInfo.groupName }}
      <el-button bg size="small" style="margin-left: 15px" text type="primary" @click="copyGroupId(qqInfo.groupName)">
        复制
      </el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import IpcRenderer from "@/utils/IpcRenderer";
import {ElMessage} from "element-plus";

const qqInfo = {
  groupId: '295897556',
  groupName: 'stable-diffusion一键启动'
}

function copyGroupId(val) {
  IpcRenderer.clipboardWriteText(val);
  ElMessage({
    message: "复制成功",
    type: "success"
  })
}
</script>

<style lang="scss" scoped>

</style>
