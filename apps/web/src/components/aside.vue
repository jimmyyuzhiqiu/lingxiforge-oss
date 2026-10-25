<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { asideListType } from "@/types/components";

const router = useRouter();
const route = useRoute();

const activeIndex = ref<number>(Number(sessionStorage.getItem("AsideIndex") || "0"));
const asideList = ref<asideListType[]>([
  [
    {
      id: 0,
      name: "首页",
      class: "iconfont icon-home",
      path: "/home/home",
    },
    {
      id: 1,
      name: "发现灵感",
      class: "iconfont icon-compass",
      path: "/home/ideas",
    },
    {
      id: 2,
      name: "活动中心",
      class: "iconfont icon-gift",
      path: "/home/activity",
    },
    {
      id: 3,
      name: "个人中心",
      class: "iconfont icon-user",
      path: "/home/usercenter",
    },
  ],
  [
    {
      id: 4,
      name: "三维生成",
      class: "iconfont icon-box",
      path: "/workbench/Text-To-3D",
    },
    {
      id: 5,
      name: "图生 3D",
      class: "iconfont icon-image",
      path: "/workbench/Image-To-3D",
    },
    {
      id: 6,
      name: "图像生成",
      class: "iconfont icon-image",
      path: "/workbench/Text-To-Img",
    },
    {
      id: 7,
      name: "打印工坊",
      class: "iconfont icon-print",
      path: "/workbench/3D-Printing",
    },
  ],
  [
    {
      id: 8,
      name: "使用文档",
      class: "iconfont icon-file-text",
      path: "/home/docs",
    },
    {
      id: 9,
      name: "系统设置",
      class: "iconfont icon-setting",
      path: "/home/settings",
    },
  ],
]);

const indexFromPath = (path: string): number => {
  if (path.startsWith("/home/ideas")) return 1;
  if (path === "/home/activity") return 2;
  if (path === "/home/usercenter") return 3;
  if (path.startsWith("/workbench/Text-To-3D")) return 4;
  if (path.startsWith("/workbench/Image-To-3D")) return 5;
  if (path.startsWith("/workbench/Text-To-Img")) return 6;
  if (path.startsWith("/workbench/3D-Printing")) return 7;
  if (path === "/home/docs") return 8;
  if (path === "/home/settings") return 9;
  return 0;
};

const handleActive = (id: number, path: string) => {
  activeIndex.value = id;
  sessionStorage.setItem("AsideIndex", String(id));
  router.push(path);
};

onMounted(() => {
  activeIndex.value = indexFromPath(route.path);
  sessionStorage.setItem("AsideIndex", String(activeIndex.value));
});

watch(
  () => route.path,
  (path) => {
    const next = indexFromPath(path);
    if (activeIndex.value !== next) {
      activeIndex.value = next;
      sessionStorage.setItem("AsideIndex", String(activeIndex.value));
    }
  }
);
</script>

<template>
  <div class="container">
    <header>
      <ul>
        <li class="top" v-for="item1 in asideList[0]" :key="item1.id" :class="{ active: activeIndex === item1.id }"
          @click="handleActive(item1.id, item1.path)">
          <i :class="item1.class" style="color: var(--aside-text-color)"></i>
          <span>{{ item1.name }}</span>
        </li>
      </ul>
    </header>
    <main>
      <ul>
        <li class="top" v-for="item2 in asideList[1]" :key="item2.id" :class="{ active: activeIndex === item2.id }"
          @click="handleActive(item2.id, item2.path)">
          <i :class="item2.class" style="color: var(--aside-text-color)"></i>
          <span>{{ item2.name }}</span>
        </li>
      </ul>
    </main>
    <footer>
      <ul>
        <li class="top" v-for="item3 in asideList[2]" :key="item3.id" :class="{ active: activeIndex === item3.id }"
          @click="handleActive(item3.id, item3.path)">
          <i :class="item3.class" style="color: var(--aside-text-color)"></i>
          <span>{{ item3.name }}</span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import url("../styles/components/aside.scss");
</style>
