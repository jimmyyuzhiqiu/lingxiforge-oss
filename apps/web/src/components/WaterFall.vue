<script lang="ts" setup>
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { onMounted, ref } from "vue";
import type { breakPointsConfig } from '@/types/components'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createBatchAnimation } from "@/utils/createAnimation.ts";

gsap.registerPlugin(ScrollTrigger);



const breakpoints = ref<breakPointsConfig>({
  1800: { rowPerView: 6 },
  1600: { rowPerView: 5 },
  1400: { rowPerView: 4 },
  1200: { rowPerView: 3 },
  800: { rowPerView: 2 },
  500: { rowPerView: 1 },
});

const toDetails = (): void => {
  window.open("/about#project-details");
};

onMounted(() => {
  createBatchAnimation(".waterfall-container", 0, 40, -30);
});

const props = defineProps(["align", "list"]);
</script>
<template>
  <Waterfall class="waterfall-container" :list="props.list" :width="250" :gutter="20" :align="props.align"
    :animationDuration="0" :breakpoints="breakpoints">
    <template #item="{ item }">
      <div class="card">
        <LazyImg :url="item.cover" style="cursor: pointer" @click="toDetails" />
        <slot name="layoutPart" :item="item" :$avatar="item.avatar" :$username="item.username"
          :$shelfDate="item.shelfDate"></slot>
        <slot name="ideasPart" :item="item" :$avatar="item.avatar" :$username="item.username"
          :$shelfDate="item.shelfDate" :$views="item.views" :$favorites="item.favorites"></slot>
      </div>
    </template>
  </Waterfall>
</template>

<style lang="scss" scoped>
.waterfall-container {
  background: var(--background);

  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
