<template>
  <div>
    <el-empty description="没有内容呢"/>
    <el-button @click="goHome">返回首页</el-button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

function goHome() {
  router.push("/home")
}
</script>

<style lang="scss" scoped>

</style>
