<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { open3dModels, fetch3dCatalog, type Open3DModel } from "@/data/threeDModels";
import { vue3dLoader } from "vue-3d-loader";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowRight, Link } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const models = ref<Open3DModel[]>(open3dModels);
const selected = ref<Open3DModel | null>(models.value[0] ?? null);
const loading = ref(true);
const progress = ref(0);
const error = ref<string | null>(null);

const theme = ref(document.documentElement.getAttribute("theme") || "light");
let themeObserver: MutationObserver | null = null;

const viewerBackground = computed(() =>
  theme.value === "dark" ? "#0b1020" : "#f6f9ff"
);

const cameraPosition = ref({ x: 0, y: 2.2, z: 9.6 });
const controlsOptions = {
  autoRotate: true,
  autoRotateSpeed: 0.6,
  enablePan: false,
};

const resourceGroups = [
  {
    title: "官方/开放版权",
    items: [
      {
        name: "Smithsonian 3D（史密森学会）",
        url: "https://3d.si.edu/collections/openaccesshighlights",
        desc: "官方 3D 扫描与开放获取入口，覆盖文物与自然史藏品。",
        note: "可下载并再利用，逐件确认标注（如 CC0）。",
      },
      {
        name: "Europeana — Twin it! 3D 模型精选",
        url: "https://www.europeana.eu/en/galleries/15694-twin-it-a-pan-european-collection-of-heritage-3-d-models",
        desc: "欧盟文化遗产 3D 模型集合，覆盖建筑、遗址与器物。",
        note: "授权类型不一，使用前查看 License。",
      },
    ],
  },
  {
    title: "聚合平台（需筛选授权）",
    items: [
      {
        name: "Sketchfab Museums",
        url: "https://sketchfab.com/museums",
        desc: "博物馆与文化机构 3D 模型入口，可筛选 Downloadable。",
        note: "查看模型页 License 与用途限制。",
      },
      {
        name: "The British Museum（官方账号）",
        url: "https://sketchfab.com/britishmuseum",
        desc: "大英博物馆官方账号，含大量文物扫描模型。",
        note: "逐件查看下载与授权条款。",
      },
      {
        name: "NHM_Imaging（自然史博物馆）",
        url: "https://sketchfab.com/NHM_Imaging",
        desc: "伦敦自然史博物馆影像团队账号，含化石/标本模型。",
        note: "逐件查看下载与授权条款。",
      },
      {
        name: "OMNH（大阪市立自然史博物馆）",
        url: "https://sketchfab.com/OMNH",
        desc: "大阪市立自然史博物馆官方账号，含骨骼与化石模型。",
        note: "逐件查看下载与授权条款。",
      },
      {
        name: "MyMiniFactory — Scan the World",
        url: "https://www.myminifactory.com/scantheworld/",
        desc: "文化遗产扫描模型合集，偏 3D 打印用途。",
        note: "常见为 CC/非商用许可，需仔细核对。",
      },
      {
        name: "Wikimedia Commons — Scan the World (STL)",
        url: "https://commons.wikimedia.org/wiki/Category:STL_files_from_Scan_the_World",
        desc: "STL 为主，适合打印但缺少材质贴图。",
        note: "授权清晰，注意署名/用途限制。",
      },
    ],
  },
  {
    title: "中文资源",
    items: [
      {
        name: "数字敦煌·开放素材库",
        url: "https://ip.e-dunhuang.com/",
        desc: "官方素材库，含部分三维资源与授权入口。",
        note: "用途授权区分，商用需申请。",
      },
    ],
  },
];

const licenseChecklist = [
  "License：确认 CC0 / CC BY / CC BY-NC 等，决定商用与署名。",
  "格式：网页展示优先 GLB/glTF；打印优先 STL；渲染编辑优先 OBJ。",
  "体量：移动端建议低面数或 LOD，确保加载与交互流畅。",
];

const viewerHost = ref<HTMLElement | null>(null);
const viewerSize = ref({ width: 960, height: 540 });
let resizeObserver: ResizeObserver | null = null;

const updateViewerSize = () => {
  const el = viewerHost.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(320, Math.round(rect.height));
  viewerSize.value = { width, height };
};

