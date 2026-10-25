<script setup lang="ts">
import { usedWorks } from "@/data/siteContent";
</script>

<template>
  <div class="list-page">
    <h3>作品被使用次数</h3>
    <el-table :data="usedWorks" style="width: 100%">
      <el-table-column prop="title" label="作品" />
      <el-table-column prop="usage" label="使用记录" width="160" />
      <el-table-column prop="date" label="更新时间" width="160" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.list-page {
  padding: 20px;

  h3 {
    margin-bottom: 12px;
  }
}
</style>
