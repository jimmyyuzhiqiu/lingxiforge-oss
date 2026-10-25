<script setup lang="ts">
import { useRouter } from "vue-router";
import { Lock, DocumentChecked, Checked, Key } from "@element-plus/icons-vue";

const router = useRouter();

const pillars = [
  {
    title: "安全基线",
    desc: "公开站与控制台分层，权限与会话策略更清晰。",
    icon: Lock,
  },
  {
    title: "IP 合规",
    desc: "授权范围、溯源留档与版本管理，降低文化 IP 风险。",
    icon: DocumentChecked,
  },
  {
    title: "打印就绪",
    desc: "壁厚/支撑/拆件与验收标准，让交付可控可复用。",
    icon: Checked,
  },
  {
    title: "隐私边界",
    desc: "数据使用目的透明，提供反馈与撤回通道。",
    icon: Key,
  },
] as const;
</script>

<template>
  <section class="trust" aria-labelledby="trust-title">
    <div class="wrap glass-card">
      <header class="head">
        <div class="left">
          <h2 id="trust-title">信任与安全</h2>
          <p class="subtitle">
            科创企业的专业度来自“可验证”。我们把安全、合规与交付标准做成一级内容，降低合作与采购的决策成本。
          </p>
        </div>
        <div class="right">
          <el-button type="primary" plain @click="router.push('/trust')">进入信任中心</el-button>
          <el-button plain @click="router.push('/contact?type=security')">安全反馈</el-button>
        </div>
      </header>

      <div class="grid">
        <article class="card glass-surface" v-for="p in pillars" :key="p.title">
          <div class="icon">
            <el-icon :size="18"><component :is="p.icon" /></el-icon>
          </div>
          <div class="title">{{ p.title }}</div>
          <div class="desc">{{ p.desc }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trust {
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
  max-width: 720px;
}

.right {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.card {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  gap: 8px;
}

.icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
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

