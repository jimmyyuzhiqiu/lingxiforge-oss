<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { aboutContent, detailsContent } from "@/data/siteContent";
import { materials, printReadyChecklist } from "@/data/marketingContent";
import { useRouter } from "vue-router";
import { Box, Cpu, Lock, MagicStick, Checked, Connection } from "@element-plus/icons-vue";

const router = useRouter();
const goStart = () => router.push("/workbench/Text-To-3D");
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <div class="hero-left">
            <h1>产品能力｜AI 生成设计到可制造交付</h1>
            <p class="subtitle">
              面向博物馆文创、馆校共创与品牌联名：把文化灵感转化为可评审的 GLB、可制造的 STL 与可履约的交付清单，支撑从概念到上新的闭环执行。
            </p>
            <div class="cta">
              <el-button type="primary" @click="goStart">免费开始</el-button>
              <el-button plain @click="router.push('/workflow')">查看工作流</el-button>
              <el-button @click="router.push('/trust')">信任与安全</el-button>
            </div>
            <div class="metrics">
              <div class="metric" v-for="m in detailsContent.metrics" :key="m.label">
                <div class="value">{{ m.value }}</div>
                <div class="label">{{ m.label }}</div>
              </div>
            </div>
          </div>

          <div class="hero-right">
            <div class="stack">
              <div class="stack-item">
                <el-icon :size="18"><MagicStick /></el-icon>
                <div class="t">生成与风格</div>
                <div class="d">提示词模板、多视角与局部增强，让风格稳定可控。</div>
              </div>
              <div class="stack-item">
                <el-icon :size="18"><Cpu /></el-icon>
                <div class="t">可制造优化</div>
                <div class="d">网格质量、壁厚与结构策略，让“看起来像”变成“能打出来”。</div>
              </div>
              <div class="stack-item">
                <el-icon :size="18"><Box /></el-icon>
                <div class="t">履约交付</div>
                <div class="d">材料、工艺与交付路径清晰，对接工坊实现闭环。</div>
              </div>
              <div class="stack-item">
                <el-icon :size="18"><Lock /></el-icon>
                <div class="t">合规与溯源</div>
                <div class="d">面向文化 IP 场景的授权与留档思路，降低合作风险。</div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>平台能力模块</h2>
          <div class="grid">
            <article class="card glass-surface" v-for="item in aboutContent.whatWeDo" :key="item.title">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-desc">{{ item.desc }}</div>
            </article>
          </div>
        </section>

        <section class="section">
          <h2>核心工作流（从生成到交付）</h2>
          <div class="pipeline glass-card">
            <ol>
              <li v-for="(step, idx) in detailsContent.techPipeline" :key="step">
                <span class="idx">{{ idx + 1 }}</span>
                <span class="text">{{ step }}</span>
              </li>
            </ol>
            <div class="pipeline-cta">
              <el-button plain @click="router.push('/workflow')">查看完整工作流与交付建议</el-button>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>打印就绪（Print-ready）</h2>
            <div class="sec-actions">
              <el-button plain @click="router.push('/materials')">查看材料与质量标准</el-button>
            </div>
          </div>
          <div class="ready-grid">
            <div class="ready card glass-surface">
              <div class="ready-title">
                <el-icon><Checked /></el-icon>
                <span>质量检查清单</span>
              </div>
              <ul class="list">
                <li v-for="item in printReadyChecklist" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="ready card glass-surface">
              <div class="ready-title">
                <el-icon><Connection /></el-icon>
                <span>材料路径建议</span>
              </div>
              <p class="muted">
                不同材料对壁厚、细节与支撑的要求不同。我们把材料/工艺作为“可信交付”的一部分，帮助你在早期就选对路径，减少返工。
              </p>
              <div class="tags">
                <span class="tag" v-for="m in materials.slice(0, 3)" :key="m.name">{{ m.name }}</span>
              </div>
              <div class="actions">
                <el-button type="primary" plain @click="router.push('/materials')">进入材料与质量</el-button>
              </div>
            </div>
          </div>
        </section>

        <section class="section cta-bottom glass-card">
          <h2>让你的文创方案，今天就能开始落地</h2>
          <p class="muted">从公开站了解方案，到登录控制台完成生成与资产管理，再到履约交付。</p>
          <div class="cta">
            <el-button type="primary" @click="goStart">进入工作台</el-button>
            <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
            <el-button plain @click="router.push('/contact?type=sales')">咨询落地</el-button>
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
  grid-template-columns: 1.3fr 1fr;
  gap: 16px;
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

.metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  .metric {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    padding: 10px;
  }

  .value {
    font-weight: 900;
    font-size: 18px;
  }

  .label {
    color: var(--font-color4);
    font-size: 12px;
    margin-top: 2px;
  }
}

.stack {
  display: grid;
  gap: 10px;
}

.stack-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 12px;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 8px 10px;

  .t {
    font-weight: 800;
    font-size: 13px;
  }

  .d {
    grid-column: 2 / 3;
    color: var(--font-color2);
    font-size: 12px;
    line-height: 1.55;
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.card {
  border-radius: 16px;
  padding: 14px;
}

.card-title {
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 8px;
}

.card-desc {
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.55;
}

.pipeline {
  padding: 16px;

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
  }

  li {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 10px;
    align-items: start;
    padding: 10px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
  }

  .idx {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: var(--accent-soft-bg);
    color: var(--font-color1);
    font-weight: 800;
  }

  .text {
    color: var(--font-color2);
    line-height: 1.6;
  }

  .pipeline-cta {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.ready-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.ready-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  margin-bottom: 8px;
}

.list {
  list-style: disc;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.6;
  margin: 0;
}

.muted {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 0;
}

.tags {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  padding: 5px 10px;
  border-radius: 999px;
}

.actions {
  margin-top: 12px;
}

.cta-bottom {
  padding: 18px;

  h2 {
    margin: 0 0 8px;
  }

  .muted {
    margin: 0 0 12px;
  }
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .ready-grid {
    grid-template-columns: 1fr;
  }
}
</style>