const setSelected = (model: Open3DModel | null, updateRoute = false) => {
  if (!model) {
    selected.value = null;
    loading.value = false;
    progress.value = 0;
    error.value = null;
    return;
  }
  selected.value = model;
  loading.value = true;
  progress.value = 0;
  error.value = null;
  if (updateRoute) {
    router.replace({ query: { ...route.query, id: model.id } });
  }
};

const selectModel = (model: Open3DModel) => {
  setSelected(model, true);
};

const onLoad = () => {
  loading.value = false;
  progress.value = 100;
};

const onError = (e: any) => {
  loading.value = false;
  error.value = e?.message || "模型加载失败，请稍后重试";
};

const onProcess = (evt: ProgressEvent) => {
  if (!evt?.lengthComputable) return;
  const pct = Math.round((evt.loaded / evt.total) * 100);
  progress.value = Math.max(0, Math.min(99, pct));
};

onMounted(async () => {
  const catalog = await fetch3dCatalog();
  if (catalog?.length) {
    models.value = catalog;
  }
  const id = route.query.id as string | undefined;
  if (id) {
    const found = models.value.find((m) => m.id === id);
    if (found) {
      setSelected(found);
    }
  }
  if (!selected.value && models.value.length) {
    setSelected(models.value[0]);
  }
  updateViewerSize();
  themeObserver = new MutationObserver(() => {
    theme.value = document.documentElement.getAttribute("theme") || "light";
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["theme"],
  });

  resizeObserver = new ResizeObserver(() => updateViewerSize());
  if (viewerHost.value) resizeObserver.observe(viewerHost.value);
});

