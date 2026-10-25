<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search, ArrowRight } from "@element-plus/icons-vue";
import { faqs } from "@/data/siteContent";
import { resourceItems, pressReleases, contactChannels } from "@/data/marketingContent";

const router = useRouter();
const route = useRoute();

type SearchItem = {
  title: string;
  desc: string;
  to: string;
  tags: string[];
  kind: "page" | "faq" | "resource" | "news" | "contact";
};

const items: SearchItem[] = [
  {
    kind: "page",
    title: "产品｜生成式 3D 与打印履约",
    desc: "了解平台能力：生成、可制造优化、导出与履约闭环。",
    to: "/product",
    tags: ["产品", "平台", "生成式3D", "履约"],
  },
  {
    kind: "page",
    title: "工作流｜从生成到可交付",
    desc: "六阶段工作流：评审、优化、试打样、验收与模板沉淀。",
    to: "/workflow",
    tags: ["工作流", "How it works", "交付", "print-ready"],
  },
  {
    kind: "page",
    title: "材料与质量｜Print-ready 标准",
    desc: "树脂/PLA/尼龙路线建议、打印就绪清单与 QA 流程。",
    to: "/materials",
    tags: ["材料", "质量", "壁厚", "支撑", "QA"],
  },
  {
    kind: "page",
    title: "合作伙伴｜IP 与制造生态",
    desc: "按角色分流：博物馆/IP、品牌、工坊/制造商与教育合作。",
    to: "/partners",
    tags: ["合作伙伴", "博物馆", "品牌", "工坊", "制造商"],
  },
  {
    kind: "page",
    title: "信任与安全｜合规、隐私与交付标准",
    desc: "安全基线、隐私边界、IP 合规、负责披露与可交付标准。",
    to: "/trust",
    tags: ["信任中心", "安全", "合规", "隐私", "负责披露"],
  },
  {
    kind: "page",
    title: "IP 合规与授权",
    desc: "授权范围、溯源留档与下架流程（文化内容场景）。",
    to: "/ip",
    tags: ["IP", "授权", "溯源", "下架", "合规"],
  },
  {
    kind: "page",
    title: "新闻中心与媒体资料包",
    desc: "公告与新闻稿、素材下载、媒体联系与订阅。",
    to: "/newsroom",
    tags: ["新闻中心", "媒体", "press kit", "订阅"],
  },
  {
    kind: "page",
    title: "资源中心｜模板、指南与更新",
    desc: "提示词模板、可制造速查表、IP 合规流程与更新订阅。",
    to: "/resources",
    tags: ["资源", "模板", "教程", "下载", "订阅"],
  },
  {
    kind: "page",
    title: "3D 展品库｜GLB 在线预览",
    desc: "在线预览 GLB（glTF）模型：交互浏览、展示与对外讲述模板。",
    to: "/gallery",
    tags: ["3D", "GLB", "glTF", "在线预览", "展品库"],
  },
  {
    kind: "page",
    title: "方案展示｜博物馆文创 AI + 3D 打印",
    desc: "精选关键图片与要点的产品化叙事（不提供源文件下载）。",
    to: "/showcase",
    tags: ["方案", "展示", "案例", "产品化"],
  },
  {
    kind: "page",
    title: "订阅方案",
    desc: "基础/中精度/高精度与按次套餐，支持履约对接。",
    to: "/pricing",
    tags: ["价格", "订阅", "套餐", "计费"],
  },
  {
    kind: "page",
    title: "常见问题（FAQ）",
    desc: "生成、打印、合规与部署问题的集中解答。",
    to: "/faqs",
    tags: ["FAQ", "常见问题", "帮助"],
  },
  {
    kind: "page",
    title: "联系我们（按任务分流）",
    desc: "销售/合作伙伴/支持/媒体/安全披露，快速对接。",
    to: "/contact",
    tags: ["联系", "销售", "支持", "合作", "媒体", "安全"],
  },
  {
    kind: "page",
    title: "隐私政策",
    desc: "我们如何收集、使用与保护你的信息。",
    to: "/privacy",
    tags: ["隐私", "数据保护"],
  },
  {
    kind: "page",
    title: "服务条款",
    desc: "使用规则、内容与知识产权相关说明。",
    to: "/terms",
    tags: ["条款", "使用规则"],
  },
  {
    kind: "page",
    title: "Cookie 政策",
    desc: "Cookie/本地存储的使用说明与管理方式。",
    to: "/cookies",
    tags: ["cookies", "本地存储", "偏好"],
  },
];

