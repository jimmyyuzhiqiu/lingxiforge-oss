<script setup lang="ts">
import { ref } from "vue";
import { userModels } from "@/data/siteContent";

const props = defineProps(["isSmallSecondScreen"]);
const emit = defineEmits();

const search = ref<string>("");

//筛选器
const value = ref("");
const cities = [
  {
    value: "Beijing",
  },
  {
    value: "Shanghai",
  },
  {
    value: "Nanjing",
  },
  {
    value: "Chengdu",
  },
  {
    value: "Shenzhen",
  },
  {
    value: "Guangzhou",
  },
];

//处理展开或折叠
const handlePreview = () => {
  emit("handle-preview", !props.isSmallSecondScreen);
};

//处理分页器
const currentPage = ref<number>(1);
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};
const pageSize = ref<number>(10);
const history = userModels.generated;
const selected = ref(history[0]);

//处理折叠
const activeNames = ref<string[]>(["1"]);
</script>

<template>
  <el-scrollbar min-height="calc(100vh - 60px)">
    <div class="preview-container">
      <section class="header-container">
        <ul class="header">
          <li class="left">
            <el-icon>
              <Search />
            </el-icon>
            <el-input v-model="search" style="width: 200px" placeholder="搜索我的生成" />
          </li>
          <li class="right">
            <div class="filter">
              <el-select v-model="value" placeholder="筛选" style="width: 80px" multiple>
                <el-option v-for="item in cities" :key="item.value" :value="item.value">
                  <span>{{ item.value }}</span>
                  <span slot="suffix">{{ item.value }}</span>
                </el-option>
              </el-select>
            </div>
            <i :class="props.isSmallSecondScreen
              ? 'iconfont icon-zhankai'
              : 'iconfont icon-zhedie'
              " @click="handlePreview"></i>
          </li>
        </ul>
      </section>
      <section class="main-container" v-if="!isSmallSecondScreen">
        <!--    指令区-->
        <div class="prompt-container">
          <header class="prompt-preview">
            <el-scrollbar max-height="150px">
              <p class="scrollbar-item">{{ selected.prompt }}</p>
              <br />
              <p class="scrollbar-item">{{ selected.negativePrompt }}</p>
            </el-scrollbar>
          </header>
          <footer class="info-box">
            <ul>
              <li class="top">
                <div>
                  <span>{{ selected.style }}</span>
                  <img src="@/assets/images/Magic-Stick.png" alt="风格提示" loading="lazy" decoding="async" />
                </div>
                <div>{{ selected.model }}</div>
              </li>
              <li class="bottom">
                <el-button type="primary" plain>
                  <i class="iconfont icon-shuaxin"></i>
                  重新生成
                </el-button>
                <el-button type="primary" plain>
                  <i class="iconfont icon-delete"></i>
                  删除
                </el-button>
              </li>
            </ul>
          </footer>
        </div>
        <!--    图片预览-->
        <div class="img-container">
          <header>
            <p>图片预览</p>
          </header>

          <main class="img-box">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="点击预览" name="1">
                <el-scrollbar>
                  <div class="scrollbar-flex-content">
                    <img v-for="item in history" :key="item.id" :src="item.cover" :alt="item.title" loading="lazy"
                      decoding="async" @click="selected = item" />
                  </div>
                </el-scrollbar>
              </el-collapse-item>
            </el-collapse>
          </main>
          <footer>
            <el-button type="primary" plain>下一步</el-button>
          </footer>
        </div>
        <!--    模型预览-->
        <div class="model-container">
          <header>
            <p>模型预览</p>
          </header>
          <!--          <main>-->
          <!--            <vue3dLoader class="three" :rotation="rotation" @load="onLoad()" filePath="/models/model3/nb574.obj"-->
          <!--                         textureImage="/models/model3/nb574.jpeg" :backgroundColor="'#e1e1e1'"-->
          <!--                         :cameraPosition="{ x: 1, y: -5, z: -20 }"-->
          <!--                         :height="200" :controlsOptions="{-->
          <!--                              enablePan: false,-->
          <!--                              enableZoom: true,-->
          <!--                              enableRotate: true,-->
          <!--                            }" />-->
          <!--          </main>-->
        </div>
      </section>
      <section class="pagination-container" v-if="!isSmallSecondScreen">
        <div class="demo-pagination-block">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" layout="prev, pager, next"
            :total="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </section>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/textTo3D/preview";
</style>
