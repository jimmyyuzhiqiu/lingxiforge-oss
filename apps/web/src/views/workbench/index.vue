<script setup lang="ts">
import Header from "@/components/header.vue";
import RouteLoading from "@/components/RouteLoading.vue";
</script>

<template>
  <div class="common-layout workbench-scene" data-forge-motion-root>
    <el-container class="workbench-shell">
      <el-header>
        <Header />
      </el-header>
      <el-container class="main">
        <el-main>
          <router-view v-slot="{ Component, route }">
            <Suspense timeout="0">
              <component :is="Component" :key="route.fullPath" />
              <template #fallback>
                <RouteLoading :cards="3" compact />
              </template>
            </Suspense>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/public/index.scss";
</style>
