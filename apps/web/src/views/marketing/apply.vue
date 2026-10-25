<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { ElMessage, type FormInstance, type FormRules, type UploadFile, type UploadFiles } from "element-plus";
import { createLead, type CreateLeadPayload } from "@/api/leads";

const router = useRouter();
const route = useRoute();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/lingxiforge";
const uploadAction = `${API_BASE_URL.replace(/\/$/, "")}/leads/upload`;

type Intent = "申请演示" | "获取合作方案" | "项目咨询";
type Role =
  | "博物馆 / 纪念馆"
  | "文创机构 / 公司"
  | "品牌方 / 联名方"
  | "渠道 / 零售"
  | "设计师 / 工作室"
  | "教育 / 研学"
  | "媒体 / 机构";

const roleOptions: { value: Role; desc: string }[] = [
  { value: "博物馆 / 纪念馆", desc: "馆藏转译、展陈互动、馆店上新、研学与普惠教育。" },
  { value: "文创机构 / 公司", desc: "系列化上新、质量标准、供应链履约与成本控制。" },
  { value: "品牌方 / 联名方", desc: "联名产品开发、上新节奏、渠道物料与 IP 合规。" },
  { value: "渠道 / 零售", desc: "选品方向、客群画像、价格带与补货策略。" },
  { value: "设计师 / 工作室", desc: "生成辅助、可制造优化、打样迭代与作品集沉淀。" },
  { value: "教育 / 研学", desc: "可拆装结构模型、讲述脚本、课堂活动与安全边界。" },
  { value: "媒体 / 机构", desc: "新闻与资料、合作对接、可用素材与采访安排。" },
];

const inferredIntent = computed<Intent>(() => {
  const q = String(route.query.intent || "").toLowerCase();
  if (q === "demo") return "申请演示";
  if (q === "partner") return "获取合作方案";
  return "项目咨询";
});

const step = ref(0);
const uploadedFileIds = ref<string[]>([]);
const canSkipUpload = ref(false);

const roleFormRef = ref<FormInstance>();
const requirementFormRef = ref<FormInstance>();
const contactFormRef = ref<FormInstance>();

const roleForm = reactive({
  intent: inferredIntent.value as Intent,
  role: "" as Role | "",
});

const requirementForm = reactive({
  theme: "" as string,
  skuCount: "" as string,
  batchSize: "" as string,
  timeline: "" as string,
  materials: [] as string[],
  processes: [] as string[],
  notes: "" as string,
});

const contactForm = reactive({
  org: "" as string,
  name: "" as string,
  title: "" as string,
  email: "" as string,
  phone: "" as string,
  city: "" as string,
  wechat: "" as string,
  preferredContact: "邮箱" as "邮箱" | "电话" | "微信",
});

const compliance = reactive({
  licenseOk: false,
  noSensitiveInfo: false,
  agreeProcess: false,
  needNda: false,
});

const roleRules: FormRules = {
  intent: [{ required: true, message: "请选择诉求", trigger: "change" }],
  role: [{ required: true, message: "请选择你的角色", trigger: "change" }],
};

const requirementRules: FormRules = {
  theme: [{ required: true, message: "请填写主题/方向", trigger: "blur" }],
  skuCount: [{ required: true, message: "请选择预计 SKU 数量", trigger: "change" }],
  batchSize: [{ required: true, message: "请选择首批规模", trigger: "change" }],
  timeline: [{ required: true, message: "请选择交付周期", trigger: "change" }],
};

