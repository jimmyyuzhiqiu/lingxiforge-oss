<script setup lang="ts">
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useNavStore, type NavSectionId } from "@/stores";

import TopNav from "./components/TopNav.vue";
import HeroSection from "./components/HeroSection.vue";

const PainPointsSection = defineAsyncComponent(
  () => import("./components/PainPointsSection.vue")
);
const SolutionsSection = defineAsyncComponent(
  () => import("./components/SolutionsSection.vue")
);
const ProcessSection = defineAsyncComponent(
  () => import("./components/ProcessSection.vue")
);
const ThreeDShowcaseSection = defineAsyncComponent(
  () => import("./components/ThreeDShowcaseSection.vue")
);
const MetricsSection = defineAsyncComponent(
  () => import("./components/MetricsSection.vue")
);
const CooperationSection = defineAsyncComponent(
  () => import("./components/CooperationSection.vue")
);
const FaqSection = defineAsyncComponent(() => import("./components/FaqSection.vue"));
const LandingFooter = defineAsyncComponent(
  () => import("./components/LandingFooter.vue")
);

const navStore = useNavStore();
const landingRef = ref<HTMLElement | null>(null);
const deferredSectionsReady = ref(false);

const sectionIds: NavSectionId[] = [
  "hero",
  "pain-points",
  "solutions",
  "process",
  "gallery-preview",
  "metrics",
  "cooperation",
  "faq",
];

let observer: IntersectionObserver | null = null;
let revealObserver: IntersectionObserver | null = null;
let scrollRaf = 0;
let reduceMotion = false;
let reducedMotionMedia: MediaQueryList | null = null;
let reducedMotionHandler: ((event: MediaQueryListEvent) => void) | null = null;

const clearSectionObservers = () => {
  observer?.disconnect();
  revealObserver?.disconnect();
  observer = null;
  revealObserver = null;
};

const initSectionObservers = () => {
  clearSectionObservers();
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));

  sections.forEach((el) => el.classList.add("reveal"));
  sections[0]?.classList.add("is-visible");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((el) => el.classList.add("is-visible"));
    navStore.setActiveSection("hero");
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (e.target as HTMLElement).classList.add("is-visible");
        revealObserver?.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: [0, 0.08, 0.16] }
  );

  sections.forEach((el) => revealObserver?.observe(el));

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
      const top = visible[0]?.target as HTMLElement | undefined;
      if (!top) return;
      navStore.setActiveSection(top.id as NavSectionId);
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.2, 0.35] }
  );

  sections.forEach((el) => observer?.observe(el));
};

const scheduleDeferredSections = () => {
  const activate = () => {
    deferredSectionsReady.value = true;
  };

  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback(
      () => activate(),
      { timeout: 1200 }
    );
    return;
  }

  globalThis.setTimeout(activate, 280);
};

const setLandingScrollVars = (value: number) => {
  if (!landingRef.value) return;
  const clamped = Math.min(Math.max(value, 0), 1400);
  landingRef.value.style.setProperty("--landing-scroll-y", `${clamped}px`);
  landingRef.value.style.setProperty("--landing-scroll-shift-a", `${-clamped * 0.16}px`);
  landingRef.value.style.setProperty("--landing-scroll-shift-b", `${-clamped * 0.12}px`);
  landingRef.value.style.setProperty("--landing-scroll-shift-c", `${-clamped * 0.08}px`);
};

const applyLandingScrollVar = () => {
  if (!landingRef.value || reduceMotion) return;
  const y = Math.max(window.scrollY || 0, 0);
  setLandingScrollVars(y);
};

const onLandingScroll = () => {
  if (scrollRaf) return;
  scrollRaf = window.requestAnimationFrame(() => {
    applyLandingScrollVar();
    scrollRaf = 0;
  });
};

watch(
  deferredSectionsReady,
  async (ready) => {
    if (!ready) return;
    await nextTick();
    initSectionObservers();
  },
  { flush: "post" }
);

onMounted(() => {
  reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotion = reducedMotionMedia.matches;
  if (reduceMotion) {
    setLandingScrollVars(0);
  } else {
    applyLandingScrollVar();
    window.addEventListener("scroll", onLandingScroll, { passive: true });
  }
  reducedMotionHandler = () => {
    if (!reducedMotionMedia) return;
    const next = reducedMotionMedia.matches;
    if (next === reduceMotion) return;
    reduceMotion = next;
    if (reduceMotion) {
      window.removeEventListener("scroll", onLandingScroll);
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
        scrollRaf = 0;
      }
      setLandingScrollVars(0);
      return;
    }
    applyLandingScrollVar();
    window.addEventListener("scroll", onLandingScroll, { passive: true });
  };
  reducedMotionMedia.addEventListener("change", reducedMotionHandler);

  initSectionObservers();
  scheduleDeferredSections();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onLandingScroll);
  if (reducedMotionMedia && reducedMotionHandler) {
    reducedMotionMedia.removeEventListener("change", reducedMotionHandler);
  }
  reducedMotionMedia = null;
  reducedMotionHandler = null;
  if (scrollRaf) {
    window.cancelAnimationFrame(scrollRaf);
    scrollRaf = 0;
  }
  clearSectionObservers();
});
</script>

