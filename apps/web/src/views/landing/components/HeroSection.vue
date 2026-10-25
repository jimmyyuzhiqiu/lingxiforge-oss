<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isReady = ref(false);
const isAnimated = ref(false);
const allowIntroMotion = ref(true);
const heroRef = ref<HTMLElement | null>(null);
const headlineLeft = "让深藏的文明，";
const headlineRight = "在指尖重现";
const sublineRow1 = "Lingxi Forge 为博物馆与文创品牌提供 AI 叙事提炼、3D 设计生成、可制造优化与履约交付，";
const sublineRow2 = "让文化灵感在同一平台完成从概念、打样到上新的闭环落地。";
let releaseTimer: number | null = null;
let pointerRaf: number | null = null;
let prefersReducedMotion = false;
let reducedMotionMedia: MediaQueryList | null = null;
let reducedMotionHandler: ((event: MediaQueryListEvent) => void) | null = null;

const isLowEndDevice = () => {
  const lowCpu = (navigator.hardwareConcurrency || 4) <= 4;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;
  return lowCpu && lowMemory;
};

const syncMotionAllowance = () => {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  const effectiveType = (connection?.effectiveType || "").toLowerCase();
  const lowBandwidth = connection?.saveData || effectiveType.includes("2g") || effectiveType.includes("slow-2g");
  allowIntroMotion.value = !prefersReducedMotion && !lowBandwidth && !isLowEndDevice();
};

const applyPointer = (x: number, y: number) => {
  if (!heroRef.value) return;
  heroRef.value.style.setProperty("--hero-pointer-x", `${x}%`);
  heroRef.value.style.setProperty("--hero-pointer-y", `${y}%`);
};

const onPointerMove = (event: MouseEvent) => {
  if (!heroRef.value || prefersReducedMotion) return;
  if (pointerRaf !== null) return;
  pointerRaf = window.requestAnimationFrame(() => {
    if (!heroRef.value) {
      pointerRaf = null;
      return;
    }
    const rect = heroRef.value.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    applyPointer(Math.min(92, Math.max(8, x)), Math.min(88, Math.max(12, y)));
    pointerRaf = null;
  });
};

const onPointerLeave = () => {
  if (prefersReducedMotion) return;
  applyPointer(50, 34);
};

onMounted(() => {
  reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion = reducedMotionMedia.matches;
  syncMotionAllowance();

  reducedMotionHandler = () => {
    if (!reducedMotionMedia) return;
    prefersReducedMotion = reducedMotionMedia.matches;
    syncMotionAllowance();
    if (prefersReducedMotion) {
      isReady.value = true;
      isAnimated.value = true;
      applyPointer(50, 34);
    }
  };
  reducedMotionMedia.addEventListener("change", reducedMotionHandler);

  applyPointer(50, 34);

  if (!allowIntroMotion.value) {
    isReady.value = true;
    isAnimated.value = true;
    return;
  }

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      isReady.value = true;
    }, 20);
  });

  releaseTimer = window.setTimeout(() => {
    isAnimated.value = true;
  }, 1400);
});

onUnmounted(() => {
  if (reducedMotionMedia && reducedMotionHandler) {
    reducedMotionMedia.removeEventListener("change", reducedMotionHandler);
  }
  reducedMotionMedia = null;
  reducedMotionHandler = null;
  if (releaseTimer !== null) {
    window.clearTimeout(releaseTimer);
    releaseTimer = null;
  }
  if (pointerRaf !== null) {
    window.cancelAnimationFrame(pointerRaf);
    pointerRaf = null;
  }
});
</script>

