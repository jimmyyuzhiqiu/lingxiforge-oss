<script setup lang="ts">
import { homeHighlights } from "@/data/siteContent";
</script>

<template>
  <div class="test-page">
    <h2>组件展示</h2>
    <p class="sub">用于快速预览主题样式与组件风格。</p>
    <div class="grid">
      <el-card v-for="item in homeHighlights" :key="item.title">
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
        <el-button type="primary" plain>查看</el-button>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-page {
  padding: 20px;

  .sub {
    color: var(--font-color2);
    margin-bottom: 16px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
</style>
