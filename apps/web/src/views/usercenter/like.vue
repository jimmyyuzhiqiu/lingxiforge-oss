<script setup lang="ts">
import { likedWorks } from "@/data/siteContent";
</script>

<template>
  <div class="list-page">
    <h3>作品获赞</h3>
    <el-table :data="likedWorks" style="width: 100%">
      <el-table-column prop="title" label="作品" />
      <el-table-column prop="creator" label="创作者" width="160" />
      <el-table-column prop="date" label="点赞时间" width="160" />
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
