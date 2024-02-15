<template>
  <div id="terminal" class="terminal-container">
    <ul class="terminal-ul">
      <li v-for="(item, index) of list" :key="index">
        <span :class="{'color-msg': item.type === 'msg', 'color-error': item.type === 'error'}"
              v-html="item.data"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {nextTick, ref} from 'vue';

defineExpose({
  addItem
})

const list = ref([]);


function addItem(val) {
  list.value.push(val)
  nextTick(() => {
    const dom = document.getElementById("terminal");
    dom.scrollTop = dom.scrollHeight
  })
}


</script>

<style lang="scss" scoped>
.terminal-container {
  width: 100%;
  height: calc(100vh - 90px - 50px);
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-all;
  //overflow-x: hidden;
  background: black;
  color: white;
  border-radius: 5px;

  .terminal-ul {
    padding: 15px;
    width: 100%;
    height: 100%;

    li {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}

.color-msg {
  color: #67c23a;
}

.color-error {
  color: #f56c6c;
}

</style>
<style lang="scss">

// 滚动条宽度
div::-webkit-scrollbar {
  width: 6px;
}

// 滚动条轨道
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

// 小滑块
div::-webkit-scrollbar-thumb {
  background: #40a0ff49;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #40a0ff;
}

</style>
