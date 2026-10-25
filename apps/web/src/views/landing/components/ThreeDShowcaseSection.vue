<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetch3dCatalog, open3dModels, type Open3DModel } from "@/data/threeDModels";

const router = useRouter();

const models = ref<Open3DModel[]>(open3dModels);
const previewModels = computed(() => models.value.slice(0, 6));

onMounted(async () => {
  const catalog = await fetch3dCatalog();
  if (catalog?.length) {
    models.value = catalog;
  }
});

const toGallery = (id?: string) => {
  router.push({
    path: "/gallery",
    query: id ? { id } : undefined,
  });
};
</script>

<template>
  <section class="section container" id="gallery-preview" aria-labelledby="gallery-title">
    <header class="head">
      <div>
        <h2 id="gallery-title">3D 资产库：把模型做成“可对外讲述的展品页”</h2>
        <p class="desc">
          本站已内置一组可商用（Public Domain）的 GLB 示例，用于演示在线预览、交互观察与“展品化叙事”模板。你的真实项目可替换为自有馆藏/联名资产。
        </p>
      </div>
      <div class="cta">
        <el-button plain @click="toGallery()">进入 3D 展品库</el-button>
        <el-button type="primary" @click="router.push({ path: '/apply', query: { intent: 'demo' } })">申请演示</el-button>
      </div>
    </header>

    <div class="grid">
      <article class="card glass-surface" v-for="m in previewModels" :key="m.id">
        <div class="thumb">
          <img :src="m.thumbnail" :alt="m.title" loading="lazy" decoding="async" />
          <span class="badge">{{ m.format }}</span>
        </div>
        <div class="meta">
          <div class="t">{{ m.title }}</div>
          <div class="s">{{ m.subtitle }}</div>
          <div class="tags" aria-label="模型标签">
            <span class="tag" v-for="t in m.tags.slice(0, 3)" :key="t">{{ t }}</span>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" @click="toGallery(m.id)">在线预览</el-button>
          <a v-if="m.sourcePage" class="link" :href="m.sourcePage" target="_blank" rel="noopener">来源与许可</a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

h2 {
  margin: 0;
}

.desc {
  margin: 10px 0 0;
  color: var(--font-color2);
  line-height: 1.7;
  max-width: 78ch;
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.card {
  padding: 18px;
  display: grid;
  gap: 12px;
  border-radius: var(--radius-xl);
  transition:
    transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
  background: var(--accent-soft-bg);
}

.thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: rgba(148, 163, 184, 0.08);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--glass-bg-strong);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
  font-family: var(--font-mono);
  letter-spacing: 0.4px;
}

.meta {
  display: grid;
  gap: 6px;
}

.t {
  font-weight: 900;
}

.s {
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.link {
  color: var(--font-color3);
  font-size: 13px;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
}

.link:hover {
  background: var(--accent-soft-bg);
  border-color: rgba(255, 255, 255, 0.14);
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
