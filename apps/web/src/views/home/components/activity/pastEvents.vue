<script setup lang="ts">
import { activityPast } from "@/data/siteContent";
</script>

<template>
  <div class="activity-header">
    <h3>往期活动</h3>
    <p>已经完成的案例与活动回顾。</p>
  </div>
  <ul class="activity-grid">
    <li v-for="item in activityPast" :key="item.id" class="activity-card">
      <div class="cover" :style="{ backgroundImage: `url(${item.cover})` }"></div>
      <div class="content">
        <div class="title">{{ item.title }}</div>
        <div class="meta">{{ item.date }} · {{ item.location }}</div>
        <div class="tags">
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </div>
        <p class="summary">{{ item.summary }}</p>
        <div class="status done">{{ item.status }}</div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/styles/home/components/activity/publicActivity";
</style>
