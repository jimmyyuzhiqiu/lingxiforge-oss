<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { detailsContent, homeCarouselImages, homeHighlights, homeSections } from "@/data/siteContent";
import type { HomeResourceType } from "@/types/home";

const router = useRouter();

const sections = computed<HomeResourceType[]>(() => homeSections as HomeResourceType[]);

const goStart = () => router.push("/workbench/Text-To-3D");
const goShowcase = () => router.push("/showcase");
</script>

<template>
  <section class="product-overview" id="product">
    <header class="hero">
      <div class="left">
        <div class="brand">
          <span class="name">Lingxi Forge</span>
          <span class="tag">AI + 3D · 文创赋能</span>
        </div>
        <h1>让文创灵感，一键变成可打印的真实作品</h1>
        <p class="subtitle">
          面向博物馆文创与品牌合作：从提示词/参考图出发，生成可展示的 GLB 与可打印的 STL，并自动给出网格修复、壁厚与支撑建议。
        </p>
        <div class="cta">
          <el-button type="primary" @click="goStart">免费开始</el-button>
          <el-button plain @click="goShowcase">查看方案展示</el-button>
        </div>
        <div class="metrics">
          <div class="metric" v-for="m in detailsContent.metrics" :key="m.label">
            <div class="value">{{ m.value }}</div>
            <div class="label">{{ m.label }}</div>
          </div>
        </div>
      </div>

      <div class="right">
        <el-carousel height="340px" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in homeCarouselImages" :key="index">
            <img class="hero-img" :src="item.src" :alt="item.alt" loading="lazy" decoding="async" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </header>

    <section class="highlights">
      <h2>平台亮点</h2>
      <div class="highlight-grid">
        <article class="highlight-card" v-for="item in homeHighlights" :key="item.title">
          <img v-if="item.image" class="cover" :src="item.image" :alt="item.alt || item.title" loading="lazy"
            decoding="async" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="sections">
      <div class="sec-head">
        <h2>能力模块</h2>
        <el-button plain @click="goShowcase">深入了解</el-button>
      </div>
      <div class="sec-grid">
        <article class="sec-card" v-for="s in sections" :key="s.id" @click="router.push(s.path)">
          <div class="top">
            <h3>{{ s.title }}</h3>
            <p>{{ s.subTitle }}</p>
          </div>
          <div class="imgs">
            <img v-for="img in s.images.slice(0, 3)" :key="img.src" :src="img.src" :alt="img.alt" loading="lazy"
              decoding="async" />
          </div>
          <div class="more">
            <span>查看更多</span>
            <i class="iconfont icon-xiangyoujiantou"></i>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/productOverview.scss";
</style>
