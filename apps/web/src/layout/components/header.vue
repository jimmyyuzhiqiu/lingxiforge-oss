<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavStore, useThemeStore, type NavSectionId } from "@/stores";
import { ArrowDown, Menu, Moon, Sunny } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();
const navStore = useNavStore();

const primaryPages = [
  { label: "产品", path: "/product" },
  { label: "工作流", path: "/workflow" },
  { label: "案例", path: "/cases" },
  { label: "资源", path: "/resources" },
  { label: "关于我们", path: "/about" },
];

const morePages = [
  { label: "方案展示", path: "/showcase" },
  { label: "3D 展品库", path: "/gallery" },
  { label: "材料与质量", path: "/materials" },
  { label: "合作伙伴", path: "/partners" },
  { label: "新闻中心", path: "/newsroom" },
  { label: "信任与安全", path: "/trust" },
  { label: "IP 合规", path: "/ip" },
  { label: "联系我们", path: "/contact" },
  { label: "常见问题", path: "/faqs" },
];

const sectionItems = [
  { id: "pain-points" as NavSectionId, label: "痛点" },
  { id: "solutions" as NavSectionId, label: "方案" },
  { id: "process" as NavSectionId, label: "流程" },
  { id: "gallery-preview" as NavSectionId, label: "3D 资产" },
  { id: "metrics" as NavSectionId, label: "成果" },
  { id: "cooperation" as NavSectionId, label: "合作" },
  { id: "faq" as NavSectionId, label: "FAQ" },
];

const moreOpen = ref(false);
const mobileOpen = ref(false);
const isMobileViewport = ref(false);
const navRef = ref<HTMLElement | null>(null);
const isHidden = ref(false);
const lastScroll = ref(0);
const ticking = ref(false);
let resizeObserver: ResizeObserver | null = null;
const DESKTOP_BREAKPOINT = 980;

const theme = computed(() => themeStore.mode);
const active = computed(() => navStore.activeSection);

const isActivePath = (path: string) => {
  if (path === "/") return route.path === "/";
  if (path === "/cases") return route.path.startsWith("/cases");
  if (path === "/pricing") return route.path.toLowerCase() === "/pricing";
  if (path === "/faqs") return route.path.toLowerCase() === "/faqs";
  return route.path === path;
};

const cleanupDrawerMask = () => {
  if (typeof window === "undefined") return;
  const prune = () => {
    document
      .querySelectorAll<HTMLElement>(".el-overlay")
      .forEach((overlay) => {
        const hasDrawer = Boolean(overlay.querySelector(".el-drawer"));
        const hasDialog = Boolean(
          overlay.querySelector(".el-dialog, .el-message-box, .el-image-viewer__wrapper")
        );
        const isLandingMask = overlay.classList.contains("landing-drawer-mask");
        const isOrphanOverlay = !hasDrawer && !hasDialog;
        if ((hasDrawer || isLandingMask || isOrphanOverlay) && !mobileOpen.value) {
          overlay.remove();
        }
      });
  };
  window.requestAnimationFrame(() => {
    prune();
    window.setTimeout(prune, 320);
  });
};

const closeDrawer = () => {
  mobileOpen.value = false;
  cleanupDrawerMask();
};

const closeOverlays = () => {
  moreOpen.value = false;
  closeDrawer();
};

