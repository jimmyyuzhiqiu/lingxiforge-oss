<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { pricingContent } from "@/data/siteContent";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const billing = ref<"monthly" | "yearly">("monthly");

const designerPlans = computed(() =>
  pricingContent.designerPlans.map((p) => ({
    ...p,
    displayPrice: billing.value === "monthly" ? `¥${p.monthly}/月` : `¥${p.yearly}/年`,
    hint: billing.value === "monthly" ? `年付 ¥${p.yearly}` : `月付 ¥${p.monthly}`,
  }))
);

const enterprisePlans = [
  {
    plan: "馆方协作版",
    price: "按项目 / 年框架",
    desc: "适合博物馆、纪念馆和文化机构，强调授权协同、展陈叙事与系列化上新。",
    includes: ["角色分流与协作模板", "IP 合规与留档建议", "季度上新节奏规划", "交付口径对齐"],
  },
  {
    plan: "品牌联名版",
    price: "按系列报价",
    desc: "适合品牌联名与渠道上新，强调 SKU 扩展、履约稳定与成本可控。",
    includes: ["SKU 结构规划", "材料与工艺路线建议", "打样复盘机制", "履约与验收标准"],
  },
] as const;

const billingAndSla = [
  "支持月付/年付与项目制，年付可获得更稳定的预算与交付窗口。",
  "默认提供电子发票；企业客户支持对公付款与采购流程配合。",
  "标准响应：1-2 个工作日首次回复；复杂项目按里程碑提供周报。",
  "交付 SLA 取决于材料、尺寸、SKU 数量与后处理复杂度，立项时会明确。",
] as const;

const pricingScenarios = [
  {
    title: "馆方 / 机构：先小样验证，再扩到系列化上新",
    desc: "先验证授权边界、可制造质量与渠道反馈，再逐步扩大到系列化上新计划。",
    to: "/apply?intent=partner",
    cta: "提交合作申请",
  },
  {
    title: "品牌联名：把预算拆到“设计、打样、履约”三段",
    desc: "按里程碑拆分预算与交付责任，便于营销、设计与供应链协同推进。",
    to: "/workflow",
    cta: "查看工作流",
  },
  {
    title: "独立设计师：按月迭代，按次验证高精度样品",
    desc: "先按月沉淀模板与风格，再按次使用高精度路线验证高转化 SKU。",
    to: "/resources",
    cta: "获取资源模板",
  },
] as const;

