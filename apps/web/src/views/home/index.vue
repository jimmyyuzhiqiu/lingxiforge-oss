<script setup lang="ts">
import Header from "@/components/header.vue";
import Aside from "@/components/aside.vue";
import RouteLoading from "@/components/RouteLoading.vue";
</script>

<template>
  <div class="common-layout home-scene" data-forge-motion-root>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside>
          <Aside />
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <Suspense timeout="0">
              <component :is="Component" :key="route.fullPath" />
              <template #fallback>
                <RouteLoading :cards="4" compact />
              </template>
            </Suspense>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
@import url("../../styles/home/index.scss");
</style>
