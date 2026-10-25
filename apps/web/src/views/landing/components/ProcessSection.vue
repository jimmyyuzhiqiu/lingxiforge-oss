<script setup lang="ts">
import { publicAsset } from "@/utils/publicAsset";

const steps = [
  {
    title: "1. 灵感输入",
    desc: "从馆藏纹样、器型、故事线或竞品参考开始，明确授权范围与目标人群。",
    deliver: ["主题关键词", "参考图/素材包", "边界与合规提示"],
  },
  {
    title: "2. 设计生成",
    desc: "使用可复用提示词模板生成多方案，并通过版本对比快速收敛方向。",
    deliver: ["方案草图", "多风格变体", "评审备注与版本留档"],
  },
  {
    title: "3. 3D 资产化（GLB）",
    desc: "把二维方案转成可交互的 3D 展示资产，便于讲述、评审与传播。",
    deliver: ["GLB 预览", "基础材质建议", "交互展示页面"],
  },
  {
    title: "4. 可制造优化",
    desc: "在打印前完成网格修复、壁厚与结构策略，提前规避失败。",
    deliver: ["壁厚/支撑建议", "拆件与装配策略", "Print-ready 清单"],
  },
  {
    title: "5. 打样与质检",
    desc: "快速打样验证工艺与结构，按验收标准做外观与尺寸检查。",
    deliver: ["STL/切片建议", "打样报告", "质检记录"],
  },
  {
    title: "6. 履约与上新",
    desc: "对接工坊与渠道，把 3D 资产同步到内容系统与营销物料。",
    deliver: ["交付包归档", "渠道物料", "复盘指标与优化清单"],
  },
];

const sideImage = {
  src: publicAsset("ai/landing/process-delivery.webp"),
  alt: "规模化打印挑战 · 工程验证与交付控制",
};
</script>

<template>
  <section class="section container" id="process" aria-labelledby="process-title">
    <header class="head">
      <h2 id="process-title">技术流程：从生成到可交付（不是“做完就散”）</h2>
      <p class="desc">
        把“生成结果”放进工程化流程：每一步都有明确输入/输出与质量标准，减少返工，让系列化上新可持续。
      </p>
    </header>

    <div class="grid">
      <div class="timeline glass-card">
        <el-timeline>
          <el-timeline-item v-for="item in steps" :key="item.title" placement="top">
            <div class="tl">
              <div class="t">{{ item.title }}</div>
              <div class="d">{{ item.desc }}</div>
              <div class="tags">
                <el-tag v-for="tag in item.deliver" :key="tag" effect="plain">{{ tag }}</el-tag>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <aside class="side glass-card" aria-label="交付要点">
        <div class="side-head">
          <div class="k">交付包应该包含什么？</div>
          <div class="s">把资产、标准与留档一次做对，后续才能复用。</div>
        </div>
        <div class="list">
          <div class="item">
            <div class="t">展示资产</div>
            <div class="d">GLB、封面占位、讲述要点与标签</div>
          </div>
          <div class="item">
            <div class="t">制造资产</div>
            <div class="d">STL、尺寸说明、拆件与装配策略</div>
          </div>
          <div class="item">
            <div class="t">质量标准</div>
            <div class="d">壁厚/公差/支撑、print-ready 检查清单</div>
          </div>
          <div class="item">
            <div class="t">合规留档</div>
            <div class="d">授权范围、溯源记录、下架与投诉流程</div>
          </div>
        </div>
        <div class="media-frame" aria-hidden="true">
          <img class="media-img" :src="sideImage.src" :alt="sideImage.alt" loading="lazy" decoding="async" />
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.head {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
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
  grid-template-columns: 1.2fr 0.8fr;
  gap: 12px;
  align-items: start;
}

.timeline,
.side {
  padding: 14px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.timeline::before,
.side::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url("/ai/landing/patterns/cloud-pattern.svg") center / 420px auto no-repeat;
  opacity: 0.08;
}

.timeline::after,
.side::after {
  content: "";
  position: absolute;
  inset: 10px;
  border-radius: calc(var(--radius-xl) - 8px);
  border: 1px solid rgba(184, 134, 11, 0.1);
  pointer-events: none;
  background:
    url("/ai/landing/patterns/bronze-corner.svg") left top / 22px 22px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right top / 22px 22px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") left bottom / 22px 22px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right bottom / 22px 22px no-repeat;
  opacity: 0.3;
}

.timeline > *,
.side > * {
  position: relative;
  z-index: 1;
}

.tl {
  display: grid;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 12px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.62), rgba(245, 248, 252, 0.66)),
    url("/ai/landing/patterns/wave-pattern.svg") left bottom / 180px auto repeat-x;
  border: 1px solid rgba(137, 120, 90, 0.12);
}

.tl .t {
  font-weight: 900;
}

.tl .d {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.side-head {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
}

.k {
  font-weight: 900;
}

.s {
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.list {
  display: grid;
  gap: 10px;
}

.item {
  padding: 12px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(242, 247, 252, 0.72)),
    url("/ai/landing/patterns/wave-pattern.svg") left bottom / 160px auto repeat-x;
}

.item .t {
  font-weight: 900;
}

.item .d {
  margin-top: 6px;
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.6;
}

.media-frame {
  width: 100%;
  aspect-ratio: 16 / 10;
  margin-top: 12px;
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
  filter: contrast(0.96) saturate(0.88);
}

.timeline :deep(.el-timeline-item__node) {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid rgba(184, 134, 11, 0.34);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.84), rgba(237, 228, 210, 0.92)),
    url("/ai/landing/patterns/artifact-silhouette.svg") center / 16px 16px no-repeat;
  box-shadow:
    2px 2px 8px rgba(170, 160, 142, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.timeline :deep(.el-timeline-item__tail) {
  border-left: 2px solid transparent;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--cultural-celadon) 46%, transparent),
      color-mix(in srgb, var(--cultural-bronze) 40%, transparent)
    )
    center / 2px 100% no-repeat;
  left: 10px;
}

:global(:root[theme="dark"] .timeline::before),
:global(:root[theme="dark"] .side::before) {
  opacity: 0.08;
}

:global(:root[theme="dark"] .timeline::after),
:global(:root[theme="dark"] .side::after) {
  border-color: rgba(193, 165, 118, 0.12);
  opacity: 0.2;
}

:global(:root[theme="dark"] .tl) {
  background:
    linear-gradient(145deg, rgba(26, 33, 46, 0.74), rgba(19, 26, 37, 0.78)),
    url("/ai/landing/patterns/wave-pattern.svg") left bottom / 180px auto repeat-x;
  border-color: rgba(96, 112, 135, 0.35);
}

:global(:root[theme="dark"] .item) {
  background:
    linear-gradient(145deg, rgba(24, 31, 44, 0.78), rgba(18, 26, 37, 0.8)),
    url("/ai/landing/patterns/wave-pattern.svg") left bottom / 160px auto repeat-x;
}

:global(:root[theme="dark"] .timeline .el-timeline-item__node) {
  border-color: rgba(193, 165, 118, 0.42);
  background:
    linear-gradient(145deg, rgba(31, 39, 54, 0.92), rgba(17, 22, 33, 0.94)),
    url("/ai/landing/patterns/artifact-silhouette.svg") center / 16px 16px no-repeat;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