<template>
  <div ref="landingRef" class="landing">
    <a class="skip-link" href="#hero">跳到正文</a>
    <TopNav />
    <main class="main" id="main">
      <HeroSection />
      <PainPointsSection />
      <SolutionsSection />
      <ProcessSection v-if="deferredSectionsReady" />
      <ThreeDShowcaseSection v-if="deferredSectionsReady" />
      <MetricsSection v-if="deferredSectionsReady" />
      <CooperationSection v-if="deferredSectionsReady" />
      <FaqSection v-if="deferredSectionsReady" />
      <LandingFooter v-if="deferredSectionsReady" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.landing {
  --accent: var(--landing-accent);
  --accent-strong: var(--landing-accent-strong);
  --accent-soft-bg: color-mix(in srgb, var(--landing-accent) 14%, transparent);
  --accent-glow: color-mix(in srgb, var(--landing-accent) 26%, transparent);
  --landing-scroll-y: 0px;
  --landing-scroll-shift-a: 0px;
  --landing-scroll-shift-b: 0px;
  --landing-scroll-shift-c: 0px;
  --landing-pattern-opacity: calc(var(--cultural-pattern-opacity) + 0.02);
  --landing-texture-opacity: calc(var(--cultural-texture-opacity) + 0.01);
  --landing-bg:
    linear-gradient(165deg, #f6f3ee 0%, #eef2f7 35%, #fff9f0 70%, #f5f7fa 100%);
  position: relative;
  min-height: 100vh;
  isolation: isolate;
  overflow: clip;
  background: var(--landing-bg);
}

.landing::before {
  content: "";
  position: absolute;
  inset: 0;
  height: min(95vh, 860px);
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(circle at 48% 52%, rgba(var(--fluid-base-rgb), 0.07), transparent 54%),
    url("/ai/landing/patterns/flow-veil.svg"),
    url("/ai/landing/patterns/cloud-pattern.svg"),
    url("/ai/landing/patterns/wave-pattern.svg"),
    url("/ai/landing/patterns/tech-knot.svg"),
    url("/ai/landing/patterns/signal-ring.svg");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: auto, min(1080px, 86%), min(820px, 72%), min(760px, 68%), min(320px, 28%), min(360px, 30%);
  background-position: center 45%, center 12%, center 14%, center 88%, left -2% top 28%, right -3% bottom 24%;
  opacity: var(--landing-pattern-opacity);
  transform: translate3d(0, var(--landing-scroll-shift-a), 0);
}

.landing::after {
  content: "";
  position: absolute;
  top: clamp(120px, 16vw, 220px);
  right: clamp(-62px, -2vw, -12px);
  width: clamp(180px, 20vw, 290px);
  height: clamp(180px, 20vw, 290px);
  z-index: 1;
  pointer-events: none;
  background:
    url("/ai/landing/patterns/artifact-silhouette.svg") center / contain no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") left top / 30px 30px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right top / 30px 30px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") left bottom / 30px 30px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right bottom / 30px 30px no-repeat;
  opacity: calc(var(--landing-pattern-opacity) * 0.92);
  transform: translate3d(0, var(--landing-scroll-shift-b), 0);
}

:global(:root[theme="dark"] .landing::before) {
  opacity: calc(var(--landing-pattern-opacity) * 0.78);
  background:
    radial-gradient(circle at 48% 52%, rgba(var(--fluid-base-rgb), 0.05), transparent 58%),
    url("/ai/landing/patterns/flow-veil.svg"),
    url("/ai/landing/patterns/cloud-pattern.svg"),
    url("/ai/landing/patterns/wave-pattern.svg"),
    url("/ai/landing/patterns/tech-knot.svg"),
    url("/ai/landing/patterns/signal-ring.svg");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: auto, min(1080px, 88%), min(820px, 74%), min(760px, 68%), min(340px, 30%), min(360px, 30%);
  background-position: center 44%, center 12%, center 14%, center 88%, left -3% top 30%, right -3% bottom 24%;
}

