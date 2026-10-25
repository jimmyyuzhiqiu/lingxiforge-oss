<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { publicAsset } from "@/utils/publicAsset";

const router = useRouter();

type ModeKey = "museum" | "brand" | "maker" | "education";

const modes = [
  {
    key: "museum" as const,
    title: "馆方/机构",
    kicker: "馆藏转译 · 合规与内容体系",
    desc: "馆藏要素转译、主题策展、IP 合规与内容体系搭建。",
    image: publicAsset("ai/landing/coop-museum.webp"),
    alt: "馆方合作 · 授权边界与溯源留档",
    who: ["博物馆", "文旅单位", "非遗机构"],
    deliver: ["元素资产库", "专题展陈页模板", "授权与溯源留档"],
  },
  {
    key: "brand" as const,
    title: "品牌联名",
    kicker: "系列上新 · 渠道物料与复盘",
    desc: "联合打造系列化 SKU：从概念到可制造，再到渠道上新物料。",
    image: publicAsset("ai/landing/coop-brand.webp"),
    alt: "品牌联名 · 系列化 SKU 与产品化表达",
    who: ["消费品牌", "零售渠道", "线下空间"],
    deliver: ["系列设计方案", "打样与量产包", "渠道物料与复盘指标"],
  },
  {
    key: "maker" as const,
    title: "制造/工坊",
    kicker: "Print-ready · 质检与履约",
    desc: "以标准化交付包提升履约效率，降低返工与沟通成本。",
    image: publicAsset("ai/landing/coop-maker.webp"),
    alt: "制造履约 · 打样与质检流程",
    who: ["打印工坊", "加工厂", "材料供应"],
    deliver: ["print-ready 标准", "质检清单", "交付归档规范"],
  },
  {
    key: "education" as const,
    title: "教育/研究",
    kicker: "展教融合 · 课程与工作坊",
    desc: "把 3D 资产用于教育传播：课程、工作坊与展教活动。",
    image: publicAsset("ai/landing/coop-education.webp"),
    alt: "教育传播 · 数字资产与教学活动",
    who: ["高校", "研学机构", "公益项目"],
    deliver: ["课程模板", "案例拆解", "活动物料包"],
  },
];

const active = ref<ModeKey>("museum");
const activeMode = computed(() => modes.find((m) => m.key === active.value) ?? modes[0]);

const toApply = () => router.push("/apply");
const toCases = () => router.push("/cases");
const toTrust = () => router.push("/trust");
</script>

<template>
  <section class="section container" id="cooperation" aria-labelledby="coop-title">
    <div class="shell glass-card">
      <header class="head">
        <div class="copy">
          <span class="eyebrow">合作模式</span>
          <h2 id="coop-title">按角色分工，按交付对齐</h2>
          <p class="desc">
            把合作拆成清晰的输入/输出：你提供什么、我们做什么、最终交付什么。先把口径对齐，落地就会更快更稳。
          </p>
        </div>
        <div class="cta" aria-label="合作入口">
          <el-button type="primary" @click="toApply">提交合作申请</el-button>
          <el-button plain @click="toCases">查看案例</el-button>
          <el-button text @click="toTrust">交付与合规标准</el-button>
        </div>
      </header>

      <div class="body">
        <aside class="tabs glass-surface" role="tablist" aria-label="按角色选择合作模式">
          <button v-for="m in modes" :key="m.key" class="tab" type="button" role="tab"
            :aria-selected="active === m.key" :class="{ active: active === m.key }" @click="active = m.key">
            <div class="t">{{ m.title }}</div>
            <div class="s">{{ m.kicker }}</div>
          </button>
        </aside>

        <transition name="swap" mode="out-in">
          <div class="panel" :key="activeMode.key">
            <div class="media glass-surface">
              <img class="img" :src="activeMode.image" :alt="activeMode.alt" loading="lazy" decoding="async" />
            </div>
            <div class="summary glass-surface">
              <div class="k">合作目标</div>
              <p class="v">{{ activeMode.desc }}</p>
            </div>
            <div class="cols">
              <div class="card glass-surface">
                <div class="k">适用对象</div>
                <div class="chips">
                  <span class="chip" v-for="w in activeMode.who" :key="w">{{ w }}</span>
                </div>
              </div>
              <div class="card glass-surface">
                <div class="k">关键交付</div>
                <ul>
                  <li v-for="d in activeMode.deliver" :key="d">{{ d }}</li>
                </ul>
              </div>
            </div>
            <div class="next glass-surface">
              <div class="k">建议下一步</div>
              <div class="steps">
                <div class="step">
                  <div class="idx">1</div>
                  <div class="txt">提交参考图与需求（可选 NDA）</div>
                </div>
                <div class="step">
                  <div class="idx">2</div>
                  <div class="txt">输出落地建议：可制造约束 + 合规边界 + 周期</div>
                </div>
                <div class="step">
                  <div class="idx">3</div>
                  <div class="txt">按交付口径打样验证，沉淀为可复用模块</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.shell {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--radius-xl);
}

.shell::before {
  content: "";
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 18% 20%, var(--orb-1), transparent 56%),
    radial-gradient(circle at 88% 22%, var(--orb-2), transparent 60%),
    radial-gradient(circle at 70% 88%, var(--orb-3), transparent 58%);
  filter: blur(70px);
  opacity: 0.18;
  pointer-events: none;
}

.shell > * {
  position: relative;
  z-index: 1;
}

.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--font-color2);
  font-size: 12px;
  letter-spacing: 0.2px;
}

h2 {
  margin: 12px 0 8px;
  letter-spacing: 0.2px;
}

.desc {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.75;
  max-width: 76ch;
}

.cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.body {
  display: grid;
  grid-template-columns: 0.36fr 0.64fr;
  gap: 16px;
  align-items: start;
}

.tabs {
  padding: 10px;
  border-radius: var(--radius-xl);
  display: grid;
  gap: 10px;
}

.tab {
  appearance: none;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  border-radius: 16px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
  color: var(--font-color1);
}

.tab:hover {
  border-color: rgba(255, 255, 255, 0.22);
  background: var(--accent-soft-bg);
}

.tab.active {
  background: var(--accent-soft-bg);
  border-color: rgba(255, 255, 255, 0.22);
}

.tab .t {
  font-weight: 950;
  letter-spacing: 0.2px;
}

.tab .s {
  margin-top: 6px;
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.5;
}

.panel {
  display: grid;
  gap: 12px;
}

.media {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

.media .img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  display: block;
}

.summary,
.card,
.next {
  padding: 14px;
  border-radius: var(--radius-xl);
}

.k {
  font-weight: 950;
}

.v {
  margin: 10px 0 0;
  color: var(--font-color2);
  line-height: 1.75;
  font-size: 13px;
}

.cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg-strong);
  color: var(--font-color2);
}

ul {
  margin: 10px 0 0;
  padding-left: 18px;
  color: var(--font-color2);
  line-height: 1.75;
  font-size: 13px;
  display: grid;
  gap: 6px;
}

.steps {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.step {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
}

.idx {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 900;
  background: var(--accent-soft-bg);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.txt {
  color: var(--font-color2);
  line-height: 1.7;
  font-size: 13px;
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity var(--motion-slow) var(--ease-out),
    transform var(--motion-slow) var(--ease-out);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }

  .swap-enter-from,
  .swap-leave-to {
    transform: none;
  }
}

@media (max-width: 980px) {
  .head {
    flex-direction: column;
    align-items: flex-start;
  }

  .body {
    grid-template-columns: 1fr;
  }

  .tabs {
    grid-template-columns: 1fr;
  }

  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
