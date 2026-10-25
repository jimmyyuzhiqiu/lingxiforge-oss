<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouteForgeMotion } from "@/composables/useRouteForgeMotion";

const route = useRoute();
const PublicImmersiveFx = defineAsyncComponent(
  () => import("@/components/marketing/PublicImmersiveFx.vue")
);
const prefersReducedMotion = ref(false);
const immersiveFxBootstrapped = ref(false);
const motionProfile = ref<"full" | "lite" | "reduced">("full");
let reducedMotionMedia: MediaQueryList | null = null;
let reducedMotionHandler: ((event: MediaQueryListEvent) => void) | null = null;
let fallbackTimer: number | null = null;
let idleHandle: number | null = null;
let loadHandler: (() => void) | null = null;
let interactionHandler: (() => void) | null = null;

const detectLowEndProfile = () => {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  const effectiveType = (connection?.effectiveType || "").toLowerCase();
  const saveData = connection?.saveData === true;
  const verySlowNetwork = /(2g|slow-2g)/i.test(effectiveType);
  const lowCpu = (navigator.hardwareConcurrency || 4) <= 4;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;
  return saveData || verySlowNetwork || (lowCpu && lowMemory);
};

const syncMotionProfile = () => {
  if (prefersReducedMotion.value) {
    motionProfile.value = "reduced";
    return;
  }
  motionProfile.value = detectLowEndProfile() ? "lite" : "full";
};

const canRunDeferredEffects = () => {
  return motionProfile.value === "full";
};

const MARKETING_PATHS = new Set([
  "/about",
  "/showcase",
  "/cases",
  "/gallery",
  "/product",
  "/workflow",
  "/materials",
  "/partners",
  "/resources",
  "/newsroom",
  "/trust",
  "/ip",
  "/contact",
  "/apply",
  "/pricing",
  "/faqs",
  "/search",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
]);

type MotionScene = "landing" | "marketing" | "auth" | "home" | "workbench" | "error";

const motionScene = computed<MotionScene>(() => {
  const path = route.path.toLowerCase();
  if (path === "/") return "landing";
  if (path.startsWith("/workbench")) return "workbench";
  if (path.startsWith("/home") || path.startsWith("/usercenter")) return "home";
  if (path === "/login" || path === "/register") return "auth";
  if (path === "/404" || path.startsWith("/404")) return "error";
  if (path.startsWith("/cases/")) return "marketing";
  if (MARKETING_PATHS.has(path)) return "marketing";
  return "error";
});

const syncReducedMotion = () => {
  if (!reducedMotionMedia) return;
  prefersReducedMotion.value = reducedMotionMedia.matches;
  syncMotionProfile();
};

const isImmersiveScene = computed(
  () => motionScene.value === "landing" || motionScene.value === "marketing" || motionScene.value === "auth"
);

const immersiveFxEnabled = computed(
  () =>
    immersiveFxBootstrapped.value &&
    motionProfile.value === "full" &&
    !prefersReducedMotion.value &&
    isImmersiveScene.value
);

const bootstrapImmersiveFx = () => {
  if (immersiveFxBootstrapped.value) return;
  immersiveFxBootstrapped.value = true;
};

const scheduleImmersiveFxBootstrap = () => {
  if (!canRunDeferredEffects()) return;

  const isLanding = motionScene.value === "landing";
  const idleCallback = (window as any).requestIdleCallback as
    | ((cb: () => void, opts?: { timeout?: number }) => number)
    | undefined;

  if (isLanding) {
    interactionHandler = () => bootstrapImmersiveFx();
    window.addEventListener("pointerdown", interactionHandler, { once: true, passive: true });
    window.addEventListener("keydown", interactionHandler, { once: true });
    window.addEventListener("touchstart", interactionHandler, { once: true, passive: true });
  }

  if (typeof idleCallback === "function") {
    idleHandle = idleCallback(() => bootstrapImmersiveFx(), { timeout: isLanding ? 3600 : 1600 });
    return;
  }

  fallbackTimer = window.setTimeout(bootstrapImmersiveFx, isLanding ? 2200 : 640);
};

onMounted(() => {
  reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncReducedMotion();
  reducedMotionHandler = () => syncReducedMotion();
  reducedMotionMedia.addEventListener("change", reducedMotionHandler);

  if (document.readyState === "complete") {
    scheduleImmersiveFxBootstrap();
  } else {
    loadHandler = () => scheduleImmersiveFxBootstrap();
    window.addEventListener("load", loadHandler, { once: true });
  }
});

onUnmounted(() => {
  if (reducedMotionMedia && reducedMotionHandler) {
    reducedMotionMedia.removeEventListener("change", reducedMotionHandler);
  }
  reducedMotionMedia = null;
  reducedMotionHandler = null;

  if (loadHandler) {
    window.removeEventListener("load", loadHandler);
    loadHandler = null;
  }

  if (interactionHandler) {
    window.removeEventListener("pointerdown", interactionHandler);
    window.removeEventListener("keydown", interactionHandler);
    window.removeEventListener("touchstart", interactionHandler);
    interactionHandler = null;
  }

  const cancelIdleCallback = (window as any).cancelIdleCallback as
    | ((handle: number) => void)
    | undefined;
  if (idleHandle !== null && typeof cancelIdleCallback === "function") {
    cancelIdleCallback(idleHandle);
  }
  idleHandle = null;

  if (fallbackTimer !== null) {
    window.clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
});

useRouteForgeMotion();
</script>

<template>
  <router-view v-slot="{ Component, route: viewRoute }">
    <Transition name="forge-route" mode="out-in">
      <div
        :key="viewRoute.fullPath"
        class="page-shell"
        :class="`scene-${motionScene}`"
        data-forge-motion-root
        :data-motion-scene="motionScene"
        :data-motion-profile="motionProfile"
        :data-route-key="viewRoute.fullPath"
      >
        <PublicImmersiveFx
          v-if="immersiveFxEnabled"
          intensity="high"
          theme="tech-cultural"
          :enabled="immersiveFxEnabled"
          :route-key="viewRoute.fullPath"
        />
        <div class="page-shell-content">
          <component :is="Component" />
        </div>
      </div>
    </Transition>
  </router-view>
</template>

<style scoped lang="scss">
.page-shell {
  position: relative;
  min-height: 100vh;
  z-index: 0;
  isolation: isolate;
  overflow-x: clip;
}

.page-shell-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}
</style>
