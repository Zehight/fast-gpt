<template>
  <el-scrollbar class="scroll-bar">
    <el-main class="main-container">
      <slot/>
    </el-main>
  </el-scrollbar>
</template>

<style scoped>


.scroll-bar {
  flex: 1;
  height: calc(100vh - var(--header-height));
}
</style>
