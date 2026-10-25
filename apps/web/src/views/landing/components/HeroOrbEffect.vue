<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";

const containerRef = ref<HTMLDivElement | null>(null);
const useFallback = ref(false);

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let orbGroup: THREE.Group | null = null;
let orbMesh: THREE.Mesh | null = null;
let glowMesh: THREE.Mesh | null = null;
let surfacePoints: THREE.Points | null = null;
let haloPoints: THREE.Points | null = null;
let frameId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let heroEl: HTMLElement | null = null;
let prefersReduced = false;
let time = 0;

const orbUniforms: Record<string, THREE.IUniform> = {
  uTime: { value: 0 },
  uCore: { value: new THREE.Color() },
  uRim: { value: new THREE.Color() },
  uGlow: { value: new THREE.Color() },
  uGlowIntensity: { value: 0.9 },
  uFresnelPower: { value: 2.4 },
};

const surfaceUniforms: Record<string, THREE.IUniform> = {
  uTime: { value: 0 },
  uColorA: { value: new THREE.Color() },
  uColorB: { value: new THREE.Color() },
  uOpacity: { value: 0.55 },
  uSize: { value: 8.5 },
  uBoost: { value: 0 },
  uPixelRatio: { value: 1 },
};

const haloUniforms: Record<string, THREE.IUniform> = {
  uTime: { value: 0 },
  uColorA: { value: new THREE.Color() },
  uColorB: { value: new THREE.Color() },
  uOpacity: { value: 0.42 },
  uSize: { value: 6.5 },
  uBoost: { value: 0 },
  uPixelRatio: { value: 1 },
};

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch (error) {
    return false;
  }
};

const readColor = (el: HTMLElement, name: string, fallback: string) => {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  return new THREE.Color(raw || fallback);
};

const updateColors = () => {
  const target = containerRef.value || document.documentElement;
  const core = readColor(target, "--hero-orb-core", "#ffb67a");
  const rim = readColor(target, "--hero-orb-rim", "#ffd6a6");
  const glow = readColor(target, "--hero-orb-glow", "#ffb98d");
  const warm = readColor(target, "--hero-particle-warm", "#ffe3c2");
  const cool = readColor(target, "--hero-particle-cool", "#fff6e8");

  orbUniforms.uCore.value.copy(core);
  orbUniforms.uRim.value.copy(rim);
  orbUniforms.uGlow.value.copy(glow);

  surfaceUniforms.uColorA.value.copy(warm);
  surfaceUniforms.uColorB.value.copy(cool);
  haloUniforms.uColorA.value.copy(cool);
  haloUniforms.uColorB.value.copy(warm);

  if (glowMesh && glowMesh.material instanceof THREE.MeshBasicMaterial) {
    glowMesh.material.color.copy(glow);
  }
};

const createOrbMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: orbUniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uCore;
      uniform vec3 uRim;
      uniform vec3 uGlow;
      uniform float uGlowIntensity;
      uniform float uFresnelPower;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0), uFresnelPower);
        float pulse = 0.04 * sin(uTime * 0.6);
        vec3 base = mix(uCore, uRim, fresnel);
        vec3 color = base + uGlow * (fresnel * (uGlowIntensity + pulse));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true,
  });
};

const createPointsMaterial = (uniforms: Record<string, THREE.IUniform>) => {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      uniform float uTime;
      uniform float uSize;
      uniform float uBoost;
      uniform float uPixelRatio;
      attribute float aScale;
      attribute float aSeed;
      attribute float aMix;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vMix = aMix;
        float flicker = sin(uTime * 1.2 + aSeed * 6.283) * 0.5 + 0.5;
        vAlpha = flicker;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float size = (uSize + uBoost) * aScale * (0.6 + flicker);
        gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        float mask = smoothstep(0.5, 0.0, dist);
        vec3 color = mix(uColorA, uColorB, vMix);
        float alpha = mask * uOpacity * (0.55 + vAlpha * 0.45);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
};

const createParticleLayer = (count: number, radiusMin: number, radiusMax: number, uniforms: Record<string, THREE.IUniform>) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const seeds = new Float32Array(count);
  const mixes = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const radius = THREE.MathUtils.lerp(radiusMin, radiusMax, Math.random());
    const direction = new THREE.Vector3().randomDirection().multiplyScalar(radius);
    const index = i * 3;
    positions[index] = direction.x;
    positions[index + 1] = direction.y;
    positions[index + 2] = direction.z;
    scales[i] = THREE.MathUtils.lerp(0.6, 1.5, Math.random());
    seeds[i] = Math.random();
    mixes[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));

  const material = createPointsMaterial(uniforms);
  const points = new THREE.Points(geometry, material);
  return { points, geometry, material };
};

