<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import { BaseUserInfoType, MyWorkListType } from "@/types/home";
import { useRouter } from "vue-router";
import { userStats } from "@/data/siteContent";
import profileBanner from "@/assets/images/homeTest.png";
import avatarImg from "@/assets/images/avatar.png";
import RouteLoading from "@/components/RouteLoading.vue";

const router = useRouter();

const baseUserInfo = ref<BaseUserInfoType[]>([
  {
    id: 0,
    title: "粉丝",
    num: userStats.fans,
    path: "/usercenter/fans",
  },
  {
    id: 1,
    title: "关注",
    num: userStats.follow,
    path: "/usercenter/follow",
  },
  {
    id: 2,
    title: "作品获赞次数",
    num: userStats.likes,
    path: "/usercenter/like",
  },
  {
    id: 3,
    title: "作品被使用次数",
    num: userStats.used,
    path: "/usercenter/used",
  },
]);

const myWorkList = ref<MyWorkListType[]>([
  {
    id: 0,
    title: "我的生成",
    class: "iconfont icon-generate",
    components: [
      defineAsyncComponent(
        () => import("./components/usercenter/generate.vue")
      ),
    ],
  },
  {
    id: 1,
    title: "我的发布",
    class: "iconfont icon-share",
    components: [
      defineAsyncComponent(() => import("./components/usercenter/publish.vue")),
    ],
  },
  {
    id: 2,
    title: "我的收藏",
    class: "iconfont icon-Group",
    components: [
      defineAsyncComponent(() => import("./components/usercenter/collect.vue")),
    ],
  },
  {
    id: 3,
    title: "我的资产",
    class: "iconfont icon-coin",
    components: [
      defineAsyncComponent(() => import("./components/usercenter/assets.vue")),
    ],
  },
]);

const activeIndex = ref<number>(0);
const handleClick = (index: number) => {
  activeIndex.value = index;
  sessionStorage.setItem("UserCenterIndex", String(index));
};

onMounted(() => {
  let storedActive = sessionStorage.getItem("UserCenterIndex");
  storedActive != null
    ? (activeIndex.value = Number(storedActive))
    : (activeIndex.value = 0);
});
onUnmounted(() => {
  sessionStorage.removeItem("UserCenterIndex");
});
</script>

<template>
  <div>
    <section class="background-container" :style="{ 'background-image': `url(${profileBanner})` }">
    </section>
    <section class="userInfo-container">
      <header>
        <div class="top">
          <img :src="avatarImg" alt="灵犀造物头像" loading="lazy" decoding="async" />
          <span>编辑资料</span>
        </div>
        <div class="bottom">灵犀造物 · 官方账号</div>
      </header>
      <footer>
        <ul>
          <li v-for="item in baseUserInfo" :key="item.id" @click="router.push(item.path!)">
            <span class="number">{{ item.num }}</span>
            <span class="title">{{ item.title }}</span>
          </li>
        </ul>
      </footer>
    </section>
    <section class="view-container">
      <ul>
        <li v-for="(item, index) in myWorkList" :key="item.id" :class="activeIndex === item.id ? 'active' : ''"
          @click="handleClick(index)">
          <i :class="item.class"></i>
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <div class="container" v-for="(component, index) in myWorkList[activeIndex].components">
        <Suspense timeout="0">
          <component :is="component" :key="index"></component>
          <template #fallback>
            <RouteLoading :cards="3" compact />
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/home/usercenter";
</style>
