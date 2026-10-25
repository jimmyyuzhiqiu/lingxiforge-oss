<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { aboutContent, detailsContent, industryStats } from "@/data/siteContent";
import { useRouter } from "vue-router";

const router = useRouter();

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const showcaseAsset = (file: string) => `${base}/showcase/lingxi-museum/assets/${file}`;

const highlights = [
  {
    title: "差异化：可交付，而非仅可看",
    desc: "把“可制造约束”纳入生成链路：网格质量、壁厚、支撑、拆件与质检标准，一次对齐交付。",
    image: showcaseAsset("s15-1.png"),
  },
  {
    title: "模块化：把项目沉淀成体系",
    desc: "教程、案例、质量标准与合规流程做成可复用模块，持续维护，可信度与转化会自然增长。",
    image: showcaseAsset("s06-2.png"),
  },
  {
    title: "工作流：从生成到履约闭环",
    desc: "从灵感输入到 GLB 评审，再到 STL 打样、质检、补货与渠道物料，形成可规模化复用的流程。",
    image: showcaseAsset("s11-1.png"),
  },
  {
    title: "对外表达：展品化叙事模板",
    desc: "把 3D 资产从文件升级为“展品页”：可交互、可讲述、可传播，适配官网与展陈。",
    image: showcaseAsset("s09-1.png"),
  },
] as const;

const complianceModules = [
  {
    title: "IP 合规与授权边界",
    desc: "明确授权范围、溯源留档与下架机制，降低合作风险。",
    to: "/ip",
  },
  {
    title: "信任与安全基线",
    desc: "隐私边界、数据处理说明与负责披露入口。",
    to: "/trust",
  },
  {
    title: "站点法务与可访问性",
    desc: "隐私/条款/Cookie/无障碍声明，形成对外可信底座。",
    to: "/privacy",
  },
] as const;

const deliveryStandards = [
  {
    title: "交付包（展示）",
    bullets: ["GLB 在线预览", "封面与标签", "讲述要点与注意事项"],
  },
  {
    title: "交付包（制造）",
    bullets: ["STL 与尺寸说明", "拆件与装配策略", "切片建议（材质/支撑）"],
  },
  {
    title: "Print-ready 标准",
    bullets: ["壁厚/公差/支撑", "网格修复与容错", "质检清单与验收口径"],
  },
] as const;

const roadmap = detailsContent.roadmap;
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <div class="hero-grid">
            <div class="left">
              <h1>{{ aboutContent.title }}</h1>
              <p class="subtitle">{{ aboutContent.subtitle }}</p>
              <div class="cta">
                <el-button type="primary" @click="router.push('/apply')">提交合作申请</el-button>
                <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
                <el-button text @click="router.push('/cases')">查看案例</el-button>
              </div>
              <div class="highlights">
                <div class="highlight" v-for="item in aboutContent.highlights" :key="item.label">
                  <div class="value">{{ item.value }}</div>
                  <div class="label">{{ item.label }}</div>
                </div>
              </div>
            </div>

            <div class="right">
              <div class="hero-image glass-surface">
                <img class="img" :src="showcaseAsset('s02-1.png')" alt="灵犀造物 · 全链路赋能概览" loading="lazy"
                  decoding="async" />
              </div>
              <div class="hero-note glass-surface">
                <div class="k">我们坚持的标准</div>
                <ul>
                  <li>对外可讲述：结构化内容与展品化叙事</li>
                  <li>对内可落地：print-ready 标准与质检口径</li>
                  <li>对合作可复用：模板与流程持续维护</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>使命</h2>
            <el-button plain @click="router.push('/trust')">信任与安全</el-button>
          </div>
          <div class="two">
            <div class="glass-surface block">
              <ul class="list">
                <li v-for="item in aboutContent.mission" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="glass-card block">
              <h3>差异化</h3>
              <ul class="list">
                <li v-for="item in aboutContent.differentiation" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>我们在做什么（模块化能力）</h2>
          <div class="grid">
            <div class="card glass-card" v-for="item in aboutContent.whatWeDo" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>资质与合规</h2>
            <el-button plain @click="router.push('/ip')">IP 合规说明</el-button>
          </div>
          <div class="grid3">
            <article class="card glass-card" v-for="m in complianceModules" :key="m.title">
              <h3>{{ m.title }}</h3>
              <p>{{ m.desc }}</p>
              <el-button text @click="router.push(m.to)">查看详情</el-button>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>交付标准</h2>
            <el-button plain @click="router.push('/materials')">材料与质量</el-button>
          </div>
          <div class="grid3">
            <article class="card glass-surface" v-for="m in deliveryStandards" :key="m.title">
              <h3>{{ m.title }}</h3>
              <ul class="list">
                <li v-for="b in m.bullets" :key="b">{{ b }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section details" id="project-details">
          <div class="sec-head">
            <h2>项目详情</h2>
            <el-button plain @click="router.push('/pricing')">订阅方案</el-button>
          </div>
          <div class="metrics-grid">
            <div class="metric glass-surface" v-for="item in detailsContent.metrics" :key="item.label">
              <div class="value">{{ item.value }}</div>
              <div class="label">{{ item.label }}</div>
            </div>
          </div>
          <div class="detail-grid">
            <article class="detail-card glass-card">
              <h3>核心技术流程</h3>
              <ul class="list">
                <li v-for="item in detailsContent.techPipeline" :key="item">{{ item }}</li>
              </ul>
            </article>
            <article class="detail-card glass-card">
              <h3>市场速览</h3>
              <div class="stats-grid">
                <div class="stats-card" v-for="item in industryStats" :key="item.label">
                  <div class="label">{{ item.label }}</div>
                  <div class="value">{{ item.value }}</div>
                  <div class="note">{{ item.note }}</div>
                </div>
              </div>
              <ul class="list">
                <li v-for="note in detailsContent.marketNotes" :key="note">{{ note }}</li>
              </ul>
            </article>
            <article class="detail-card glass-card">
              <h3>商业模式</h3>
              <div class="plans">
                <div class="plan" v-for="plan in detailsContent.businessModel" :key="plan.plan">
                  <div class="plan-title">{{ plan.plan }}</div>
                  <div class="plan-price">{{ plan.price }}</div>
                  <div class="plan-desc">{{ plan.desc }}</div>
                </div>
              </div>
            </article>
            <article class="detail-card glass-card">
              <h3>财务与增长目标</h3>
              <ul class="list">
                <li v-for="item in detailsContent.financialHighlights" :key="item">{{ item }}</li>
              </ul>
            </article>
            <article class="detail-card glass-card">
              <h3>团队与顾问</h3>
              <ul class="list">
                <li v-for="item in detailsContent.teamHighlights" :key="item">{{ item }}</li>
              </ul>
              <div class="advisors">
                <span v-for="item in detailsContent.advisors" :key="item">{{ item }}</span>
              </div>
            </article>
          </div>
        </section>

        <section class="section deck glass-card">
          <div class="deck-head">
            <div>
              <h2>关键能力精选</h2>
              <p class="deck-sub">
                精选关键图示与要点，重排为更“产品化”的叙事模块，便于对外介绍与合作沟通。
              </p>
            </div>
            <el-button plain @click="router.push('/showcase')">查看完整方案展示</el-button>
          </div>

          <div class="deck-grid">
            <article class="deck-card glass-surface" v-for="item in highlights" :key="item.title">
              <img class="cover" :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </article>
          </div>
        </section>

        <section class="section timeline glass-card">
          <div class="sec-head">
            <h2>时间线</h2>
            <el-button plain @click="router.push('/apply')">提交合作申请</el-button>
          </div>
          <el-timeline>
            <el-timeline-item v-for="item in roadmap" :key="item.year + item.desc" :timestamp="item.year"
              placement="top">
              <div class="tl">
                <div class="t">阶段目标</div>
                <div class="d">{{ item.desc }}</div>
              </div>
            </el-timeline-item>
          </el-timeline>
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
  width: min(1180px, 92%);
  padding: 26px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 14px;
  align-items: start;
}

