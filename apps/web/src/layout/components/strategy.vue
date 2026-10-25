<script setup lang="ts">
import { detailsContent } from "@/data/siteContent";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <section class="strategy" id="strategy">
    <header class="head">
      <div class="left">
        <h2>从“可看”到“可生产”的关键环节</h2>
        <p>把方案讲清楚、把模型做出来、把交付跑通：我们把这些内容都做成可复用的工作流与模板。</p>
      </div>
      <div class="right">
        <el-button plain @click="router.push('/showcase')">查看完整方案展示</el-button>
      </div>
    </header>

    <div class="grid">
      <section class="card">
        <div class="title">市场与机会</div>
        <ul class="list">
          <li v-for="item in detailsContent.marketNotes" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="card">
        <div class="title">商业模式</div>
        <div class="plans">
          <div class="plan" v-for="plan in detailsContent.businessModel" :key="plan.plan">
            <div class="plan-title">{{ plan.plan }}</div>
            <div class="plan-price">{{ plan.price }}</div>
            <div class="plan-desc">{{ plan.desc }}</div>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" plain @click="router.push('/pricing')">查看订阅方案</el-button>
        </div>
      </section>

      <section class="card">
        <div class="title">路线图</div>
        <div class="roadmap">
          <div class="roadmap-item" v-for="item in detailsContent.roadmap" :key="item.year">
            <div class="year">{{ item.year }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/strategy.scss";
</style>