const onHomeLinkClick = (event: MouseEvent) => {
  closeOverlays();
  if (route.path === "/") {
    event.preventDefault();
    const el = document.getElementById("hero");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const goSection = (id: NavSectionId) => {
  closeOverlays();
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const toPlan = () => {
  closeOverlays();
  router.push({ path: "/apply", query: { intent: "partner" } });
};

const toLogin = () => {
  closeOverlays();
  router.push("/login");
};

const updateNavHeight = () => {
  if (!navRef.value) return;
  const height = Math.ceil(navRef.value.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--nav-height", `${Math.max(height, 64)}px`);
};

const updateHidden = () => {
  const current = window.scrollY || 0;
  const delta = 8;
  if (current < 80) {
    isHidden.value = false;
  } else if (current > lastScroll.value + delta) {
    isHidden.value = true;
  } else if (current < lastScroll.value - delta) {
    isHidden.value = false;
  }
  lastScroll.value = current;
};

const onScroll = () => {
  if (ticking.value) return;
  ticking.value = true;
  window.requestAnimationFrame(() => {
    updateHidden();
    ticking.value = false;
  });
};

const navHidden = computed(() => isHidden.value && !mobileOpen.value);

const applyViewportGuard = () => {
  isMobileViewport.value = window.innerWidth <= DESKTOP_BREAKPOINT;
  if (!isMobileViewport.value) {
    closeDrawer();
  }
};

const onResize = () => {
  updateNavHeight();
  applyViewportGuard();
};

watch(
  () => route.fullPath,
  () => {
    closeOverlays();
  }
);

watch(mobileOpen, (open) => {
  if (!open) cleanupDrawerMask();
});

watch(
  () => themeStore.mode,
  () => {
    closeOverlays();
    cleanupDrawerMask();
  }
);

onMounted(() => {
  closeOverlays();
  lastScroll.value = window.scrollY || 0;
  onResize();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  if (navRef.value && "ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(navRef.value);
  }
});

onUnmounted(() => {
  closeOverlays();
  cleanupDrawerMask();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <header ref="navRef" class="site-header" :class="{ 'is-hidden': navHidden }">
    <div class="container bar nav-shell">
      <RouterLink class="brand" to="/" @click="onHomeLinkClick">
        <span class="logo">Lingxi Forge</span>
        <span class="sep">·</span>
        <span class="name">灵犀造物</span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <RouterLink class="nav-item" :class="{ active: isActivePath('/') }" to="/" @click="onHomeLinkClick">
          首页
        </RouterLink>
        <RouterLink v-for="item in primaryPages" :key="item.path" class="nav-item" :class="{ active: isActivePath(item.path) }"
          :to="item.path" @click="closeOverlays">
          {{ item.label }}
        </RouterLink>
        <el-popover v-model:visible="moreOpen" placement="bottom-start" trigger="click" width="320"
          popper-class="nav-popover" :teleported="true" :show-arrow="false">
          <template #reference>
            <button class="nav-item more-trigger" type="button">
              更多
              <el-icon class="more-icon"><ArrowDown /></el-icon>
            </button>
          </template>
          <div class="more-panel">
            <div class="more-group">
              <div class="more-title">更多页面</div>
              <div class="more-grid">
                <RouterLink v-for="item in morePages" :key="item.path" class="more-item"
                  :class="{ active: isActivePath(item.path) }" :to="item.path" @click="closeOverlays">
                  {{ item.label }}
                </RouterLink>
              </div>
            </div>
            <div class="more-group">
              <div class="more-title">首页分区</div>
              <div class="more-grid">
                <button v-for="item in sectionItems" :key="item.id" class="more-item" type="button"
                  :class="{ active: route.path === '/' && active === item.id }" @click="goSection(item.id)">
                  {{ item.label }}
                </button>
              </div>
            </div>
          </div>
        </el-popover>
      </nav>

      <div class="actions">
        <el-button class="icon-btn menu-btn" circle @click="mobileOpen = true">
          <el-icon><Menu /></el-icon>
          <span class="visually-hidden">打开菜单</span>
        </el-button>
        <el-button class="icon-btn theme-btn" circle @click="themeStore.toggle()">
          <el-icon>
            <component :is="theme === 'dark' ? Sunny : Moon" />
          </el-icon>
          <span class="visually-hidden">切换主题</span>
        </el-button>
        <div class="cta">
          <el-button class="nav-cta" plain @click="toLogin">进入登录系统</el-button>
          <el-button class="nav-cta nav-cta--primary" type="primary" @click="toPlan">获取合作方案</el-button>
        </div>
      </div>
    </div>

    <el-drawer v-model="mobileOpen" direction="ttb" size="auto" :with-header="false" :append-to-body="true"
      :modal="isMobileViewport" :lock-scroll="isMobileViewport" :close-on-click-modal="true"
      :modal-class="isMobileViewport ? 'landing-drawer-mask' : ''">
      <div class="drawer glass-card">
        <div class="drawer-head">
          <div class="drawer-title">快速导航</div>
          <el-button class="icon-btn" circle @click="mobileOpen = false">
            <span aria-hidden="true">×</span>
          </el-button>
        </div>
        <div class="drawer-group">
          <div class="drawer-group-title">页面导航</div>
          <div class="drawer-nav">
            <RouterLink class="drawer-item" :class="{ active: isActivePath('/') }" to="/" @click="onHomeLinkClick">
              首页
            </RouterLink>
            <RouterLink v-for="item in primaryPages" :key="item.path" class="drawer-item"
              :class="{ active: isActivePath(item.path) }" :to="item.path" @click="closeOverlays">
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <div class="drawer-group">
          <div class="drawer-group-title">更多页面</div>
          <div class="drawer-nav">
            <RouterLink v-for="item in morePages" :key="item.path" class="drawer-item"
              :class="{ active: isActivePath(item.path) }" :to="item.path" @click="closeOverlays">
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <div class="drawer-group">
          <div class="drawer-group-title">首页分区</div>
          <div class="drawer-nav">
            <button v-for="item in sectionItems" :key="item.id" class="drawer-item" type="button"
              :class="{ active: route.path === '/' && active === item.id }" @click="goSection(item.id)">
              {{ item.label }}
            </button>
          </div>
        </div>
        <div class="drawer-cta">
          <el-button plain @click="toLogin">进入登录系统</el-button>
          <el-button type="primary" @click="toPlan">获取合作方案</el-button>
          <el-button class="theme-btn" @click="themeStore.toggle()">
            <el-icon style="margin-right: 6px">
              <component :is="theme === 'dark' ? Sunny : Moon" />
            </el-icon>
            切换{{ theme === "dark" ? "浅色" : "深色" }}模式
          </el-button>
        </div>
      </div>
    </el-drawer>
  </header>
</template>

<style scoped lang="scss">
@import "@/styles/layout/components/header.scss";
</style>
