<script setup lang="ts">
import WaterFall from "@/components/WaterFall.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Star, View } from "@element-plus/icons-vue";
import type { Ideas_Components_DataList_ItemType } from "@/types/home";
import { postDiscover } from "@/api/home/index.ts";

const props = defineProps(["id"]);

const align = ref("center");

// 加载更多数据函数
const pageNum = ref(1);
const pageSize = ref<number>(15);
const hasNext = ref<boolean>(false);
const type = ref<number>(props.id);
const list = ref<Ideas_Components_DataList_ItemType[]>([]);
const loadMoreData = async () => {
  const data = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: type.value,
  };
  const res = await postDiscover(data);
  hasNext.value = res.data?.pageInfo.hasNext!;
  if (res.data?.coverList) {
    list.value = [
      ...list.value,
      ...(res.data.coverList as Ideas_Components_DataList_ItemType[]),
    ];
    pageNum.value++;
  }
};

// 处理滚动事件
const scrollContainer = ref<HTMLElement>(document.querySelector(".waterfall-container")!);
const parentHeight = ref(`${window.innerHeight - 200}px`);
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  if (scrollTop + clientHeight === scrollHeight && hasNext.value) {
    hasNext.value = false;
    loadMoreData();
  }
};

//处理回到顶部
const backTop = () => {
  scrollContainer.value?.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(async () => {
  scrollContainer.value.addEventListener("scroll", handleScroll);
  await loadMoreData();
});
onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div ref="scrollContainer" class="waterfall-container" :style="{ height: parentHeight }">
    <WaterFall :width="205" :align="align" :list="list">
      <template #ideasPart="{ $avatar, $username, $shelfDate, $views, $favorites }">
        <footer class="waterfall-item">
          <ul class="top">
            <li>
              <img :src="$avatar" alt="" />
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
            </li>
            <li>
              <el-icon>
                <Star />
              </el-icon>
              <span>{{ $favorites }}</span>
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
