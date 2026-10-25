<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const updatedAt = "2026-01-30";

const categories = [
  {
    title: "必要类",
    desc: "用于保障站点基础功能与安全策略，例如会话状态、风控校验与稳定性控制。",
  },
  {
    title: "偏好类",
    desc: "用于记住你的偏好设置，例如主题模式与基础显示习惯。",
  },
  {
    title: "统计类（可选）",
    desc: "用于理解访问行为与页面表现，帮助优化信息架构和转化路径（上线后按需启用）。",
  },
  {
    title: "营销类（可选）",
    desc: "用于广告投放与再营销（如未来启用，将提供明确告知与同意机制）。",
  },
] as const;
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <h1>Cookie 政策｜存储类型与管理方式说明</h1>
          <p class="subtitle">
            最后更新：{{ updatedAt }}。本页面说明 Lingxi Forge 如何使用 Cookie 与本地存储以保障基础功能、记录偏好并持续改进体验。
          </p>
          <div class="cta">
            <el-button plain @click="router.push('/privacy')">隐私政策</el-button>
            <el-button plain @click="router.push('/terms')">服务条款</el-button>
            <el-button plain @click="router.push('/contact?type=security')">合规反馈</el-button>
          </div>
        </section>

        <section class="content glass-card">
          <h2>1. 我们使用的存储类型</h2>
          <div class="grid">
            <article class="card glass-surface" v-for="c in categories" :key="c.title">
              <div class="title">{{ c.title }}</div>
              <div class="desc">{{ c.desc }}</div>
            </article>
          </div>

          <h2>2. 你如何管理与撤回</h2>
          <ul>
            <li>你可以通过浏览器设置清除 Cookie/站点数据。</li>
            <li>主题等偏好项可能存储在本地（localStorage），清除后将恢复默认状态。</li>
            <li>如未来上线 Cookie 偏好面板，将提供更细粒度的同意、拒绝与撤回机制。</li>
          </ul>
        </section>

        <SiteFooter />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.top-header {
  z-index: 20;
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 0;
}

.main {
  padding: 0 0 40px;
}

.hero {
  margin: 90px auto 18px;
  width: min(980px, 92%);
  padding: 26px;
}

.subtitle {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 10px 0 14px;
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.content {
  width: min(980px, 92%);
  margin: 0 auto 18px;
  padding: 22px;

  h2 {
    margin: 18px 0 10px;
  }

  ul {
    margin: 0 0 10px;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.7;
    display: grid;
    gap: 6px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 8px;
}

.card {
  border-radius: 16px;
  padding: 14px;
}

.title {
  font-weight: 900;
  margin-bottom: 6px;
}

.desc {
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
