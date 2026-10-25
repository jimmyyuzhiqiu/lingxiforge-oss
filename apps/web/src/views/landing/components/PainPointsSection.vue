<script setup lang="ts">
import { publicAsset } from "@/utils/publicAsset";

const items = [
  {
    title: "视域受限",
    img: publicAsset("ai/landing/pain-vision.webp"),
    alt: "馆藏纹样灵感 · 青铜器纹饰细节",
    desc: "馆藏要素难被有效转译：细节看不清、结构讲不透，线上传播只能停留在“图文”。",
    points: ["缺乏可交互的 3D 展示载体", "故事与结构分离，难以对外讲述", "评审依赖主观想象，沟通成本高"],
  },
  {
    title: "成本高昂",
    img: publicAsset("ai/landing/pain-cost.webp"),
    alt: "金属 3D 打印工艺 · 制造与验证场景",
    desc: "从建模到打样链路长：反复返工导致时间与制造成本被动抬升，错过热点窗口。",
    points: ["打样迭代周期不可控", "结构问题后置暴露，返工频繁", "缺少统一验收标准与质检清单"],
  },
  {
    title: "建模门槛",
    img: publicAsset("ai/landing/pain-skill.webp"),
    alt: "馆藏结构灵感 · 纹样与结构层次",
    desc: "高手稀缺且不可复制：产能受个人能力与工具链限制，难以形成稳定的“系列化上新”。",
    points: ["复杂软件学习曲线陡峭", "模型质量参差，打印失败率高", "协作缺规范：版本、备注、留档混乱"],
  },
];
</script>

<template>
  <section class="section container" id="pain-points" aria-labelledby="pain-title">
    <header class="head">
      <h2 id="pain-title">为什么传统文创开发很难做成“体系化”</h2>
      <p class="desc">
        不是缺创意，而是缺一套把创意落到“可制造、可复用、可规模化”的流程与标准。我们把这三类阻力拆开解决。
      </p>
    </header>

    <div class="grid">
      <article class="card glass-surface" v-for="item in items" :key="item.title">
        <div class="media-frame">
          <img class="media-img" :src="item.img" :alt="item.alt" loading="lazy" decoding="async" />
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
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
  max-width: 70ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.card {
  padding: 18px;
  display: grid;
  gap: 12px;
  border-radius: var(--radius-xl);
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
  background: var(--accent-soft-bg);
}

.media-frame {
  width: 100%;
  aspect-ratio: 4 / 3;
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

ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.75;
  font-size: 13px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
