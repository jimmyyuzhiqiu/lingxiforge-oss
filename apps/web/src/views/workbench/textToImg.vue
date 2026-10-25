<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { textToImgPresets, textToImgGallery } from "@/data/siteContent";

const router = useRouter();

const prompt = ref(textToImgPresets[0].prompt);
const negativePrompt = ref("过度噪点、细节模糊、结构断裂、过饱和");
const style = ref("国潮写实");
const aspect = ref("1:1");
const steps = ref(28);
const count = ref(4);

const usePreset = (index: number) => {
  prompt.value = textToImgPresets[index].prompt;
};

const toImageTo3D = () => {
  router.push("/workbench/Image-To-3D");
};
</script>

<template>
  <div class="text-to-img">
    <header class="page-head">
      <div class="copy">
        <p class="eyebrow">工作台 · 文生图</p>
        <h2>概念图与风格探索</h2>
        <p class="summary">生成可用于评审与三维建模的参考图，支持风格与比例快速调整。</p>
      </div>
      <div class="chips">
        <span class="chip">高清输出</span>
        <span class="chip">风格模板</span>
        <span class="chip">批量生成</span>
      </div>
    </header>
    <section class="panel left">
      <div class="panel-head">
        <h3>生成设置</h3>
        <span class="hint">建议包含材质、尺寸与可打印约束。</span>
      </div>
      <el-form label-position="top">
        <el-form-item label="提示词">
          <el-input v-model="prompt" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="负面提示词">
          <el-input v-model="negativePrompt" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="风格">
          <el-select v-model="style" placeholder="选择风格">
            <el-option label="国潮写实" value="国潮写实" />
            <el-option label="插画扁平" value="插画扁平" />
            <el-option label="雕塑质感" value="雕塑质感" />
            <el-option label="PBR 材质" value="PBR 材质" />
          </el-select>
        </el-form-item>
        <el-form-item label="画幅比例">
          <el-radio-group v-model="aspect">
            <el-radio-button label="1:1" />
            <el-radio-button label="3:4" />
            <el-radio-button label="4:3" />
            <el-radio-button label="16:9" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生成步数">
          <el-slider v-model="steps" :min="10" :max="50" />
        </el-form-item>
        <el-form-item label="生成数量">
          <el-input-number v-model="count" :min="1" :max="8" />
        </el-form-item>
        <el-button type="primary" style="width: 100%">开始生成</el-button>
      </el-form>

      <div class="preset">
        <h4>精选预设</h4>
        <div class="preset-list">
          <div class="preset-card" v-for="(item, index) in textToImgPresets" :key="item.title"
            @click="usePreset(index)">
            <h5>{{ item.title }}</h5>
            <p>{{ item.prompt }}</p>
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel right">
      <div class="panel-head">
        <h3>生成结果</h3>
        <span class="hint">点击图片进入三维流程</span>
      </div>
      <div class="gallery">
        <el-card v-for="item in textToImgGallery" :key="item.id" class="gallery-card" @click="toImageTo3D">
          <img :src="item.cover" :alt="item.title" loading="lazy" decoding="async" />
          <div class="caption">{{ item.title }}</div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/textToImg.scss";
</style>
