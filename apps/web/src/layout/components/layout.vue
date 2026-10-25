<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goStart = () => router.push("/workbench/Text-To-3D");
const goShowcase = () => router.push("/showcase");
</script>

<template>
  <div class="layout-box">
    <ul class="background-box">
      <li class="background-box1"></li>
      <li class="background-box2"></li>
    </ul>
    <header>
      <h1>Lingxi Forge</h1>
    </header>
    <div class="subtitle">
      <h1>
        <span>AI + 3D 文创赋能：</span>
        <span>从灵感到可交付</span>
      </h1>
      <p class="introduce">
        <span>从提示词/参考图出发，</span>
        <span>生成可展示的 GLB 与可打印的 STL，</span>
        <span>并在流程中前置网格修复、壁厚与支撑策略，</span>
        <span>让“好看”真正落地为“能生产、能交付”的文创作品。</span>
      </p>
      <div class="actions">
        <el-button type="primary" @click="goStart">免费开始</el-button>
        <el-button plain @click="goShowcase">查看方案展示</el-button>
      </div>
      <div class="scroll-hint">
        <p>向下滚动</p>
      </div>
    </div>
    <!--  <footer>-->
    <!--    <p>版权所有 © 2024 Lingxi Forge。 保留所有权利。</p>-->
    <!--  </footer>-->
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/layout.scss";
</style>
