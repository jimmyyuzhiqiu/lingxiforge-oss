<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import * as THREE from "three";

type FxIntensity = "high";
type FxTheme = "tech-cultural";

const props = withDefaults(
  defineProps<{
    intensity: FxIntensity;
    theme: FxTheme;
    enabled: boolean;
    routeKey: string;
  }>(),
  {
    intensity: "high",
    theme: "tech-cultural",
    enabled: true,
    routeKey: "",
  }
);

const rootRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const useWebgl = ref(false);
const isPaused = ref(false);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.OrthographicCamera | null = null;
let rings: THREE.Group | null = null;
let particles: THREE.Points | null = null;
let particleBase: Float32Array | null = null;
let particlePhase: Float32Array | null = null;
let frameId: number | null = null;
let resizeHandler: (() => void) | null = null;
let visibilityHandler: (() => void) | null = null;
let mediaHandler: ((event: MediaQueryListEvent) => void) | null = null;
let prefersReducedMedia: MediaQueryList | null = null;
let elapsed = 0;
let frameInterval = 1000 / 30;
let lastFrameTime = 0;
let compactQuality = false;
let frameTick = 0;

const isFallback = computed(() => !useWebgl.value || !props.enabled);

const supportsWebgl = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
};

const shouldUseWebgl = () => {
  if (!props.enabled) return false;
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.innerWidth < 640;
  const lowCpu = (navigator.hardwareConcurrency || 4) <= 2;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 2;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const saveData = connection?.saveData === true;
  const slowNetwork = /(2g|slow-2g)/i.test(connection?.effectiveType || "");
  return !reduced && !mobile && !lowCpu && !lowMemory && !saveData && !slowNetwork && supportsWebgl();
};

const updateQualityProfile = () => {
  compactQuality = window.innerWidth < 1024;
  frameInterval = compactQuality ? 1000 / 24 : 1000 / 30;
  return compactQuality;
};

const readCssColor = (name: string, fallback: string) => {
  if (!rootRef.value) return new THREE.Color(fallback);
  const raw = getComputedStyle(rootRef.value).getPropertyValue(name).trim();
  return new THREE.Color(raw || fallback);
};

const createRing = (radius: number, segments: number, color: THREE.Color, opacity: number) => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    const ripple = Math.sin(t * 3.0) * 0.04 + Math.cos(t * 5.0) * 0.02;
    points.push(new THREE.Vector3(Math.cos(t) * (radius + ripple), Math.sin(t) * (radius - ripple), 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.LineLoop(geometry, material);
};

const initScene = () => {
  if (!canvasRef.value || !rootRef.value) return;
  const compact = updateQualityProfile();

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.3 : 1.8));

  rings = new THREE.Group();
  const accent = readCssColor("--accent", "#0b84ff");
  const bronze = readCssColor("--cultural-bronze", "#b8860b");
  const celadon = readCssColor("--cultural-celadon", "#7c9885");

  const ringA = createRing(0.62, compact ? 192 : 320, accent, 0.22);
  const ringB = createRing(0.48, compact ? 164 : 260, celadon, 0.18);
  const ringC = createRing(0.34, compact ? 132 : 220, bronze, 0.2);

  ringB.rotation.z = Math.PI * 0.17;
  ringC.rotation.z = -Math.PI * 0.22;

  rings.add(ringA);
  rings.add(ringB);
  rings.add(ringC);
  rings.position.set(0.36, 0.18, 0);
  scene.add(rings);

  const count = compact ? 320 : 520;
  const positions = new Float32Array(count * 3);
  const phase = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const idx = i * 3;
    const radius = 0.2 + Math.random() * 1.2;
    const angle = Math.random() * Math.PI * 2;
    positions[idx] = Math.cos(angle) * radius;
    positions[idx + 1] = Math.sin(angle) * radius;
    positions[idx + 2] = (Math.random() - 0.5) * 0.2;
    phase[i] = Math.random() * Math.PI * 2;
  }

  particleBase = positions.slice();
  particlePhase = phase;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: accent,
    size: compact ? 0.0052 : 0.006,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(geometry, material);
  particles.position.set(-0.35, -0.1, 0);
  scene.add(particles);

  const resize = () => {
    if (!renderer || !camera || !rootRef.value) return;
    const rect = rootRef.value.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    const compactOnResize = updateQualityProfile();
    const aspect = width / height;
    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compactOnResize ? 1.3 : 1.8));
    renderer.setSize(width, height, false);
  };

  resize();
  resizeHandler = resize;
  window.addEventListener("resize", resizeHandler);
};

const stopAnimation = () => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
  lastFrameTime = 0;
  frameTick = 0;
};

