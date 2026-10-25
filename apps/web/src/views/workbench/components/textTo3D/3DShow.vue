<script lang="ts" setup>
import { vue3dLoader } from "vue-3d-loader";
import { onMounted, onUnmounted, ref } from "vue";

const containerRef = ref<HTMLElement | null>(null);
const viewportWidth = ref(0);
const viewportHeight = ref(0);
let resizeObserver: ResizeObserver | null = null;

const updateSize = () => {
  if (!containerRef.value) return;
  const { width, height } = containerRef.value.getBoundingClientRect();
  viewportWidth.value = Math.max(1, Math.floor(width));
  viewportHeight.value = Math.max(1, Math.floor(height));
};

const translateZValue = ref(-1);
const cameraPosition = ref({
  x: 0,
  y: 5,
  z: translateZValue.value,
});
const rotation = ref({ x: -Math.PI / 2, y: 0, z: 0 });

onMounted(() => {
  updateSize();
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => updateSize());
    if (containerRef.value) resizeObserver.observe(containerRef.value);
  } else {
    window.addEventListener("resize", updateSize, { passive: true });
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  window.removeEventListener("resize", updateSize);
});
</script>

<template>
  <div ref="containerRef" class="viewer-container">
    <vue3dLoader
      class="three-show-container"
      filePath="/models/test3.obj"
      :width="viewportWidth"
      :height="viewportHeight"
      :backgroundColor="'#e1e1e1'"
      :rotation="rotation"
      :enableGridHelper="true"
      :cameraPosition="cameraPosition"
      :backgroundAlpha="0.5"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/textTo3D/3DShow";
</style>