const pricingRelatedLinks = [
  {
    title: "产品能力",
    desc: "对齐套餐能力边界与可制造支持范围。",
    to: "/product",
  },
  {
    title: "材料与质量",
    desc: "明确不同工艺路线对预算和交期的影响。",
    to: "/materials",
  },
  {
    title: "常见问题",
    desc: "快速排查计费、部署与交付疑问。",
    to: "/faqs",
  },
  {
    title: "联系我们（销售）",
    desc: "沟通对公采购、开票与 SLA 约束。",
    to: "/contact?type=sales",
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
          <h1>订阅与计费方案</h1>
          <p class="subtitle">提供个人订阅、机构合作与履约计费口径，覆盖从方案验证到规模化交付的不同阶段，帮助团队建立清晰可预测的成本结构。</p>
          <div class="billing">
            <el-radio-group v-model="billing">
              <el-radio-button label="monthly">按月</el-radio-button>
              <el-radio-button label="yearly">按年</el-radio-button>
            </el-radio-group>
          </div>
        </section>

        <section class="section">
          <h2>设计师订阅</h2>
          <div class="grid">
            <div class="plan" v-for="plan in designerPlans" :key="plan.plan">
              <h3>{{ plan.plan }}</h3>
              <div class="price">{{ plan.displayPrice }}</div>
              <div class="hint">{{ plan.hint }}</div>
              <div class="quota">{{ plan.quota }}</div>
              <p class="desc">{{ plan.desc }}</p>
              <el-button type="primary" plain style="width: 100%" @click="router.push('/apply?intent=demo')">选择方案</el-button>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>机构 / 馆方合作方案</h2>
          <div class="grid2">
            <div class="enterprise" v-for="plan in enterprisePlans" :key="plan.plan">
              <h3>{{ plan.plan }}</h3>
              <div class="price">{{ plan.price }}</div>
              <p class="desc">{{ plan.desc }}</p>
              <ul class="list">
                <li v-for="item in plan.includes" :key="item">{{ item }}</li>
              </ul>
              <el-button type="primary" plain style="width: 100%" @click="router.push('/contact?type=sales')">咨询方案</el-button>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>爱好者按次套餐</h2>
          <div class="grid3">
            <div class="bundle" v-for="bundle in pricingContent.hobbyBundles" :key="bundle.plan">
              <h3>{{ bundle.plan }}</h3>
              <div class="price">¥{{ bundle.price }}</div>
              <p class="desc">{{ bundle.desc }}</p>
              <el-button plain style="width: 100%" @click="router.push('/apply?intent=demo')">购买</el-button>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>打印履约加价参考</h2>
          <ul class="list">
            <li v-for="item in pricingContent.printMarkupNotes" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="section">
          <h2>计费、开票与 SLA 说明</h2>
          <ul class="list">
            <li v-for="item in billingAndSla" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="section">
          <h2>按角色规划预算与交付节奏</h2>
          <div class="scenario-grid">
            <article class="scenario" v-for="item in pricingScenarios" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <RouterLink :to="item.to">{{ item.cta }}</RouterLink>
            </article>
          </div>
        </section>

        <section class="section related glass-card" aria-labelledby="pricing-related-title">
          <h2 id="pricing-related-title">继续阅读：订阅与计费相关页面</h2>
          <p class="related-subtitle">结合以下页面阅读，可更快完成预算评估、执行规划与合作决策。</p>
          <ul class="related-list">
            <li v-for="item in pricingRelatedLinks" :key="item.to">
              <RouterLink :to="item.to">{{ item.title }}</RouterLink>
              <span>{{ item.desc }}</span>
            </li>
          </ul>
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
  color: var(--font-color1);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h1 {
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--font-color2);
    margin-bottom: 14px;
    line-height: 1.6;
  }

  .billing {
    max-width: 260px;
  }
}

.section {
  width: min(1100px, 92%);
  margin: 0 auto 18px;

  h2 {
    margin: 12px 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.plan {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h3 {
    margin-bottom: 8px;
  }

  .price {
    font-size: 26px;
    font-weight: 800;
  }

  .hint {
    font-size: 12px;
    color: var(--font-color4);
    margin-bottom: 10px;
  }

  .quota {
    display: inline-block;
    font-size: 12px;
    color: var(--font-color3);
    background: var(--accent-soft-bg);
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 13px;
    color: var(--font-color2);
    line-height: 1.5;
    margin-bottom: 12px;
  }
}

.enterprise {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h3 {
    margin-bottom: 8px;
  }

  .price {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .desc {
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .list {
    margin-bottom: 12px;
  }
}

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.scenario {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h3 {
    margin: 0 0 10px;
    font-size: 15px;
    line-height: 1.45;
  }

  p {
    margin: 0 0 10px;
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.6;
  }

  a {
    color: var(--font-color3);
    font-size: 13px;
    font-weight: 700;
  }
}

.bundle {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  .price {
    font-size: 22px;
    font-weight: 800;
    margin: 6px 0 8px;
  }

  .desc {
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 12px;
  }
}

.list {
  list-style: disc;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.65;
}

.related {
  padding: 16px;
}

.related-subtitle {
  margin: 0 0 10px;
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
}

.related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px;

  li {
    display: grid;
    gap: 2px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    border-radius: 12px;
    padding: 10px 12px;
  }

  a {
    color: var(--font-color2);
    font-size: 13px;
    font-weight: 700;
  }

  span {
    color: var(--font-color4);
    font-size: 12px;
    line-height: 1.45;
  }
}

@media (max-width: 980px) {
  .grid,
  .grid2,
  .grid3,
  .scenario-grid,
  .related-list {
    grid-template-columns: 1fr;
  }
}
</style>
