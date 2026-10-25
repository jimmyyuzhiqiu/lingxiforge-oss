<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { useRouter } from "vue-router";
import { OfficeBuilding, Shop, Box, School, ArrowRight, Medal, Tickets, ChatLineRound } from "@element-plus/icons-vue";

const router = useRouter();

const partnerTracks = [
  {
    title: "博物馆 / IP 方",
    icon: OfficeBuilding,
    desc: "把馆藏元素转译为可生产的文创系列：纹样提取、器型复刻、浮雕增强与材质映射，并建立授权与溯源机制。",
    whatYouGet: ["策展式选题与系列规划", "高质量 3D 资产沉淀", "联名上新与履约闭环", "授权与留档流程建议"],
    whatWeNeed: ["授权范围与使用规范", "参考素材与风格基线", "上新节奏与 SKU 目标"],
    cta: "/contact?type=partners",
  },
  {
    title: "文创品牌 / 商业合作",
    icon: Shop,
    desc: "用生成式 3D 提升上新速度：快速出样、可制造约束前置、用履约包对接供应链，把爆款概率做成工程化能力。",
    whatYouGet: ["更快的设计迭代", "结构与工艺策略模板", "材料/表面建议", "量产前的风险前置"],
    whatWeNeed: ["产品定位与价格带", "目标材质与工艺", "渠道与交付要求"],
    cta: "/contact?type=sales",
  },
  {
    title: "打印工坊 / 制造商网络",
    icon: Box,
    desc: "把“可交付”做成标准：统一文件规范、验收标准与质量策略，让工坊更高效承接多 SKU、小批量订单。",
    whatYouGet: ["规范化交付包", "失败率降低的质量策略", "稳定的订单协作流程", "能力与报价展示位（可选）"],
    whatWeNeed: ["工艺与材料能力清单", "典型交期与价格带", "质量标准与验收流程"],
    cta: "/contact?type=partners",
  },
  {
    title: "高校 / 教育与公共传播",
    icon: School,
    desc: "把文化资产转化为可互动的教学与展陈：模块化结构、可拆装教具、面向公众的数字化体验。",
    whatYouGet: ["课程/实验项目共创", "可拆装结构模板", "面向公众的展示内容", "低门槛的创作工作流"],
    whatWeNeed: ["教学目标与人群", "展示空间与限制条件", "评估方式与交付清单"],
    cta: "/contact?type=partners",
  },
] as const;

const onboarding = [
  { title: "沟通对齐", desc: "明确目标、授权范围、材料工艺与交付标准。", icon: ChatLineRound },
  { title: "样例试做", desc: "选 1–2 个小体量 SKU，跑通一次“生成→可制造→履约”。", icon: Tickets },
  { title: "标准固化", desc: "沉淀提示词/结构/工艺模板，确定验收与协作流程。", icon: Medal },
  { title: "规模化上新", desc: "按系列与节奏推进，形成稳定的内容与履约运营。", icon: ArrowRight },
] as const;
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
            <h1>合作伙伴｜文化 IP 与制造履约生态协作</h1>
            <p class="subtitle">
              我们将合作流程拆解为可执行模块：授权对齐、共创设计、试打验证、批量履约与复盘优化，帮助合作方以更低沟通成本实现稳定上新。
            </p>
            <div class="cta">
              <el-button type="primary" @click="router.push('/contact?type=partners')">对接合作</el-button>
              <el-button plain @click="router.push('/trust')">了解信任与合规</el-button>
              <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
            </div>
          </div>

          <div class="right">
            <div class="onboarding glass-surface">
              <div class="on-title">合作落地路径（建议）</div>
              <div class="on-grid">
                <div class="on-item" v-for="(i, idx) in onboarding" :key="i.title">
                  <div class="idx">{{ idx + 1 }}</div>
                  <el-icon :size="16">
                    <component :is="i.icon" />
                  </el-icon>
                  <div class="meta">
                    <div class="t">{{ i.title }}</div>
                    <div class="d">{{ i.desc }}</div>
                  </div>
                </div>
              </div>
              <div class="on-cta">
                <el-button plain @click="router.push('/contact?type=partners')">发起合作沟通</el-button>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>按角色分流：不同伙伴，不同任务</h2>
          <div class="grid">
            <article class="track glass-surface" v-for="t in partnerTracks" :key="t.title">
              <div class="head">
                <span class="icon">
                  <el-icon :size="18"><component :is="t.icon" /></el-icon>
                </span>
                <div class="meta">
                  <div class="title">{{ t.title }}</div>
                  <div class="desc">{{ t.desc }}</div>
                </div>
              </div>
              <div class="cols">
                <div class="col">
                  <div class="label">你将获得</div>
                  <ul>
                    <li v-for="i in t.whatYouGet" :key="i">{{ i }}</li>
                  </ul>
                </div>
                <div class="col">
                  <div class="label">我们需要</div>
                  <ul>
                    <li v-for="i in t.whatWeNeed" :key="i">{{ i }}</li>
                  </ul>
                </div>
              </div>
              <div class="actions">
                <el-button type="primary" plain @click="router.push(t.cta)">立即对接</el-button>
              </div>
            </article>
          </div>
        </section>

        <section class="section bottom glass-card">
          <h2>你可以从一个“小样”开始</h2>
          <p class="muted">
            最快的合作方式：选一个小体量 SKU（如冰箱贴/摆件/纪念章），跑通一次完整闭环。确认质量与节奏后，再扩展到系列化上新与规模化履约。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/contact?type=partners')">发起合作沟通</el-button>
            <el-button plain @click="router.push('/workflow')">查看工作流</el-button>
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
  grid-template-columns: 1.2fr 1fr;
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
}

.onboarding {
  border-radius: 16px;
  padding: 14px;
}

.on-title {
  font-weight: 900;
  margin-bottom: 10px;
}

.on-grid {
  display: grid;
  gap: 10px;
}

.on-item {
  display: grid;
  grid-template-columns: 28px 20px 1fr;
  gap: 10px;
  align-items: start;
  padding: 10px;
  border-radius: 14px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.idx {
  width: 28px;
  height: 28px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 900;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
}

.meta {
  .t {
    font-weight: 900;
    margin-bottom: 4px;
  }

  .d {
    color: var(--font-color2);
    font-size: 12px;
    line-height: 1.55;
  }
}

.on-cta {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;

  h2 {
    margin: 12px 0;
  }
}

.grid {
  display: grid;
  gap: 12px;
}

.track {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 12px;
}

.head {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 10px;
}

.icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
}

.title {
  font-weight: 900;
  margin-bottom: 6px;
}

.desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.label {
  font-size: 12px;
  color: var(--font-color4);
  font-weight: 800;
  margin-bottom: 6px;
}

ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
  display: grid;
  gap: 6px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.bottom {
  padding: 18px;
}

.muted {
  margin: 0 0 12px;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
