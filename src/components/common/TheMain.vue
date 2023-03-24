<template>
  <el-scrollbar class="scroll-bar">
    <el-main class="main-container">
      <slot/>
    </el-main>
  </el-scrollbar>
</template>

<style scoped>
.main-container {
  min-width: 1100px;
}

.scroll-bar {
  flex: 1;
  height: calc(100vh - var(--header-height));
}
</style>