:global(:root[theme="dark"] .landing) {
  --landing-bg:
    linear-gradient(165deg, #0b0e15 0%, #1a1e2e 52%, #121820 100%);
  --landing-pattern-opacity: 0.1;
  --landing-texture-opacity: 0.06;
}

:global(:root[theme="dark"] .landing::after) {
  opacity: calc(var(--landing-pattern-opacity) * 0.78);
}

.skip-link {
  position: absolute;
  left: 16px;
  top: 14px;
  z-index: 100;
  padding: 10px 12px;
  border-radius: 999px;
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  transform: translateY(-150%);
  transition: transform var(--motion-base) var(--ease-out);
}

.skip-link:focus-visible {
  transform: translateY(0);
}

.main {
  position: relative;
  z-index: 3;
  padding: calc(var(--nav-height, 72px) + 18px) 0 40px;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, calc(var(--landing-texture-opacity) * 0.45)) 0%,
      rgba(255, 255, 255, 0) 30%
    );
}

.main::before {
  content: "";
  position: absolute;
  left: 50%;
  top: clamp(56vh, 64vh, 720px);
  width: min(980px, 94%);
  height: clamp(180px, 22vw, 280px);
  pointer-events: none;
  z-index: 0;
  border-radius: clamp(28px, 5vw, 52px);
  background:
    radial-gradient(
      circle at 18% 42%,
      color-mix(in srgb, var(--cultural-ink) 10%, transparent),
      transparent 45%
    ),
    linear-gradient(
      114deg,
      color-mix(in srgb, var(--cultural-celadon) 16%, transparent),
      color-mix(in srgb, var(--cultural-bronze) 12%, transparent)
    ),
    url("/ai/landing/patterns/cloud-pattern.svg") center 42% / min(760px, 72%) auto no-repeat,
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--cultural-bronze) 20%, transparent) 0,
      color-mix(in srgb, var(--cultural-bronze) 20%, transparent) 1px,
      transparent 1px,
      transparent 16px
    );
  opacity: calc(var(--landing-pattern-opacity) * 0.82);
  transform: translate3d(-50%, var(--landing-scroll-shift-c), 0);
}

.main::after {
  content: "";
  position: absolute;
  right: clamp(8px, 2vw, 24px);
  top: clamp(66vh, 72vh, 840px);
  width: clamp(84px, 10vw, 136px);
  height: clamp(22px, 2.6vw, 30px);
  pointer-events: none;
  z-index: 0;
  border-radius: 999px;
  background:
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--cultural-bronze) 58%, transparent) 0,
      color-mix(in srgb, var(--cultural-bronze) 58%, transparent) 3px,
      transparent 3px,
      transparent 13px
    ),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--cultural-celadon) 24%, transparent),
      color-mix(in srgb, var(--accent) 24%, transparent)
    );
  opacity: calc(var(--landing-pattern-opacity) * 0.76);
  transform: translate3d(0, calc(var(--landing-scroll-shift-c) * 0.9), 0);
}

.main > * {
  position: relative;
  z-index: 1;
}

:global(:root[theme="dark"] .main) {
  background:
    linear-gradient(
      180deg,
      rgba(8, 14, 24, calc(var(--landing-texture-opacity) * 0.7)) 0%,
      rgba(8, 14, 24, 0) 32%
    );
}

:global(:root[theme="dark"] .main::before) {
  opacity: calc(var(--landing-pattern-opacity) * 0.64);
}

:global(:root[theme="dark"] .main::after) {
  opacity: calc(var(--landing-pattern-opacity) * 0.58);
}

:deep(#hero) {
  position: relative;
  z-index: 5;
}

:deep(#hero .hero-surface) {
  position: relative;
  z-index: 5;
}

:deep(.main > :not(:first-child)) {
  margin-top: var(--space-8);
  content-visibility: auto;
  contain-intrinsic-size: 1px 960px;
}

:deep(.reveal) {
  opacity: 0;
  transform: translate3d(0, 12px, 0);
  will-change: opacity, transform;
  transition:
    opacity 520ms var(--ease-out),
    transform 520ms var(--ease-out);
}

:deep(.reveal.is-visible) {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

:deep(section) {
  scroll-margin-top: calc(var(--nav-height, 72px) + 18px);
}

@media (max-width: 980px) {
  .landing::after {
    right: -84px;
    opacity: calc(var(--landing-pattern-opacity) * 0.66);
  }
}

@media (prefers-reduced-motion: reduce) {
  .main::before,
  .main::after {
    transform: none;
  }

  :deep(.reveal) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

</style>
