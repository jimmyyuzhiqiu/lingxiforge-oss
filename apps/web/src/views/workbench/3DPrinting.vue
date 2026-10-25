<script setup lang="ts">
import { useThemeRgba } from "@/utils/setThemeBg.ts";
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import RouteLoading from "@/components/RouteLoading.vue";

const Aside = defineAsyncComponent(() => import("./components/3DPrinting/aside.vue"));
const Preview = defineAsyncComponent(() => import("./components/3DPrinting/preview.vue"));
const Setting = defineAsyncComponent(
  () => import("./components/3DPrinting/setting.vue")
);

const viewportHeight = window.innerHeight;
const { rgba } = useThemeRgba();

//position
const isAsideSmallScreen = ref<boolean>(false);
const asideLeftPosition = ref<string>("0px");

const isSettingSmallScreen = ref<boolean>(false);
const settingRightPosition = ref<string>("0px");
const showPreviewPanel = ref<boolean>(false);
let showPreviewTimer: number | null = null;
let showPreviewIdleHandle: number | null = null;

const toggleAside = (change: boolean) => {
  isAsideSmallScreen.value = change;
  if (isAsideSmallScreen.value) {
    asideLeftPosition.value = "-462px";
  } else {
    asideLeftPosition.value = "0px";
  }
};

const toggleSetting = (change: boolean) => {
  isSettingSmallScreen.value = change;
  if (isSettingSmallScreen.value) {
    settingRightPosition.value = "-362px";
  } else {
    settingRightPosition.value = "0px";
  }
};

const mountPreviewPanel = () => {
  showPreviewPanel.value = true;
};

onMounted(() => {
  const idleCallback = (window as Window & {
    requestIdleCallback?: (
      callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
      options?: { timeout?: number }
    ) => number;
  }).requestIdleCallback;

  if (typeof idleCallback === "function") {
    showPreviewIdleHandle = idleCallback(() => mountPreviewPanel(), {
      timeout: 420,
    });
    return;
  }

  showPreviewTimer = window.setTimeout(mountPreviewPanel, 140);
});

onUnmounted(() => {
  const cancelIdleCallback = (window as Window & {
    cancelIdleCallback?: (handle: number) => void;
  }).cancelIdleCallback;

  if (showPreviewIdleHandle !== null && typeof cancelIdleCallback === "function") {
    cancelIdleCallback(showPreviewIdleHandle);
    showPreviewIdleHandle = null;
  }

  if (showPreviewTimer !== null) {
    window.clearTimeout(showPreviewTimer);
    showPreviewTimer = null;
  }
});
</script>

<template>
  <div class="ThreePrinting-container" :style="{ '--rgba': rgba, '--height': `${viewportHeight - 60}px` }">
    <section class="aside-container" :style="{ left: `${asideLeftPosition}`, transition: 'left 0.4s' }">
      <Suspense timeout="0">
        <Aside :isAsideSmallScreen="isAsideSmallScreen" @toggle-aside="toggleAside" />
        <template #fallback>
          <RouteLoading :cards="2" compact />
        </template>
      </Suspense>
    </section>
    <section class="preview-container">
      <Suspense v-if="showPreviewPanel" timeout="0">
        <Preview />
        <template #fallback>
          <RouteLoading :cards="2" compact />
        </template>
      </Suspense>
      <RouteLoading v-else :cards="2" compact />
    </section>
    <section class="setting-container" :style="{ right: `${settingRightPosition}`, transition: 'right 0.4s' }">
      <Suspense timeout="0">
        <Setting :isSettingSmallScreen="isSettingSmallScreen" @toggle-setting="toggleSetting" />
        <template #fallback>
          <RouteLoading :cards="2" compact />
        </template>
      </Suspense>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/workbench/3DPrinting.scss";
</style>