const animate = (now = performance.now()) => {
  if (!renderer || !scene || !camera || isPaused.value) return;
  if (lastFrameTime === 0) {
    lastFrameTime = now;
  }
  const elapsedMs = now - lastFrameTime;
  if (elapsedMs < frameInterval) {
    frameId = requestAnimationFrame(animate);
    return;
  }
  const deltaFactor = Math.min(elapsedMs / (1000 / 60), 2);
  lastFrameTime = now;
  frameTick += 1;
  elapsed += 0.008 * deltaFactor;

  if (rings) {
    rings.rotation.z += 0.0008 * deltaFactor;
    rings.rotation.y = Math.sin(elapsed * 0.32) * 0.1;
  }

  if (particles?.geometry && particleBase && particlePhase && (!compactQuality || frameTick % 2 === 0)) {
    const attr = particles.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    const drift = compactQuality ? 0.72 : 1;
    for (let i = 0; i < particlePhase.length; i += 1) {
      const idx = i * 3;
      array[idx] = particleBase[idx] + Math.cos(elapsed * 0.6 + particlePhase[i]) * 0.003 * drift;
      array[idx + 1] =
        particleBase[idx + 1] + Math.sin(elapsed * 0.8 + particlePhase[i]) * 0.004 * drift;
      array[idx + 2] =
        particleBase[idx + 2] + Math.sin(elapsed * 0.9 + particlePhase[i]) * 0.02 * drift;
    }
    attr.needsUpdate = true;
  }

  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};

const mountWebgl = () => {
  if (!shouldUseWebgl()) {
    useWebgl.value = false;
    return;
  }
  useWebgl.value = true;
  initScene();
  animate();
};

const teardownWebgl = () => {
  stopAnimation();

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }

  scene?.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose?.();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m) => m.dispose?.());
    } else {
      mesh.material?.dispose?.();
    }
  });

  renderer?.dispose();
  renderer = null;
  scene = null;
  camera = null;
  rings = null;
  particles = null;
  particleBase = null;
  particlePhase = null;
  elapsed = 0;
};

const syncRenderer = () => {
  teardownWebgl();
  mountWebgl();
};

watch(
  () => props.enabled,
  () => {
    isPaused.value = document.hidden;
    syncRenderer();
  }
);

watch(
  () => props.routeKey,
  (key) => {
    if (!rootRef.value) return;
    const hash = Array.from(key).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hue = (hash % 18) - 9;
    rootRef.value.style.setProperty("--fx-route-hue", `${hue}deg`);
  },
  { immediate: true }
);

onMounted(() => {
  isPaused.value = document.hidden;
  syncRenderer();

  visibilityHandler = () => {
    isPaused.value = document.hidden;
    if (document.hidden) {
      stopAnimation();
      return;
    }
    if (useWebgl.value && frameId === null) {
      animate();
    }
  };
  document.addEventListener("visibilitychange", visibilityHandler);

  prefersReducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaHandler = () => {
    syncRenderer();
  };
  prefersReducedMedia.addEventListener("change", mediaHandler);
});

onUnmounted(() => {
  if (visibilityHandler) {
    document.removeEventListener("visibilitychange", visibilityHandler);
    visibilityHandler = null;
  }
  if (prefersReducedMedia && mediaHandler) {
    prefersReducedMedia.removeEventListener("change", mediaHandler);
  }
  mediaHandler = null;
  prefersReducedMedia = null;
  teardownWebgl();
});
</script>

<template>
  <div
    ref="rootRef"
    class="public-immersive-fx"
    :class="{ 'is-fallback': isFallback, 'is-paused': isPaused }"
    aria-hidden="true"
  >
    <canvas v-if="useWebgl" ref="canvasRef" class="fx-canvas"></canvas>
    <span class="fx-layer fx-layer--veil"></span>
    <span class="fx-layer fx-layer--wave"></span>
    <span class="fx-layer fx-layer--knot"></span>
    <span class="fx-layer fx-layer--ring"></span>
    <span class="fx-layer fx-layer--grain"></span>
    <span class="fx-layer fx-layer--corners"></span>
  </div>
</template>

<style scoped lang="scss">
.public-immersive-fx {
  --fx-route-hue: 0deg;
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: calc(var(--fx-intensity, 1) * 0.95);
  filter: hue-rotate(calc(var(--fx-hue-shift, 0deg) + var(--fx-route-hue)));
}

.fx-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}

.fx-layer {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
}

.fx-layer--veil {
  background-image:
    url("/ai/landing/patterns/flow-veil.svg"),
    url("/ai/landing/patterns/cloud-pattern.svg");
  background-size: min(1240px, 95%) auto, min(980px, 78%) auto;
  background-position: center 8%, center 12%;
  opacity: 0.24;
  animation: forgeVeilShift calc(var(--forge-loop-duration, 4600ms) * 1.2) var(--ease-in-out, ease-in-out) infinite;
}

.fx-layer--wave {
  background-image:
    url("/ai/landing/patterns/wave-pattern.svg"),
    url("/ai/landing/patterns/wave-pattern.svg");
  background-size: min(980px, 80%) auto, min(760px, 64%) auto;
  background-position: center 84%, center 20%;
  opacity: calc(var(--fx-grid-opacity, 0.22) * 0.5);
  mix-blend-mode: soft-light;
  animation: forgeWaveDrift calc(var(--forge-loop-duration, 4600ms) * 0.95) linear infinite;
}

