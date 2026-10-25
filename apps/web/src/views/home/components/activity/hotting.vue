<script setup lang="ts">
import { activityHot } from "@/data/siteContent";
</script>

<template>
  <div class="activity-header">
    <h3>火热进行中</h3>
    <p>正在报名或进行中的活动与共创计划。</p>
  </div>
  <ul class="activity-grid">
    <li v-for="item in activityHot" :key="item.id" class="activity-card">
      <div class="cover" :style="{ backgroundImage: `url(${item.cover})` }"></div>
      <div class="content">
        <div class="title">{{ item.title }}</div>
        <div class="meta">{{ item.date }} · {{ item.location }}</div>
        <div class="tags">
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </div>
        <p class="summary">{{ item.summary }}</p>
        <div class="status">{{ item.status }}</div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/styles/home/components/activity/publicActivity";
</style>
