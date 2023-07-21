<script lang="ts" setup></script>

<template>
  <div class="container">
    <el-container>
      <el-header>
        <TheHeader/>
      </el-header>
      <el-container>
        <TheMain>
          <slot/>
        </TheMain>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>


.container:deep(.el-header) {
  padding: 0;
}
</style>