<template>
  <section ref="heroRef" class="hero container" :class="{ 'is-ready': isReady, 'is-animated': isAnimated, 'no-intro-motion': !allowIntroMotion }" id="hero"
    aria-labelledby="hero-title" @mousemove="onPointerMove" @mouseleave="onPointerLeave">
    <div class="hero-surface glass-card">
      <div class="cultural-ambient" aria-hidden="true">
        <span class="ink-wash ink-wash--north"></span>
        <span class="ink-wash ink-wash--south"></span>
        <span class="yun-ribbon"></span>
        <span class="seal-rhythm"></span>
      </div>

      <div class="narrative-rail" aria-hidden="true">
        <span class="narrative-progress"></span>
      </div>

      <h1 id="hero-title" class="headline" aria-label="让深藏的文明，在指尖重现">
        <span class="headline-track">
          <span class="headline-segment stage-item stage-headline-left">{{ headlineLeft }}</span>
          <span class="headline-segment headline-segment--accent stage-item stage-headline-right">{{ headlineRight }}</span>
        </span>
      </h1>

      <p class="subline" aria-label="Lingxi Forge 为博物馆与文创品牌提供 AI 叙事提炼、3D 设计生成、可制造优化与履约交付，让文化灵感在同一平台完成从概念、打样到上新的闭环落地。">
        <span class="subline-row stage-item stage-subline-row1">{{ sublineRow1 }}</span>
        <span class="subline-row stage-item stage-subline-row2">{{ sublineRow2 }}</span>
      </p>

      <div class="hero-actions stage-item stage-actions" aria-label="首屏操作">
        <RouterLink class="hero-action hero-action--primary" :to="{ path: '/apply', query: { intent: 'partner' } }">
          获取合作方案
        </RouterLink>
        <RouterLink class="hero-action" :to="{ path: '/apply', query: { intent: 'demo' } }">
          申请演示
        </RouterLink>
        <span class="sparkle sparkle-1" aria-hidden="true"></span>
        <span class="sparkle sparkle-2" aria-hidden="true"></span>
        <span class="sparkle sparkle-3" aria-hidden="true"></span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  --hero-pointer-x: 50%;
  --hero-pointer-y: 34%;
  min-height: clamp(72vh, 78vh, 82vh);
  width: min(1420px, 96%);
  display: grid;
  align-items: center;
  position: relative;
  color: var(--font-color1);
}

.hero-surface {
  margin: 0 auto;
  width: min(1300px, 100%);
  text-align: center;
  padding: clamp(34px, 3.6vw, 54px) clamp(22px, 2.8vw, 42px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(
      circle at var(--hero-pointer-x) var(--hero-pointer-y),
      color-mix(in srgb, var(--accent) 14%, transparent),
      transparent 38%
    ),
    linear-gradient(146deg, rgba(252, 249, 244, 0.96), rgba(238, 242, 248, 0.92));
  border: 1px solid rgba(139, 117, 83, 0.17);
  box-shadow:
    14px 14px 30px rgba(182, 172, 155, 0.26),
    -10px -10px 24px rgba(255, 255, 255, 0.82),
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    inset 0 -1px 0 rgba(90, 72, 45, 0.08);
  backdrop-filter: blur(calc(var(--glass-blur) * 0.2)) saturate(104%);
  -webkit-backdrop-filter: blur(calc(var(--glass-blur) * 0.2)) saturate(104%);
  position: relative;
  z-index: 5;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px) scale(1.01);
  contain: paint;
}

.hero-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    url("/ai/landing/patterns/cloud-pattern.svg") center 12% / min(820px, 72%) auto no-repeat,
    url("/ai/landing/patterns/wave-pattern.svg") center 88% / min(760px, 66%) auto no-repeat,
    linear-gradient(132deg, rgba(255, 255, 255, 0.44), transparent 48%);
  opacity: 0.32;
}

.hero-surface::after {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: calc(var(--radius-xl) - 10px);
  pointer-events: none;
  border: 1px solid rgba(184, 134, 11, 0.14);
  background:
    url("/ai/landing/patterns/bronze-corner.svg") left top / 34px 34px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right top / 34px 34px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") left bottom / 34px 34px no-repeat,
    url("/ai/landing/patterns/bronze-corner.svg") right bottom / 34px 34px no-repeat;
  opacity: 0;
  transform: scale(1.02);
}

.hero-surface > * {
  position: relative;
  z-index: 1;
}

.cultural-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.hero-surface > .cultural-ambient {
  z-index: 0;
}

.ink-wash {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  opacity: 0;
  filter: blur(20px);
  mix-blend-mode: multiply;
}

