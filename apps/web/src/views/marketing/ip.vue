<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { useRouter } from "vue-router";
import { DocumentChecked, Link, Warning, Stamp, Checked, ArrowRight } from "@element-plus/icons-vue";

const router = useRouter();
const updatedAt = "2026-01-30";

const framework = [
  {
    title: "授权范围可验证",
    desc: "明确可使用的对象（元素/纹样/器型）、用途（展示/销售/宣传）、渠道与地域范围，以及授权期限。",
    icon: Stamp,
  },
  {
    title: "溯源与留档",
    desc: "为每个作品建立来源记录：参考素材、授权文件、版本变更与合作方确认，降低后续争议成本。",
    icon: Link,
  },
  {
    title: "可交付与一致性",
    desc: "将授权要求与可制造标准一起固化为模板：纹样细节、禁用元素、品牌/馆方要求、验收与包装规范。",
    icon: Checked,
  },
  {
    title: "争议处理与下架",
    desc: "提供明确的投诉入口与处理流程：核验→下架/限制→沟通→留档，避免风险扩大。",
    icon: Warning,
  },
] as const;

const takedownSteps = [
  "发送邮件至版权/合规通道，附上：权利证明、侵权链接/截图、联系方式与处理诉求。",
  "我们在 24–72 小时内确认收到并进行初步核验（紧急风险优先）。",
  "必要时先行下架/限制相关内容，随后进入事实核验与沟通流程。",
  "处理结果会形成留档记录，用于后续复盘与流程改进。",
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
            <h1>IP 合规与授权｜文化内容项目执行规范</h1>
            <p class="subtitle">
              最后更新：{{ updatedAt }}。面向博物馆文创与品牌合作，IP 合规不是“附属说明”，而是项目主流程：授权可验证、来源可溯源、版本可留档、风险可处置。
            </p>
            <div class="cta">
              <el-button type="primary" plain @click="router.push('/contact?type=partners')">对接合作伙伴</el-button>
              <el-button plain @click="router.push('/trust')">信任与安全</el-button>
              <el-button plain @click="router.push('/contact?type=security')">合规/风险反馈</el-button>
            </div>
          </div>

          <div class="right">
            <div class="panel glass-surface">
              <div class="k">
                <el-icon><DocumentChecked /></el-icon>
                <span>我们建议的目标</span>
              </div>
              <ul>
                <li>让合作方能快速审核：授权范围、禁用项与可用素材一目了然。</li>
                <li>让团队能规模化上新：流程模板化，避免每次从零沟通。</li>
                <li>让风险可控可追溯：溯源与留档完善，投诉可快速响应。</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>四个要点：把合规做成“可执行模块”</h2>
          <div class="grid">
            <article class="card glass-surface" v-for="i in framework" :key="i.title">
              <div class="head">
                <span class="icon">
                  <el-icon :size="18"><component :is="i.icon" /></el-icon>
                </span>
                <div class="meta">
                  <div class="title">{{ i.title }}</div>
                  <div class="desc">{{ i.desc }}</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>侵权投诉与下架流程（执行版）</h2>
            <el-button plain @click="router.push('/contact?type=security')">进入合规反馈</el-button>
          </div>
          <div class="flow glass-card">
            <ol>
              <li v-for="(s, idx) in takedownSteps" :key="s">
                <span class="idx">{{ idx + 1 }}</span>
                <span class="text">{{ s }}</span>
              </li>
            </ol>
            <div class="note">
              受理时效：建议 24-72 小时内确认收到并给出处理路径。紧急风险将优先临时处置后再完成事实核验。
            </div>
          </div>
        </section>

        <section class="section bottom glass-card">
          <h2>下一步：把授权与交付一起前置</h2>
          <p class="muted">
            合规与制造是同一个闭环：授权范围会影响可用纹样与素材；材料与工艺会影响细节呈现与量产风险。建议在项目立项时同步对齐。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/partners')">
              去合作伙伴页面
              <el-icon style="margin-left: 6px"><ArrowRight /></el-icon>
            </el-button>
            <el-button plain @click="router.push('/materials')">材料与质量</el-button>
            <el-button plain @click="router.push('/workflow')">工作流</el-button>
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

.panel {
  border-radius: 16px;
  padding: 14px;

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.6;
    display: grid;
    gap: 6px;
  }
}

.k {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 8px;
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

.card {
  border-radius: 18px;
  padding: 16px;
}

.head {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 10px;
  align-items: start;
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

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.flow {
  padding: 16px;

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  li {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 10px;
    padding: 10px;
    border-radius: 14px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
  }

  .idx {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: var(--accent-soft-bg);
    font-weight: 900;
  }

  .text {
    color: var(--font-color2);
    line-height: 1.6;
  }

  .note {
    margin-top: 12px;
    color: var(--font-color4);
    font-size: 12px;
    line-height: 1.6;
  }
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
