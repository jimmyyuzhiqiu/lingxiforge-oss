<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { detailsContent } from "@/data/siteContent";
import { useRouter } from "vue-router";
import { Document, Picture, Finished, Box, Van, Setting } from "@element-plus/icons-vue";

const router = useRouter();

const phases = [
  {
    title: "输入与对齐",
    icon: Document,
    desc: "用提示词与参考图把“风格、器型、纹样与材质”对齐，并明确目标人群与价格带。",
    outputs: ["提示词模板", "参考图/灵感板", "目标工艺与材料预选"],
  },
  {
    title: "生成与评审",
    icon: Picture,
    desc: "生成多视角与 3D 结果，用 GLB 做快速评审，确保“好看、像、符合文化语境”。",
    outputs: ["多视角图", "GLB（评审展示）", "版本记录与备注"],
  },
  {
    title: "可制造优化",
    icon: Setting,
    desc: "把可制造约束提前做进流程：网格质量、壁厚、拆件、公差与支撑策略。",
    outputs: ["网格修复建议", "壁厚/支撑策略", "拆件与装配设计建议"],
  },
  {
    title: "打印与验证",
    icon: Box,
    desc: "小批量试打样，验证细节、强度与后处理路径；必要时回到上一步做局部增强。",
    outputs: ["STL（制造）", "试印参数建议", "缺陷清单与修正方向"],
  },
  {
    title: "履约交付",
    icon: Van,
    desc: "确定材料/工艺与交期，形成标准化履约包：文件、参数、验收标准与包装建议。",
    outputs: ["交付包（文件+参数）", "验收标准", "包装/运输注意事项"],
  },
  {
    title: "上新与复用",
    icon: Finished,
    desc: "把成功模板沉淀为组件：提示词、结构与工艺策略可复用，支持规模化上新。",
    outputs: ["模板库沉淀", "组件化结构复用", "数据回流（销量/退货/口碑）"],
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
            <h1>工作流｜从灵感输入到可交付上新的闭环</h1>
            <p class="subtitle">
              生成式 3D 的关键不在“生成一次”，而在“稳定交付多次”。这套工作流将评审、可制造优化、质检与履约串成统一标准，降低返工并提升上新效率。
            </p>
            <div class="cta">
              <el-button type="primary" @click="router.push('/workbench/Text-To-3D')">进入工作台</el-button>
              <el-button plain @click="router.push('/materials')">材料与质量</el-button>
              <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
            </div>
          </div>

          <div class="right">
            <div class="mini glass-surface">
              <div class="mini-title">核心技术流程（概览）</div>
              <ol class="mini-list">
                <li v-for="(item, idx) in detailsContent.techPipeline" :key="item">
                  <span class="idx">{{ idx + 1 }}</span>
                  <span class="text">{{ item }}</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>六个阶段，把“好看”变成“可交付”</h2>
          <div class="grid">
            <article class="phase glass-surface" v-for="p in phases" :key="p.title">
              <div class="head">
                <span class="icon">
                  <el-icon :size="18">
                    <component :is="p.icon" />
                  </el-icon>
                </span>
                <div class="meta">
                  <div class="title">{{ p.title }}</div>
                  <div class="desc">{{ p.desc }}</div>
                </div>
              </div>
              <div class="outputs">
                <div class="label">产出物</div>
                <ul>
                  <li v-for="o in p.outputs" :key="o">{{ o }}</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>你将得到什么（交付视角）</h2>
            <el-button plain @click="router.push('/trust')">查看信任与安全</el-button>
          </div>
          <div class="deliverables">
            <div class="item glass-surface">
              <div class="k">评审与沟通</div>
              <p class="v">用 GLB 统一评审口径，减少“看图想象”的误差；把版本与反馈结构化。</p>
            </div>
            <div class="item glass-surface">
              <div class="k">可制造标准</div>
              <p class="v">把壁厚、公差、支撑与拆件策略做成清单，降低失败率与返工成本。</p>
            </div>
            <div class="item glass-surface">
              <div class="k">履约包</div>
              <p class="v">STL + 工艺建议 + 验收标准 + 包装注意事项，支持工坊/工厂快速对接。</p>
            </div>
            <div class="item glass-surface">
              <div class="k">模板沉淀</div>
              <p class="v">把成功经验沉淀为提示词、结构与工艺模板，支持规模化上新。</p>
            </div>
          </div>
        </section>

        <section class="section bottom-cta glass-card">
          <h2>下一步：从一个“可打印”的爆款原型开始</h2>
          <p class="muted">
            建议先选择一个小体量 SKU：纹样清晰、结构简单、交付快。打通一次闭环后，再扩展到系列化上新。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/workbench/Text-To-Img')">先做文生图</el-button>
            <el-button type="primary" plain @click="router.push('/workbench/Text-To-3D')">直接文生 3D</el-button>
            <el-button plain @click="router.push('/contact?type=sales')">咨询落地方案</el-button>
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

.mini {
  border-radius: 16px;
  padding: 14px;
}

.mini-title {
  font-weight: 800;
  margin-bottom: 10px;
}

.mini-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.mini-list li {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
}

.mini-list .idx {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: var(--accent-soft-bg);
}

.mini-list .text {
  color: var(--font-color2);
  line-height: 1.6;
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

.phase {
  border-radius: 16px;
  padding: 14px;
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
  margin-bottom: 4px;
}

.desc {
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.55;
}

.outputs {
  .label {
    font-weight: 800;
    font-size: 12px;
    color: var(--font-color4);
    margin-bottom: 6px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.55;
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

.deliverables {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.deliverables .item {
  border-radius: 16px;
  padding: 14px;
}

.deliverables .k {
  font-weight: 900;
  margin-bottom: 6px;
}

.deliverables .v {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.bottom-cta {
  padding: 18px;
}

.muted {
  margin: 0 0 12px;
  color: var(--font-color2);
  line-height: 1.6;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .deliverables {
    grid-template-columns: 1fr;
  }
}
</style>
