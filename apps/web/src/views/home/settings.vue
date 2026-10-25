<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { logoutUser } from "@/utils/auth";
import { useRouter } from "vue-router";

type ThemeMode = "light" | "dark";
type Language = "zh-CN" | "en-US" | "ja-JP";
type ExportFormat = "GLB" | "OBJ" | "STL";

type UserSettings = {
  theme: ThemeMode;
  language: Language;
  defaultExport: ExportFormat;
  autoSavePrompts: boolean;
  notifyActivity: boolean;
  notifyGenerateDone: boolean;
  notifyQuota: boolean;
  publicProfile: boolean;
  allowRecommend: boolean;
};

const router = useRouter();
const STORAGE_KEY = "lingxiforge_settings_v1";
const LEGACY_STORAGE_KEY = "tifa_settings_v1";
const THEME_KEY = "theme-glass";
const LEGACY_THEME_KEY = "theme";

const loadTheme = (): ThemeMode => {
  const htmlTheme = (document.documentElement.getAttribute("theme") as ThemeMode) || null;
  const stored =
    (localStorage.getItem(THEME_KEY) as ThemeMode) ||
    (localStorage.getItem(LEGACY_THEME_KEY) as ThemeMode) ||
    null;
  if (stored && !localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, stored);
    localStorage.removeItem(LEGACY_THEME_KEY);
  }
  return htmlTheme || stored || "light";
};

const applyTheme = (mode: ThemeMode) => {
  const html = document.documentElement;
  if (html.getAttribute("theme") === mode) return;
  html.setAttribute("theme", mode);
  document.body?.setAttribute("theme", mode);
  localStorage.setItem(THEME_KEY, mode);
  localStorage.removeItem(LEGACY_THEME_KEY);
};

const defaultSettings: UserSettings = {
  theme: loadTheme(),
  language: "zh-CN",
  defaultExport: "GLB",
  autoSavePrompts: true,
  notifyActivity: true,
  notifyGenerateDone: true,
  notifyQuota: true,
  publicProfile: false,
  allowRecommend: true,
};

const parseSettings = (raw: unknown): UserSettings | null => {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<UserSettings>;
  return {
    ...defaultSettings,
    ...r,
    theme: (r.theme as ThemeMode) || defaultSettings.theme,
  };
};

const initialSettings = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseSettings(JSON.parse(stored));
      if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
      return parsed || defaultSettings;
    }

    const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacyStored) return defaultSettings;
    const parsed = parseSettings(JSON.parse(legacyStored));
    if (!parsed) return defaultSettings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return parsed;
  } catch {
    return defaultSettings;
  }
})();

const settings = ref<UserSettings>(initialSettings);

const themeLabel = computed(() => (settings.value.theme === "dark" ? "深色模式" : "浅色模式"));

let themeObserver: MutationObserver | null = null;

onMounted(() => {
  // 同步：以当前页面主题为准
  settings.value.theme = loadTheme();
  applyTheme(settings.value.theme);

  // 监听主题变化（比如从顶部 Header 切换）
  themeObserver = new MutationObserver(() => {
    const next = loadTheme();
    if (settings.value.theme !== next) settings.value.theme = next;
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["theme"],
  });
});

onUnmounted(() => {
  themeObserver?.disconnect();
  themeObserver = null;
});

watch(
  () => settings.value.theme,
  (v) => applyTheme(v)
);

watch(
  settings,
  (v) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  },
  { deep: true }
);

const resetAll = () => {
  settings.value = { ...defaultSettings, theme: loadTheme() };
  ElMessage({ type: "success", message: "已恢复默认设置" });
};

const clearLocal = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  ElMessage({ type: "success", message: "已清除本页设置缓存" });
};

const logout = () => {
  logoutUser();
  ElMessage({ type: "success", message: "已退出登录" });
  router.push("/login");
};
</script>

<template>
  <div class="settings-page">
    <section class="hero">
      <div class="left">
        <h2>系统设置</h2>
        <p class="subtitle">个性化外观、通知与隐私选项（本地保存，不影响他人）。</p>
      </div>
      <div class="right">
        <el-button @click="resetAll">恢复默认</el-button>
        <el-button plain @click="clearLocal">清除缓存</el-button>
      </div>
    </section>

    <section class="grid">
      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">外观</div>
        </template>

        <div class="row">
          <div class="label">主题</div>
          <div class="control">
            <el-radio-group v-model="settings.theme">
              <el-radio-button label="light">浅色</el-radio-button>
              <el-radio-button label="dark">深色</el-radio-button>
            </el-radio-group>
            <span class="hint">当前：{{ themeLabel }}</span>
          </div>
        </div>

        <div class="row">
          <div class="label">语言</div>
          <div class="control">
            <el-select v-model="settings.language" style="width: 220px">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="English" value="en-US" />
              <el-option label="日本語" value="ja-JP" />
            </el-select>
            <span class="hint">演示版：仅保存偏好，不改变文案</span>
          </div>
        </div>

        <div class="row">
          <div class="label">默认导出</div>
          <div class="control">
            <el-select v-model="settings.defaultExport" style="width: 220px">
              <el-option label="GLB（展示）" value="GLB" />
              <el-option label="OBJ（通用）" value="OBJ" />
              <el-option label="STL（打印）" value="STL" />
            </el-select>
          </div>
        </div>

        <div class="row">
          <div class="label">自动保存提示词</div>
          <div class="control">
            <el-switch v-model="settings.autoSavePrompts" />
            <span class="hint">开启后会在工作台自动记录最近输入</span>
          </div>
        </div>
      </el-card>

      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">通知</div>
        </template>

        <div class="row">
          <div class="label">活动提醒</div>
          <div class="control">
            <el-switch v-model="settings.notifyActivity" />
            <span class="hint">新品活动、联名上新与开售提醒</span>
          </div>
        </div>
        <div class="row">
          <div class="label">生成完成提醒</div>
          <div class="control">
            <el-switch v-model="settings.notifyGenerateDone" />
            <span class="hint">三维/图像生成任务完成后通知</span>
          </div>
        </div>
        <div class="row">
          <div class="label">配额预警</div>
          <div class="control">
            <el-switch v-model="settings.notifyQuota" />
            <span class="hint">低于阈值时提示升级订阅或补充次数</span>
          </div>
        </div>
      </el-card>
    </section>

    <section class="grid">
      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">隐私</div>
        </template>

        <div class="row">
          <div class="label">公开个人主页</div>
          <div class="control">
            <el-switch v-model="settings.publicProfile" />
            <span class="hint">关闭后仅自己可见</span>
          </div>
        </div>
        <div class="row">
          <div class="label">允许社区推荐</div>
          <div class="control">
            <el-switch v-model="settings.allowRecommend" />
            <span class="hint">用于推荐灵感与作品展示（可随时关闭）</span>
          </div>
        </div>
      </el-card>

      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">提示</div>
        </template>
        <ul class="notes">
          <li>设置项仅在本地浏览器保存，不会上传到服务器。</li>
          <li>如需多人使用同一台设备，建议使用无痕窗口或不同浏览器配置。</li>
          <li>主题切换会即时生效，并同步到顶部栏。</li>
        </ul>
      </el-card>
    </section>

    <section class="grid">
      <el-card class="card" shadow="hover">
        <template #header>
          <div class="card-title">账号</div>
        </template>
        <div class="row">
          <div class="label">退出登录</div>
          <div class="control">
            <el-button type="danger" plain @click="logout">退出</el-button>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/home/settings.scss";
</style>
