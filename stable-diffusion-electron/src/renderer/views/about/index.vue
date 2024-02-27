<template>
  <el-descriptions :column="2" border title="启动器">
    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>
  </el-descriptions>
  <CommunicationGroups class="space"/>
  <!--  <el-descriptions :column="2" border class="space" title="stable-diffusion-webui">-->
  <!--    <el-descriptions-item label="版本">{{ toolSettings.version }}</el-descriptions-item>-->
  <!--  </el-descriptions>-->
  <div class="user-agreement">
    <h2 class="title">用户协议</h2>
    <ul class="user-agreement-content">
      <li>
        您不得实施包括但不限于以下行为，也不得为任何违反法律法规的行为提供便利：
        反对宪法所规定的基本原则的。
        危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。
        损害国家荣誉和利益的。
        煽动民族仇恨、民族歧视，破坏民族团结的。
        破坏国家宗教政策，宣扬邪教和封建迷信的。
        散布谣言，扰乱社会秩序，破坏社会稳定的。
        散布淫秽、色情、赌博、暴力、凶杀、恐怖或教唆犯罪的。
        侮辱或诽谤他人，侵害他人合法权益的。
        实施任何违背“七条底线”的行为。
        含有法律、行政法规禁止的其他内容的。
      </li>
      <li>
        因您的数据的产生、收集、处理、使用等任何相关事项存在违反法律法规等情况而造成的全部结果及责任均由您自行承担。
      </li>
    </ul>
  </div>
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

.user-agreement {
  .title {
    font-weight: bold;
    margin-top: 15px;
  }

  .user-agreement-content {
    li {
      margin-left: 20px;
      list-style: circle;
      margin-top: 15px;
      line-height: 25px;
      font-weight: 500;
    }
  }
}
</style>