.ink-wash--north {
  top: -34%;
  left: -14%;
  width: min(520px, 62%);
  aspect-ratio: 1 / 1;
  background:
    radial-gradient(
      circle at 42% 44%,
      color-mix(in srgb, var(--cultural-ink) 20%, transparent),
      transparent 62%
    );
  transform: translate3d(0, 18px, 0) scale(0.74);
}

.ink-wash--south {
  right: -16%;
  bottom: -40%;
  width: min(620px, 68%);
  aspect-ratio: 1 / 1;
  background:
    radial-gradient(
      circle at 52% 48%,
      color-mix(in srgb, var(--cultural-bronze) 18%, transparent),
      transparent 64%
    ),
    radial-gradient(
      circle at 42% 56%,
      color-mix(in srgb, var(--cultural-celadon) 16%, transparent),
      transparent 66%
    );
  transform: translate3d(0, 24px, 0) scale(0.68);
}

.yun-ribbon {
  position: absolute;
  left: 50%;
  top: 8%;
  width: min(860px, 78%);
  height: 34%;
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-50%, 14px, 0);
  background:
    radial-gradient(
      circle at 16% 42%,
      color-mix(in srgb, var(--cultural-celadon) 18%, transparent),
      transparent 46%
    ),
    url("/ai/landing/patterns/cloud-pattern.svg") center / min(760px, 100%) auto no-repeat;
  mix-blend-mode: soft-light;
}

.seal-rhythm {
  position: absolute;
  right: clamp(14px, 3vw, 42px);
  top: clamp(16px, 3vw, 38px);
  width: clamp(74px, 10vw, 126px);
  height: clamp(18px, 2.1vw, 24px);
  border-radius: 999px;
  pointer-events: none;
  opacity: 0;
  transform: translate3d(0, 10px, 0) scaleX(0.94);
  background:
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--cultural-bronze) 64%, transparent) 0,
      color-mix(in srgb, var(--cultural-bronze) 64%, transparent) 3px,
      transparent 3px,
      transparent 12px
    ),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--cultural-celadon) 22%, transparent),
      color-mix(in srgb, var(--accent) 24%, transparent)
    );
}

.narrative-rail {
  margin: 0 auto 14px;
  width: min(460px, 62%);
  height: 5px;
  border-radius: 999px;
  background:
    rgba(92, 106, 126, 0.1)
    url("/ai/landing/patterns/wave-pattern.svg") center / 180px auto repeat-x;
  overflow: hidden;
  opacity: 0;
}

.narrative-progress {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform-origin: left center;
  transform: scaleX(0);
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 28%, transparent), var(--accent));
}