const updateLayout = () => {
  if (!renderer || !camera || !orbGroup || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const radius = Math.min(width, height) * 0.32;
  orbGroup.scale.setScalar(radius);
  camera.position.z = radius * 2.35;
  camera.position.y = radius * 0.08;

  surfaceUniforms.uPixelRatio.value = pixelRatio;
  haloUniforms.uPixelRatio.value = pixelRatio;

  const compact = window.innerWidth < 900;
  surfaceUniforms.uSize.value = compact ? 6.0 : 8.5;
  haloUniforms.uSize.value = compact ? 5.0 : 6.5;
};

const updateScrollLinked = () => {
  if (!heroEl) return { glow: 0.9, boost: 0, surfaceOpacity: 0.55, haloOpacity: 0.42 };
  const rect = heroEl.getBoundingClientRect();
  if (!rect.height) return { glow: 0.9, boost: 0, surfaceOpacity: 0.55, haloOpacity: 0.42 };
  const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
  return {
    glow: 0.85 + progress * 0.6,
    boost: progress * 4.0,
    surfaceOpacity: 0.5 + progress * 0.25,
    haloOpacity: 0.4 + progress * 0.35,
  };
};

const renderFrame = () => {
  if (!renderer || !scene || !camera) return;
  renderer.render(scene, camera);
};

const animate = () => {
  if (!renderer || !scene || !camera || !orbGroup) return;
  const delta = 0.016;
  time += delta;

  const scroll = updateScrollLinked();
  orbUniforms.uTime.value = time;
  orbUniforms.uGlowIntensity.value = THREE.MathUtils.lerp(
    orbUniforms.uGlowIntensity.value,
    scroll.glow,
    0.08
  );

  surfaceUniforms.uTime.value = time;
  haloUniforms.uTime.value = time;
  surfaceUniforms.uBoost.value = THREE.MathUtils.lerp(surfaceUniforms.uBoost.value, scroll.boost, 0.08);
  haloUniforms.uBoost.value = THREE.MathUtils.lerp(haloUniforms.uBoost.value, scroll.boost * 0.7, 0.08);
  surfaceUniforms.uOpacity.value = THREE.MathUtils.lerp(surfaceUniforms.uOpacity.value, scroll.surfaceOpacity, 0.08);
  haloUniforms.uOpacity.value = THREE.MathUtils.lerp(haloUniforms.uOpacity.value, scroll.haloOpacity, 0.08);

  orbGroup.rotation.y += delta * 0.08;
  orbGroup.rotation.x = Math.sin(time * 0.35) * 0.08;

  if (glowMesh) {
    const pulse = 1.08 + Math.sin(time * 0.5) * 0.03;
    glowMesh.scale.setScalar(pulse);
  }

  renderFrame();
  frameId = requestAnimationFrame(animate);
};

const setupScene = () => {
  if (typeof window === "undefined") return;
  const win = window as Window;
  if (!containerRef.value) return;

  prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsWebGL()) {
    useFallback.value = true;
    return;
  }

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (error) {
    useFallback.value = true;
    return;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = "block";
  containerRef.value.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 1, 5000);

  orbGroup = new THREE.Group();
  scene.add(orbGroup);

  const orbGeometry = new THREE.SphereGeometry(1, 96, 96);
  const orbMaterial = createOrbMaterial();
  orbMesh = new THREE.Mesh(orbGeometry, orbMaterial);
  orbGroup.add(orbMesh);

  const glowGeometry = new THREE.SphereGeometry(1.05, 72, 72);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffb98d"),
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  orbGroup.add(glowMesh);

  const compact = window.innerWidth < 900;
  const surfaceLayer = createParticleLayer(compact ? 900 : 1600, 0.98, 1.02, surfaceUniforms);
  surfacePoints = surfaceLayer.points;
  orbGroup.add(surfacePoints);

  const haloLayer = createParticleLayer(compact ? 1100 : 2200, 1.15, 1.45, haloUniforms);
  haloPoints = haloLayer.points;
  orbGroup.add(haloPoints);

  updateColors();
  updateLayout();

  heroEl = containerRef.value.closest("section");

  if ("ResizeObserver" in win) {
    resizeObserver = new ResizeObserver(() => updateLayout());
    resizeObserver.observe(containerRef.value);
  } else {
    win.addEventListener("resize", updateLayout);
  }

  themeObserver = new MutationObserver(() => updateColors());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["theme"] });

  if (prefersReduced) {
    renderFrame();
  } else {
    animate();
  }
};

onMounted(setupScene);

onUnmounted(() => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  resizeObserver?.disconnect();
  themeObserver?.disconnect();
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateLayout);
  }

  if (surfacePoints) {
    surfacePoints.geometry.dispose();
    (surfacePoints.material as THREE.Material).dispose();
  }
  if (haloPoints) {
    haloPoints.geometry.dispose();
    (haloPoints.material as THREE.Material).dispose();
  }
  orbMesh?.geometry.dispose();
  (orbMesh?.material as THREE.Material | undefined)?.dispose();
  glowMesh?.geometry.dispose();
  (glowMesh?.material as THREE.Material | undefined)?.dispose();

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }

  renderer = null;
  scene = null;
  camera = null;
  orbMesh = null;
  glowMesh = null;
  surfacePoints = null;
  haloPoints = null;
  orbGroup = null;
});
</script>

<template>
  <div ref="containerRef" class="hero-orb-layer" :class="{ 'use-fallback': useFallback }" aria-hidden="true">
    <div class="hero-orb-fallback"></div>
  </div>
</template>

<style scoped>
.hero-orb-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-orb-layer canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.hero-orb-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 300ms ease;
}

.hero-orb-fallback::before {
  content: "";
  width: min(68vmin, 520px);
  height: min(68vmin, 520px);
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, var(--hero-orb-core), var(--hero-orb-rim) 45%, transparent 68%);
  box-shadow:
    0 0 140px var(--hero-orb-glow),
    0 0 220px var(--hero-orb-glow);
}

.hero-orb-layer.use-fallback .hero-orb-fallback {
  opacity: 1;
}
</style>
