<script setup lang="ts">
import { onMounted, ref } from "vue";
import img1 from "../../assets/images/img4.svg";
import img2 from "../../assets/images/toStartBackground.svg";
import img3 from "../../assets/images/img5.svg";
import img4 from "../../assets/images/img6.svg";
import heroImg from "../../assets/images/toStartBackground2.png";
import { Right } from "@element-plus/icons-vue";
import type { imagesTopListType, imagesBottomListType } from "@/types/layout";
import {
  createTextAnimation,
  createBatchAnimation,
} from "@/utils/createAnimation.ts";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "vue-router";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const imagesTopList = ref<imagesTopListType[]>([
  { id: 0, img: img1, title: "生成流程示意图" },
  { id: 1, img: img2, title: "材质与纹样氛围图" },
]);
const imagesBottomList = ref<imagesBottomListType[]>([
  { id: 0, img: img3, title: "可制造优化示意图" },
  { id: 1, img: img4, title: "3D 网格与打印示意图" },
]);

onMounted(() => {
  ScrollTrigger.refresh();
  //图片动画
  createBatchAnimation(".img-container .start-top img", 0.15, 60, 20);
  createBatchAnimation(".img-container .start-bottom img", 0.15, 60, 20);

  //标题动画
  createTextAnimation(".start-left .top .start-title", "x", -200, 80, 15);
  createTextAnimation(".start-left .top .start-subtitle", "x", 200, 80, 15);
  createTextAnimation(".start-bottom .start-button-box", "x", -200, 80, 15);

  // 刷新 ScrollTrigger
  gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
});

const tryNow = () => {
  router.push("/workbench/3D-Printing");
};
</script>

<template>
  <div class="container">
    <div class="background-container">
      <div class="background-box1"></div>
      <div class="background-box2"></div>
    </div>
    <ul class="img-container">
      <li class="start-top">
        <img v-for="i in imagesTopList" :key="i.id" :src="i.img" :alt="i.title || '展示图'" loading="lazy"
          decoding="async" />
      </li>
      <li class="start-bottom">
        <img v-for="i in imagesBottomList" :key="i.id" :src="i.img" :alt="i.title || '展示图'" loading="lazy"
          decoding="async" />
      </li>
    </ul>
    <ul class="body-container">
      <li class="start-left">
        <div class="top">
          <h1 class="start-title">开启你的 AI + 3D 打印之旅，</h1>
          <h1 class="start-title">把创意快速变成可交付的实体作品</h1>
          <p class="start-subtitle">
            &emsp;&emsp;Lingxi Forge 将“灵感—生成—可制造优化—打印交付”打包成一条顺滑的工作流：从文字/图片快速生成 3D 模型，并自动给出壁厚、支撑与网格修复建议；支持多材质与多精度方案，适配文创小件、展陈模型与批量打样场景。
          </p>
        </div>
        <div class="start-bottom">
          <ul class="start-button-box" @click="tryNow" style="cursor: pointer">
            <li>立即体验</li>
            <li>
              <el-icon color="#ffffff" size="24">
                <Right />
              </el-icon>
            </li>
          </ul>
        </div>
      </li>
      <li class="start-right">
        <img :src="heroImg" alt="3D 打印作品展示图" loading="lazy" decoding="async" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/layout/components/start.scss";
</style>
