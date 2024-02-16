<template>
  <el-descriptions :title="Config.homeTitle">
    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>
  </el-descriptions>
  <el-descriptions title="stable-diffusion-webui">
    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import {onMounted} from 'vue';
import Config from "@/config";
import pkg from '@base/package.json';

const toolSettings = ref({
  version: ''
})

onMounted(() => {
  toolSettings.value.value = pkg.version;
})
</script>

<style lang="scss" scoped>

</style>
