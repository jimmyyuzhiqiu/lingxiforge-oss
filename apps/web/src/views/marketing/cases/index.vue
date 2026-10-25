<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import {
  cases,
  type CaseLicenseStatus,
  type CaseMaterial,
  type CaseProcess,
  type CaseTheme,
} from "@/data/casesContent";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();

type FilterState = {
  keyword: string;
  theme: CaseTheme | "";
  material: CaseMaterial | "";
  process: CaseProcess | "";
  licenseStatus: CaseLicenseStatus | "";
};

const filters = reactive<FilterState>({
  keyword: "",
  theme: "",
  material: "",
  process: "",
  licenseStatus: "",
});

const themeOptions = computed(() =>
  Array.from(new Set(cases.map((c) => c.theme))).sort()
);
const materialOptions = computed(() =>
  Array.from(new Set(cases.map((c) => c.material))).sort()
);
const processOptions = computed(() =>
  Array.from(new Set(cases.map((c) => c.process))).sort()
);
const licenseOptions = computed(() =>
  Array.from(new Set(cases.map((c) => c.licenseStatus))).sort()
);

const filteredCases = computed(() => {
  const keyword = filters.keyword.trim().toLowerCase();
  return cases.filter((c) => {
    if (filters.theme && c.theme !== filters.theme) return false;
    if (filters.material && c.material !== filters.material) return false;
    if (filters.process && c.process !== filters.process) return false;
    if (filters.licenseStatus && c.licenseStatus !== filters.licenseStatus) {
      return false;
    }

    if (!keyword) return true;
    const haystack = [
      c.title,
      c.summary,
      c.theme,
      c.material,
      c.process,
      c.licenseStatus,
      ...c.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  });
});

const resetFilters = () => {
  filters.keyword = "";
  filters.theme = "";
  filters.material = "";
  filters.process = "";
  filters.licenseStatus = "";
};
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
            <h1>案例中心｜可交付、可复用的文创产品化模板</h1>
            <p class="subtitle">
              按主题、材质、工艺与授权状态筛选案例，快速定位适合你的落地路径。每个案例均提供执行要点、交付口径与独立 SEO 页面。
            </p>
            <div class="cta">
              <el-button type="primary" @click="router.push('/apply')">提交合作申请</el-button>
              <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
              <el-button text @click="router.push('/gallery')">进入 3D 展品库</el-button>
            </div>
          </div>

          <div class="right glass-surface">
            <div class="k">筛选维度</div>
            <ul>
              <li>主题：馆藏纹样、器型复刻、展陈互动等</li>
              <li>材质：树脂、PLA、尼龙、金属等</li>
              <li>工艺：SLA/FDM/SLS 与后处理路线</li>
              <li>授权：已授权/授权中/需确权/公共领域</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <div class="filters glass-card" role="search" aria-label="案例筛选">
            <div class="row">
              <el-input v-model="filters.keyword" placeholder="搜索：标题、关键词、材质、工艺…" clearable :prefix-icon="Search" />
              <el-select v-model="filters.theme" placeholder="主题" clearable filterable>
                <el-option v-for="o in themeOptions" :key="o" :label="o" :value="o" />
              </el-select>
              <el-select v-model="filters.material" placeholder="材质" clearable filterable>
                <el-option v-for="o in materialOptions" :key="o" :label="o" :value="o" />
              </el-select>
              <el-select v-model="filters.process" placeholder="工艺" clearable filterable>
                <el-option v-for="o in processOptions" :key="o" :label="o" :value="o" />
              </el-select>
              <el-select v-model="filters.licenseStatus" placeholder="授权状态" clearable filterable>
                <el-option v-for="o in licenseOptions" :key="o" :label="o" :value="o" />
              </el-select>
              <el-button plain @click="resetFilters">重置</el-button>
            </div>
            <div class="hint">
              <span class="count">找到 {{ filteredCases.length }} 个案例</span>
              <span class="dot">·</span>
              <span class="muted">建议从“小体量 SKU + 可制造约束清晰”的方向先跑通闭环。</span>
            </div>
          </div>

          <div class="grid" aria-label="案例列表">
            <router-link class="case glass-card" v-for="c in filteredCases" :key="c.slug" :to="`/cases/${c.slug}`">
              <div class="cover">
                <img class="img" :src="c.coverImage.src" :alt="c.coverImage.alt" loading="lazy" decoding="async" />
              </div>
              <div class="meta">
                <div class="title">{{ c.title }}</div>
                <div class="summary">{{ c.summary }}</div>
                <div class="chips" aria-label="案例标签">
                  <span class="chip">{{ c.theme }}</span>
                  <span class="chip">{{ c.material }}</span>
                  <span class="chip">{{ c.process }}</span>
                  <span class="chip">{{ c.licenseStatus }}</span>
                </div>
              </div>
              <div class="actions">
                <span class="more">查看详情</span>
                <span class="arrow" aria-hidden="true">→</span>
              </div>
            </router-link>
          </div>
        </section>

        <section class="section bottom-cta glass-card">
          <h2>想把你的馆藏/联名 IP 做成可交付产品？</h2>
          <p class="muted">
            提交合作申请后，我们会按角色分流并给出“生成—可制造—履约”的落地建议与交付口径（含合规与质量标准）。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/apply')">提交合作申请</el-button>
            <el-button plain @click="router.push('/trust')">查看交付与合规标准</el-button>
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
  grid-template-columns: 1.3fr 0.7fr;
  gap: 14px;
  align-items: start;
}

h1 {
  margin: 0;
}

.subtitle {
  margin: 10px 0 14px;
  color: var(--font-color2);
  line-height: 1.7;
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.right {
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
}

.filters {
  padding: 16px;
}

.row {
  display: grid;
  grid-template-columns: 1.4fr repeat(4, minmax(0, 1fr)) auto;
  gap: 10px;
  align-items: center;
}

.hint {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: baseline;
}

.count {
  font-weight: 800;
}

.dot {
  opacity: 0.7;
}

.muted {
  color: var(--font-color2);
  line-height: 1.6;
}

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.case {
  padding: 12px;
  display: grid;
  gap: 10px;
  text-decoration: none;
  transition: transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.case:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.12);
}

.cover {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background: rgba(148, 163, 184, 0.08);
}

.img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.meta {
  display: grid;
  gap: 8px;
}

.title {
  font-weight: 900;
  line-height: 1.35;
}

.summary {
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 4px;
  color: var(--font-color3);
  font-weight: 700;
}

.bottom-cta {
  padding: 18px;
  text-align: left;

  h2 {
    margin: 0 0 8px;
  }

  .muted {
    margin: 0 0 12px;
    max-width: 76ch;
  }
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .row {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
