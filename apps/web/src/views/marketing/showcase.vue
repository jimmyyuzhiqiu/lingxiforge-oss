<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

type StoryImage = { src: string; alt?: string };
type StorySlide = {
  index: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  tags: string[];
  images: StoryImage[];
};

type StoryManifest = {
  deckTitle: string;
  generatedAt?: string;
  slides: StorySlide[];
};

type ContentCard = {
  title: string;
  subtitle?: string;
  bullets: string[];
  tags: string[];
  images: StoryImage[];
};

type ContentSection = {
  id: string;
  title: string;
  lead: string;
  cards: ContentCard[];
};

const router = useRouter();

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const showcaseBase = `${base}/showcase/lingxi-museum/`;

const loading = ref(true);
const error = ref<string | null>(null);
const story = ref<StoryManifest | null>(null);

const slides = computed(() => story.value?.slides ?? []);

const generatedDate = computed(() => {
  if (!story.value?.generatedAt) return "";
  const d = new Date(story.value.generatedAt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
});

const slideByIndex = computed(() => {
  const map = new Map<number, StorySlide>();
  for (const s of slides.value) map.set(s.index, s);
  return map;
});

const collectImages = (indices: number[], limit = 2, alt?: string) => {
  const out: StoryImage[] = [];
  const seen = new Set<string>();
  for (const idx of indices) {
    const slide = slideByIndex.value.get(idx);
    if (!slide?.images?.length) continue;
    for (const img of slide.images) {
      if (seen.has(img.src)) continue;
      out.push({ src: img.src, alt: alt ?? img.alt });
      seen.add(img.src);
      if (out.length >= limit) return out;
    }
  }
  return out;
};

const sections = computed<ContentSection[]>(() => [
  {
    id: "overview",
    title: "平台定位与价值",
    lead:
      "面向博物馆文创与品牌合作场景，把“内容理解—创意生成—可制造优化—打印交付”串成可复制的上新闭环。",
    cards: [
      {
        title: "全链路赋能平台",
        subtitle: "文化内容到可制造商品的统一工作流",
        bullets: ["多模态输入：文案/图像/纹样参考", "生成 + 可制造优化一体化", "GLB 评审 + STL 打印交付"],
        tags: ["平台概览", "全链路"],
        images: collectImages([2], 2, "平台概览 · 全链路赋能"),
      },
      {
        title: "产品模块与体验",
        subtitle: "在线设计与云端智造",
        bullets: ["在线生成与版本管理", "风格一致性控制与细节增强", "打印履约协同与交付"],
        tags: ["产品模块", "体验"],
        images: collectImages([9], 2, "产品模块 · 在线设计"),
      },
    ],
  },
  {
    id: "why",
    title: "市场与政策窗口",
    lead: "需求端的文化体验升级，与供给端数字化能力成熟同时到位。",
    cards: [
      {
        title: "市场规模与人群结构",
        subtitle: "文创消费进入体验驱动阶段",
        bullets: ["核心人群集中在 19–35 岁", "文化 IP 带动高复购与收藏属性", "体验与情绪价值驱动消费增长"],
        tags: ["市场规模", "人群画像"],
        images: collectImages([4], 2, "市场规模与人群结构"),
      },
      {
        title: "政策利好与行业窗口",
        subtitle: "数字技术推动文创产业升级",
        bullets: ["文化高质量发展政策持续释放", "数字技术驱动传统文创升级", "“互联网 + 文化”新场景加速"],
        tags: ["政策利好", "行业趋势"],
        images: collectImages([5], 2, "政策与行业窗口"),
      },
    ],
  },
  {
    id: "problem",
    title: "行业痛点与机会",
    lead: "传统链路卡在内容触达、建模成本与协作交付效率。",
    cards: [
      {
        title: "内容触达与体验断层",
        subtitle: "文化内容难以走进日常生活",
        bullets: ["观众只能“隔窗观物”", "缺乏可触达的实体体验", "内容资产难以复用与沉淀"],
        tags: ["触达不足", "体验断层"],
        images: collectImages([3], 2, "内容触达与体验断层"),
      },
      {
        title: "建模与协同成本高",
        subtitle: "传统流程限制上新速度",
        bullets: ["建模周期长、成本高", "多环节协作导致质量波动", "试错成本限制规模化上新"],
        tags: ["效率瓶颈", "协同成本"],
        images: collectImages([6], 2, "建模与协同痛点"),
      },
    ],
  },
  {
    id: "solution",
    title: "技术路径与能力模块",
    lead: "以 AIGC 驱动生成，以工程约束保障可制造性与交付确定性。",
    cards: [
      {
        title: "AIGC 多模态生成",
        subtitle: "文生图 / 图生多视角 / 风格稳定",
        bullets: ["多模态输入驱动设计生成", "系列化风格控制", "支持馆藏元素再设计"],
        tags: ["AIGC", "多模态"],
        images: collectImages([7], 1, "AIGC 多模态生成"),
      },
      {
        title: "生成链路与工艺数据化",
        subtitle: "从多视角到 3D 的自动化链路",
        bullets: ["多视角到 3D 的自动化流程", "工艺参数与模型数据协同", "批量化输出与一致性保障"],
        tags: ["生成链路", "工艺数据"],
        images: collectImages([10], 2, "生成链路与工艺数据化"),
      },
      {
        title: "细节增强与材质适配",
        subtitle: "让纹样更清晰、质感更可控",
        bullets: ["纹样与细节增强", "材质与工艺匹配建议", "提升成品质感与还原度"],
        tags: ["细节增强", "材质适配"],
        images: collectImages([11], 2, "细节增强与材质适配"),
      },
      {
        title: "可制造优化与局部修复",
        subtitle: "降低打印失败率",
        bullets: ["壁厚/支撑/悬垂策略", "网格修复与结构增强", "减少返工与试错成本"],
        tags: ["可制造", "质量优化"],
        images: collectImages([12], 2, "可制造优化与局部修复"),
      },
      {
        title: "差异化能力与竞争壁垒",
        subtitle: "从技术到交付的闭环能力",
        bullets: ["自研核心算法与流程", "文创场景深度适配", "设计到履约的闭环能力"],
        tags: ["差异化", "闭环能力"],
        images: collectImages([15], 2, "差异化能力与竞争壁垒"),
      },
    ],
  },
  {
    id: "cases",
    title: "合作模式与案例路径",
    lead: "将文物元素转译为可生产 SKU，支持多材质小批量试产与验证。",
    cards: [
      {
        title: "合作模式与对外协作",
        subtitle: "联合开发、授权合作与履约对接",
        bullets: ["标准化合同与合作框架", "多方协作可追溯", "对外合作落地路径清晰"],
        tags: ["合作模式", "对外协作"],
        images: collectImages([13], 2, "合作模式与对外协作"),
      },
      {
        title: "案例应用：AI + 3D 打印落地",
        subtitle: "从设计到制造的完整链路",
        bullets: ["AI 设计 → 打印 → 落地一体化", "小批量试产与验证", "材料工艺与场景适配"],
        tags: ["案例应用", "落地验证"],
        images: collectImages([14], 2, "案例应用 · AI + 3D 打印"),
      },
    ],
  },
  {
    id: "pricing",
    title: "商业模式与履约",
    lead: "订阅 + 按需履约，让团队低成本启动、规模化上新。",
    cards: [
      {
        title: "订阅 + 按需履约",
        subtitle: "面向团队/设计师的组合方案",
        bullets: ["订阅方案覆盖不同精度需求", "按需生成与打印履约", "成本可控、交付可预期"],
        tags: ["订阅方案", "履约交付"],
        images: collectImages([17], 2, "订阅方案与履约"),
      },
    ],
  },
  {
    id: "impact",
    title: "社会价值与路线图",
    lead: "用数字化沉淀三维资产，用实体文创提升传播效率。",
    cards: [
      {
        title: "社会价值与公共教育",
        subtitle: "文化数字化与普惠服务",
        bullets: ["文化内容数字化沉淀", "可交互实体提升传播力", "公众教育与普惠服务"],
        tags: ["社会价值", "公共教育"],
        images: collectImages([24], 2, "社会价值与公共教育"),
      },
      {
        title: "未来规划与增长路径",
        subtitle: "从设计到销售的闭环",
        bullets: ["设计—生产—销售闭环", "平台化协作与生态扩展", "规模化上新与复购"],
        tags: ["路线图", "增长路径"],
        images: collectImages([25], 2, "未来规划与增长路径"),
      },
    ],
  },
]);

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const lightboxOpen = ref(false);
const lightboxItem = ref<ContentCard | null>(null);
const currentImageIdx = ref(0);

const currentImage = computed(() => {
  if (!lightboxItem.value) return null;
  return lightboxItem.value.images[currentImageIdx.value] ?? null;
});

const openLightbox = (card: ContentCard, idx: number) => {
  lightboxItem.value = card;
  currentImageIdx.value = idx;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  lightboxItem.value = null;
  currentImageIdx.value = 0;
  document.body.style.overflow = "";
};

const nextImage = () => {
  if (!lightboxItem.value) return;
  const total = lightboxItem.value.images.length;
  if (!total) return;
  currentImageIdx.value = (currentImageIdx.value + 1) % total;
};

const prevImage = () => {
  if (!lightboxItem.value) return;
  const total = lightboxItem.value.images.length;
  if (!total) return;
  currentImageIdx.value = (currentImageIdx.value - 1 + total) % total;
};

const onKeydown = (e: KeyboardEvent) => {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
};

onMounted(async () => {
  try {
    const res = await fetch(`${showcaseBase}story.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`展示内容未生成（story.json: ${res.status}）`);
    story.value = (await res.json()) as StoryManifest;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "展示内容加载失败";
  } finally {
    loading.value = false;
  }
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>

      <el-main class="main">
    <section class="hero">
          <div class="hero-left">
            <h1>方案展示｜文物复兴项目的产品化叙事</h1>
            <p class="subtitle">
              面向对外介绍与合作洽谈，精选关键图示与执行要点，系统呈现“生成—可制造—履约”的完整链路（不提供源文件下载）。
            </p>
            <div class="chips">
              <span class="chip">精选内容</span>
              <span class="chip" v-if="generatedDate">更新于 {{ generatedDate }}</span>
            </div>
          </div>

          <div class="hero-right">
            <div class="note">
              <div class="note-title">适用场景</div>
              <ul>
                <li>对外介绍：平台定位、合作场景与案例路径</li>
                <li>方案沟通：关键链路、质量标准与合规流程</li>
                <li>内容运营：把方案内容沉淀为可持续更新模块</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section" v-if="loading">
          <div class="loading-card">正在加载展示内容…</div>
        </section>

        <section class="section" v-else-if="error">
          <div class="error-card">
            <div class="error-title">内容暂未发布</div>
            <p class="error-msg">当前展示内容正在整理中，请稍后再试。</p>
            <div class="cta">
              <el-button plain @click="router.push('/contact?type=support')">联系支持</el-button>
            </div>
          </div>
        </section>

        <section class="content" v-else>
          <aside class="toc">
            <div class="toc-title">目录</div>
            <button class="toc-item" v-for="sec in sections" :key="sec.id" type="button" @click="scrollToSection(sec.id)">
              <span class="num">•</span>
              <span class="text">{{ sec.title }}</span>
            </button>
          </aside>

          <div class="sections">
            <section class="sec" v-for="sec in sections" :key="sec.id" :id="sec.id">
              <header class="sec-head">
                <h2>{{ sec.title }}</h2>
                <p class="sec-lead">{{ sec.lead }}</p>
              </header>

              <div class="cards">
                <article class="card" v-for="(card, idx) in sec.cards" :key="card.title">
                  <div class="card-text">
                    <div class="badge-row">
                      <span class="badge">模块 {{ String(idx + 1).padStart(2, "0") }}</span>
                      <span class="tag" v-for="t in card.tags" :key="t">{{ t }}</span>
                    </div>
                    <h3 class="card-title">{{ card.title }}</h3>
                    <p class="card-sub" v-if="card.subtitle">{{ card.subtitle }}</p>
                    <ul class="bullets" v-if="card.bullets?.length">
                      <li v-for="b in card.bullets" :key="b">{{ b }}</li>
                    </ul>
                  </div>
                  <div class="card-media" v-if="card.images?.length">
                    <div class="media-grid" :class="{ single: card.images.length === 1 }">
                      <button
                        class="media"
                        v-for="(img, imgIdx) in card.images.slice(0, 3)"
                        :key="img.src"
                        type="button"
                        @click="openLightbox(card, imgIdx)"
                        :aria-label="`查看 ${card.title} 配图`"
                      >
                        <img :src="`${showcaseBase}${img.src}`" :alt="img.alt || `${card.title} 配图`" loading="lazy" decoding="async" />
                      </button>
                    </div>
                    <div class="hint" v-if="card.images.length > 1">点击可放大，支持左右切换</div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </section>

	        <teleport to="body">
          <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" role="dialog" aria-modal="true">
            <button class="lb-close" type="button" @click="closeLightbox" aria-label="关闭">×</button>
            <button class="lb-nav prev" type="button" @click="prevImage" aria-label="上一张">‹</button>
            <figure class="lb-frame">
              <img v-if="currentImage" class="lb-img" :src="`${showcaseBase}${currentImage.src}`" :alt="currentImage.alt || ''" />
              <figcaption v-if="lightboxItem" class="lb-caption">
                {{ lightboxItem.title }}
              </figcaption>
            </figure>
            <button class="lb-nav next" type="button" @click="nextImage" aria-label="下一张">›</button>
          </div>
	        </teleport>

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
  width: min(1200px, 92%);
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 14px;
  align-items: stretch;
}

.hero-left {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 22px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h1 {
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--font-color2);
    line-height: 1.55;
    margin-bottom: 14px;
  }
}

.chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--accent-soft-bg);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--font-color1);
  font-size: 12px;
}

.hero-right {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 18px 18px 16px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
}

.note-title {
  font-weight: 700;
  margin-bottom: 8px;
}

.note ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
}

.section {
  width: min(1200px, 92%);
  margin: 0 auto 18px;
}

.loading-card,
.error-card {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
}

.error-title {
  font-weight: 800;
  margin-bottom: 8px;
}

.error-msg {
  color: var(--font-color2);
  margin: 0 0 8px;
}

.error-hint {
  color: var(--font-color4);
  margin: 0;
  line-height: 1.6;
}

.error-hint code {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.18);
  color: var(--font-color1);
}

.content {
  width: min(1200px, 92%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 14px;
}

.toc {
  position: sticky;
  top: 90px;
  align-self: start;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 12px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  max-height: calc(100vh - 120px);
  overflow: auto;
}

.toc-title {
  font-weight: 800;
  margin: 4px 6px 10px;
}

.toc-item {
  width: 100%;
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: start;
  text-align: left;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--font-color1);
  cursor: pointer;
  transition: 0.15s ease;
}

.toc-item:hover {
  background: var(--background4-hover);
  border-color: rgba(255, 255, 255, 0.14);
}

.toc-item .num {
  font-weight: 800;
  color: var(--font-color3);
}

.toc-item .text {
  font-size: 13px;
  color: var(--font-color2);
  line-height: 1.35;
}

.sections {
  display: grid;
  gap: 14px;
}

.sec {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
}

.sec-head {
  margin-bottom: 14px;
}

.sec-head h2 {
  margin: 0 0 6px;
}

.sec-lead {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
}

.cards {
  display: grid;
  gap: 12px;
}

.card {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: var(--glass-bg);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.badge {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--accent-soft-bg);
  color: var(--font-color3);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  color: var(--font-color2);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.card-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 800;
}

.card-sub {
  margin: 0 0 10px;
  color: var(--font-color2);
  line-height: 1.55;
}

.bullets {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
}

.card-media {
  display: grid;
  gap: 8px;
  align-content: start;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.media-grid.single {
  grid-template-columns: 1fr;
}

.media {
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
}

.media img {
  width: 100%;
  height: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(148, 163, 184, 0.08);
}

.hint {
  font-size: 12px;
  color: var(--font-color4);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(2, 6, 23, 0.72);
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  padding: 16px;
}

.lb-frame {
  margin: 0;
  display: grid;
  gap: 10px;
  justify-items: center;
}

.lb-img {
  width: min(1200px, 96vw);
  max-height: 82vh;
  height: auto;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
}

.lb-caption {
  color: rgba(226, 232, 240, 0.9);
  font-size: 13px;
  line-height: 1.3;
}

.lb-close {
  position: fixed;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(15, 23, 42, 0.6);
  color: rgba(226, 232, 240, 0.95);
  font-size: 22px;
  cursor: pointer;
}

.lb-nav {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(15, 23, 42, 0.6);
  color: rgba(226, 232, 240, 0.95);
  font-size: 30px;
  cursor: pointer;
  transition: 0.15s ease;
}

.lb-nav:hover {
  box-shadow: 0 0 0 4px rgba(124, 181, 255, 0.22);
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .content {
    grid-template-columns: 1fr;
  }

  .toc {
    position: relative;
    top: 0;
    max-height: none;
  }

  .card {
    grid-template-columns: 1fr;
  }
}
</style>
