<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { contactChannels, type ContactChannelKey } from "@/data/marketingContent";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { CopyDocument, Promotion, ChatDotRound } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();
const { toClipboard } = useClipboard();

const defaultTab: ContactChannelKey = "sales";

const active = computed<ContactChannelKey>({
  get() {
    const raw = String(route.query.type || "").toLowerCase();
    const keys = new Set(contactChannels.map((c) => c.key));
    return (keys.has(raw as ContactChannelKey) ? (raw as ContactChannelKey) : defaultTab);
  },
  set(v) {
    router.replace({ path: "/contact", query: { type: v } });
  },
});

const currentChannel = computed(() => contactChannels.find((c) => c.key === active.value) || contactChannels[0]);

const form = reactive({
  name: "",
  email: "",
  org: "",
  message: "",
});

watch(
  () => active.value,
  () => {
    // keep the form but nudge user with a helpful placeholder
    if (!form.message) {
      form.message =
        "请描述你的目标（SKU/系列/交付时间）、参考素材（链接或说明）、预期材料/工艺，以及你希望我们协助的部分。";
    }
  },
  { immediate: true }
);

const buildMailto = (to: string, subject: string, body: string) => {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${encodeURIComponent(to)}?subject=${s}&body=${b}`;
};

const sendEmail = () => {
  const c = currentChannel.value;
  const subject = `Lingxi Forge 联系｜${c.title}${form.org ? `｜${form.org}` : ""}`;
  const body = [
    `类型：${c.title}`,
    `姓名：${form.name || "（未填）"}`,
    `邮箱：${form.email || "（未填）"}`,
    `机构/团队：${form.org || "（未填）"}`,
    "",
    "需求描述：",
    form.message || "（未填）",
  ].join("\n");

  window.location.href = buildMailto(c.email, subject, body);
};

const copy = async (text: string) => {
  try {
    await toClipboard(text);
    ElMessage.success("已复制");
  } catch {
    ElMessage.error("复制失败，请手动复制");
  }
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
            <h1>联系我们｜销售、合作、支持与安全披露入口</h1>
            <p class="subtitle">
              为提高对接效率，我们将联系入口按任务分流：销售咨询、合作伙伴、技术支持、媒体公关与安全披露。请选择对应通道，我们会在承诺时效内响应。
            </p>
            <div class="tips glass-surface">
              <div class="k">
                <el-icon><ChatDotRound /></el-icon>
                <span>建议提供的信息</span>
              </div>
              <ul>
                <li>你要做的产品类型（冰箱贴/摆件/灯罩/积木等）与目标人群</li>
                <li>参考素材（图片/链接/风格描述）与授权情况</li>
                <li>预期材料/工艺（树脂/PLA/尼龙等）与交期</li>
                <li>你希望我们协助的环节：生成、可制造优化、试打样或履约</li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="channels glass-surface">
              <div class="k">
                <el-icon><Promotion /></el-icon>
                <span>快速入口</span>
              </div>
              <div class="chips">
                <button v-for="c in contactChannels" :key="c.key" class="chip" :class="{ active: active === c.key }"
                  @click="active = c.key">
                  {{ c.title }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <el-tabs v-model="active" type="card" class="tabs">
            <el-tab-pane v-for="c in contactChannels" :key="c.key" :name="c.key" :label="c.title">
              <div class="pane">
                <div class="pane-left glass-surface">
                  <div class="title">{{ c.title }}</div>
                  <div class="desc">{{ c.desc }}</div>
                  <div class="meta">
                    <div class="row">
                      <span class="label">邮箱</span>
                      <span class="value">{{ c.email }}</span>
                      <el-button size="small" plain @click="copy(c.email)">
                        <el-icon><CopyDocument /></el-icon>
                        复制
                      </el-button>
                    </div>
                    <div class="row">
                      <span class="label">响应</span>
                      <span class="value">{{ c.expectedReply }}</span>
                    </div>
                  </div>
                  <div class="topics">
                    <div class="label">常见主题</div>
                    <div class="tags">
                      <span class="tag" v-for="t in c.topics" :key="t">{{ t }}</span>
                    </div>
                  </div>
                </div>

                <div class="pane-right glass-card">
                  <div class="form-title">发送邮件（无需登录）</div>
                  <el-form label-position="top">
                    <el-form-item label="姓名">
                      <el-input v-model="form.name" placeholder="怎么称呼你" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="form.email" placeholder="便于我们回复" />
                    </el-form-item>
                    <el-form-item label="机构/团队（可选）">
                      <el-input v-model="form.org" placeholder="博物馆/品牌/工作室/工坊等" />
                    </el-form-item>
                    <el-form-item label="需求描述">
                      <el-input v-model="form.message" type="textarea" :rows="6"
                        placeholder="目标、参考素材、材料工艺、交期、希望我们协助的环节…" />
                    </el-form-item>
                    <div class="actions">
                      <el-button type="primary" @click="sendEmail">打开邮件客户端</el-button>
                      <el-button plain @click="router.push('/trust')">信任与安全</el-button>
                    </div>
                    <div class="hint">
                      说明：当前后端未接入表单系统，所以用邮件方式完成沟通；上线后可接入 CRM、工单与追踪编号。
                    </div>
                  </el-form>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>

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
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;
}

.subtitle {
  color: var(--font-color2);
  line-height: 1.6;
  margin: 10px 0 14px;
}

.tips {
  border-radius: 16px;
  padding: 14px;

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.6;
    display: grid;
    gap: 6px;
  }
}

.channels {
  border-radius: 16px;
  padding: 14px;
}

.k {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  margin-bottom: 10px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
  color: var(--font-color2);
  transition: all 0.2s ease;
}

.chip:hover {
  background: var(--background4-hover);
  color: var(--font-color1);
}

.chip.active {
  background: var(--accent-soft-bg);
  color: var(--font-color1);
  border-color: var(--accent);
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;
}

.pane {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 12px;
}

.pane-left {
  border-radius: 16px;
  padding: 16px;
}

.pane-left .title {
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 6px;
}

.pane-left .desc {
  color: var(--font-color2);
  line-height: 1.6;
  font-size: 13px;
  margin-bottom: 12px;
}

.meta {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.label {
  color: var(--font-color4);
  font-size: 12px;
  min-width: 52px;
}

.value {
  color: var(--font-color2);
  font-size: 13px;
}

.topics .tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag {
  font-size: 12px;
  color: var(--font-color3);
  background: var(--accent-soft-bg);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 4px 10px;
}

.pane-right {
  border-radius: 16px;
  padding: 16px;
}

.form-title {
  font-weight: 900;
  margin-bottom: 12px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.hint {
  margin-top: 10px;
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .pane {
    grid-template-columns: 1fr;
  }
}
</style>
