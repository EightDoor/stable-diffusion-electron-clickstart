<template>
  <div class="footer">
    <ul class="ul">
      <li>
        <span>作者: {{ footerInfo.author }}</span>
      </li>
      <li @click="goUrl(footerInfo.biliUrl)">
        <span class="href">B站</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import IpcRenderer from "@/utils/IpcRenderer";

const footerInfo = {
  author: "编程_by_乐码人",
  biliUrl: "https://space.bilibili.com/392881502"
}

function goUrl(val) {
  IpcRenderer.openExternalUrl(val)
}
</script>

<style lang="scss" scoped>
@import "@/assets/comm";

.footer {
  width: 100%;
  height: 35px;
  position: fixed;
  bottom: 0;
  left: 0;

  @include flex(row, center, center);

  .ul {
    @include flex(row, center, center);

    li {
      margin-right: 30px;
      font-size: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .href {
    color: blue;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
