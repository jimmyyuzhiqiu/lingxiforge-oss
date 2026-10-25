<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight, Collection, School, Shop, OfficeBuilding, Opportunity, Cpu, Monitor, Box, DataAnalysis } from "@element-plus/icons-vue";

const router = useRouter();

const sceneList = ref([
  { id: 0, title: "博物馆/馆店", icon: OfficeBuilding },
  { id: 1, title: "文创品牌", icon: Shop },
  { id: 2, title: "高校实验室", icon: School },
  { id: 3, title: "设计工作室", icon: Collection },
  { id: 4, title: "打印工坊", icon: Box },
  { id: 5, title: "内容创作者", icon: Monitor },
  { id: 6, title: "工业设计", icon: Cpu },
  { id: 7, title: "渠道合作", icon: DataAnalysis },
  { id: 8, title: "非遗工艺", icon: Opportunity },
]);
</script>

<template>
  <div class="container">
    <header>
      <p>面向博物馆文创、品牌方与教育场景的 AI + 3D 工具</p>
      <h1>从灵感到交付：被多行业团队持续使用与验证</h1>
    </header>
    <div class="brand-container">
      <ul>
        <li v-for="i in sceneList" :key="i.id" class="scene">
          <div class="scene-badge">
            <el-icon :size="18">
              <component :is="i.icon" />
            </el-icon>
            <span>{{ i.title }}</span>
          </div>
        </li>
      </ul>
      <footer>
        <p style="cursor: pointer" @click="router.push('/partners')">了解更多</p>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/support.scss";
</style>
