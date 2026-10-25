<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import type { iconfontListType } from "@/types/home";
import RouteLoading from "@/components/RouteLoading.vue";

const router = useRouter();
const inputValue = ref("");

const iconActive = ref<string>(
  sessionStorage.getItem("IdeasNavigatorIndex") || "0"
);
const iconfontList = ref<iconfontListType[]>([
  [
    {
      id: 0,
      title: "流行趋势",
      icon: "iconfont icon-rise",
      path: "/home/ideas/trend",
    },
    {
      id: 1,
      title: "人气热门",
      icon: "iconfont icon-hot",
      path: "/home/ideas/hot",
    },
    {
      id: 2,
      title: "最新发布",
      icon: "iconfont icon-flashlight",
      path: "/home/ideas/news",
    },
    {
      id: 3,
      title: "最多点赞",
      icon: "iconfont icon-aixin",
      path: "/home/ideas/likes",
    },
    {
      id: 4,
      title: "明星创作者",
      icon: "iconfont icon-mtiIcon-renyuan-bianji",
      path: "/home/ideas/star-creator",
    },
  ],
  [
    {
      id: 5,
      title: "分类导航",
      icon: "iconfont icon-shaixuanfenlei",
      path: "/",
    },
    {
      id: 6,
      title: "筛选工具",
      icon: "iconfont icon-shaixuan",
      path: "/",
    },
  ],
]);
const handleActive = (id: number) => {
  iconActive.value = String(id);
  sessionStorage.setItem("IdeasNavigatorIndex", String(id));
  router.push(iconfontList.value[0][id].path!);
};

onMounted(() => {
  // let storedActive = sessionStorage.getItem("IdeasNavigatorIndex");
  // storedActive != null ? iconActive.value = Number(storedActive) : iconActive.value = 0;
  iconActive.value != null ? iconActive.value : "0";
});

onUnmounted(() => {
  sessionStorage.removeItem("IdeasNavigatorIndex");
});
</script>

<template>
  <div class="container">
    <header>
      <el-icon>
        <Search />
      </el-icon>
      <input type="text" v-model="inputValue" placeholder="搜索更多" />
    </header>
    <div class="operation">
      <ul class="left">
        <li :class="{ active: Number(iconActive) === item1.id }" v-for="item1 in iconfontList[0]" :key="item1.id"
          @click="handleActive(item1.id)">
          <i :class="item1.icon"></i>
          <span>{{ item1.title }}</span>
        </li>
      </ul>
      <ul class="right">
        <li v-for="item2 in iconfontList[1]" :key="item2.id">
          <i :class="item2.icon"></i>
          <span>{{ item2.title }}</span>
        </li>
      </ul>
    </div>
    <router-view v-slot="{ Component, route }">
      <Suspense timeout="0">
        <component :is="Component" :key="route.fullPath" :id="iconActive" :keyword="inputValue" />
        <template #fallback>
          <RouteLoading :cards="3" compact />
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
@import url("../../styles/home/ideas.scss");
</style>