const faqItems: SearchItem[] = faqs.map((f) => ({
  kind: "faq",
  title: f.q,
  desc: f.a,
  to: "/faqs",
  tags: ["FAQ", f.category],
}));

const resourceIndex: SearchItem[] = resourceItems.map((r) => ({
  kind: "resource",
  title: r.title,
  desc: r.desc,
  to: "/resources",
  tags: ["资源", r.tag],
}));

const newsIndex: SearchItem[] = pressReleases.map((p) => ({
  kind: "news",
  title: p.title,
  desc: `${p.date} · ${p.category}｜${p.desc}`,
  to: "/newsroom",
  tags: ["新闻", p.category],
}));

const contactIndex: SearchItem[] = contactChannels.map((c) => ({
  kind: "contact",
  title: c.title,
  desc: `${c.desc}（${c.email}）`,
  to: `/contact?type=${c.key}`,
  tags: ["联系", "邮箱"],
}));

const index = [...items, ...faqItems, ...resourceIndex, ...newsIndex, ...contactIndex];

const query = ref("");
const initialQuery = route.query.q;
if (typeof initialQuery === "string") {
  query.value = initialQuery;
} else if (Array.isArray(initialQuery) && typeof initialQuery[0] === "string") {
  query.value = initialQuery[0];
}

const tokens = computed(() =>
  query.value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
);

const scoreItem = (item: SearchItem, tks: string[]) => {
  const hayTitle = item.title.toLowerCase();
  const hayDesc = item.desc.toLowerCase();
  const hayTags = item.tags.join(" ").toLowerCase();
  let score = 0;
  for (const t of tks) {
    if (hayTitle.includes(t)) score += 5;
    if (hayTags.includes(t)) score += 3;
    if (hayDesc.includes(t)) score += 1;
  }
  return score;
};

const results = computed(() => {
  if (!tokens.value.length) return index.slice(0, 18);
  const scored = index
    .map((i) => ({ item: i, score: scoreItem(i, tokens.value) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 50).map((x) => x.item);
});

const go = (to: string) => router.push(to);
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <h1>站内搜索｜快速定位产品、流程与合规内容</h1>
          <p class="subtitle">
            随着页面与资料持续增长，搜索是最高效的导航入口。你可以搜索材料、壁厚、print-ready、IP 合规、合作伙伴、新闻稿等关键词。
          </p>
          <el-input v-model="query" size="large" placeholder="例如：壁厚 / print-ready / IP 合规 / 试用 / 媒体资料包"
            class="search-input">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div class="hint">提示：此搜索为前端静态索引（无后端），上线后可接入全文检索与埋点分析。</div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>搜索结果</h2>
            <el-button plain @click="go('/contact?type=support')">
              获取帮助
              <el-icon style="margin-left: 6px"><ArrowRight /></el-icon>
            </el-button>
          </div>
          <div class="grid" v-if="results.length">
            <article class="card glass-surface" v-for="r in results" :key="r.kind + r.to + r.title" @click="go(r.to)">
              <div class="top">
                <span class="kind">{{ r.kind.toUpperCase() }}</span>
                <div class="tags">
                  <span class="tag" v-for="t in r.tags.slice(0, 3)" :key="t">{{ t }}</span>
                </div>
              </div>
              <div class="title">{{ r.title }}</div>
              <div class="desc">{{ r.desc }}</div>
            </article>
          </div>
          <div v-else class="empty glass-card">
            <div class="title">没有匹配结果</div>
            <div class="desc">换个关键词试试，比如：合规、工坊、尼龙、支撑、订阅。</div>
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
  width: min(980px, 92%);
  padding: 26px;
}

.subtitle {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 10px 0 14px;
}

.search-input {
  margin-top: 8px;
}

.hint {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  h2 {
    margin: 12px 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.card {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.kind {
  font-size: 12px;
  color: var(--font-color4);
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tag {
  font-size: 12px;
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  padding: 3px 10px;
  border-radius: 999px;
}

.title {
  font-weight: 900;
}

.desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.empty {
  width: min(980px, 92%);
  margin: 0 auto;
  padding: 18px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
