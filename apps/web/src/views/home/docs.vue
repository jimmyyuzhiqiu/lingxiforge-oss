<script setup lang="ts">
import { docsContent } from "@/data/siteContent";
import { useRouter } from "vue-router";

const router = useRouter();

const paramGuide = [
  {
    name: "生成精度",
    recommend: "中精度",
    note: "概念验证用基础；需要量产结构与细节时选中/高精度。",
  },
  {
    name: "结构与壁厚",
    recommend: "壁厚 ≥ 1.2mm（小件）",
    note: "薄壁易断裂；支撑与悬垂要结合材质与姿态评估。",
  },
  {
    name: "输出格式",
    recommend: "GLB（展示）+ STL（打印）",
    note: "展示优先 GLB；打印工坊建议使用 STL 并做网格修复。",
  },
  {
    name: "打印材质",
    recommend: "树脂（细节）/ PLA（成本）",
    note: "小体量高细节选树脂；批量与成本优先可选 PLA/PETG。",
  },
];
</script>

<template>
  <div class="docs-page">
    <section class="hero">
      <div class="left">
        <h2>使用文档</h2>
        <p class="subtitle">从灵感输入到可打印交付，快速掌握 Lingxi Forge 的完整工作流。</p>
        <div class="actions">
          <el-button type="primary" @click="router.push('/workbench/Text-To-3D')">开始三维生成</el-button>
          <el-button @click="router.push('/workbench/Text-To-Img')">先做概念图</el-button>
          <el-button plain @click="router.push('/faqs')">查看 FAQ</el-button>
        </div>
      </div>
      <div class="right">
        <div class="kpi">
          <div class="value">4</div>
          <div class="label">关键环节</div>
        </div>
        <div class="kpi">
          <div class="value">1</div>
          <div class="label">条主流程</div>
        </div>
        <div class="kpi">
          <div class="value">∞</div>
          <div class="label">可迭代次数</div>
        </div>
      </div>
    </section>

    <section class="grid">
      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">快速开始</div>
        </template>
        <el-steps direction="vertical" :active="docsContent.quickStart.length">
          <el-step v-for="(s, idx) in docsContent.quickStart" :key="idx" :title="`步骤 ${idx + 1}`" :description="s" />
        </el-steps>
      </el-card>

      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">工作流（从输入到打印）</div>
        </template>
        <div class="workflow">
          <div class="wf" v-for="item in docsContent.workflow" :key="item.title">
            <div class="wf-title">{{ item.title }}</div>
            <div class="wf-desc">{{ item.desc }}</div>
          </div>
        </div>
      </el-card>
    </section>

    <section class="grid2">
      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">实用技巧</div>
        </template>
        <ul class="tips">
          <li v-for="(tip, idx) in docsContent.tips" :key="idx">{{ tip }}</li>
        </ul>
      </el-card>

      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">常用参数建议</div>
        </template>
        <el-table :data="paramGuide" size="small" stripe>
          <el-table-column prop="name" label="项目" width="120" />
          <el-table-column prop="recommend" label="建议" width="180" />
          <el-table-column prop="note" label="说明" />
        </el-table>
      </el-card>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/home/docs.scss";
</style>
