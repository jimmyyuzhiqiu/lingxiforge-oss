<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { materials, printReadyChecklist } from "@/data/marketingContent";
import { useRouter } from "vue-router";
import { Checked, Brush, TakeawayBox, Guide } from "@element-plus/icons-vue";

const router = useRouter();

const finishes = [
  {
    title: "上色与涂装",
    desc: "适合纹样与层次表达：底漆/分色/旧化/金属漆等，让“文物语境”更可信。",
  },
  {
    title: "电镀与金属化",
    desc: "用于高端纪念与收藏路线：提升质感与重量感（需根据结构与材料选择工艺）。",
  },
  {
    title: "打磨与抛光",
    desc: "用于提升表面精致度：建议与“拆件策略”配合，减少可见分模线与支撑痕。",
  },
  {
    title: "透明/半透明效果",
    desc: "适合灯罩、摆件与器型：注意厚薄变化与光学纹理，避免应力开裂。",
  },
] as const;

const qaFlow = [
  { title: "文件审查", desc: "检查闭合、单位、壁厚与关键细节；确认输出版本与用途（GLB/STL）。" },
  { title: "试打样", desc: "选择最能暴露风险的关键部位验证：细节/强度/装配/后处理。" },
  { title: "缺陷归因", desc: "区分“生成问题/结构问题/工艺问题”，把修正建议写回模板。" },
  { title: "验收标准", desc: "尺寸/装配/表面/颜色/包装与运输的可量化标准，形成履约包。" },
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
          <h1>材料与质量｜Print-ready 交付标准</h1>
          <p class="subtitle">
            在数字制造场景中，“可制造”就是交付确定性。我们将材料路线、工艺约束与质量检查前置，帮助团队降低试打失败率与返工成本。
          </p>
          <div class="cta">
            <el-button type="primary" plain @click="router.push('/contact?type=support')">咨询打印与质量</el-button>
            <el-button plain @click="router.push('/workflow')">回到工作流</el-button>
            <el-button @click="router.push('/trust')">了解信任与安全</el-button>
          </div>
        </section>

        <section class="section">
          <h2>材料路线（推荐）</h2>
          <div class="grid">
            <article class="mat glass-surface" v-for="m in materials" :key="m.name">
              <div class="head">
                <div class="name">{{ m.name }}</div>
                <div class="tag">{{ m.tagline }}</div>
              </div>
              <div class="block">
                <div class="label">适用</div>
                <div class="text">{{ m.bestFor }}</div>
              </div>
              <div class="block">
                <div class="label">优势</div>
                <ul>
                  <li v-for="i in m.highlights" :key="i">{{ i }}</li>
                </ul>
              </div>
              <div class="block">
                <div class="label">注意</div>
                <ul>
                  <li v-for="i in m.cautions" :key="i">{{ i }}</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>打印就绪清单（Print-ready checklist）</h2>
            <el-button plain @click="router.push('/product')">查看产品能力</el-button>
          </div>
          <div class="check glass-card">
            <div class="check-title">
              <el-icon><Checked /></el-icon>
              <span>在导出 STL 前，建议完成以下检查</span>
            </div>
            <ul class="list">
              <li v-for="item in printReadyChecklist" :key="item">{{ item }}</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <h2>后处理与表面工艺（Finishing）</h2>
          <div class="finish-grid">
            <article class="finish glass-surface" v-for="f in finishes" :key="f.title">
              <div class="finish-title">
                <el-icon><Brush /></el-icon>
                <span>{{ f.title }}</span>
              </div>
              <p class="finish-desc">{{ f.desc }}</p>
            </article>
          </div>
        </section>

        <section class="section">
          <h2>质量保障流程（QA）</h2>
          <div class="qa">
            <article class="qa-item glass-surface" v-for="(q, idx) in qaFlow" :key="q.title">
              <div class="idx">{{ idx + 1 }}</div>
              <div class="meta">
                <div class="title">{{ q.title }}</div>
                <div class="desc">{{ q.desc }}</div>
              </div>
            </article>
          </div>
        </section>

        <section class="section bottom glass-card">
          <div class="bottom-head">
            <div class="left">
              <div class="k">
                <el-icon><TakeawayBox /></el-icon>
                <span>把交付做成“可复用模板”</span>
              </div>
              <p class="muted">
                最佳实践是：用模板固化提示词、结构与工艺策略，把一次成功经验变成可复用资产。这样才能规模化上新、稳定产出。
              </p>
            </div>
            <div class="right">
              <el-button type="primary" @click="router.push('/resources')">
                <el-icon><Guide /></el-icon>
                去资源中心获取模板
              </el-button>
            </div>
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

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;

  h2 {
    margin: 12px 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.mat {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 12px;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.name {
  font-weight: 900;
}

.tag {
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  white-space: nowrap;
}

.block {
  .label {
    font-size: 12px;
    color: var(--font-color4);
    margin-bottom: 6px;
  }

  .text {
    color: var(--font-color2);
    line-height: 1.6;
    font-size: 13px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.6;
    display: grid;
    gap: 6px;
  }
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.check {
  padding: 16px;
}

.check-title {
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

.finish-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.finish {
  border-radius: 18px;
  padding: 16px;
}

.finish-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 8px;
}

.finish-desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.qa {
  display: grid;
  gap: 10px;
}

.qa-item {
  border-radius: 18px;
  padding: 14px;
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 12px;
  align-items: start;
}

.idx {
  width: 34px;
  height: 34px;
  border-radius: 14px;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  display: grid;
  place-items: center;
  font-weight: 900;
}

.meta {
  .title {
    font-weight: 900;
    margin-bottom: 4px;
  }

  .desc {
    color: var(--font-color2);
    line-height: 1.6;
    font-size: 13px;
  }
}

.bottom {
  padding: 16px;
}

.bottom-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
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
  max-width: 720px;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .finish-grid {
    grid-template-columns: 1fr;
  }
}
</style>
