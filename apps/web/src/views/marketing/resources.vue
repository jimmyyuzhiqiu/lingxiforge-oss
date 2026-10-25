<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { newsroomUpdates, resourceItems } from "@/data/marketingContent";
import { useRouter } from "vue-router";
import { Calendar, Download, Reading, Bell, ArrowRight } from "@element-plus/icons-vue";

const router = useRouter();

const downloads = [
  {
    title: "提示词模板（文创）",
    desc: "覆盖“器型 + 纹样 + 材质 + 工艺 + 交付约束”的模板结构，适合团队协作与版本沉淀。",
    hint: "适用：馆校共创、品牌联名、系列化上新",
    file: "/resources/lingxiforge-cultural-prompt-template.md",
    format: "Markdown",
    updatedAt: "2026-02-13",
  },
  {
    title: "打印就绪速查表",
    desc: "按材料路线整理壁厚、支撑、拆件、公差与后处理关注点，支持打印前自检。",
    hint: "适用：打样评审、工坊对接、质量复盘",
    file: "/resources/lingxiforge-print-ready-checklist.txt",
    format: "TXT",
    updatedAt: "2026-02-13",
  },
  {
    title: "IP 合规清单",
    desc: "授权范围、素材来源、版本留档、投诉受理与下架处理的一体化清单。",
    hint: "适用：法务对齐、合作签约、上线前复核",
    file: "/resources/lingxiforge-ip-compliance-checklist.txt",
    format: "TXT",
    updatedAt: "2026-02-13",
  },
] as const;

const contentModules = [
  {
    title: "教程与工作流",
    desc: "从提示词到可制造交付的标准化流程，减少试错。",
    tag: "Guide",
    cta: "查看工作流",
    to: "/workflow",
  },
  {
    title: "案例与行业方案",
    desc: "场景化案例与方案路径，帮助对外讲述与内部评审。",
    tag: "Cases",
    cta: "查看方案展示",
    to: "/showcase",
  },
  {
    title: "3D 展品库",
    desc: "GLB（glTF）在线预览、交互浏览与对外讲述模板。",
    tag: "3D",
    cta: "进入展品库",
    to: "/gallery",
  },
  {
    title: "质量标准与材料",
    desc: "壁厚/支撑/公差与材料路线，确保打印可交付。",
    tag: "Quality",
    cta: "材料与质量",
    to: "/materials",
  },
  {
    title: "IP 合规与授权",
    desc: "授权范围、溯源留档与投诉流程，降低合规风险。",
    tag: "Compliance",
    cta: "IP 合规",
    to: "/ip",
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
            <h1>资源中心｜模板、指南、案例拆解与更新</h1>
            <p class="subtitle">
              这里沉淀提示词模板、可制造速查、IP 合规流程与案例拆解，帮助团队以统一方法协作，持续提高上新效率与交付稳定性。
            </p>
            <div class="cta">
              <el-button type="primary" plain @click="router.push('/contact?type=support')">获取使用建议</el-button>
              <el-button plain @click="router.push('/faqs')">查看 FAQ</el-button>
              <el-button plain @click="router.push('/trust')">信任与安全</el-button>
            </div>
          </div>

          <div class="right">
            <div class="subscribe glass-surface">
              <div class="k">
                <el-icon><Bell /></el-icon>
                <span>更新提醒</span>
              </div>
              <p class="muted">如果你希望收到产品更新与案例发布，可通过邮件订阅（无需登录）。</p>
              <div class="actions">
                <a class="link" href="mailto:subscribe@lingxiforge.com?subject=Lingxi%20Forge%20%E6%9B%B4%E6%96%B0%E8%AE%A2%E9%98%85&body=%E8%AF%B7%E5%B0%86%E6%88%91%E5%8A%A0%E5%85%A5%20Lingxi%20Forge%20%E6%9B%B4%E6%96%B0%E9%82%AE%E4%BB%B6%E5%88%97%E8%A1%A8%E3%80%82">
                  发送订阅邮件
                  <el-icon><ArrowRight /></el-icon>
                </a>
              </div>
              <div class="note">提示：当前订阅邮箱为 `subscribe@lingxiforge.com`。</div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>精选资源</h2>
          <div class="grid">
            <article class="card glass-surface" v-for="item in resourceItems" :key="item.title">
              <div class="tag">{{ item.tag }}</div>
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
            </article>
          </div>
        </section>

        <section class="section">
          <h2>下载资源</h2>
          <p class="muted">
            以下资源可直接下载并用于团队协作。建议与“工作流/材料与质量/IP 合规”页面配套使用，统一评审与交付口径。
          </p>
          <div class="downloads">
            <article class="dl glass-surface" v-for="d in downloads" :key="d.title">
              <div class="head">
                <el-icon><Download /></el-icon>
                <span class="t">{{ d.title }}</span>
              </div>
              <div class="desc">{{ d.desc }}</div>
              <div class="hint">{{ d.hint }}</div>
              <div class="meta">格式：{{ d.format }} · 更新：{{ d.updatedAt }}</div>
              <div class="actions">
                <a class="download-link" :href="d.file" download>下载 {{ d.format }}</a>
                <el-button plain @click="router.push('/contact?type=support')">申请获取</el-button>
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>最新动态</h2>
            <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
          </div>
          <div class="news">
            <article class="item glass-surface" v-for="n in newsroomUpdates" :key="n.date">
              <div class="date">
                <el-icon><Calendar /></el-icon>
                <span>{{ n.date }}</span>
              </div>
              <div class="title">{{ n.title }}</div>
              <div class="desc">{{ n.desc }}</div>
            </article>
          </div>
        </section>

        <section class="section bottom glass-card">
          <div class="k">
            <el-icon><Reading /></el-icon>
            <span>专业内容体系（持续更新）</span>
          </div>
          <p class="muted">教程、案例、质量标准与合规流程已沉淀为可复用模块，持续维护更新。</p>
          <div class="module-grid">
            <article class="module glass-surface" v-for="m in contentModules" :key="m.title">
              <div class="tag">{{ m.tag }}</div>
              <div class="title">{{ m.title }}</div>
              <div class="desc">{{ m.desc }}</div>
              <div class="actions">
                <el-button plain @click="router.push(m.to)">{{ m.cta }}</el-button>
              </div>
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

.subscribe {
  border-radius: 16px;
  padding: 14px;
}

.k {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 8px;
}

.muted {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.actions {
  margin-top: 10px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
}

.note {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
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

.card {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.tag {
  width: fit-content;
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 12px;
}

.title {
  font-weight: 900;
}

.desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.downloads {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.module-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.module {
  border-radius: 16px;
  padding: 14px;
  display: grid;
  gap: 8px;
}

.module .actions {
  margin-top: 4px;
}

@media (max-width: 1100px) {
  .module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .grid,
  .downloads,
  .module-grid {
    grid-template-columns: 1fr;
  }
}

.dl {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.dl .head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
}

.dl .hint {
  color: var(--font-color4);
  font-size: 12px;
}

.dl .meta {
  color: var(--font-color4);
  font-size: 12px;
}

.dl .actions {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.download-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
  background: var(--accent-soft-bg);
  font-size: 13px;
  transition: all 0.2s ease;
}

.download-link:hover {
  border-color: var(--accent);
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.news {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.news .item {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.news .date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--font-color4);
  font-size: 12px;
}

.bottom {
  padding: 18px;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .downloads {
    grid-template-columns: 1fr;
  }

  .news {
    grid-template-columns: 1fr;
  }
}
</style>