.fx-layer--knot {
  background-image:
    url("/ai/landing/patterns/tech-knot.svg"),
    url("/ai/landing/patterns/tech-knot.svg");
  background-size: min(420px, 34%) auto, min(320px, 28%) auto;
  background-position: left -2% top 22%, right 10% top 68%;
  opacity: calc(var(--fx-grid-opacity, 0.22) * 0.72);
  animation: forgeKnotFloat calc(var(--forge-loop-duration, 4600ms) * 1.08) var(--ease-in-out, ease-in-out) infinite;
}

.fx-layer--ring {
  background-image:
    url("/ai/landing/patterns/signal-ring.svg"),
    url("/ai/landing/patterns/signal-ring.svg");
  background-size: min(420px, 34%) auto, min(280px, 24%) auto;
  background-position: right -3% bottom 14%, left 12% top 14%;
  opacity: 0.34;
  animation: forgeRingBreathe calc(var(--forge-loop-duration, 4600ms) * 0.88) var(--ease-in-out, ease-in-out) infinite;
}

.fx-layer--grain {
  background-image:
    url("/ai/landing/patterns/matrix-grain.svg"),
    url("/ai/landing/patterns/stone-texture.svg");
  background-size: 260px auto, 360px auto;
  background-position: center, center;
  opacity: calc(var(--fx-particle-opacity, 0.18) * 0.64);
  mix-blend-mode: soft-light;
  animation: forgeGrainFlow calc(var(--forge-loop-duration, 4600ms) * 1.3) linear infinite;
}

.fx-layer--corners {
  background-image:
    url("/ai/landing/patterns/bronze-corner.svg"),
    url("/ai/landing/patterns/bronze-corner.svg"),
    url("/ai/landing/patterns/bronze-corner.svg"),
    url("/ai/landing/patterns/bronze-corner.svg");
  background-size: 46px 46px, 46px 46px, 46px 46px, 46px 46px;
  background-position:
    18px 16px,
    calc(100% - 18px) 16px,
    18px calc(100% - 16px),
    calc(100% - 18px) calc(100% - 16px);
  opacity: 0.16;
  animation: forgeCornersPulse calc(var(--forge-loop-duration, 4600ms) * 1.15) var(--ease-in-out, ease-in-out) infinite;
}

.is-fallback .fx-layer--veil {
  opacity: 0.28;
}

.is-fallback .fx-layer--wave {
  opacity: 0.16;
}

.is-fallback .fx-layer--knot,
.is-fallback .fx-layer--ring {
  opacity: 0.24;
}

.is-fallback .fx-layer--grain {
  opacity: 0.16;
}

.is-fallback .fx-layer--corners {
  opacity: 0.2;
}

.is-paused .fx-layer {
  animation-play-state: paused !important;
}

:global(:root[theme="dark"] .public-immersive-fx .fx-layer--corners) {
  opacity: 0.18;
}

:global(:root[theme="dark"] .public-immersive-fx .fx-layer--wave) {
  opacity: calc(var(--fx-grid-opacity, 0.28) * 0.56);
}

@keyframes forgeVeilShift {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0.2;
  }
  50% {
    transform: translate3d(0, -1.6%, 0);
    opacity: 0.26;
  }
  100% {
    transform: translate3d(0, 0.9%, 0);
    opacity: 0.22;
  }
}

@keyframes forgeWaveDrift {
  0% {
    background-position: center 86%, center 20%;
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.42);
  }
  50% {
    background-position: center 82%, center 24%;
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.58);
  }
  100% {
    background-position: center 86%, center 20%;
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.46);
  }
}

@keyframes forgeKnotFloat {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.68);
  }
  50% {
    transform: translate3d(0, -10px, 0) rotate(1deg);
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.78);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: calc(var(--fx-grid-opacity, 0.22) * 0.7);
  }
}

@keyframes forgeRingBreathe {
  0% {
    transform: scale(0.98);
    opacity: 0.28;
  }
  50% {
    transform: scale(1.03);
    opacity: 0.4;
  }
  100% {
    transform: scale(0.98);
    opacity: 0.3;
  }
}

@keyframes forgeGrainFlow {
  0% {
    background-position: center, center;
    opacity: calc(var(--fx-particle-opacity, 0.18) * 0.56);
  }
  50% {
    background-position: 44% 52%, 54% 48%;
    opacity: calc(var(--fx-particle-opacity, 0.18) * 0.7);
  }
  100% {
    background-position: center, center;
    opacity: calc(var(--fx-particle-opacity, 0.18) * 0.6);
  }
}

@keyframes forgeCornersPulse {
  0% {
    opacity: 0.14;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.14;
  }
}

@media (prefers-reduced-motion: reduce) {
  .public-immersive-fx {
    filter: none;
  }

  .fx-canvas {
    display: none;
  }

  .fx-layer--veil,
  .fx-layer--wave,
  .fx-layer--knot,
  .fx-layer--ring,
  .fx-layer--grain,
  .fx-layer--corners {
    opacity: 0.16;
    animation: none !important;
  }
}
</style>
