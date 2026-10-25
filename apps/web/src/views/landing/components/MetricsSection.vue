<script setup lang="ts">
import { publicAsset } from "@/utils/publicAsset";

const stats = [
  { value: "24h", label: "首轮方案输出", note: "需求明确后 24 小时内给出可评审版本" },
  { value: "48-72h", label: "一轮打样验证", note: "把工程风险前置，减少后段返工" },
  { value: "2-3 轮", label: "典型定稿轮次", note: "结构化评审机制，缩短决策路径" },
  { value: "100%", label: "交付留档覆盖", note: "版本、合规、质检信息可追溯" },
];

const pillars = [
  {
    title: "可信的内容体系",
    desc: "案例、模板、标准沉淀为模块，方便跨项目复用与复盘。",
    image: publicAsset("ai/landing/metrics-system.webp"),
    alt: "内容体系 · 结构化呈现与叙事",
  },
  {
    title: "可量化的质量控制",
    desc: "把“好看”转成可验收的 print-ready 指标与质检清单。",
    image: publicAsset("ai/landing/metrics-quality.webp"),
    alt: "质量控制 · 工程验证与交付标准",
  },
  {
    title: "可扩展的履约网络",
    desc: "交付包一次打磨后，可复制到多主题、多渠道上新场景。",
    image: publicAsset("ai/landing/metrics-fulfillment.webp"),
    alt: "履约网络 · 规模化制造与交付控制",
  },
];
</script>

<template>
  <section class="section container" id="metrics" aria-labelledby="metrics-title">
    <header class="head">
      <h2 id="metrics-title">成果看板：让合作决策建立在可量化结果上</h2>
      <p class="desc">
        把“可交付”拆解成周期、质量、合规、复用四类指标。页面里的每个数字都对应实际流程节点，不是装饰性口号。
      </p>
    </header>

    <div class="stats">
      <div class="stat glass-surface" v-for="s in stats" :key="s.label">
        <div class="value">{{ s.value }}</div>
        <div class="label">{{ s.label }}</div>
        <div class="note">{{ s.note }}</div>
      </div>
    </div>

    <div class="pillars">
      <article class="pillar glass-surface" v-for="p in pillars" :key="p.title">
        <div class="media-frame">
          <img class="media-img" :src="p.image" :alt="p.alt" loading="lazy" decoding="async" />
        </div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.desc }}</p>
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

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat {
  padding: 18px;
  display: grid;
  gap: 6px;
  border-radius: var(--radius-xl);
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.stat:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
  background: var(--accent-soft-bg);
}

.value {
  font-size: 28px;
  font-weight: 950;
  letter-spacing: 0.3px;
  color: var(--font-color1);
}

@supports (-webkit-background-clip: text) {
  .value {
    background: linear-gradient(120deg, var(--accent), var(--accent-strong));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.label {
  font-weight: 800;
}

.note {
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.pillars {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.pillar {
  padding: 18px;
  display: grid;
  gap: 12px;
  border-radius: var(--radius-xl);
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.pillar:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
  background: var(--accent-soft-bg);
}

.media-frame {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background: rgba(148, 163, 184, 0.08);
}

.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

@media (max-width: 980px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pillars {
    grid-template-columns: 1fr;
  }
}
</style>