onUnmounted(() => {
  themeObserver?.disconnect();
  resizeObserver?.disconnect();
  themeObserver = null;
  resizeObserver = null;
});
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <div class="left">
            <h1>3D 展品库｜GLB 在线预览、讲述与交付协同</h1>
            <p class="subtitle">
              将 3D 模型从静态文件升级为可交互展品页，支持旋转、缩放、细节查看与对外讲述。面向博物馆展陈、品牌联名与文创履约场景，优先推荐 GLB（glTF）。
            </p>
            <div class="cta">
              <el-button type="primary" @click="router.push('/workbench/Text-To-3D')">进入工作台</el-button>
              <el-button plain @click="router.push('/workflow')">查看工作流</el-button>
              <el-button plain @click="router.push('/contact?type=sales')">咨询落地</el-button>
            </div>
            <div class="badges">
              <span class="badge">GLB / glTF</span>
              <span class="badge">Web 端交互</span>
              <span class="badge">打印履约（STL）</span>
              <span class="badge">可扩展 AR（USDZ）</span>
            </div>
          </div>

          <div class="right">
            <div class="hero-card glass-surface">
              <div class="k">推荐交付（面向官网/展陈）</div>
              <ul class="bullets">
                <li><strong>GLB</strong>：用于网页实时加载与展示（推荐）。</li>
                <li><strong>STL</strong>：用于 3D 打印与切片（无材质）。</li>
                <li><strong>USDZ</strong>：用于 iOS AR Quick Look（可选）。</li>
              </ul>
              <div class="note">
                提示：本页示例模型来自公开授权资源，仅用于演示“在线展品化”的呈现方式。要替换为馆藏模型，
                请配置 public/models/catalog.json。
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>在线预览</h2>
            <el-button plain @click="router.push('/trust')">了解信任与合规 <el-icon style="margin-left: 6px"><ArrowRight /></el-icon></el-button>
          </div>

          <div class="viewer-grid">
            <div class="viewer glass-card">
              <div class="viewer-host" ref="viewerHost">
                <div class="overlay" v-if="!selected">
                  <div class="overlay-card glass-surface">
                    <div class="t">暂无模型</div>
                    <div class="hint">请配置 /public/models/catalog.json 并放置 GLB 资源</div>
                  </div>
                </div>
                <div class="overlay" v-else-if="loading || error">
                  <div v-if="loading" class="overlay-card glass-surface">
                    <div class="t">加载中</div>
                    <div class="p">{{ progress }}%</div>
                    <div class="hint">提示：首次加载需要下载模型资源</div>
                  </div>
                  <div v-else class="overlay-card glass-surface">
                    <div class="t">加载失败</div>
                    <div class="hint">{{ error }}</div>
                    <el-button plain @click="selected && selectModel(selected)">重试</el-button>
                  </div>
                </div>

                <vue3dLoader v-if="selected" :key="selected.id" class="viewer-canvas" :filePath="selected.src"
                  :width="viewerSize.width" :height="viewerSize.height" :backgroundColor="viewerBackground"
                  :backgroundAlpha="1" :cameraPosition="cameraPosition" :controlsOptions="controlsOptions"
                  :enableGridHelper="false" :enableAxesHelper="false" :enableDamping="true" :dampingFactor="0.06"
                  :minDistance="1.6" :maxDistance="40" :enableDraco="true" dracoDir="/draco/gltf/" @load="onLoad"
                  @error="onError" @process="onProcess" />
              </div>

              <div class="viewer-meta">
                <div class="title-row" v-if="selected">
                  <div class="title">{{ selected.title }}</div>
                  <span class="chip">{{ selected.format }}</span>
                  <span class="chip">{{ selected.size }}</span>
                </div>
                <p class="desc" v-if="selected">{{ selected.subtitle }}</p>
                <div class="tags" v-if="selected">
                  <span class="tag" v-for="t in selected.tags.slice(0, 8)" :key="t">{{ t }}</span>
                </div>
                <div class="meta-actions" v-if="selected">
                  <a v-if="selected.sourcePage" class="source-link" :href="selected.sourcePage" target="_blank"
                    rel="noopener">
                    <el-icon><Link /></el-icon>
                    <span>查看来源与许可</span>
                  </a>
                  <span v-if="selected.license" class="license">{{ selected.license }} · 不代表背书</span>
                </div>
              </div>
            </div>

            <aside class="list glass-card">
              <div class="list-head">
                <div>
                  <div class="k">模型列表</div>
                  <div class="small">点击切换（已做轻量缩略图）</div>
                </div>
              </div>
              <div class="cards">
                <button class="card" v-for="m in models" :key="m.id" type="button" @click="selectModel(m)"
                  :class="{ active: selected && m.id === selected.id }">
                  <img class="thumb" :src="m.thumbnail" :alt="m.title" loading="lazy" decoding="async" />
                  <div class="meta">
                    <div class="t">{{ m.title }}</div>
                    <div class="s">{{ m.subtitle }}</div>
                    <div class="chips">
                      <span class="chip">{{ m.format }}</span>
                      <span class="chip">{{ m.size }}</span>
                    </div>
                  </div>
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>博物馆 3D 模型资源入口</h2>
            <p class="sec-note">优先官方/开放版权；下载前务必核对授权与格式。</p>
          </div>
          <div class="resource-groups">
            <div class="resource-group glass-card" v-for="group in resourceGroups" :key="group.title">
              <div class="group-head">
                <div class="group-title">{{ group.title }}</div>
              </div>
              <div class="resource-grid">
                <a class="resource-card glass-surface" v-for="item in group.items" :key="item.url" :href="item.url"
                  target="_blank" rel="noopener">
                  <div class="resource-name">{{ item.name }}</div>
                  <div class="resource-desc">{{ item.desc }}</div>
                  <div class="resource-note">{{ item.note }}</div>
                  <div class="resource-meta">
                    <span class="resource-tag">可下载</span>
                    <span class="resource-link">打开页面</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="resource-checklist glass-card">
            <div class="check-title">下载前核对</div>
            <ul>
              <li v-for="item in licenseChecklist" :key="item">{{ item }}</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <h2>面向博物馆与文创的应用场景</h2>
          <div class="use-grid">
            <article class="use glass-surface">
              <div class="t">线上展陈（可交互）</div>
              <p class="d">让观众“看得见、转得动、放得大”，把细节、结构与故事讲清楚。</p>
              <ul>
                <li>展品详情页：一件一页，结构化讲述</li>
                <li>专题策展：按主题/年代/工艺组织内容</li>
                <li>移动端浏览：轻量模型优先，渐进加载</li>
              </ul>
            </article>
            <article class="use glass-surface">
              <div class="t">AR 导览（可选）</div>
              <p class="d">把 3D 展品带到线下空间：结合展陈动线与讲解，提升互动与传播。</p>
              <ul>
                <li>iOS：USDZ + Quick Look</li>
                <li>Android：GLB + Scene Viewer</li>
                <li>展厅：二维码/小程序入口（可扩展）</li>
              </ul>
            </article>
            <article class="use glass-surface">
              <div class="t">文创打样与履约</div>
              <p class="d">从“概念”到“能生产”：壁厚、支撑、拆件与验收标准前置。</p>
              <ul>
                <li>GLB 用于评审，STL 用于打印</li>
                <li>按材质给出工艺建议（树脂/PLA/尼龙）</li>
                <li>沉淀成功模板，支持系列化上新</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section bottom glass-card">
          <h2>把你的馆藏/纹样，做成“可交付”的 3D 资产</h2>
          <p class="muted">
            我们提供从“灵感输入 → 生成 → 可制造优化 → 打印履约 → 在线展品化展示”的一体化方案，让内容不止停留在文件夹里。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/contact?type=sales')">对接方案</el-button>
            <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
            <el-button plain @click="router.push('/materials')">材料与质量</el-button>
          </div>
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
  width: min(1180px, 92%);
  padding: 26px;
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: 14px;
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
  margin-bottom: 14px;
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.hero-card {
  border-radius: 16px;
  padding: 14px;
}

