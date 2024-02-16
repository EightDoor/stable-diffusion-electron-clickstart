<template>
  <el-descriptions :column="2" border title="应用">
    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>
  </el-descriptions>
  <CommunicationGroups class="space"/>
  <!--  <el-descriptions :column="2" border class="space" title="stable-diffusion-webui">-->
  <!--    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>-->
  <!--  </el-descriptions>-->
</template>

<script setup>
import {onMounted, ref} from 'vue';
import pkg from '@base/package.json';
import CommunicationGroups from '@/views/communication_groups/index.vue';

const toolSettings = ref({
  version: ''
})

onMounted(() => {
  toolSettings.value.version = pkg.version;
})
</script>

<style lang="scss" scoped>
.space {
  margin-top: 15px;
}
</style>
