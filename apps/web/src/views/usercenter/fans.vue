<script setup lang="ts">
import { fansList } from "@/data/siteContent";
</script>

<template>
  <div class="list-page">
    <h3>粉丝</h3>
    <el-row :gutter="16">
      <el-col :span="8" v-for="item in fansList" :key="item.id">
        <el-card class="list-card">
          <div class="card-body">
            <el-avatar :size="48">{{ item.name.slice(0, 1) }}</el-avatar>
            <div class="info">
              <h4>{{ item.name }}</h4>
              <p class="tag">{{ item.tag }}</p>
              <p class="meta">作品 {{ item.works }} · {{ item.time }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.list-page {
  padding: 20px;

  h3 {
    margin-bottom: 12px;
  }
}

.list-card {
  margin-bottom: 16px;
}

.card-body {
  display: flex;
  align-items: center;
  gap: 12px;

  .info {
    h4 {
      margin: 0 0 4px 0;
    }

    .tag {
      color: var(--font-color3);
      font-size: 12px;
      margin-bottom: 2px;
    }

    .meta {
      font-size: 12px;
      color: var(--font-color4);
    }
  }
}
</style>
