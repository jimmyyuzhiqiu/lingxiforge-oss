<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { cases, getCaseBySlug } from "@/data/casesContent";
import { fetch3dCatalog, open3dModels, type Open3DModel } from "@/data/threeDModels";

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug || ""));
const item = computed(() => getCaseBySlug(slug.value));
const models = ref<Open3DModel[]>(open3dModels);

watch(
  () => slug.value,
  (value) => {
    if (!getCaseBySlug(value)) router.replace("/404");
  },
  { immediate: true }
);

const relatedModels = computed(() => {
  const ids = item.value?.related3dModelIds || [];
  if (!ids.length) return [];
  return models.value.filter((m) => ids.includes(m.id));
});

const relatedCases = computed(() => {
  const current = slug.value;
  return cases.filter((c) => c.slug !== current).slice(0, 3);
});

const toGallery = (id?: string) => {
  router.push({
    path: "/gallery",
    query: id ? { id } : undefined,
  });
};

onMounted(async () => {
  const catalog = await fetch3dCatalog();
  if (catalog?.length) {
    models.value = catalog;
  }
});
</script>

<template>
  <div class="page marketing-page" v-if="item">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <div class="hero-grid">
            <div class="left">
              <div class="crumb">
                <el-button text @click="router.push('/cases')">← 返回案例列表</el-button>
              </div>
              <h1>{{ item.title }}</h1>
              <p class="subtitle">{{ item.summary }}</p>

              <div class="chips" aria-label="案例标签">
                <span class="chip">{{ item.theme }}</span>
                <span class="chip">{{ item.material }}</span>
                <span class="chip">{{ item.process }}</span>
                <span class="chip">{{ item.licenseStatus }}</span>
              </div>

              <div class="cta">
                <el-button type="primary" @click="router.push('/apply')">提交合作申请</el-button>
                <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
                <el-button text @click="toGallery()">进入 3D 展品库</el-button>
              </div>
            </div>

            <div class="right">
              <div class="cover glass-surface">
                <img class="img" :src="item.coverImage.src" :alt="item.coverImage.alt" loading="lazy"
                  decoding="async" />
              </div>
              <div class="panel glass-surface">
                <div class="k">交付清单（概览）</div>
                <ul>
                  <li v-for="d in item.deliverables" :key="d">{{ d }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>方案要点</h2>
          <div class="highlights">
            <div class="h glass-surface" v-for="h in item.highlights" :key="h">
              <div class="dot" aria-hidden="true"></div>
              <div class="text">{{ h }}</div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>案例拆解</h2>
          <div class="blocks">
            <article class="block glass-card" v-for="s in item.sections" :key="s.title">
              <div class="head">
                <h3>{{ s.title }}</h3>
                <p v-if="s.desc" class="desc">{{ s.desc }}</p>
              </div>
              <ul v-if="s.bullets?.length" class="list">
                <li v-for="b in s.bullets" :key="b">{{ b }}</li>
              </ul>
              <div v-if="s.image" class="img-wrap glass-surface">
                <img class="img" :src="s.image.src" :alt="s.image.alt" loading="lazy" decoding="async" />
              </div>
            </article>
          </div>
        </section>

        <section class="section" v-if="item.gallery?.length">
          <div class="sec-head">
            <h2>图示精选</h2>
            <el-button text @click="router.push('/showcase')">查看完整方案展示</el-button>
          </div>
          <div class="gallery">
            <div class="g glass-surface" v-for="img in item.gallery" :key="img.src">
              <img class="img" :src="img.src" :alt="img.alt" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section class="section" v-if="relatedModels.length">
          <div class="sec-head">
            <h2>相关 3D 展品（可交互预览）</h2>
            <el-button plain @click="toGallery()">查看全部</el-button>
          </div>
          <div class="grid">
            <article class="model glass-card" v-for="m in relatedModels" :key="m.id">
              <div class="thumb">
                <img :src="m.thumbnail" :alt="m.title" loading="lazy" decoding="async" />
                <span class="badge">{{ m.format }}</span>
              </div>
              <div class="meta">
                <div class="t">{{ m.title }}</div>
                <div class="s">{{ m.subtitle }}</div>
              </div>
              <div class="actions">
                <el-button type="primary" @click="toGallery(m.id)">在线预览</el-button>
                <a class="link" :href="m.sourcePage" target="_blank" rel="noopener">来源与许可</a>
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>继续浏览</h2>
            <el-button text @click="router.push('/cases')">返回案例中心</el-button>
          </div>
          <div class="continue-grid">
            <article
              class="continue-card glass-surface"
              v-for="c in relatedCases"
              :key="c.slug"
            >
              <div class="continue-title">{{ c.title }}</div>
              <p class="continue-desc">{{ c.summary }}</p>
              <div class="continue-actions">
                <el-button plain @click="router.push(`/cases/${c.slug}`)">查看案例</el-button>
              </div>
            </article>
            <article class="continue-card glass-surface">
              <div class="continue-title">查看完整交付流程</div>
              <p class="continue-desc">从输入到可交付上新，了解标准化执行链路与验收口径。</p>
              <div class="continue-actions">
                <el-button plain @click="router.push('/workflow')">进入工作流</el-button>
              </div>
            </article>
            <article class="continue-card glass-surface">
              <div class="continue-title">对接项目需求</div>
              <p class="continue-desc">提交需求后按场景分流：馆方、品牌、制造与教育项目均可对接。</p>
              <div class="continue-actions">
                <el-button type="primary" plain @click="router.push('/contact?type=sales')">联系团队</el-button>
              </div>
            </article>
          </div>
        </section>

        <section class="section bottom-cta glass-card">
          <h2>需要我们为你的项目出一版“落地建议 + 交付口径”？</h2>
          <p class="muted">
            提交参考图与需求后，我们会按角色分流（馆方/IP/品牌/渠道/设计师），给出可制造约束、合规边界与履约周期建议。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/apply')">提交合作申请</el-button>
            <el-button plain @click="router.push('/trust')">查看信任与安全</el-button>
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
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 14px;
  align-items: start;
}

