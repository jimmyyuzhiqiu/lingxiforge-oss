<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import { useThemeRgba } from "@/utils/setThemeBg.ts";
import RouteLoading from "@/components/RouteLoading.vue";

const Aside = defineAsyncComponent(() => import("./components/textTo3D/aside.vue"));
const Preview = defineAsyncComponent(() => import("./components/textTo3D/preview.vue"));
const ThreeShow = defineAsyncComponent(
  () => import("./components/textTo3D/3DShow.vue")
);

const viewportHeight = window.innerHeight;

const isAsideSmallScreen = ref<boolean>(false);
const isPreviewSmallScreen = ref<boolean>(false);
const asideLeftPosition = ref<string>("0px");
const previewLeftPosition = ref<string>("301px");
const showThreeShow = ref<boolean>(false);
let showThreeShowTimer: number | null = null;
let showThreeShowIdleHandle: number | null = null;

const { rgba } = useThemeRgba();

const toggleAside = (change: boolean) => {
  isAsideSmallScreen.value = change;
  if (isAsideSmallScreen.value) {
    asideLeftPosition.value = "-262px";
  } else {
    asideLeftPosition.value = "0px";
  }
};

const togglePreview = (change: boolean) => {
  isPreviewSmallScreen.value = change;
  if (isPreviewSmallScreen.value) {
    previewLeftPosition.value = "-111px";
  } else {
    previewLeftPosition.value = "301px";
  }
};

const mountThreeShow = () => {
  showThreeShow.value = true;
};

onMounted(() => {
  const idleCallback = (window as Window & {
    requestIdleCallback?: (
      callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
      options?: { timeout?: number }
    ) => number;
  }).requestIdleCallback;

  if (typeof idleCallback === "function") {
    showThreeShowIdleHandle = idleCallback(() => mountThreeShow(), { timeout: 480 });
    return;
  }

  showThreeShowTimer = window.setTimeout(mountThreeShow, 160);
});

onUnmounted(() => {
  const cancelIdleCallback = (window as Window & {
    cancelIdleCallback?: (handle: number) => void;
  }).cancelIdleCallback;

  if (showThreeShowIdleHandle !== null && typeof cancelIdleCallback === "function") {
    cancelIdleCallback(showThreeShowIdleHandle);
    showThreeShowIdleHandle = null;
  }

  if (showThreeShowTimer !== null) {
    window.clearTimeout(showThreeShowTimer);
    showThreeShowTimer = null;
  }
});
</script>

<template>
  <div class="text23D-container" :style="{ '--rgba': rgba, '--height': `${viewportHeight - 60}px` }">
    <div class="first-part" :style="{ left: `${asideLeftPosition}`, transition: 'left 0.4s' }">
      <section class="aside-container">
        <Suspense timeout="0">
          <Aside :isSmallScreen="isAsideSmallScreen" @toggle-aside="toggleAside" />
          <template #fallback>
            <RouteLoading :cards="2" compact />
          </template>
        </Suspense>
      </section>
      <section class="preview-container" :style="{ left: `${previewLeftPosition}`, transition: 'left 0.5s' }">
        <Suspense timeout="0">
          <Preview :isSmallSecondScreen="isPreviewSmallScreen" @handle-preview="togglePreview" />
          <template #fallback>
            <RouteLoading :cards="2" compact />
          </template>
        </Suspense>
      </section>
    </div>
    <section class="threeShow-container">
      <Suspense v-if="showThreeShow" timeout="0">
        <ThreeShow />
        <template #fallback>
          <RouteLoading :cards="2" compact />
        </template>
      </Suspense>
      <RouteLoading v-else :cards="2" compact />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/textTo3D";
</style>
