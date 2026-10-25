<script setup lang="ts">
import { Bell, CirclePlus } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores";

const router = useRouter();
const themeStore = useThemeStore();

const theme = computed(() => themeStore.mode);

const toHomePage = () => {
  sessionStorage.setItem("AsideIndex", "0");
  router.push("/home");
};

const toActivity = () => {
  sessionStorage.setItem("AsideIndex", "2");
  router.push("/home/activity");
};

const toUserCenter = () => {
  sessionStorage.setItem("AsideIndex", "3");
  router.push("/home/usercenter");
};

const toPublish = () => {
  sessionStorage.setItem("AsideIndex", "3");
  sessionStorage.setItem("UserCenterIndex", "1");
  router.push("/home/usercenter");
};
</script>

<template>
  <div class="header-shell">
    <ul>
      <li class="left" @click="toHomePage">
        <img src="@/assets/images/LOGE.svg" alt="Lingxi Forge 标识" />
        <h1>Lingxi Forge</h1>
      </li>
      <li class="right">
        <div class="publish" @click="toPublish">
          <el-icon size="20">
            <CirclePlus />
          </el-icon>
          <p>发布</p>
        </div>
        <button @click="themeStore.toggle()">
          <i v-if="theme === 'light'" class="iconfont icon-moon" style="color: var(--font-color1)"></i>
          <i v-else class="iconfont icon-taiyang-copy" style="color: var(--font-color1)"></i>
          <span>{{ theme === "light" ? "夜间模式" : "日间模式" }}</span>
        </button>
        <footer>
          <el-icon size="20" class="clickable" @click="toActivity">
            <Bell />
          </el-icon>
          <!-- <el-avatar :size="30" :src="circleUrl" /> -->
          <el-avatar :size="30" class="clickable" @click="toUserCenter" />
        </footer>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url("../styles/components/header.scss");
</style>
