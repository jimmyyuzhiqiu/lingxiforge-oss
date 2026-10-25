<script setup lang="ts">
import { ref } from "vue";
import { DrawerProps } from "element-plus";
import { vue3dLoader } from "vue-3d-loader";
import type { modelInfoListType, buttonListType } from "@/types/home";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

const drawer = ref<boolean>(false);
const direction = ref<DrawerProps["direction"]>("rtl");

//有关模型
const viewportHeight: number = window.innerHeight - 60;
const viewportWidth: number = window.innerWidth / 2;
const translateZValue = ref<number>(20);
const cameraPosition = ref({
  x: 0,
  y: 5,
  z: translateZValue.value,
});

//模型参数信息
const modelInfoList = ref<modelInfoListType[]>([
  {
    id: 0,
    title: "提示词",
    content:
      "cute boy character like dog for a game asset, t-pose, realistic, ultra-realistic,highly detailed, high resolution, highest quality, best quality, 4K, 8K, HDR, he is a dog boy, boy",
  },
  {
    id: 1,
    title: "负面提示词",
    content:
      "ugly, blurry, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry face, blurry body, blurry head, blurry hair, blurry eyes, blurry mouth",
  },
  {
    id: 2,
    title: "模型",
    content: "Lingxi Forge 3D Turbo",
  },
  {
    id: 3,
    title: "风格",
    content: "智能",
  },
  {
    id: 4,
    title: "随机种子",
    content: "5135448553131654",
  },
]);
const buttonList = ref<buttonListType[]>([
  { id: 0, title: "分享", className: "iconfont icon-share" },
  { id: 1, title: "下载", className: "iconfont icon-xiazai" },
  {
    id: 2,
    title: "3D打印",
    className: "iconfont icon-print",
    path: "/workbench/3D-Printing",
  },
]);

const operate = (id: number) => {
  switch (id) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      window.open(`${buttonList.value[id].path}`);
      break;
  }
};

//复制
const { toClipboard } = useClipboard();
const copyContent = async (id: number) => {
  try {
    await toClipboard(modelInfoList.value[id].content);
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1000,
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
<script lang="ts"></script>
<template>
  <ul class="myWork-view-container">
    <li v-for="item in 7" :key="item" @click="drawer = true">
      <img src="@/assets/images/brand4.png" alt="" />
    </li>
  </ul>

  <el-drawer v-model="drawer" title="模型详细" :direction="direction" size="80%">
    <div class="drawer-container" :style="{ height: `${viewportHeight - 50}px` }">
      <vue3dLoader class="three-show-container" filePath="/models/model3/nb574.obj"
        texture-image="/models/model3/nb574.jpeg" :width="viewportWidth" :height="viewportHeight"
        :backgroundColor="'#e1e1e1'" :enableGridHelper="true" :cameraRotation="{ x: 0, y: 0, z: 0 }"
        :cameraPosition="cameraPosition" :backgroundAlpha="0.5" />
      <section>
        <el-scrollbar max-height="calc(100vh - 110px)">
          <ul>
            <li v-for="item in modelInfoList" :key="item.id">
              <header>
                <p>{{ item.title }}</p>
                <el-tooltip v-if="item.id === 0 || item.id === 1" effect="dark" content="复制" placement="top-start">
                  <i class="iconfont icon-copy" @click="copyContent(item.id)"></i>
                </el-tooltip>
              </header>
              <p class="content">{{ item.content }}</p>
            </li>
          </ul>
          <footer class="button-container">
            <el-button type="primary" plain v-for="button in buttonList" :key="button.id" @click="operate(button.id)">
              <i :class="button.className"></i>
              <span>{{ button.title }}</span>
            </el-button>
          </footer>
        </el-scrollbar>
      </section>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
@import "@/styles/home/components/usercenter/publicUsercenter";
</style>
