<script setup lang="ts">
import { detailsContent, industryStats, aboutContent } from "@/data/siteContent";
import { useRouter } from "vue-router";

const router = useRouter();

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const productKpis = [
  { value: "可打印网格", label: "自动修复/加厚建议" },
  { value: "GLB + STL", label: "展示与打印双输出" },
  { value: "局部增强", label: "纹样/浮雕可控细节" },
  { value: "多材质", label: "树脂 / PLA / 尼龙" },
] as const;

const pptHighlights = [
  {
    title: "全链路赋能平台",
    desc: "将研究、创意、建模、可制造优化与打印履约打通，支持馆方与品牌协作的标准化流程。",
    image: `${base}/showcase/lingxi-museum/assets/s02-1.png`,
  },
  {
    title: "三大痛点一页讲清",
    desc: "聚焦人力成本、协同复杂与同质化困局，把“快落地”和“可交付”作为第一优先级。",
    image: `${base}/showcase/lingxi-museum/assets/s06-1.png`,
  },
  {
    title: "产品模块：在线设计 + 云端智造",
    desc: "设计师在云端完成创作，一键下发到工厂；用可视化与自动化降低学习成本与交付风险。",
    image: `${base}/showcase/lingxi-museum/assets/s09-1.png`,
  },
  {
    title: "文化数字化与社会价值",
    desc: "沉淀高质量三维资产，支持互动展示与公共教育，把“看不见的文明”变成“可触达的体验”。",
    image: `${base}/showcase/lingxi-museum/assets/s24-1.png`,
  },
] as const;
</script>

<template>
  <section class="insights" id="insights">
    <header class="hero">
      <div class="left">
        <h2>企业级 AI 生成 · 可制造优化 · 打印履约</h2>
        <p class="subtitle">
          从提示词/参考图出发，生成可展示的 GLB 与可打印的 STL，并自动给出网格修复、壁厚与支撑建议，让方案更快落地成品。
        </p>
        <div class="cta">
          <el-button type="primary" @click="router.push('/workbench/Text-To-Img')">体验文生图</el-button>
          <el-button plain @click="router.push('/workbench/Text-To-3D')">体验文生 3D</el-button>
          <el-button @click="router.push('/showcase')">查看方案</el-button>
        </div>
      </div>
      <div class="right">
        <div class="kpis">
          <div class="kpi" v-for="item in productKpis" :key="item.value">
            <div class="value">{{ item.value }}</div>
            <div class="label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <section class="grid">
      <div class="card">
        <div class="card-title">核心工作流</div>
        <ol class="pipeline">
          <li v-for="(item, idx) in detailsContent.techPipeline" :key="item">
            <span class="step">{{ idx + 1 }}</span>
            <span class="text">{{ item }}</span>
          </li>
        </ol>
      </div>

      <div class="card">
        <div class="card-title">平台能力</div>
        <ul class="features">
          <li v-for="item in aboutContent.whatWeDo" :key="item.title">
            <div class="feature-title">{{ item.title }}</div>
            <div class="feature-desc">{{ item.desc }}</div>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title">行业信号</div>
        <div class="stats">
          <div class="stat" v-for="item in industryStats" :key="item.label">
            <div class="value">{{ item.value }}</div>
            <div class="label">{{ item.label }}</div>
            <div class="note">{{ item.note }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="highlights">
      <div class="highlights-head">
        <div class="left">
          <h3>内容精选</h3>
          <p>精选关键图示与要点，重排成更“产品化”的内容展示。</p>
        </div>
        <div class="right">
          <el-button plain @click="router.push('/showcase')">查看完整方案展示</el-button>
        </div>
      </div>

      <div class="highlights-grid">
        <article class="highlight-card" v-for="item in pptHighlights" :key="item.title">
          <img class="cover" :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/insights.scss";
</style>
