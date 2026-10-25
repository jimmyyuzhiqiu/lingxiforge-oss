<script setup lang="ts">
import WaterFall from "@/components/WaterFall.vue";
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { Star, View } from "@element-plus/icons-vue";
import { ideaItems } from "@/data/siteContent";
import type { IdeaItem, IdeaType } from "@/data/siteContent";

const props = defineProps<{
  typeKey: IdeaType;
  keyword?: string;
}>();

const align = ref("center");
const pageNum = ref(1);
const pageSize = ref<number>(15);
const hasNext = ref<boolean>(false);
const list = ref<IdeaItem[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);
const parentHeight = ref(`${window.innerHeight - 200}px`);

const filtered = computed(() => {
  const keyword = (props.keyword || "").trim().toLowerCase();
  const base = ideaItems.filter((item) => item.type === props.typeKey);
  if (!keyword) return base;
  return base.filter((item) => {
    const pool = [item.title, item.username, item.shelfDate, item.summary, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    return pool.includes(keyword);
  });
});

const loadMoreData = async () => {
  const start = (pageNum.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  const page = filtered.value.slice(start, end);
  list.value = [...list.value, ...page];
  pageNum.value++;
  hasNext.value = end < filtered.value.length;
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  if (scrollTop + clientHeight >= scrollHeight - 5 && hasNext.value) {
    hasNext.value = false;
    loadMoreData();
  }
};

const backTop = () => {
  scrollContainer.value?.scrollTo({ top: 0, behavior: "smooth" });
};

const resetAndLoad = () => {
  pageNum.value = 1;
  list.value = [];
  loadMoreData();
};

watch(
  () => [props.typeKey, props.keyword],
  () => resetAndLoad(),
  { immediate: true }
);

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", handleScroll);
  }
});
onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div ref="scrollContainer" class="waterfall-container" :style="{ height: parentHeight }">
    <WaterFall :width="205" :align="align" :list="list">
      <template #ideasPart="{ item, $avatar, $username, $shelfDate, $views, $favorites }">
        <footer class="waterfall-item">
          <div class="title">{{ item.title }}</div>
          <div class="summary">{{ item.summary }}</div>
          <ul class="tags">
            <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
          </ul>
          <ul class="top">
            <li>
              <img :src="$avatar" :alt="`${$username} 头像`" loading="lazy" decoding="async" />
            </li>
            <li>
              <h4>{{ $username }}</h4>
              <p>{{ $shelfDate }}</p>
            </li>
          </ul>
          <ul class="bottom">
            <li>
              <el-icon>
                <View />
              </el-icon>
              <span>{{ $views }}</span>
              <em>{{ props.typeKey === "star" ? "作品" : "浏览" }}</em>
            </li>
            <li>
              <el-icon>
                <Star />
              </el-icon>
              <span>{{ $favorites }}</span>
              <em>{{ props.typeKey === "star" ? "粉丝" : "点赞" }}</em>
            </li>
          </ul>
        </footer>
      </template>
    </WaterFall>
    <i class="iconfont icon-backtop backTop" @click="backTop"></i>
  </div>
</template>

<style scoped lang="scss">
@import url("../../../../styles/home/components/ideas/publicWaterfall.scss");
</style>