.headline {
  margin: 4px auto 0;
  width: max-content;
  max-width: 100%;
  padding-inline: clamp(14px, 1.3vw, 20px);
  font-size: clamp(38px, 5.1vw, 82px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  white-space: normal;
  font-family: var(--font-display);
  text-rendering: geometricPrecision;
  color: #2f4762;
}

@supports (-webkit-background-clip: text) {
  .headline {
    color: transparent;
  }

  .headline-segment {
    background:
      url("/ai/landing/patterns/stone-texture.svg") center / 180px auto repeat,
      linear-gradient(180deg, #fcf6ec 0%, #e6ecf5 22%, #99aeca 58%, #2f4d6b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-stroke: 0.36px rgba(40, 53, 72, 0.34);
    text-shadow:
      0 2px 8px rgba(139, 92, 46, 0.16),
      0 1px 0 rgba(255, 255, 255, 0.4);
  }
}

:global(:root[theme="dark"] .hero-surface) {
  background:
    radial-gradient(
      circle at var(--hero-pointer-x) var(--hero-pointer-y),
      color-mix(in srgb, var(--accent) 18%, transparent),
      transparent 42%
    ),
    linear-gradient(146deg, rgba(13, 20, 32, 0.92), rgba(15, 24, 38, 0.9));
  border: 1px solid rgba(108, 130, 166, 0.28);
  box-shadow:
    14px 14px 30px rgba(2, 6, 14, 0.56),
    -8px -8px 20px rgba(34, 44, 60, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(2, 7, 18, 0.38);
}

:global(:root[theme="dark"] .hero-surface::before) {
  opacity: 0.14;
}

:global(:root[theme="dark"] .hero-surface::after) {
  border-color: rgba(193, 165, 118, 0.14);
}

:global(:root[theme="dark"] .headline-segment) {
  background:
    url("/ai/landing/patterns/stone-texture.svg") center / 180px auto repeat,
    linear-gradient(180deg, #f7fbff 0%, #d8e6fa 24%, #93bdf0 58%, #5f9ae3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke: 0.3px rgba(212, 227, 250, 0.24);
  text-shadow:
    0 5px 14px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
}

.headline-track {
  display: inline-flex;
  align-items: baseline;
  gap: 0.18em;
  white-space: nowrap;
}

.headline-segment {
  display: inline-block;
  opacity: 0;
  transform: translate3d(0, 16px, 0) scale(1.03);
  filter: blur(6px) contrast(0.76);
}

.headline-segment--accent {
  position: relative;
}

.headline-segment--accent::after {
  content: "";
  position: absolute;
  left: 0.04em;
  right: 0.06em;
  bottom: -0.14em;
  height: 0.06em;
  border-radius: 999px;
  transform-origin: left center;
  transform: scaleX(0);
  opacity: 0.36;
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 72%, transparent), rgba(124, 152, 133, 0.38));
}

.subline {
  margin: 16px auto 0;
  max-width: min(980px, 94%);
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.72;
  letter-spacing: 0.04px;
  text-wrap: balance;
  word-break: keep-all;
  color: color-mix(in srgb, var(--font-color2) 86%, #283e5c 14%);
}

:global(:root[theme="dark"] .subline) {
  color: color-mix(in srgb, var(--font-color2) 90%, #f1f6ff 10%);
}

.subline-row {
  display: block;
  opacity: 0;
  transform: translate3d(-10px, 12px, 0);
  clip-path: inset(0 100% 0 0);
}

.hero-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  position: relative;
}

.hero-action {
  min-width: 122px;
  height: 38px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(126, 140, 160, 0.3);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(243, 247, 252, 0.84));
  color: var(--font-color1);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
  box-shadow:
    6px 6px 14px rgba(176, 168, 154, 0.22),
    -4px -4px 12px rgba(255, 255, 255, 0.74),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
  opacity: 0;
  transform: translate3d(0, 12px, 0);
}

.hero-action:hover {
  transform: translate3d(0, -1px, 0);
  border-color: color-mix(in srgb, var(--accent) 62%, transparent);
  box-shadow:
    8px 8px 18px rgba(173, 164, 148, 0.25),
    -4px -4px 12px rgba(255, 255, 255, 0.76),
    0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent);
}

.hero-action--primary {
  border-color: color-mix(in srgb, var(--accent) 58%, transparent);
  color: #f8fbff;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  box-shadow:
    0 14px 28px color-mix(in srgb, var(--accent) 32%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.hero-action--primary:hover {
  box-shadow:
    0 18px 34px color-mix(in srgb, var(--accent) 42%, transparent),
    0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

:global(:root[theme="dark"] .hero-action) {
  border-color: rgba(95, 114, 140, 0.48);
  background: linear-gradient(145deg, rgba(26, 33, 46, 0.84), rgba(19, 26, 37, 0.88));
  color: #d9e3f3;
  box-shadow:
    10px 10px 20px rgba(2, 6, 14, 0.56),
    -4px -4px 12px rgba(36, 44, 58, 0.36),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

:global(:root[theme="dark"] .hero-action--primary) {
  color: #f4f8ff;
  box-shadow:
    0 16px 30px color-mix(in srgb, var(--accent) 34%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.26);
}

:global(:root[theme="dark"] .ink-wash) {
  mix-blend-mode: screen;
}

:global(:root[theme="dark"] .yun-ribbon) {
  opacity: 0.14;
}

:global(:root[theme="dark"] .seal-rhythm) {
  opacity: 0.22;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 72%, #ffffff 28%);
  opacity: 0;
  pointer-events: none;
  filter: blur(0.2px);
}

.sparkle-1 {
  left: calc(50% - 96px);
  top: -8px;
  animation: sparkle 2.8s ease-in-out 1.1s infinite;
}

.sparkle-2 {
  left: calc(50% + 58px);
  top: -4px;
  animation: sparkle 3.2s ease-in-out 1.4s infinite;
}

.sparkle-3 {
  left: calc(50% + 12px);
  top: -14px;
  animation: sparkle 2.6s ease-in-out 0.9s infinite;
}

.stage-item {
  opacity: 0;
  transform: translate3d(0, 16px, 0);
}

.hero:not(.is-animated) .stage-item,
.hero:not(.is-animated) .hero-action {
  will-change: opacity, transform;
}

.hero.is-animated .stage-item,
.hero.is-animated .hero-action {
  will-change: auto;
}

.hero.is-ready .hero-surface {
  animation: surfaceFade 700ms var(--ease-out) 20ms forwards;
}

.hero.is-ready .hero-surface::after {
  animation: borderReveal 760ms var(--ease-out) 120ms forwards;
}

.hero.is-ready .narrative-rail {
  animation: stagedRise 520ms var(--ease-out) 120ms forwards;
}

.hero.is-ready .narrative-progress {
  animation: railGrow 920ms var(--ease-out) 220ms forwards;
}

.hero.is-ready .stage-headline-left {
  animation: rubbingReveal 640ms var(--ease-out) 180ms forwards;
}

.hero.is-ready .stage-headline-right {
  animation: rubbingReveal 640ms var(--ease-out) 300ms forwards;
}

.hero.is-ready .stage-headline-right::after {
  animation: railGrow 560ms var(--ease-out) 520ms forwards;
}

.hero.is-ready .stage-subline-row1 {
  animation: bambooUnfold 580ms var(--ease-out) 420ms forwards;
}

.hero.is-ready .stage-subline-row2 {
  animation: bambooUnfold 580ms var(--ease-out) 520ms forwards;
}

.hero.is-ready .stage-actions {
  animation: stagedRise 560ms var(--ease-out) 620ms forwards;
}

.hero.is-ready .hero-action:first-child {
  animation: buttonRise 460ms var(--ease-out) 700ms forwards;
}

.hero.is-ready .hero-action:last-of-type {
  animation: buttonRise 460ms var(--ease-out) 780ms forwards;
}

.hero.is-ready .ink-wash--north {
  animation: inkDiffuseNorth 1500ms var(--ease-out) 90ms forwards;
}

.hero.is-ready .ink-wash--south {
  animation: inkDiffuseSouth 1620ms var(--ease-out) 180ms forwards;
}

.hero.is-ready .yun-ribbon {
  animation:
    yunReveal 1760ms var(--ease-out) 220ms forwards,
    yunDrift 12.8s var(--ease-in-out) 1900ms infinite;
}

.hero.is-ready .seal-rhythm {
  animation:
    sealReveal 820ms var(--ease-out) 560ms forwards,
    sealCadence 7.4s steps(4, end) 1500ms infinite;
}

.hero.no-intro-motion .hero-surface,
.hero.no-intro-motion .hero-surface::after,
.hero.no-intro-motion .narrative-rail,
.hero.no-intro-motion .narrative-progress,
.hero.no-intro-motion .stage-item,
.hero.no-intro-motion .headline-segment,
.hero.no-intro-motion .subline-row,
.hero.no-intro-motion .hero-action {
  opacity: 1;
  transform: none;
  animation: none !important;
  filter: none;
  clip-path: inset(0 0 0 0);
  will-change: auto;
}

.hero.no-intro-motion .headline-segment--accent::after {
  transform: scaleX(1);
}

.hero.no-intro-motion .ink-wash--north,
.hero.no-intro-motion .ink-wash--south {
  opacity: 0.14;
  transform: none;
  animation: none;
}

.hero.no-intro-motion .yun-ribbon {
  opacity: 0.16;
  transform: translate3d(-50%, 0, 0);
  animation: none;
}

.hero.no-intro-motion .seal-rhythm {
  opacity: 0.2;
  transform: none;
  animation: none;
}

@keyframes surfaceFade {
  0% {
    opacity: 0;
    transform: translate3d(0, 12px, 0) scale(1.01);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

@keyframes borderReveal {
  0% {
    opacity: 0;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes stagedRise {
  0% {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes rubbingReveal {
  0% {
    opacity: 0;
    filter: blur(8px) contrast(0.5);
    transform: translate3d(0, 16px, 0) scale(1.05);
  }
  100% {
    opacity: 1;
    filter: blur(0) contrast(1);
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes bambooUnfold {
  0% {
    opacity: 0;
    transform: translate3d(-10px, 12px, 0);
    clip-path: inset(0 100% 0 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    clip-path: inset(0 0 0 0);
  }
}

@keyframes buttonRise {
  0% {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes railGrow {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes inkDiffuseNorth {
  0% {
    opacity: 0;
    transform: translate3d(0, 18px, 0) scale(0.74);
  }
  60% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.14;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes inkDiffuseSouth {
  0% {
    opacity: 0;
    transform: translate3d(0, 24px, 0) scale(0.68);
  }
  56% {
    opacity: 0.22;
  }
  100% {
    opacity: 0.16;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes yunReveal {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 14px, 0);
  }
  100% {
    opacity: 0.2;
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes yunDrift {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  50% {
    transform: translate3d(-50%, -6px, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes sealReveal {
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0) scaleX(0.94);
  }
  100% {
    opacity: 0.24;
    transform: none;
  }
}

@keyframes sealCadence {
  0% {
    opacity: 0.2;
    background-position: 0 0, center;
  }
  50% {
    opacity: 0.26;
    background-position: 8px 0, center;
  }
  100% {
    opacity: 0.2;
    background-position: 0 0, center;
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(0.2);
  }
  50% {
    opacity: 0.58;
    transform: translateY(-18px) scale(1);
  }
}

@media (max-width: 980px) {
  .hero {
    min-height: clamp(72vh, 76vh, 80vh);
  }

  .hero-surface {
    padding: 30px 18px;
  }

  .headline {
    font-size: clamp(32px, 6vw, 58px);
  }

  .headline-track {
    display: inline-flex;
    gap: 0.14em;
  }

  .subline {
    font-size: clamp(14px, 2.2vw, 16px);
    line-height: 1.68;
  }
}

@media (max-width: 1100px) {
  .hero-surface {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media (max-width: 760px) {
  .headline {
    font-size: clamp(28px, 8.1vw, 46px);
    line-height: 1.12;
  }

  .headline-track {
    display: inline;
    white-space: normal;
  }

  .headline-segment {
    display: inline;
  }

  .subline {
    max-width: 96%;
    font-size: clamp(14px, 3.7vw, 16px);
  }

  .hero-actions {
    gap: 10px;
  }

  .hero-action {
    min-width: 112px;
    height: 36px;
    padding: 0 15px;
  }

  .sparkle {
    display: none;
  }

  .seal-rhythm {
    right: 12px;
    width: 92px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cultural-ambient,
  .ink-wash,
  .yun-ribbon,
  .seal-rhythm {
    animation: none !important;
  }

  .ink-wash--north,
  .ink-wash--south,
  .yun-ribbon,
  .seal-rhythm {
    opacity: 0.14;
    transform: none;
  }

  .narrative-rail,
  .narrative-progress,
  .hero-surface,
  .stage-item,
  .headline-segment,
  .subline-row,
  .hero-action,
  .hero.is-ready .hero-surface,
  .hero.is-ready .narrative-rail,
  .hero.is-ready .narrative-progress,
  .hero.is-ready .stage-headline-left,
  .hero.is-ready .stage-headline-right,
  .hero.is-ready .stage-subline-row1,
  .hero.is-ready .stage-subline-row2,
  .hero.is-ready .stage-actions,
  .hero.is-ready .hero-action:first-child,
  .hero.is-ready .hero-action:last-of-type,
  .hero.is-ready .hero-surface::after {
    opacity: 1;
    transform: none;
    animation: none;
    filter: none;
    clip-path: inset(0 0 0 0);
    will-change: auto;
  }

  .headline-segment--accent::after {
    transform: scaleX(1);
    opacity: 0.3;
    animation: none;
  }

  .sparkle {
    display: none;
  }
}
</style>
