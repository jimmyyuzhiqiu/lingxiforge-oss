<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { computed, ref } from "vue";
import { faqs } from "@/data/siteContent";

const category = ref<"全部" | "产品" | "生成" | "打印" | "合规" | "部署" | "交付">("全部");

const categories = ["全部", "产品", "生成", "打印", "合规", "部署", "交付"] as const;

const filtered = computed(() => {
  if (category.value === "全部") return faqs;
  return faqs.filter((f) => f.category === category.value);
});

const faqRelatedLinks = [
  {
    title: "产品能力",
    desc: "查看生成、可制造优化与履约交付的能力边界。",
    to: "/product",
  },
  {
    title: "核心工作流",
    desc: "按阶段理解“输入、评审、打样、交付”的执行顺序。",
    to: "/workflow",
  },
  {
    title: "材料与质量",
    desc: "定位壁厚、支撑、拆件、公差等 print-ready 标准。",
    to: "/materials",
  },
  {
    title: "IP 合规",
    desc: "对齐授权范围、留档与投诉下架流程。",
    to: "/ip",
  },
  {
    title: "资源中心",
    desc: "下载提示词模板、速查表与案例拆解资料。",
    to: "/resources",
  },
  {
    title: "联系我们",
    desc: "复杂问题可直接进入销售/支持/安全通道。",
    to: "/contact",
  },
] as const;
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero">
          <h1>常见问题（FAQ）</h1>
          <p class="subtitle">集中解答从提示词到可制造交付的关键问题，包括生成质量、打印标准、IP 合规、部署与履约流程。</p>
          <div class="tabs">
            <el-radio-group v-model="category">
              <el-radio-button v-for="c in categories" :key="c" :label="c">{{ c }}</el-radio-button>
            </el-radio-group>
          </div>
        </section>

        <section class="section">
          <el-collapse accordion>
            <el-collapse-item v-for="(item, index) in filtered" :key="index" :name="index">
              <template #title>
                <div class="q">
                  <span class="badge">{{ item.category }}</span>
                  <span>{{ item.q }}</span>
                </div>
              </template>
              <div class="a">{{ item.a }}</div>
            </el-collapse-item>
          </el-collapse>
        </section>

        <section class="section related glass-card" aria-labelledby="faq-related-title">
          <h2 id="faq-related-title">继续阅读：常见问题关联页面</h2>
          <p class="related-subtitle">如果问题涉及项目落地，建议继续浏览以下页面获取更完整的执行信息。</p>
          <div class="related-grid">
            <article class="related-card" v-for="item in faqRelatedLinks" :key="item.to">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <RouterLink :to="item.to">进入 {{ item.title }}</RouterLink>
            </article>
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
  margin: 90px auto 20px;
  width: min(1100px, 92%);
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 28px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h1 {
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--font-color2);
    margin-bottom: 14px;
  }
}

.tabs {
  :deep(.el-radio-button__inner) {
    border-radius: 10px;
  }
}

.section {
  width: min(1100px, 92%);
  margin: 0 auto;
}

.related {
  margin-top: 18px;
  padding: 16px;
}

.related-subtitle {
  margin: 0 0 12px;
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.related-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 12px;

  h3 {
    margin: 0 0 8px;
    font-size: 14px;
  }

  p {
    margin: 0 0 10px;
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.55;
  }

  a {
    color: var(--font-color3);
    font-size: 13px;
    font-weight: 700;
  }
}

.q {
  display: flex;
  align-items: center;
  gap: 10px;

  .badge {
    font-size: 12px;
    color: var(--font-color3);
    background: var(--accent-soft-bg);
    padding: 2px 10px;
    border-radius: 999px;
  }
}

.a {
  color: var(--font-color2);
  line-height: 1.6;
}

@media (max-width: 980px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
