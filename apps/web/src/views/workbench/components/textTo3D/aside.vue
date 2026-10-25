<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { styleListType } from "@/types/workbench";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

const emit = defineEmits();
const props = defineProps(["isSmallScreen"]);

const router = useRouter();

const handleToggleAside = () => {
  emit("toggle-aside", !props.isSmallScreen);
};

//textarea指令词及copy方法
const { toClipboard } = useClipboard();
const prompt = ref<string>("");
const negativePrompt = ref<string>("");
const copyFn = async (value: string) => {
  try {
    await toClipboard(value);
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1000,
    });
  } catch (e) {
    console.log(e);
  }
};
const copy1 = async () => {
  await copyFn(prompt.value);
};
const copy2 = async () => {
  await copyFn(negativePrompt.value);
};

const value = ref("Lingxi Forge 1.0 Turbo");
const modelSelectList = [
  {
    value: "Lingxi Forge 1.0 Turbo",
    label: "Lingxi Forge 1.0 Turbo",
  },
  {
    value: "Open 3D",
    label: "Open 3D",
  },
  {
    value: "PointNet++",
    label: "PointNet++",
  },
  {
    value: "NVIDIA GauGAN",
    label: "NVIDIA GauGAN",
  },
  {
    value: "NeRF",
    label: "NeRF",
  },
];

//风格
const styleActiveIndex = ref<number>(-1);
const styleList = ref<styleListType[]>([
  { id: 0, title: "智能" },
  { id: 1, title: "写实" },
  { id: 2, title: "卡通" },
  { id: 3, title: "雕塑" },
  { id: 4, title: "低多边形" },
  { id: 5, title: "PBR" },
]);
const chose = (id: number) => {
  styleActiveIndex.value = id;
};
</script>

<template>
  <div class="aside-container">
    <section>
      <header class="big" ref="headerRef">
        <ul>
          <li class="left" @click="router.push('/home')">
            <i class="iconfont icon-xiangzuojiantou"></i>
          </li>
          <li class="center">
            <i class="iconfont icon-box"></i>
            <span>文生 3D</span>
          </li>
          <li class="right">
            <i :class="props.isSmallScreen
              ? 'iconfont icon-zhankai'
              : 'iconfont icon-zhedie'
              " @click="handleToggleAside"></i>
          </li>
        </ul>
      </header>
    </section>
    <el-scrollbar max-height="calc(100vh - 110px)">
      <section class="main" v-if="!props.isSmallScreen">
        <section class="prompt-container">
          <header>
            <p>提示词</p>
            <el-tooltip content="复制" placement="top-start">
              <i class="iconfont icon-copy" @click="copy1"></i>
            </el-tooltip>
          </header>
          <div class="prompt-box">
            <el-input v-model="prompt" autosize :maxlength="500" show-word-limit type="textarea"
              placeholder="描述你想要在生成中出现的内容" />
          </div>
        </section>

        <section class="negative-prompt-container">
          <header>
            <p>负面提示词</p>
            <el-tooltip content="复制" placement="top-start">
              <i class="iconfont icon-copy" @click="copy2"></i>
            </el-tooltip>
          </header>
          <div class="negative-prompt-box">
            <el-input v-model="negativePrompt" autosize :maxlength="500" show-word-limit type="textarea"
              placeholder="描述你想要在生成中排出的内容" />
          </div>
        </section>

        <section class="model-select">
          <p>模型</p>
          <el-select v-model="value" style="width: 150px" popper-class="select-popper" :popper-append-to-body="false">
            <el-option v-for="item in modelSelectList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </section>

        <section class="style-container">
          <p>风格</p>
          <ul>
            <li :class="styleActiveIndex === index ? 'active' : 'non-active'" v-for="(item, index) in styleList"
              :key="item.id" @click="chose(item.id)">
              <div>{{ item.title }}</div>
              <img v-if="styleActiveIndex === index" src="../../../../assets/images/Magic-Stick.png" alt="风格提示"
                loading="lazy" decoding="async" class="magic-indicator" />
            </li>
          </ul>
        </section>
      </section>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/components/textTo3D/aside";

.magic-indicator {
  animation: magicIndicatorPulse 1.6s ease-in-out infinite;
}

@keyframes magicIndicatorPulse {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
