<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import Hotting from "./components/activity/hotting.vue";
import PastEvents from "./components/activity/pastEvents.vue";

const activeName = ref<string>("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane label="火热进行中" name="first">
      <Hotting />
    </el-tab-pane>
    <el-tab-pane label="往期活动" name="second">
      <PastEvents />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
@import "@/styles/home/activity";
</style>
