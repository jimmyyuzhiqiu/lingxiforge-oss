<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { pressAssets, pressReleases, newsroomUpdates } from "@/data/marketingContent";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Calendar, Download, Bell, ArrowRight, Picture, Collection } from "@element-plus/icons-vue";

const router = useRouter();

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const subscribeMailto = computed(() => {
  const subject = encodeURIComponent("Lingxi Forge 更新订阅");
  const body = encodeURIComponent("请将我加入 Lingxi Forge 更新邮件列表。我的关注方向：产品更新 / 合作动态 / 安全公告 / 案例拆解。");
  return `mailto:subscribe@lingxiforge.com?subject=${subject}&body=${body}`;
});

const gallery = [
  { src: `${base}/showcase/lingxi-museum/assets/s01-1.png`, alt: "平台概览" },
  { src: `${base}/showcase/lingxi-museum/assets/s06-2.png`, alt: "痛点与路径" },
  { src: `${base}/showcase/lingxi-museum/assets/s09-1.png`, alt: "在线设计与云端智造" },
  { src: `${base}/showcase/lingxi-museum/assets/s12-1.png`, alt: "可制造优化" },
  { src: `${base}/showcase/lingxi-museum/assets/s14-2.png`, alt: "案例应用" },
  { src: `${base}/showcase/lingxi-museum/assets/s24-1.png`, alt: "社会价值" },
] as const;

const releaseNarratives = [
  {
    date: "2026-01-29",
    title: "发布声明：面向博物馆文创的 AI + 3D 打印一体化平台",
    summary:
      "Lingxi Forge 把“灵感、建模、可制造、履约”串成同一条交付链路，帮助馆方与品牌从一次创意走向长期上新能力。",
    highlights: [
      "以文化语义为起点，围绕器型、纹样与材质建立可复用模板。",
      "把 print-ready 检查前置，降低试打样失败率与返工成本。",
      "支持从小批量试做到系列化上新，形成稳定履约节奏。",
    ],
  },
  {
    date: "2026-01-24",
    title: "合作通道开放：馆方/IP、品牌与制造网络协作",
    summary:
      "我们将合作流程拆为可执行模块：角色分流、授权确认、样例试做、标准固化与规模化交付，让跨组织协作更清晰。",
    highlights: [
      "按角色定义对接口径与文档清单，减少沟通损耗。",
      "将授权要求与生产标准同步前置，降低上线风险。",
      "支持多方协作的版本留档与责任追踪。",
    ],
  },
] as const;

const mediaUsageRules = [
  "引用品牌名时，优先使用“Lingxi Forge（灵犀造物）”。",
  "若使用媒体素材，请保留原始比例，不拉伸、不覆盖水印区域。",
  "涉及合作案例时，需按授权范围标注来源与用途。",
  "如需高分辨率 Logo/VI 或可编辑素材，请通过媒体通道申请。",
] as const;

const lightboxOpen = ref(false);
const activeImage = ref<(typeof gallery)[number] | null>(null);

const open = (img: (typeof gallery)[number]) => {
  activeImage.value = img;
  lightboxOpen.value = true;
};

