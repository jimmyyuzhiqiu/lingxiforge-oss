<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Radius,
  Life,
  Body,
  BoxZone,
  Vector3D,
  RadialVelocity,
  Alpha,
  Scale,
  Color,
  SpriteRenderer,
} from "three-nebula";

const containerRef = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.OrthographicCamera | null = null;
let system: System | null = null;
let emitter: Emitter | null = null;
let zone: BoxZone | null = null;
let alphaBehavior: Alpha | null = null;
let animationId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let heroEl: HTMLElement | null = null;
let lastDensity = -1;
let lastOpacity = -1;
let spriteTexture: THREE.Texture | null = null;
let spriteMaterial: THREE.SpriteMaterial | null = null;

const BASE_CONFIG = {
  rateMin: 6,
  rateMax: 12,
  timeMin: 0.04,
  timeMax: 0.1,
  radiusMin: 6,
  radiusMax: 18,
  alpha: 0.5,
};

const COMPACT_CONFIG = {
  rateMin: 3,
  rateMax: 6,
  timeMin: 0.06,
  timeMax: 0.14,
  radiusMin: 4,
  radiusMax: 12,
  alpha: 0.35,
};

const REDUCED_CONFIG = {
  rateMin: 1,
  rateMax: 2,
  timeMin: 0.3,
  timeMax: 0.6,
  radiusMin: 3,
  radiusMax: 8,
  alpha: 0.22,
};

const clock = new THREE.Clock();
let activeConfig = { ...BASE_CONFIG, reduce: false } as typeof BASE_CONFIG & { reduce: boolean };

const normalizeColor = (raw: string | null, fallback: string) => {
  if (!raw) return fallback;
  const value = raw.trim();
  if (!value) return fallback;
  if (value.startsWith("#")) return value;
  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]
      .split(",")
      .map((part) => Number.parseFloat(part.trim()))
      .filter((n) => Number.isFinite(n));
    if (parts.length >= 3) {
      return `${Math.round(parts[0])}, ${Math.round(parts[1])}, ${Math.round(parts[2])}`;
    }
  }
  const plainMatch = value.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (plainMatch) {
    return `${plainMatch[1]}, ${plainMatch[2]}, ${plainMatch[3]}`;
  }
  return fallback;
};

const getThemeColors = (container: HTMLElement) => {
  const styles = getComputedStyle(container);
  return {
    orb1: normalizeColor(styles.getPropertyValue("--orb-1"), "148, 197, 255"),
    orb2: normalizeColor(styles.getPropertyValue("--orb-2"), "196, 206, 255"),
    accent: normalizeColor(styles.getPropertyValue("--accent"), "14, 165, 233"),
  };
};

const createSprite = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    spriteMaterial = new THREE.SpriteMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Sprite(spriteMaterial);
  }
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.55)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  spriteTexture = new THREE.CanvasTexture(canvas);
  spriteTexture.minFilter = THREE.LinearFilter;
  spriteTexture.magFilter = THREE.LinearFilter;
  spriteTexture.needsUpdate = true;
  spriteMaterial = new THREE.SpriteMaterial({
    map: spriteTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Sprite(spriteMaterial);
};

const getConfig = () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return { ...REDUCED_CONFIG, reduce: true };
  const compact = window.innerWidth < 900;
  return compact
    ? { ...COMPACT_CONFIG, reduce: false }
    : { ...BASE_CONFIG, reduce: false };
};

