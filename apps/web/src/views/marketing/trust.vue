<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { contactChannels, printReadyChecklist } from "@/data/marketingContent";
import { useRouter } from "vue-router";
import { Lock, Key, DocumentChecked, Warning, Checked, Link } from "@element-plus/icons-vue";

const router = useRouter();
const security = contactChannels.find((c) => c.key === "security");

const trustPillars = [
  {
    title: "安全基线",
    icon: Lock,
    desc: "公开站与控制台分层，登录区域采用更严格的会话与权限策略；对外清晰说明安全边界与响应渠道。",
    points: ["控制台与公开站分层", "最小权限与审计思路", "负责披露与应急响应入口"],
  },
  {
    title: "数据与隐私",
    icon: Key,
    desc: "为文化 IP 与用户资产建立清晰的处理边界：使用目的、留存周期、访问控制与可撤回机制。",
    points: ["隐私政策透明", "敏感内容最小化采集", "可撤回与删除请求通道"],
  },
  {
    title: "IP 与合规",
    icon: DocumentChecked,
    desc: "文化内容合作要有“可验证路径”：授权范围、溯源留档、版本管理与下架流程。",
    points: ["授权与使用范围定义", "溯源留档与版本记录", "下架/投诉处理机制"],
  },
  {
    title: "可交付标准",
    icon: Checked,
    desc: "数字制造的信任不只在“像不像”，更在“能不能稳定交付”。我们将 print-ready 标准结构化。",
    points: ["网格质量与闭合", "壁厚/支撑/拆件策略", "验收标准与履约包"],
  },
  {
    title: "负责披露",
    icon: Warning,
    desc: "鼓励安全研究者与合作伙伴通过负责方式报告漏洞，并提供受理确认与修复跟踪机制。",
    points: ["安全邮箱与确认机制", "修复与披露节奏", "可选：漏洞赏金/积分体系"],
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
        <section class="hero glass-card">
          <div class="left">
            <h1>信任与安全｜合规、隐私与交付标准中心</h1>
            <p class="subtitle">
              当网站承载试用、登录、协作与履约流程时，信任就是转化基础。这里公开我们的安全基线、隐私边界、IP 合规与 print-ready 执行口径。
            </p>
            <div class="cta">
              <el-button type="primary" plain @click="router.push('/contact?type=security')">安全反馈</el-button>
              <el-button plain @click="router.push('/privacy')">隐私政策</el-button>
              <el-button plain @click="router.push('/materials')">材料与质量</el-button>
            </div>
            <div class="mail" v-if="security">
              <el-icon><Lock /></el-icon>
              <span>安全与负责披露：{{ security.email }}</span>
            </div>
          </div>

          <div class="right">
            <div class="card glass-surface">
              <div class="k">
                <el-icon><Link /></el-icon>
                <span>快速入口</span>
              </div>
              <ul class="links">
                <li><RouterLink to="/contact?type=security">漏洞/风险报告</RouterLink></li>
                <li><RouterLink to="/contact?type=partners">合作伙伴合规对接</RouterLink></li>
                <li><RouterLink to="/terms">服务条款</RouterLink></li>
                <li><RouterLink to="/cookies">Cookie 政策</RouterLink></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>五个支柱，覆盖主要风险点</h2>
          <div class="grid">
            <article class="pillar glass-surface" v-for="p in trustPillars" :key="p.title">
              <div class="head">
                <span class="icon">
                  <el-icon :size="18"><component :is="p.icon" /></el-icon>
                </span>
                <div class="meta">
                  <div class="title">{{ p.title }}</div>
                  <div class="desc">{{ p.desc }}</div>
                </div>
              </div>
              <ul class="points">
                <li v-for="pt in p.points" :key="pt">{{ pt }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>Print-ready：可交付的最小标准</h2>
            <el-button plain @click="router.push('/workflow')">查看工作流</el-button>
          </div>
          <div class="ready glass-card">
            <div class="ready-title">
              <el-icon><Checked /></el-icon>
              <span>执行清单（交付基线）</span>
            </div>
            <ul class="list">
              <li v-for="item in printReadyChecklist" :key="item">{{ item }}</li>
            </ul>
            <div class="note">
              说明：该清单用于建立团队共识与协作口径；实际阈值会在立项阶段按材料、尺寸与受力场景锁定。
            </div>
          </div>
        </section>

        <section class="section bottom glass-card">
          <h2>把“信任”做成网站的一级内容</h2>
          <p class="muted">
            建议将安全、合规与交付标准作为一级入口，而不是只放在页脚。这样能降低企业客户与合作伙伴的决策成本，提升转化效率。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/product')">了解产品</el-button>
            <el-button plain @click="router.push('/partners')">合作伙伴</el-button>
            <el-button plain @click="router.push('/contact?type=security')">安全反馈</el-button>
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
  grid-template-columns: 1.2fr 0.9fr;
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

.mail {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--font-color2);
  font-size: 13px;
}

.card {
  border-radius: 16px;
  padding: 14px;
}

.k {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 10px;
}

.links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;

  a {
    color: var(--font-color2);
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--font-color3);
  }
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.pillar {
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

.points {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
  display: grid;
  gap: 6px;
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.ready {
  padding: 16px;
}

.ready-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 10px;
}

.list {
  list-style: disc;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
  margin: 0;
  display: grid;
  gap: 6px;
}

.note {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
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

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
