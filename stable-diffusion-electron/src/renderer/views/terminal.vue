<template>
  <div>
    <ul class="terminal-ul">
      <li v-for="(item, index) of list" :key="index">
        {{ item.type }}
        <span v-html="item.data"></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from 'vue';

defineExpose({
  addItem
})

const list = ref([]);


function addItem(val) {
  list.value.push(val)
}


</script>

<style lang="scss" scoped>
.terminal-ul {

}
</style>