const updateLayout = () => {
  if (!renderer || !camera || !zone || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  zone.width = width;
  zone.height = height;
  zone.depth = 200;

  const nextConfig = getConfig();
  if (nextConfig.reduce !== activeConfig.reduce) {
    activeConfig = nextConfig;
  } else if (window.innerWidth < 900 && activeConfig.rateMin !== COMPACT_CONFIG.rateMin) {
    activeConfig = nextConfig;
  } else if (window.innerWidth >= 900 && activeConfig.rateMin !== BASE_CONFIG.rateMin) {
    activeConfig = nextConfig;
  }

  if (emitter) {
    emitter.rate.numPan.a = activeConfig.rateMin;
    emitter.rate.numPan.b = activeConfig.rateMax;
    emitter.rate.timePan.a = activeConfig.timeMin;
    emitter.rate.timePan.b = activeConfig.timeMax;
    emitter.rate.init();
  }
  if (alphaBehavior) {
    alphaBehavior.reset(activeConfig.alpha, 0);
  }
};

const updateScrollLinkedParams = () => {
  if (!heroEl || !containerRef.value || !emitter) return;
  const rect = heroEl.getBoundingClientRect();
  if (!rect.height) return;
  const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
  const density = 0.55 + progress * 0.6;
  const opacity = 0.45 + progress * 0.35;

  if (Math.abs(density - lastDensity) > 0.03) {
    emitter.rate.numPan.a = activeConfig.rateMin * density;
    emitter.rate.numPan.b = activeConfig.rateMax * density;
    emitter.rate.timePan.a = activeConfig.timeMin / density;
    emitter.rate.timePan.b = activeConfig.timeMax / density;
    emitter.rate.init();
    lastDensity = density;
  }

  if (Math.abs(opacity - lastOpacity) > 0.02) {
    containerRef.value.style.opacity = opacity.toFixed(3);
    lastOpacity = opacity;
  }
};

const animate = () => {
  if (!renderer || !scene || !camera || !system) return;
  const delta = clock.getDelta();
  updateScrollLinkedParams();
  system.update(delta);
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
};

const setup = () => {
  if (typeof window === "undefined") return;
  const win = window as Window;
  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    requestAnimationFrame(setup);
    return;
  }

  heroEl = container.closest("section");
  activeConfig = getConfig();

  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(rect.width, rect.height);
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(
    -rect.width / 2,
    rect.width / 2,
    rect.height / 2,
    -rect.height / 2,
    1,
    1000
  );
  camera.position.z = 240;

  const colors = getThemeColors(container);
  const sprite = createSprite();

  system = new System();
  emitter = new Emitter();
  zone = new BoxZone(0, 0, 0, rect.width, rect.height, 200);

  emitter.setRate(
    new Rate(
      new Span(activeConfig.rateMin, activeConfig.rateMax),
      new Span(activeConfig.timeMin, activeConfig.timeMax)
    )
  );

  emitter.setInitializers([
    new Position(zone),
    new Body(sprite),
    new Radius(new Span(activeConfig.radiusMin, activeConfig.radiusMax)),
    new Life(new Span(3, 6)),
    new RadialVelocity(new Span(2, 8), new Vector3D(0, 1, 0), 180),
  ]);

  alphaBehavior = new Alpha(activeConfig.alpha, 0);

  emitter.setBehaviours([
    alphaBehavior,
    new Scale(0.8, 1.6),
    new Color([colors.orb1, colors.orb2, colors.accent], [colors.orb1, colors.orb2, colors.accent]),
  ]);

  system.addEmitter(emitter);
  system.addRenderer(new SpriteRenderer(scene, THREE));
  system.emit();

  updateLayout();

  if (activeConfig.reduce) {
    for (let i = 0; i < 24; i += 1) {
      system.update(0.016);
    }
    renderer.render(scene, camera);
  } else {
    clock.start();
    animate();
  }

  if ("ResizeObserver" in win) {
    resizeObserver = new ResizeObserver(() => updateLayout());
    resizeObserver.observe(container);
  } else {
    win.addEventListener("resize", updateLayout);
  }
};

onMounted(setup);

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  resizeObserver?.disconnect();
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateLayout);
  }

  system?.destroy();
  system = null;
  emitter = null;
  alphaBehavior = null;
  zone = null;

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
  if (spriteMaterial) {
    spriteMaterial.dispose();
  }
  if (spriteTexture) {
    spriteTexture.dispose();
  }
  renderer = null;
  scene = null;
  camera = null;
  spriteMaterial = null;
  spriteTexture = null;
});
</script>

<template>
  <div ref="containerRef" class="hero-nebula" aria-hidden="true"></div>
</template>

<style scoped>
.hero-nebula {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
}

.hero-nebula canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