.crumb {
  margin-bottom: 6px;
}

h1 {
  margin: 0 0 10px;
}

.subtitle {
  margin: 0 0 14px;
  color: var(--font-color2);
  line-height: 1.7;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cover {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.cover .img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  display: block;
  object-fit: cover;
}

.panel {
  margin-top: 12px;
  border-radius: 16px;
  padding: 14px;

  .k {
    font-weight: 900;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.7;
    display: grid;
    gap: 6px;
  }
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
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.h {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 10px;
  align-items: start;
}

.h .dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 5px;
  background: var(--accent-soft-bg);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.h .text {
  color: var(--font-color2);
  line-height: 1.7;
}

.blocks {
  display: grid;
  gap: 12px;
}

.block {
  padding: 16px;
  border-radius: 18px;
}

.head h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
}

.list {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.7;
  display: grid;
  gap: 6px;
}

.img-wrap {
  margin-top: 12px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.img-wrap .img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  min-height: 220px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.g {
  border-radius: 16px;
  overflow: hidden;
}

.g .img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  min-height: 220px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.model {
  padding: 12px;
  display: grid;
  gap: 10px;
}

.thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: rgba(148, 163, 184, 0.08);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
}

.meta {
  display: grid;
  gap: 6px;
}

.t {
  font-weight: 900;
}

.s {
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.link {
  color: var(--font-color3);
  font-size: 13px;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
}

.link:hover {
  background: var(--accent-soft-bg);
  border-color: rgba(255, 255, 255, 0.14);
}

.continue-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.continue-card {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  gap: 10px;
}

.continue-title {
  font-weight: 900;
}

.continue-desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

.continue-actions {
  display: flex;
}

.bottom-cta {
  padding: 18px;

  h2 {
    margin: 0 0 8px;
  }

  .muted {
    margin: 0 0 12px;
    max-width: 76ch;
    color: var(--font-color2);
    line-height: 1.7;
  }
}

@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .highlights {
    grid-template-columns: 1fr;
  }

  .gallery {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .continue-grid {
    grid-template-columns: 1fr;
  }
}
</style>