const contactRules: FormRules = {
  org: [{ required: true, message: "请填写机构/公司名称", trigger: "blur" }],
  name: [{ required: true, message: "请填写联系人姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请填写邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  phone: [{ required: true, message: "请填写电话", trigger: "blur" }],
};

const validateRole = async () => {
  await roleFormRef.value?.validate();
};

const validateRequirements = async () => {
  await requirementFormRef.value?.validate();
};

const validateContact = async () => {
  await contactFormRef.value?.validate();
};

const validateCompliance = () => {
  if (!compliance.licenseOk || !compliance.noSensitiveInfo || !compliance.agreeProcess) {
    ElMessage.error("请先完成授权与合规确认");
    return false;
  }
  return true;
};

const next = async () => {
  if (step.value === 0) {
    await validateRole();
    step.value = 1;
    return;
  }
  if (step.value === 1) {
    if (!uploadedFileIds.value.length && !canSkipUpload.value) {
      ElMessage.warning("建议至少上传 1 张参考图（或勾选“暂无参考图”）");
      return;
    }
    step.value = 2;
    return;
  }
  if (step.value === 2) {
    if (!validateCompliance()) return;
    step.value = 3;
    return;
  }
  if (step.value === 3) {
    await validateRequirements();
    step.value = 4;
    return;
  }
};

const prev = () => {
  if (step.value > 0) step.value -= 1;
};

const beforeUpload = (raw: File) => {
  const isImage = raw.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("仅支持上传图片（JPG/PNG/WebP）");
    return false;
  }
  const max = 10 * 1024 * 1024;
  if (raw.size > max) {
    ElMessage.error("单张图片请控制在 10MB 以内");
    return false;
  }
  return true;
};

const onUploadSuccess = (resp: any, file: UploadFile) => {
  if (!resp?.success) {
    ElMessage.error(resp?.message || resp?.msg || "上传失败");
    return;
  }
  const fileId = resp?.data?.fileId as string | undefined;
  if (!fileId) {
    ElMessage.error("上传成功但未返回 fileId");
    return;
  }
  uploadedFileIds.value.push(fileId);
  (file as any).lingxiFileId = fileId;
  (file as any).tifaFileId = fileId;
};

const onUploadError = () => {
  ElMessage.error("上传失败，请稍后重试");
};

const onRemove = (file: UploadFile, _files: UploadFiles) => {
  const fileId =
    ((file as any).lingxiFileId as string | undefined) ||
    ((file as any).tifaFileId as string | undefined);
  if (!fileId) return;
  uploadedFileIds.value = uploadedFileIds.value.filter((id) => id !== fileId);
};

const submitting = ref(false);
const submittedLeadId = ref<string | null>(null);

const submit = async () => {
  await validateContact();
  submitting.value = true;
  try {
    const payload: CreateLeadPayload = {
      intent: roleForm.intent,
      role: roleForm.role,
      files: uploadedFileIds.value,
      compliance: {
        licenseOk: compliance.licenseOk,
        noSensitiveInfo: compliance.noSensitiveInfo,
        agreeProcess: compliance.agreeProcess,
        needNda: compliance.needNda,
      },
      requirements: {
        theme: requirementForm.theme,
        skuCount: requirementForm.skuCount,
        batchSize: requirementForm.batchSize,
        timeline: requirementForm.timeline,
        materials: requirementForm.materials,
        processes: requirementForm.processes,
        notes: requirementForm.notes,
      },
      contact: {
        org: contactForm.org,
        name: contactForm.name,
        title: contactForm.title,
        email: contactForm.email,
        phone: contactForm.phone,
        city: contactForm.city,
        wechat: contactForm.wechat,
        preferredContact: contactForm.preferredContact,
      },
      meta: {
        page: route.fullPath,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
    };

    const resp = await createLead(payload);
    if (!resp?.success) {
      ElMessage.error(resp?.message || resp?.msg || "提交失败");
      return;
    }
    submittedLeadId.value = resp?.data?.leadId || null;
    ElMessage.success("提交成功，我们会尽快联系你");
  } catch (e) {
    // handled by interceptor
  } finally {
    submitting.value = false;
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
            <h1>合作申请｜提交需求、授权范围与交付目标</h1>
            <p class="subtitle">
              这是一套用于项目立项的标准信息收集流程：角色、参考图、授权边界、需求规模与交付周期。提交后我们会按角色分流，给出“生成—可制造—履约”落地建议。
            </p>
          </div>
          <div class="right glass-surface">
            <div class="k">预计响应</div>
            <ul>
              <li>1–2 个工作日内完成首次联系</li>
              <li>输出落地建议与交付口径（可制造/合规/周期）</li>
              <li>可选：NDA 与资料包对接</li>
            </ul>
          </div>
        </section>

        <section class="section glass-card">
          <div class="steps">
            <el-steps :active="step" finish-status="success">
              <el-step title="角色分流" description="确定你的诉求与身份" />
              <el-step title="参考图" description="上传 1–8 张（可选）" />
              <el-step title="合规确认" description="授权与信息边界" />
              <el-step title="需求规模" description="SKU/规模/周期" />
              <el-step title="联系方式" description="提交并等待对接" />
            </el-steps>
          </div>

          <div v-if="submittedLeadId" class="result">
            <el-result icon="success" title="已提交" sub-title="我们会尽快联系你，并给出落地建议与交付口径。">
              <template #extra>
                <div class="result-extra">
                  <div class="lead">申请编号：<span class="id">{{ submittedLeadId }}</span></div>
                  <div class="actions">
                    <el-button type="primary" @click="router.push('/cases')">查看案例</el-button>
                    <el-button plain @click="router.push('/')">返回首页</el-button>
                  </div>
                </div>
              </template>
            </el-result>
          </div>

          <div v-else class="content">
            <div v-show="step === 0" class="pane">
              <h2>1）角色分流</h2>
              <el-form ref="roleFormRef" :model="roleForm" :rules="roleRules" label-position="top">
                <el-form-item label="你的诉求" prop="intent">
                  <el-radio-group v-model="roleForm.intent">
                    <el-radio-button label="申请演示" />
                    <el-radio-button label="获取合作方案" />
                    <el-radio-button label="项目咨询" />
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="你的角色" prop="role">
                  <div class="role-grid" role="list">
                    <button v-for="r in roleOptions" :key="r.value" class="role glass-surface" type="button"
                      :class="{ active: roleForm.role === r.value }" @click="roleForm.role = r.value">
                      <div class="t">{{ r.value }}</div>
                      <div class="d">{{ r.desc }}</div>
                    </button>
                  </div>
                </el-form-item>
              </el-form>
            </div>

            <div v-show="step === 1" class="pane">
              <div class="pane-head">
                <div>
                  <h2>2）参考图上传</h2>
                  <p class="muted">建议上传 1–8 张：馆藏元素、风格参考、结构/尺寸要求、同类竞品等。</p>
                </div>
                <el-checkbox v-model="canSkipUpload">暂无参考图</el-checkbox>
              </div>

              <el-upload class="upload" drag multiple :action="uploadAction" :before-upload="beforeUpload"
                :on-success="onUploadSuccess" :on-error="onUploadError" :on-remove="onRemove" :limit="8"
                accept="image/*">
                <div class="upload-inner">
                  <div class="upload-title">拖拽图片到这里，或点击上传</div>
                  <div class="upload-tip">仅用于评审与对接，不会公开展示；单张 ≤ 10MB</div>
                </div>
              </el-upload>

              <div class="note glass-surface">
                <div class="k">小提示</div>
                <ul>
                  <li>如果涉及馆藏/IP，请尽量提供授权范围（渠道/地区/期限）。</li>
                  <li>如果要做“可卖”，请补充目标客群与价格带。</li>
                  <li>如果要做“可打印”，请提供大致尺寸与材质偏好。</li>
                </ul>
              </div>
            </div>

            <div v-show="step === 2" class="pane">
              <h2>3）授权与合规确认</h2>
              <div class="checks glass-card">
                <el-checkbox v-model="compliance.licenseOk">我确认上传素材已获得授权/为自有素材/公共领域素材。</el-checkbox>
                <el-checkbox v-model="compliance.noSensitiveInfo">我不会上传包含个人敏感信息或第三方商业机密的内容。</el-checkbox>
                <el-checkbox v-model="compliance.agreeProcess">我同意我们对参考图进行必要处理用于生成、评审与打样。</el-checkbox>
                <el-checkbox v-model="compliance.needNda">需要 NDA（可选）</el-checkbox>
              </div>
              <div class="note glass-surface">
                <div class="k">建议做法</div>
                <ul>
                  <li>明确授权边界：图样/衍生形态/销售渠道/期限/地区。</li>
                  <li>保持版本留档：素材来源、时间戳、关键沟通结论。</li>
                  <li>对外页面（案例/展品页）可按授权范围选择公开内容。</li>
                </ul>
              </div>
            </div>

            <div v-show="step === 3" class="pane">
              <h2>4）需求规模与交付周期</h2>
              <el-form ref="requirementFormRef" :model="requirementForm" :rules="requirementRules" label-position="top">
                <el-form-item label="主题/方向（一句话）" prop="theme">
                  <el-input v-model="requirementForm.theme" placeholder="例如：馆藏纹样冰箱贴系列 / 器型复刻香薰灯 / 展陈互动展品页…" />
                </el-form-item>
                <div class="cols">
                  <el-form-item label="预计 SKU 数量" prop="skuCount">
                    <el-select v-model="requirementForm.skuCount" placeholder="选择" clearable>
                      <el-option label="1–3 个（先跑通闭环）" value="1–3" />
                      <el-option label="4–10 个（小系列）" value="4–10" />
                      <el-option label="10+（系列化上新）" value="10+" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="首批规模" prop="batchSize">
                    <el-select v-model="requirementForm.batchSize" placeholder="选择" clearable>
                      <el-option label="10–50 件（打样/小批量）" value="10–50" />
                      <el-option label="50–200 件（馆店/活动）" value="50–200" />
                      <el-option label="200+（渠道铺货）" value="200+" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="期望交付周期" prop="timeline">
                    <el-select v-model="requirementForm.timeline" placeholder="选择" clearable>
                      <el-option label="1–2 周（快节奏）" value="1–2周" />
                      <el-option label="3–4 周（标准）" value="3–4周" />
                      <el-option label="1–2 个月（复杂项目）" value="1–2个月" />
                      <el-option label="时间灵活（可一起规划）" value="灵活" />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="cols">
                  <el-form-item label="材质偏好（可选）">
                    <el-select v-model="requirementForm.materials" multiple collapse-tags collapse-tags-tooltip
                      placeholder="可多选">
                      <el-option label="树脂（高细节）" value="树脂" />
                      <el-option label="PLA（FDM）" value="PLA" />
                      <el-option label="尼龙（SLS/MJF）" value="尼龙" />
                      <el-option label="金属（可选）" value="金属" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工艺偏好（可选）">
                    <el-select v-model="requirementForm.processes" multiple collapse-tags collapse-tags-tooltip
                      placeholder="可多选">
                      <el-option label="SLA/DLP" value="SLA/DLP" />
                      <el-option label="FDM" value="FDM" />
                      <el-option label="SLS/MJF" value="SLS/MJF" />
                      <el-option label="后处理/电镀" value="后处理/电镀" />
                      <el-option label="仅数字资产（GLB/USDZ）" value="数字资产" />
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item label="补充说明（可选）">
                  <el-input v-model="requirementForm.notes" type="textarea" :rows="5"
                    placeholder="目标客群、价格带、渠道、尺寸/功能需求、是否需要 AR/展陈互动等…" />
                </el-form-item>
              </el-form>
            </div>

            <div v-show="step === 4" class="pane">
              <h2>5）联系方式</h2>
              <el-form ref="contactFormRef" :model="contactForm" :rules="contactRules" label-position="top">
                <div class="cols">
                  <el-form-item label="机构/公司" prop="org">
                    <el-input v-model="contactForm.org" placeholder="例如：某某博物馆 / 某某品牌" />
                  </el-form-item>
                  <el-form-item label="联系人" prop="name">
                    <el-input v-model="contactForm.name" placeholder="姓名" />
                  </el-form-item>
                  <el-form-item label="职位（可选）">
                    <el-input v-model="contactForm.title" placeholder="例如：文创负责人 / 设计师" />
                  </el-form-item>
                </div>
                <div class="cols">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="contactForm.email" placeholder="name@company.com" />
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <el-input v-model="contactForm.phone" placeholder="用于快速对接（可填座机/手机）" />
                  </el-form-item>
                  <el-form-item label="城市（可选）">
                    <el-input v-model="contactForm.city" placeholder="例如：上海" />
                  </el-form-item>
                </div>
                <div class="cols">
                  <el-form-item label="微信（可选）">
                    <el-input v-model="contactForm.wechat" placeholder="WeChat ID" />
                  </el-form-item>
                  <el-form-item label="偏好联系方式（可选）">
                    <el-segmented v-model="contactForm.preferredContact"
                      :options="['邮箱', '电话', '微信']" />
                  </el-form-item>
                </div>
              </el-form>
            </div>

            <div class="nav">
              <el-button plain :disabled="step === 0" @click="prev">上一步</el-button>
              <div class="spacer"></div>
              <el-button v-if="step < 4" type="primary" @click="next">下一步</el-button>
              <el-button v-else type="primary" :loading="submitting" @click="submit">提交申请</el-button>
            </div>
          </div>
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
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  align-items: start;
}

h1 {
  margin: 0 0 10px;
}

.subtitle {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
}

.right {
  border-radius: 16px;
  padding: 14px;

  .k {
    font-weight: 900;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.7;
    display: grid;
    gap: 6px;
  }
}

.section {
  width: min(1180px, 92%);
  margin: 0 auto 18px;
  padding: 18px;
}

.steps {
  padding: 8px 10px 18px;
}

.content {
  margin-top: 6px;
}

.pane {
  margin-top: 14px;
}

.pane-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

h2 {
  margin: 0 0 12px;
}

.muted {
  margin: 0;
  color: var(--font-color2);
  line-height: 1.7;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.role {
  text-align: left;
  border-radius: 16px;
  padding: 14px;
  cursor: pointer;
  background: var(--glass-bg);
  transition: transform var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out);
}

.role:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.18);
}

.role.active {
  background: var(--accent-soft-bg);
  border-color: rgba(255, 255, 255, 0.18);
}

.role .t {
  font-weight: 900;
  margin-bottom: 8px;
}

.role .d {
  color: var(--font-color2);
  font-size: 12px;
  line-height: 1.6;
}

.upload {
  margin-top: 12px;
}

.upload-inner {
  padding: 8px 0;
}

.upload-title {
  font-weight: 900;
}

.upload-tip {
  margin-top: 6px;
  color: var(--font-color2);
  font-size: 12px;
}

.note {
  margin-top: 12px;
  border-radius: 16px;
  padding: 14px;

  .k {
    font-weight: 900;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.7;
    display: grid;
    gap: 6px;
  }
}

.checks {
  padding: 14px;
  border-radius: 16px;
  display: grid;
  gap: 10px;
}

.cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.nav {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.spacer {
  flex: 1;
}

.result {
  padding: 6px 0 0;
}

.result-extra {
  display: grid;
  gap: 12px;
  justify-items: center;
}

.lead {
  color: var(--font-color2);
}

.id {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  color: var(--font-color1);
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .role-grid {
    grid-template-columns: 1fr;
  }

  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
