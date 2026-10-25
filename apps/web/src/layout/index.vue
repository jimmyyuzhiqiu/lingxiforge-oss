<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import Layout from "@/layout/components/layout.vue";
import ProductOverview from "@/layout/components/productOverview.vue";
import Community from "@/layout/components/community.vue";
import Support from "@/layout/components/support.vue";
import Insights from "@/layout/components/insights.vue";
import Strategy from "@/layout/components/strategy.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import TrustPreview from "@/layout/components/trustPreview.vue";
import UpdatesPreview from "@/layout/components/updatesPreview.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main style="overflow-x: hidden">
        <Layout />
        <ProductOverview />
        <Insights />
        <Strategy />
        <TrustPreview />
        <UpdatesPreview />
        <Community />
        <Support />
        <SiteFooter />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-header {
  z-index: 20;
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 0;
}

.el-main {
  padding: 0;
}
</style>
