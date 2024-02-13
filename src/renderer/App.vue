<template>
  <el-button>测试标题</el-button>
  <div class="tw-text-4xl tw-text-amber-500">测试内容</div>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
</template>

<script setup>
import logger from "@/utils/logger";

logger.error("👋 This message is being logged by \"App.vue\", included via Vite")
</script>
