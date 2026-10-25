<script setup lang="ts">
import { publicAsset } from "@/utils/publicAsset";

const solutions = [
  {
    title: "IP 挖掘",
    desc: "把馆藏与地域文化要素拆解为可复用的“纹样/器型/工艺/故事”四类资产。",
    image: publicAsset("ai/landing/solution-ip.webp"),
    alt: "馆藏灵感 · 纹样提取与要素拆解",
    points: ["元素库与标签体系", "授权范围与溯源留档", "系列化主题策展建议"],
  },
  {
    title: "AI 驱动设计",
    desc: "从提示词与参考图出发，快速生成多风格方案，并固化为可复用模板。",
    image: publicAsset("ai/landing/solution-ai-design.webp"),
    alt: "元素资产化 · 灵感与结构参考",
    points: ["提示词模板与风格边界", "多视角一致性与细节增强", "快速评审与版本对比"],
  },
  {
    title: "智能产品创新",
    desc: "把“好看”变成“能生产”：结构、材质与工艺约束前置，降低打样成本。",
    image: publicAsset("ai/landing/solution-manufacturing.webp"),
    alt: "工程验证 · 增材制造与结构优化",
    points: ["壁厚/支撑/拆件建议", "网格修复与容差策略", "Print-ready 验收清单"],
  },
  {
    title: "全域营销",
    desc: "把 3D 资产从文件夹升级为内容：官网互动展品、专题页与渠道物料一次生成。",
    image: publicAsset("ai/landing/solution-marketing.webp"),
    alt: "内容化展示 · 专题展陈与视觉表达",
    points: ["可交互 GLB 展品页模板", "专题策展与故事化讲述", "渠道上新物料与复盘报表"],
  },
];
</script>

<template>
  <section class="section container" id="solutions" aria-labelledby="solutions-title">
    <header class="head">
      <h2 id="solutions-title">我们的解决方案：把“项目”做成“可复用模块”</h2>
      <p class="desc">
        不堆砌文案，不靠单点爆款。用模块化方法把教程、案例、质量标准与合规流程做成可维护的内容体系，持续更新提升转化。
      </p>
    </header>

    <div class="grid">
      <article class="card glass-surface" v-for="item in solutions" :key="item.title">
        <div class="media-frame">
          <img class="media-img" :src="item.image" :alt="item.alt" loading="lazy" decoding="async" />
        </div>
        <div class="top">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
        <ul>
          <li v-for="p in item.points" :key="p">{{ p }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.head {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

h2 {
  margin: 0;
}

.desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
  max-width: 76ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.card {
  padding: 18px;
  display: grid;
  gap: 12px;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.06);
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 42%, transparent);
  background:
    radial-gradient(circle at 12% 8%, rgba(184, 134, 11, 0.1), transparent 58%),
    color-mix(in srgb, var(--accent-soft-bg) 72%, transparent);
  box-shadow:
    inset 0 2px 8px rgba(184, 134, 11, 0.15),
    0 12px 32px rgba(184, 134, 11, 0.12);
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url("/ai/landing/patterns/cloud-pattern.svg") center / 360px auto no-repeat;
  opacity: 0.08;
  z-index: 0;
}

.card::after {
  content: "";
  position: absolute;
  inset: 10px;
  border-radius: calc(var(--radius-xl) - 8px);
  border: 1px solid rgba(184, 134, 11, 0.12);
  pointer-events: none;
  background:
    url("/ai/landing/patterns/bronze-corner.svg") left top / 24px 24px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right top / 24px 24px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") left bottom / 24px 24px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right bottom / 24px 24px no-repeat;
  opacity: 0.42;
  z-index: 0;
}

.card > * {
  position: relative;
  z-index: 1;
}

.media-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background: rgba(148, 163, 184, 0.08);
  position: relative;
}

.media-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.08)),
    url("/ai/landing/patterns/wave-pattern.svg") center / 220px auto repeat;
  mix-blend-mode: soft-light;
  opacity: 0.35;
}

.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(0.95) saturate(0.85);
  mix-blend-mode: multiply;
}

.top {
  display: grid;
  gap: 6px;
}

h3 {
  margin: 0;
}

p {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.65;
  font-size: 13px;
}

ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.75;
  font-size: 13px;
}

:global(:root[theme="dark"] .card::before) {
  opacity: 0.08;
}

:global(:root[theme="dark"] .card::after) {
  border-color: rgba(193, 165, 118, 0.14);
  opacity: 0.24;
}

:global(:root[theme="dark"] .media-img) {
  filter: contrast(1.02) saturate(0.9) brightness(0.95);
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
