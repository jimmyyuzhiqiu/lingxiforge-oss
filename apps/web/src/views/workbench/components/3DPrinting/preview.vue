<script lang="ts" setup>
import { vue3dLoader } from "vue-3d-loader";
import { onMounted, ref } from "vue";

const viewportHeight: number = window.innerHeight - 60;
const viewportWidth: number = window.innerWidth;
const translateZValue = ref<number>(20);
const cameraPosition = ref({
  x: 0,
  y: 5,
  z: translateZValue.value,
});

onMounted(() => {
  let container = document.querySelector(".viewer-container") as HTMLElement;
  container.setAttribute("style", "width:100%;height:100%;overflow:hidden");
});
</script>
<template>
  <section>
    <header class="big" ref="headerRef">
      <ul>
        <li class="center">
          <i class="iconfont icon-eye"></i>
          <span>打印效果预览</span>
        </li>
      </ul>
    </header>
  </section>

  <vue3dLoader class="three-show-container" filePath="/models/model3/nb574.obj"
               texture-image="/models/model3/nb574.jpeg"
               :width="viewportWidth" :height="viewportHeight" :backgroundColor="'#e1e1e1'" :enableGridHelper="true"
               :cameraRotation="{ x: 0, y: 0, z: 0 }" :cameraPosition="cameraPosition" :backgroundAlpha="0.5" />
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/3DPrinting/preview";
</style>