const close = () => {
  lightboxOpen.value = false;
  activeImage.value = null;
};
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <div class="left">
            <h1>新闻中心｜公告、新闻稿与媒体资料包</h1>
            <p class="subtitle">
              这里集中发布平台公告、新闻稿、产品更新与媒体使用规范，面向媒体、合作伙伴与企业客户提供可复用的对外资料入口。
            </p>
            <div class="cta">
              <el-button type="primary" plain @click="router.push('/contact?type=media')">媒体联系</el-button>
              <el-button plain @click="router.push('/resources')">资源中心</el-button>
              <el-button plain @click="router.push('/trust')">信任与安全</el-button>
            </div>
          </div>

          <div class="right">
            <div class="subscribe glass-surface">
              <div class="k">
                <el-icon><Bell /></el-icon>
                <span>订阅更新</span>
              </div>
              <p class="muted">
                通过邮件订阅更新（无需登录）。后续可接入 Newsletter/邮件系统并提供退订机制。
              </p>
              <a class="link" :href="subscribeMailto">
                发送订阅邮件
                <el-icon><ArrowRight /></el-icon>
              </a>
              <div class="note">提示：当前订阅邮箱为 `subscribe@lingxiforge.com`。</div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>公告与新闻稿</h2>
            <el-button plain @click="router.push('/contact?type=media')">获取资料包</el-button>
          </div>
          <div class="news">
            <article class="item glass-surface" v-for="p in pressReleases" :key="p.date + p.title">
              <div class="top">
                <div class="date">
                  <el-icon><Calendar /></el-icon>
                  <span>{{ p.date }}</span>
                </div>
                <span class="badge">{{ p.category }}</span>
              </div>
              <div class="title">{{ p.title }}</div>
              <div class="desc">{{ p.desc }}</div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>新闻稿正文摘要</h2>
            <el-button plain @click="router.push('/partners')">查看合作路径</el-button>
          </div>
          <div class="longform">
            <article class="story glass-surface" v-for="n in releaseNarratives" :key="n.date + n.title">
              <div class="date">
                <el-icon><Calendar /></el-icon>
                <span>{{ n.date }}</span>
              </div>
              <div class="title">{{ n.title }}</div>
              <p class="desc">{{ n.summary }}</p>
              <ul class="bullets">
                <li v-for="pt in n.highlights" :key="pt">{{ pt }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>产品更新（节奏感）</h2>
            <el-button plain @click="router.push('/resources')">查看更多资源</el-button>
          </div>
          <div class="updates">
            <article class="update glass-surface" v-for="u in newsroomUpdates" :key="u.date + u.title">
              <div class="date">
                <el-icon><Calendar /></el-icon>
                <span>{{ u.date }}</span>
              </div>
              <div class="title">{{ u.title }}</div>
              <div class="desc">{{ u.desc }}</div>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>媒体资料包（下载）</h2>
            <el-button plain @click="router.push('/contact?type=media')">联系获取更多素材</el-button>
          </div>
          <div class="assets">
            <article class="asset glass-surface" v-for="a in pressAssets" :key="a.file">
              <img v-if="a.preview" class="preview" :src="`${base}${a.preview}`" :alt="a.title" loading="lazy"
                decoding="async" />
              <div class="title">{{ a.title }}</div>
              <div class="desc">{{ a.desc }}</div>
              <div class="actions">
                <a class="download" :href="`${base}${a.file}`" download>
                  <el-icon><Download /></el-icon>
                  下载
                </a>
                <el-button plain @click="router.push('/contact?type=media')">申请授权素材</el-button>
              </div>
            </article>
          </div>
          <p class="note">
            说明：下载区提供可公开传播素材。若需更完整的 Logo/VI/媒体资料，请通过“媒体与公关”通道申请授权后获取。
          </p>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>媒体使用规范</h2>
            <el-button plain @click="router.push('/ip')">查看 IP 合规</el-button>
          </div>
          <div class="usage glass-card">
            <ul>
              <li v-for="rule in mediaUsageRules" :key="rule">{{ rule }}</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <div class="sec-head">
            <h2>媒体素材库（可用图片）</h2>
            <el-button plain @click="router.push('/showcase')">查看方案展示</el-button>
          </div>
          <div class="gallery">
            <button class="g-item" v-for="img in gallery" :key="img.src" type="button" @click="open(img)">
              <img :src="img.src" :alt="img.alt" loading="lazy" decoding="async" />
              <div class="cap">
                <el-icon><Picture /></el-icon>
                <span>{{ img.alt }}</span>
              </div>
            </button>
          </div>
        </section>

        <section class="section bottom glass-card">
          <div class="k">
            <el-icon><Collection /></el-icon>
            <span>让合作伙伴一眼看懂“怎么合作”</span>
          </div>
          <p class="muted">
            新闻中心之外，合作伙伴更关心可验证的信息：授权与合规、可制造标准、履约能力与对接方式。建议与“信任中心/材料与质量/合作伙伴”页面组合展示。
          </p>
          <div class="cta">
            <el-button type="primary" @click="router.push('/partners')">合作伙伴</el-button>
            <el-button plain @click="router.push('/ip')">IP 合规</el-button>
            <el-button plain @click="router.push('/materials')">材料与质量</el-button>
          </div>
        </section>

        <teleport to="body">
          <div v-if="lightboxOpen" class="lightbox" @click.self="close" role="dialog" aria-modal="true">
            <button class="lb-close" type="button" @click="close" aria-label="关闭">×</button>
            <figure class="lb-frame">
              <img v-if="activeImage" class="lb-img" :src="activeImage.src" :alt="activeImage.alt" />
              <figcaption v-if="activeImage" class="lb-caption">{{ activeImage.alt }}</figcaption>
            </figure>
          </div>
        </teleport>

        <SiteFooter />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.top-header {
  z-index: 20;
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 0;
}

.main {
  padding: 0 0 40px;
}

.hero {
  margin: 90px auto 18px;
  width: min(1180px, 92%);
  padding: 26px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 14px;
}

.subtitle {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 10px 0 14px;
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.subscribe {
  border-radius: 16px;
  padding: 14px;
}

.k {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 8px;
}

.muted {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.link {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color1);
}

.note {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;

  h2 {
    margin: 12px 0;
  }
}

.sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.news,
.updates {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.longform {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.story {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.bullets {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  font-size: 13px;
  line-height: 1.6;
  display: grid;
  gap: 6px;
}

.item,
.update {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--font-color4);
  font-size: 12px;
}

.badge {
  font-size: 12px;
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  padding: 3px 10px;
  border-radius: 999px;
}

.title {
  font-weight: 900;
}

.desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
}

.assets {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.asset {
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.preview {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(148, 163, 184, 0.08);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--font-color2);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.g-item {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.g-item img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.cap {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--font-color2);
  font-size: 13px;
}

.bottom {
  padding: 18px;
}

.usage {
  padding: 16px;
}

.usage ul {
  margin: 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.65;
  display: grid;
  gap: 8px;
  font-size: 13px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(2, 6, 23, 0.72);
  display: grid;
  place-items: center;
  padding: 18px;
}

.lb-frame {
  width: min(980px, 96vw);
  max-height: 84vh;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 10px;
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
}

.lb-img {
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: 12px;
}

.lb-caption {
  margin-top: 8px;
  color: rgba(226, 232, 240, 0.9);
  font-size: 13px;
}

.lb-close {
  position: fixed;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(15, 23, 42, 0.6);
  color: rgba(226, 232, 240, 0.95);
  font-size: 22px;
  cursor: pointer;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .news,
  .updates,
  .longform,
  .assets,
  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
