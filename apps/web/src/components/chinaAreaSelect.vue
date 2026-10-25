<script setup lang="ts">
import { regionData } from "element-china-area-data";
import { ref } from "vue";

const selectedOptions = ref();

const handleSelectedOptions = (e: any) => {
  selectedOptions.value = e;
};
</script>

<template>
  <el-cascader class="cascader-container" size="default" placeholder="请选择地区" :options="regionData" clearable
    v-model="selectedOptions" @change="handleSelectedOptions" style="margin: 10px 0">
  </el-cascader>
</template>

<style scoped lang="scss">
@import "@/styles/components/chinaAreaSelect";
</style>