h1 {
  margin: 0 0 8px;
}

.subtitle {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 0 0 16px;
}

.cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.highlight {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 12px;

  .value {
    font-weight: 900;
    font-size: 18px;
  }

  .label {
    margin-top: 2px;
    font-size: 12px;
    color: var(--font-color4);
  }
}

.hero-image {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.hero-image .img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  min-height: 220px;
}

.hero-note {
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

.list {
  list-style: disc;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 6px;
}

.metric {
  padding: 12px;
  border-radius: 14px;
  display: grid;
  gap: 6px;

  .value {
    font-size: 18px;
    font-weight: 800;
  }

  .label {
    font-size: 12px;
    color: var(--font-color4);
  }
}

.detail-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-card {
  padding: 14px;

  h3 {
    margin-bottom: 10px;
    font-size: 15px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}

.stats-card {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);

  .label {
    font-size: 11px;
    color: var(--font-color4);
  }

  .value {
    font-size: 16px;
    font-weight: 700;
    margin: 6px 0;
  }

  .note {
    font-size: 11px;
    color: var(--font-color4);
  }
}

.plans {
  display: grid;
  gap: 10px;
}

.plan {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);

  .plan-title {
    font-weight: 700;
  }

  .plan-price {
    margin: 6px 0;
    font-weight: 600;
  }

  .plan-desc {
    font-size: 12px;
    color: var(--font-color2);
  }
}

.advisors {
  margin-top: 10px;
  display: grid;
  gap: 6px;
  color: var(--font-color4);
  font-size: 12px;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: start;
}

.block {
  border-radius: 16px;
  padding: 16px;

  h3 {
    margin: 0 0 10px;
  }
}

.deck {
  padding: 18px;
}

.deck-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  h2 {
    margin: 0 0 6px;
  }
}

.deck-sub {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
}

.deck-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.deck-card {
  border-radius: 16px;
  padding: 12px;

  .cover {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(148, 163, 184, 0.08);
    margin-bottom: 10px;
  }

  h3 {
    margin: 0 0 6px;
    font-size: 15px;
  }

  p {
    margin: 0;
    color: var(--font-color2);
    font-size: 12px;
    line-height: 1.55;
  }
}

.card {
  border-radius: 16px;
  padding: 14px;

  h3 {
    margin-bottom: 6px;
    font-size: 16px;
  }

  p {
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.5;
  }
}

.timeline {
  padding: 18px;
}

.tl {
  display: grid;
  gap: 8px;
}

.tl .t {
  font-weight: 900;
}

.tl .d {
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .highlights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .two {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .grid3 {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .deck-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .deck-grid {
    grid-template-columns: 1fr;
  }
}
</style>
