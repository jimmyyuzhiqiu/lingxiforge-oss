<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import feature1 from "../../assets/images/img1.png";
import feature2 from "../../assets/images/img2.png";
import feature3 from "../../assets/images/img3.png";
import { createBatchAnimation } from "@/utils/createAnimation.ts";
import type { IntroduceImgListType } from "@/types/layout";

gsap.registerPlugin(ScrollTrigger);

const theme = ref(document.documentElement.getAttribute("theme"));
const introduceImgList = ref<IntroduceImgListType[]>([
  { id: 0, img: feature1, title: "文生概念图" },
  { id: 1, img: feature2, title: "文生 3D" },
  { id: 2, img: feature3, title: "图生 3D" },
]);

onMounted(() => {
  const html = document.documentElement;
  theme.value = html.getAttribute("theme");
  const observer = new MutationObserver(() => {
    theme.value = html.getAttribute("theme");
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ["theme"],
  });

  //标题动画
  gsap.fromTo(
    ".title",
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".title",
        start: "top bottom",
        end: "bottom 50%+=100px",
        scrub: true,
      },
    }
  );
  //图片动画
  createBatchAnimation(".image", 0.2, 70, 20);
});
</script>

<template>
  <div>
    <div class="ellipse-box">
      <img src="../../assets/images/Ellipse1.svg" alt="" />
      <img src="../../assets/images/Ellipse2.svg" alt="" />
      <img src="../../assets/images/Star1.svg" alt="" />
      <!--      <img class="title" src="../../assets/images/introduceTitle.svg" alt="" />-->
      <img v-if="theme === 'light'" class="title" src="../../assets/images/introduceTitle.svg" alt="核心能力" />
      <img v-else class="title" src="../../assets/images/introduceTitleDark.svg" alt="核心能力" />
    </div>
    <ul>
      <li class="image" v-for="i in introduceImgList" :key="i.id">
        <img :src="i.img" :alt="i.title || '功能示意图'" loading="lazy" decoding="async" />
        <span>{{ i.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/layout/components/introduce.scss";
</style>
