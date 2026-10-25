<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { detailsContent, industryStats } from "@/data/siteContent";
</script>

<template>
  <div class="page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <div class="details-page">
          <section class="hero">
            <div class="hero-text">
              <h1>{{ detailsContent.title }}</h1>
              <p>{{ detailsContent.subtitle }}</p>
              <div class="metrics">
                <div class="metric" v-for="item in detailsContent.metrics" :key="item.label">
                  <span class="value">{{ item.value }}</span>
                  <span class="label">{{ item.label }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>核心技术流程</h2>
            <ul class="pipeline">
              <li v-for="item in detailsContent.techPipeline" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section class="section">
            <h2>市场速览</h2>
            <div class="stats-grid">
              <div class="stats-card" v-for="item in industryStats" :key="item.label">
                <p class="label">{{ item.label }}</p>
                <p class="value">{{ item.value }}</p>
                <p class="note">{{ item.note }}</p>
              </div>
            </div>
            <ul class="market-notes">
              <li v-for="note in detailsContent.marketNotes" :key="note">{{ note }}</li>
            </ul>
          </section>

          <section class="section">
            <h2>商业模式</h2>
            <div class="plans">
              <div class="plan" v-for="plan in detailsContent.businessModel" :key="plan.plan">
                <h3>{{ plan.plan }}</h3>
                <p class="price">{{ plan.price }}</p>
                <p class="desc">{{ plan.desc }}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>财务与增长目标</h2>
            <ul class="financial">
              <li v-for="item in detailsContent.financialHighlights" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section class="section">
            <h2>发展路线</h2>
            <div class="roadmap">
              <div class="roadmap-item" v-for="item in detailsContent.roadmap" :key="item.year">
                <span class="year">{{ item.year }}</span>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>团队与顾问</h2>
            <div class="advisors">
              <p v-for="item in detailsContent.advisors" :key="item">{{ item }}</p>
            </div>
            <ul class="team">
              <li v-for="item in detailsContent.teamHighlights" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>

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

.details-page {
  width: min(1180px, 92%);
  margin: 90px auto 0;
}

.hero {
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

  h1 {
    margin-bottom: 10px;
  }

  p {
    color: var(--font-color2);
    margin-bottom: 16px;
  }
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .metric {
    background: var(--glass-bg);
    border-radius: 12px;
    padding: 12px;
    border: 1px solid var(--glass-border);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(var(--glass-blur)) saturate(160%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

    .value {
      font-size: 20px;
      font-weight: 700;
    }

    .label {
      font-size: 12px;
      color: var(--font-color4);
    }
  }
}

.section {
  margin-bottom: 28px;

  h2 {
    margin-bottom: 12px;
  }
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  li {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    backdrop-filter: blur(var(--glass-blur)) saturate(160%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 12px;

  .stats-card {
    padding: 16px;
    border-radius: 12px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur)) saturate(160%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  }

  .label {
    font-size: 12px;
    color: var(--font-color4);
  }

  .value {
    font-size: 20px;
    font-weight: 700;
    margin: 6px 0;
  }

  .note {
    font-size: 12px;
    color: var(--font-color4);
  }
}

.market-notes {
  list-style: disc;
  padding-left: 20px;
  color: var(--font-color2);
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  .plan {
    padding: 16px;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(160%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  }

  .price {
    font-weight: 600;
    margin: 6px 0;
  }

  .desc {
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.4;
  }
}

.financial {
  list-style: disc;
  padding-left: 20px;
  color: var(--font-color2);
}

.roadmap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  .roadmap-item {
    padding: 14px;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(160%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);

    .year {
      font-weight: 700;
      color: var(--font-color3);
    }
  }
}

.advisors {
  display: grid;
  gap: 6px;
  margin-bottom: 10px;
  color: var(--font-color2);
}

.team {
  list-style: disc;
  padding-left: 20px;
  color: var(--font-color2);
}
</style>
