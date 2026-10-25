<script setup lang="ts">
import { onMounted } from "vue";
import heroImg from "../../assets/images/toThreeBackground.png";
import { Right } from "@element-plus/icons-vue";
import { createTextAnimation } from "@/utils/createAnimation.ts";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  createTextAnimation(".toThree-top h1", "x", -200, 80, 20);
  createTextAnimation(".toThree-top p", "x", 200, 80, 20);
  createTextAnimation(".toThree-bottom .button-box", "x", -200, 80, 10);
});

const tryNow = () => {
  router.push("/workbench/Text-To-3D");
};
</script>

<template>
  <div class="container">
    <div class="background-container">
      <div class="background-box"></div>
    </div>
    <ul class="body-container">
      <li class="toThree-left">
        <img :src="heroImg" alt="从文字到 3D 的生成流程展示图" loading="lazy" decoding="async" />
      </li>
      <li class="right">
        <div class="toThree-top">
          <h1>从文字和图片到高质量</h1>
          <h1>3D模型</h1>
          <p>
            &emsp;&emsp;输入一句描述或一张参考图，Lingxi Forge 会先生成概念与多视角，再合成可编辑的 3D 网格，并自动给出可制造性优化建议（壁厚、悬垂、支撑与网格修复）。你可以用 GLB 预览审核，用 STL 直接对接打印工坊完成交付。
          </p>
        </div>
        <div class="toThree-bottom">
          <ul class="button-box" @click="tryNow" style="cursor: pointer">
            <li>立即体验</li>
            <li>
              <el-icon color="#ffffff" size="24">
                <Right />
              </el-icon>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/layout/components/toThree.scss";
</style>
