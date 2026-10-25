<script setup lang="ts">
import { useRouter } from "vue-router";
import { newsroomUpdates } from "@/data/marketingContent";
import { Calendar, ArrowRight } from "@element-plus/icons-vue";

const router = useRouter();
</script>

<template>
  <section class="updates" aria-labelledby="updates-title">
    <div class="wrap glass-card">
      <header class="head">
        <div class="left">
          <h2 id="updates-title">最新动态</h2>
          <p class="subtitle">保持“在建设中”的节奏感：更新、案例与能力边界公开透明。</p>
        </div>
        <div class="right">
          <el-button plain @click="router.push('/resources')">
            去资源中心
            <el-icon style="margin-left: 6px"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </header>

      <div class="grid">
        <article class="item glass-surface" v-for="n in newsroomUpdates" :key="n.date">
          <div class="date">
            <el-icon><Calendar /></el-icon>
            <span>{{ n.date }}</span>
          </div>
          <div class="title">{{ n.title }}</div>
          <div class="desc">{{ n.desc }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.updates {
  width: min(1180px, 92%);
  margin: 0 auto 18px;
}

.wrap {
  padding: 18px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.subtitle {
  margin: 6px 0 0;
  color: var(--font-color2);
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.item {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  gap: 8px;
}

.date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--font-color4);
  font-size: 12px;
}

.title {
  font-weight: 900;
}

.desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

