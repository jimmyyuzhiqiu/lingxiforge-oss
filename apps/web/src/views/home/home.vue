<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { userModels, userStats, printAssets } from "@/data/siteContent";
import { getCurrentUser } from "@/utils/auth";

const router = useRouter();

const currentUser = computed(() => getCurrentUser());
const displayName = computed(
  () => currentUser.value?.displayName || currentUser.value?.username || "你"
);

const quickActions = [
  {
    title: "文生图",
    desc: "先做概念图与风格探索",
    path: "/workbench/Text-To-Img",
  },
  {
    title: "文生 3D",
    desc: "从提示词生成可预览网格",
    path: "/workbench/Text-To-3D",
  },
  {
    title: "图生 3D",
    desc: "上传参考图生成可打印模型",
    path: "/workbench/Image-To-3D",
  },
  {
    title: "3D 打印",
    desc: "对接材质/壁厚/支撑建议",
    path: "/workbench/3D-Printing",
  },
] as const;

const recentGenerated = computed(() => userModels.generated.slice(0, 4));
const recentPrints = computed(() => printAssets.slice(0, 4));
</script>

<template>
  <div class="dashboard-home">
    <section class="hero">
      <div class="left">
        <h1>欢迎回来，{{ displayName }}</h1>
        <p class="subtitle">
          这里是你的工作台概览：快速进入生成与打印流程，查看最近产出与待处理任务。
        </p>
        <div class="actions">
          <el-button type="primary" @click="router.push('/workbench/Text-To-3D')">开始生成</el-button>
          <el-button plain @click="router.push('/workbench/3D-Printing')">进入打印</el-button>
          <el-button plain @click="router.push('/home/usercenter')">个人中心</el-button>
        </div>
      </div>
      <div class="right">
        <div class="stats">
          <div class="stat">
            <div class="value">{{ userStats.used }}</div>
            <div class="label">使用次数</div>
          </div>
          <div class="stat">
            <div class="value">{{ userStats.likes }}</div>
            <div class="label">获赞</div>
          </div>
          <div class="stat">
            <div class="value">{{ userStats.fans }}</div>
            <div class="label">粉丝</div>
          </div>
          <div class="stat">
            <div class="value">{{ userStats.follow }}</div>
            <div class="label">关注</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>快速入口</h2>
      </div>
      <div class="quick-grid">
        <article class="quick-card" v-for="item in quickActions" :key="item.title" @click="router.push(item.path)">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="go">
            <span>立即进入</span>
            <i class="iconfont icon-xiangyoujiantou"></i>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>最近生成</h2>
        <el-button text @click="router.push('/home/usercenter')">查看全部</el-button>
      </div>
      <div class="card-grid">
        <article class="model-card" v-for="item in recentGenerated" :key="item.id">
          <img class="cover" :src="item.cover" :alt="item.title" loading="lazy" decoding="async" />
          <div class="meta">
            <div class="row">
              <div class="name">{{ item.title }}</div>
              <div class="status">{{ item.status }}</div>
            </div>
            <div class="prompt">{{ item.prompt }}</div>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>打印履约</h2>
        <el-button text @click="router.push('/workbench/3D-Printing')">进入打印</el-button>
      </div>
      <div class="card-grid">
        <article class="model-card" v-for="item in recentPrints" :key="item.id">
          <img class="cover" :src="item.cover" :alt="item.title" loading="lazy" decoding="async" />
          <div class="meta">
            <div class="row">
              <div class="name">{{ item.title }}</div>
              <div class="status">{{ item.quality }} · {{ item.material }}</div>
            </div>
            <div class="prompt">尺寸：{{ item.size }} · 材质：{{ item.material }} · 质量：{{ item.quality }}</div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/home/dashboard.scss";
</style>