.hero-card .k {
  font-weight: 900;
  margin-bottom: 10px;
}

.bullets {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

.hero-card .note {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;

  h2 {
    margin: 12px 0;
  }
}

.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.sec-note {
  margin: 0;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
  max-width: 420px;
}

.viewer-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 12px;
  align-items: start;
}

.viewer {
  padding: 12px;
}

.viewer-host {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 340px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.viewer-canvas {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 2;
  background: rgba(2, 6, 23, 0.08);
}

:root[theme="dark"] .overlay {
  background: rgba(2, 6, 23, 0.5);
}

.overlay-card {
  padding: 14px;
  border-radius: 16px;
  min-width: 220px;
  text-align: center;
  display: grid;
  gap: 8px;
}

.overlay-card .t {
  font-weight: 900;
}

.overlay-card .p {
  font-weight: 900;
  font-size: 20px;
}

.overlay-card .hint {
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.6;
}

.viewer-meta {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.title {
  font-weight: 900;
  font-size: 16px;
}

.chip {
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
}

.desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.meta-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.source-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.source-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
}

.license {
  font-size: 12px;
  color: var(--font-color4);
}

.list {
  padding: 12px;
}

.list-head .k {
  font-weight: 900;
}

.list-head .small {
  color: var(--font-color4);
  font-size: 12px;
  margin-top: 4px;
}

.cards {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.card {
  appearance: none;
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  background: var(--glass-bg);
  padding: 10px;
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
}

.card.active {
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
  border-color: rgba(37, 99, 235, 0.35);
}

.thumb {
  width: 110px;
  height: 74px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(148, 163, 184, 0.08);
}

.meta {
  display: grid;
  gap: 6px;
  align-content: start;
}

.meta .t {
  font-weight: 900;
  font-size: 13px;
}

.meta .s {
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta .chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.resource-groups {
  display: grid;
  gap: 12px;
}

.resource-group {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.group-title {
  font-weight: 900;
  font-size: 16px;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.resource-card {
  padding: 12px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  text-decoration: none;
  color: var(--font-color1);
  display: grid;
  gap: 8px;
  min-height: 140px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.resource-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
}

.resource-name {
  font-weight: 900;
  font-size: 14px;
}

.resource-desc {
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.6;
}

.resource-note {
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.resource-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--font-color4);
  font-size: 11px;
}

.resource-tag {
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: rgba(37, 99, 235, 0.08);
  color: var(--font-color2);
}

.resource-link {
  font-weight: 700;
  color: var(--font-color1);
}

.resource-checklist {
  margin-top: 12px;
  padding: 14px;
  display: grid;
  gap: 8px;
}

.resource-checklist .check-title {
  font-weight: 900;
}

.resource-checklist ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 12px;
}

.use-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.use {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  gap: 8px;
}

.use .t {
  font-weight: 900;
}

.use .d {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.use ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

.bottom {
  padding: 18px;
}

.muted {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .viewer-grid {
    grid-template-columns: 1fr;
  }

  .use-grid {
    grid-template-columns: 1fr;
  }
}
</style>
