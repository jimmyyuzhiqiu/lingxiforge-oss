<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { printAssets } from "@/data/siteContent";

const emit = defineEmits();
const props = defineProps(["isAsideSmallScreen"]);

const router = useRouter();

const handleToggleAside = () => {
  emit("toggle-aside", !props.isAsideSmallScreen);
};

const modelSelectList = [
  {
    value: "Lingxi Forge 1.0 Turbo",
    label: "Lingxi Forge 1.0 Turbo",
  },
  {
    value: "Open 3D",
    label: "Open 3D",
  },
  {
    value: "PointNet++",
    label: "PointNet++",
  },
  {
    value: "NVIDIA GauGAN",
    label: "NVIDIA GauGAN",
  },
  {
    value: "NeRF",
    label: "NeRF",
  },
];

//处理分页器
const currentPage = ref<number>(1);
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};
const pageSize = ref<number>(10);
</script>

<template>
  <div class="aside-container">
    <section>
      <header class="big" ref="headerRef">
        <ul>
          <li class="left" @click="router.push('/home')">
            <i class="iconfont icon-xiangzuojiantou"></i>
          </li>
          <li class="center">
            <i class="iconfont icon-print"></i>
            <span>打印工坊</span>
          </li>
          <li class="right">
            <i :class="props.isAsideSmallScreen
              ? 'iconfont icon-zhankai'
              : 'iconfont icon-zhedie'
              " @click="handleToggleAside"></i>
          </li>
        </ul>
      </header>
    </section>
    <section class="main" v-if="!props.isAsideSmallScreen">
      <header class="main-header">
        <p>我的资产</p>
        <el-select placeholder="筛选" style="width: 80px" popper-class="select-popper" :popper-append-to-body="false">
          <el-option v-for="item in modelSelectList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </header>
      <el-scrollbar max-height="calc(100vh - 160px)" style="margin: 10px 0">
        <ul class="main-list">
          <li v-for="item in printAssets" :key="item.id">
            <img :src="item.cover" :alt="item.title" loading="lazy" decoding="async" />
            <p class="asset-title">{{ item.title }}</p>
            <p class="asset-meta">{{ item.material }} · {{ item.size }} · {{ item.quality }}</p>
          </li>
        </ul>
      </el-scrollbar>
    </section>
    <section class="pagination-container" v-if="!isAsideSmallScreen">
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" layout="prev, pager, next"
          :total="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/3DPrinting/aside";
</style>
