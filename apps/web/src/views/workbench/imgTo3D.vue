<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { textToImgGallery } from "@/data/siteContent";

const previewUrl = ref<string>("");
const prompt = ref("参考图为青铜纹样与祥云元素，生成适合 3D 打印的小体量摆件。");
const style = ref("国潮写实");
const detail = ref(65);
const size = ref("12cm");
const material = ref("树脂");
const texture = ref(true);
const optimize = ref(true);
const count = ref(1);

const referenceGallery = textToImgGallery.slice(0, 4);

const handleUpload = (file: any) => {
  const raw = file?.raw || file;
  if (!raw) return;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(raw);
};

const useReference = (cover: string) => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = cover;
};

onBeforeUnmount(() => {
  if (previewUrl.value && previewUrl.value.startsWith("blob:")) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<template>
  <div class="img-to-3d">
    <header class="page-head">
      <div class="copy">
        <p class="eyebrow">工作台 · 图生 3D</p>
        <h2>参考图 → 可制造 3D</h2>
        <p class="summary">上传图像，补充材质与尺度，生成可打印 3D 资产与结构建议。</p>
      </div>
      <div class="chips">
        <span class="chip">可制造优化</span>
        <span class="chip">纹理保真</span>
        <span class="chip">支持多视角</span>
      </div>
    </header>

    <section class="panel left">
      <div class="panel-head">
        <h3>输入配置</h3>
        <span class="hint">图生 3D 会自动识别主体并修复网格。</span>
      </div>

      <el-upload class="upload" drag :auto-upload="false" :show-file-list="false" accept="image/*"
        @change="handleUpload">
        <div v-if="previewUrl" class="upload-preview">
          <img :src="previewUrl" alt="参考图预览" />
          <div class="upload-mask">点击替换参考图</div>
        </div>
        <div v-else class="upload-placeholder">
          <i class="iconfont icon-image"></i>
          <p>拖拽或点击上传参考图</p>
          <span>支持 JPG / PNG，建议大于 1024px</span>
        </div>
      </el-upload>

      <div class="form-grid">
        <el-form label-position="top" class="form">
          <el-form-item label="提示词补充">
            <el-input v-model="prompt" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item label="风格">
            <el-select v-model="style" placeholder="选择风格">
              <el-option label="国潮写实" value="国潮写实" />
              <el-option label="雕塑质感" value="雕塑质感" />
              <el-option label="釉面陶瓷" value="釉面陶瓷" />
              <el-option label="金属浮雕" value="金属浮雕" />
            </el-select>
          </el-form-item>
          <el-form-item label="细节强度">
            <el-slider v-model="detail" :min="30" :max="90" />
          </el-form-item>
        </el-form>

        <el-form label-position="top" class="form">
          <el-form-item label="尺寸">
            <el-select v-model="size">
              <el-option label="8cm" value="8cm" />
              <el-option label="12cm" value="12cm" />
              <el-option label="18cm" value="18cm" />
            </el-select>
          </el-form-item>
          <el-form-item label="材质">
            <el-select v-model="material">
              <el-option label="树脂" value="树脂" />
              <el-option label="PLA" value="PLA" />
              <el-option label="尼龙" value="尼龙" />
            </el-select>
          </el-form-item>
          <el-form-item label="生成数量">
            <el-input-number v-model="count" :min="1" :max="4" />
          </el-form-item>
        </el-form>
      </div>

      <div class="toggle-row">
        <el-switch v-model="texture" />
        <span>纹理保留</span>
        <el-switch v-model="optimize" />
        <span>结构优化</span>
      </div>

      <el-button type="primary" class="primary-btn">开始生成</el-button>

      <div class="reference">
        <h4>参考图库</h4>
        <div class="reference-grid">
          <button v-for="item in referenceGallery" :key="item.id" class="ref-card" @click="useReference(item.cover)">
            <img :src="item.cover" :alt="item.title" loading="lazy" decoding="async" />
            <span>{{ item.title }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="panel right">
      <div class="panel-head">
        <h3>生成结果</h3>
        <span class="status">待生成</span>
      </div>

      <div class="result-preview" :class="{ empty: !previewUrl }">
        <img v-if="previewUrl" :src="previewUrl" alt="生成参考预览" />
        <div v-else class="placeholder">
          <p>上传参考图后即可生成预览</p>
          <span>将展示模型视角与可打印评估</span>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-card">
          <span class="label">预计面数</span>
          <span class="value">48k - 72k</span>
        </div>
        <div class="meta-card">
          <span class="label">可打印等级</span>
          <span class="value">高</span>
        </div>
        <div class="meta-card">
          <span class="label">预计耗时</span>
          <span class="value">6-10 分钟</span>
        </div>
        <div class="meta-card">
          <span class="label">输出格式</span>
          <span class="value">GLB / STL</span>
        </div>
      </div>

      <div class="timeline">
        <div class="step">
          <span class="dot"></span>
          <div>
            <h5>结构重建</h5>
            <p>根据参考图构建基础体素与网格。</p>
          </div>
        </div>
        <div class="step">
          <span class="dot"></span>
          <div>
            <h5>细节增强</h5>
            <p>增强纹样与局部雕刻细节。</p>
          </div>
        </div>
        <div class="step">
          <span class="dot"></span>
          <div>
            <h5>可制造优化</h5>
            <p>自动加厚与支撑建议，确保可打印。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/workbench/imgTo3D.scss";
</style>
