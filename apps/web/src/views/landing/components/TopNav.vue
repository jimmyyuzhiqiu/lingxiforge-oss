<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavStore, useThemeStore, type NavSectionId } from "@/stores";
import { Moon, Sunny, Menu, ArrowDown } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();
const navStore = useNavStore();

const sectionItems = [
  { id: "pain-points" as NavSectionId, label: "痛点" },
  { id: "solutions" as NavSectionId, label: "方案" },
  { id: "process" as NavSectionId, label: "流程" },
  { id: "gallery-preview" as NavSectionId, label: "3D 资产" },
  { id: "metrics" as NavSectionId, label: "成果" },
  { id: "cooperation" as NavSectionId, label: "合作" },
  { id: "faq" as NavSectionId, label: "FAQ" },
];

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
  { label: "信任与安全", path: "/trust" },
  { label: "IP 合规", path: "/ip" },
  { label: "新闻中心", path: "/newsroom" },
  { label: "联系我们", path: "/contact" },
  { label: "常见问题", path: "/faqs" },
];

const active = computed(() => navStore.activeSection);
const moreOpen = ref(false);

const isActivePath = (path: string) => {
  if (path === "/") return route.path === "/";
  if (path === "/cases") return route.path.startsWith("/cases");
  if (path === "/pricing") return route.path.toLowerCase() === "/pricing";
  if (path === "/faqs") return route.path.toLowerCase() === "/faqs";
  return route.path === path;
};

const scrollTo = (id: NavSectionId) => {
  navStore.closeMobile();
  moreOpen.value = false;
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const onNavLinkClick = () => {
  navStore.closeMobile();
  moreOpen.value = false;
};

const onHomeLinkClick = (event: MouseEvent) => {
  onNavLinkClick();
  if (route.path === "/") {
    event.preventDefault();
    scrollTo("hero");
  }
};

const toPlan = () => {
  onNavLinkClick();
  router.push({ path: "/apply", query: { intent: "partner" } });
};
const toLogin = () => {
  onNavLinkClick();
  router.push("/login");
};
const navRef = ref<HTMLElement | null>(null);
const navReady = ref(false);
const isHidden = ref(false);
const isMobileViewport = ref(false);
const lastScroll = ref(0);
const ticking = ref(false);
let resizeObserver: ResizeObserver | null = null;
const DESKTOP_BREAKPOINT = 980;

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

const navHidden = computed(() => isHidden.value && !navStore.mobileOpen);

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
        if ((hasDrawer || isLandingMask || isOrphanOverlay) && !navStore.mobileOpen) {
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
  navStore.closeMobile();
  cleanupDrawerMask();
};

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
    moreOpen.value = false;
    closeDrawer();
  }
);

watch(
  () => navStore.mobileOpen,
  (open) => {
    if (!open) cleanupDrawerMask();
  }
);

watch(
  () => themeStore.mode,
  () => {
    onNavLinkClick();
    cleanupDrawerMask();
  }
);

onMounted(() => {
  closeDrawer();
  lastScroll.value = window.scrollY || 0;
  onResize();
  window.requestAnimationFrame(() => {
    navReady.value = true;
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  if (navRef.value && "ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(navRef.value);
  }
});

onUnmounted(() => {
  closeDrawer();
  cleanupDrawerMask();
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <header ref="navRef" class="topnav" :class="{ 'is-hidden': navHidden, 'nav-ready': navReady }" role="banner">
    <div class="container inner nav-shell">
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
          :to="item.path" @click="onNavLinkClick">
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
                  :class="{ active: isActivePath(item.path) }" :to="item.path" @click="onNavLinkClick">
                  {{ item.label }}
                </RouterLink>
              </div>
            </div>
            <div class="more-group">
              <div class="more-title">首页分区</div>
              <div class="more-grid">
                <button v-for="item in sectionItems" :key="item.id" class="more-item" type="button"
                  :class="{ active: active === item.id }" @click="scrollTo(item.id)">
                  {{ item.label }}
                </button>
              </div>
            </div>
          </div>
        </el-popover>
      </nav>

      <div class="actions">
        <el-button class="icon-btn menu-btn" circle @click="navStore.toggleMobile()">
          <el-icon><Menu /></el-icon>
          <span class="visually-hidden">打开菜单</span>
        </el-button>

        <el-button class="icon-btn theme-btn" circle @click="themeStore.toggle()">
          <el-icon>
            <component :is="themeStore.mode === 'dark' ? Sunny : Moon" />
          </el-icon>
          <span class="visually-hidden">切换主题</span>
        </el-button>

      <div class="cta">
        <el-button class="nav-cta" plain @click="toLogin">进入登录系统</el-button>
        <el-button class="nav-cta nav-cta--primary" type="primary" @click="toPlan">获取合作方案</el-button>
      </div>
      </div>
    </div>

    <el-drawer v-model="navStore.mobileOpen" direction="ttb" size="auto" :with-header="false" :append-to-body="true"
      :modal="isMobileViewport" :lock-scroll="isMobileViewport" :close-on-click-modal="true"
      :modal-class="isMobileViewport ? 'landing-drawer-mask' : ''">
      <div class="drawer glass-card">
        <div class="drawer-head">
          <div class="drawer-title">快速导航</div>
          <el-button class="icon-btn" circle @click="navStore.closeMobile()">
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
              :class="{ active: isActivePath(item.path) }" :to="item.path" @click="onNavLinkClick">
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <div class="drawer-group">
          <div class="drawer-group-title">更多页面</div>
          <div class="drawer-nav">
            <RouterLink v-for="item in morePages" :key="item.path" class="drawer-item"
              :class="{ active: isActivePath(item.path) }" :to="item.path" @click="onNavLinkClick">
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
        <div class="drawer-group">
          <div class="drawer-group-title">首页分区</div>
          <div class="drawer-nav">
            <button v-for="item in sectionItems" :key="item.id" class="drawer-item" type="button"
              :class="{ active: active === item.id }" @click="scrollTo(item.id)">
              {{ item.label }}
            </button>
          </div>
        </div>
        <div class="drawer-cta">
          <el-button class="nav-cta" plain @click="toLogin">进入登录系统</el-button>
          <el-button class="nav-cta nav-cta--primary" type="primary" @click="toPlan">获取合作方案</el-button>
          <el-button class="theme-btn" @click="themeStore.toggle()">
            <el-icon style="margin-right: 6px">
              <component :is="themeStore.mode === 'dark' ? Sunny : Moon" />
            </el-icon>
            切换{{ themeStore.mode === "dark" ? "浅色" : "深色" }}模式
          </el-button>
        </div>
      </div>
    </el-drawer>
  </header>
</template>

<style scoped lang="scss">
.topnav {
  position: fixed;
  inset: 10px 0 auto;
  z-index: 30;
  padding: 0;
  pointer-events: none;
  transition:
    transform var(--motion-base) var(--ease-out),
    opacity var(--motion-base) var(--ease-out);
}

.topnav.is-hidden {
  transform: translateY(-140%);
  opacity: 0;
}

.topnav.is-hidden .inner {
  pointer-events: none;
}

.inner {
  position: relative;
  pointer-events: auto;
  border-radius: 999px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.inner::before,
.inner::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  background: url("/ai/landing/patterns/bronze-corner.svg") center / contain no-repeat;
  opacity: 0.35;
  pointer-events: none;
}

.inner::before {
  left: 8px;
  transform: translateY(-50%) rotate(180deg);
}

.inner::after {
  right: 8px;
}

.brand {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 6px 10px;
  border-radius: 999px;
  transition: background var(--motion-base) var(--ease-out);
}

.brand:hover {
  background: color-mix(in srgb, var(--accent-soft-bg) 58%, transparent);
}

.logo {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.4px;
  color: currentColor;
}

.sep {
  color: var(--font-color4);
}

.name {
  color: var(--font-color2);
  font-weight: 600;
  font-size: 13px;
}

:root[theme="dark"] .topnav .name {
  color: var(--nav-text);
  opacity: 0.72;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(126, 140, 160, 0.18);
  color: currentColor;
  font-weight: 650;
  font-size: 13px;
  opacity: 0.92;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: background var(--motion-base) var(--ease-out),
    color var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    opacity var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out);
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 4px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transform: scaleX(0.6);
  transition: opacity var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
}

.topnav .brand,
.topnav .nav-item,
.topnav .actions {
  opacity: 0;
  transform: translate3d(0, -8px, 0);
  will-change: opacity, transform;
}

.topnav.nav-ready .brand,
.topnav.nav-ready .nav-item,
.topnav.nav-ready .actions {
  animation: navIn 0.56s var(--ease-out) forwards;
}

.topnav.nav-ready .nav-item:nth-child(1) {
  animation-delay: 0.1s;
}

.topnav.nav-ready .nav-item:nth-child(2) {
  animation-delay: 0.18s;
}

.topnav.nav-ready .nav-item:nth-child(3) {
  animation-delay: 0.26s;
}

.topnav.nav-ready .nav-item:nth-child(4) {
  animation-delay: 0.34s;
}

.topnav.nav-ready .nav-item:nth-child(5) {
  animation-delay: 0.42s;
}

.topnav.nav-ready .nav-item:nth-child(6) {
  animation-delay: 0.5s;
}

.topnav.nav-ready .nav-item:nth-child(7) {
  animation-delay: 0.58s;
}

.topnav.nav-ready .nav-item:nth-child(8) {
  animation-delay: 0.66s;
}

.topnav.nav-ready .nav-item:nth-child(9) {
  animation-delay: 0.74s;
}

.topnav.nav-ready .nav-item:nth-child(10) {
  animation-delay: 0.82s;
}

.topnav.nav-ready .brand {
  animation-delay: 0.04s;
}

.topnav.nav-ready .actions {
  animation-delay: 0.92s;
}

@keyframes navIn {
  0% {
    opacity: 0;
    transform: translate3d(0, -8px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.nav-item:hover {
  background: color-mix(in srgb, var(--accent-soft-bg) 66%, transparent);
  color: currentColor;
  opacity: 1;
  transform: translateY(-1px);
  border-color: var(--accent);
  box-shadow:
    0 8px 18px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

:root[theme="dark"] .nav-item:hover {
  background: var(--accent-soft-bg);
  border-color: var(--accent);
  box-shadow:
    0 8px 18px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.nav-item:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.nav-item:active {
  transform: translateY(0);
}

.nav-item.active {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent-soft-bg) 74%, transparent),
    rgba(255, 255, 255, 0.14)
  );
  border-color: var(--accent);
  color: currentColor;
  opacity: 1;
  box-shadow:
    0 10px 22px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

:root[theme="dark"] .nav-item.active {
  background: linear-gradient(
    135deg,
    var(--accent-soft-bg),
    rgba(255, 255, 255, 0.04)
  );
  border-color: var(--accent);
  box-shadow:
    0 10px 22px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-item.active::after {
  opacity: 1;
  transform: scaleX(1);
}

.more-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.more-icon {
  font-size: 12px;
}

.more-panel {
  display: grid;
  gap: 14px;
  padding: 6px 2px;
}

.more-group {
  display: grid;
  gap: 8px;
}

.more-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--font-color4);
  padding: 0 4px;
}

.more-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.more-item {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  border-radius: 12px;
  padding: 8px 10px;
  color: var(--font-color1);
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--motion-fast) var(--ease-out),
    box-shadow var(--motion-fast) var(--ease-out);
}

.more-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px var(--accent-soft-bg);
}

.more-item.active {
  box-shadow: 0 0 0 3px var(--accent-soft-bg);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  display: inline-flex;
}

.menu-btn {
  display: none;
}

.cta {
  display: inline-flex;
  gap: 10px;
  align-items: center;
}

.drawer {
  width: min(var(--container-max), 92%);
  margin: 12px auto 18px;
  padding: 14px;
  border-radius: var(--radius-xl);
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.drawer-title {
  font-weight: 900;
}

.drawer-group {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.drawer-group-title {
  font-weight: 700;
  color: var(--font-color4);
  font-size: 12px;
  padding: 0 2px;
}

.drawer-nav {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.drawer-item {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  border-radius: 14px;
  padding: 10px 12px;
  color: var(--font-color1);
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--motion-fast) var(--ease-out),
    box-shadow var(--motion-fast) var(--ease-out);
}

.drawer-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
}

.drawer-item.active {
  box-shadow: 0 0 0 4px var(--accent-soft-bg);
}

.drawer-cta {
  margin-top: 14px;
  display: grid;
  gap: 10px;
}

.theme-btn {
  justify-content: flex-start;
}

:global(.nav-popover) {
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  background:
    linear-gradient(145deg, rgba(250, 247, 242, 0.95), rgba(242, 246, 250, 0.94)),
    url("/ai/landing/patterns/cloud-pattern.svg") right bottom / 220px auto no-repeat;
  box-shadow:
    12px 12px 24px rgba(173, 165, 150, 0.25),
    -8px -8px 18px rgba(255, 255, 255, 0.74);
  backdrop-filter: blur(calc(var(--glass-blur) * 0.38)) saturate(115%);
  -webkit-backdrop-filter: blur(calc(var(--glass-blur) * 0.38)) saturate(115%);
}

:global(:root[theme="dark"] .nav-popover) {
  background:
    linear-gradient(145deg, rgba(14, 22, 35, 0.92), rgba(17, 26, 40, 0.88)),
    url("/ai/landing/patterns/cloud-pattern.svg") right bottom / 220px auto no-repeat;
  box-shadow:
    16px 16px 28px rgba(2, 6, 15, 0.58),
    -8px -8px 20px rgba(36, 45, 60, 0.28);
}

:root[theme="dark"] .topnav .inner::before,
:root[theme="dark"] .topnav .inner::after {
  opacity: 0.22;
}

:root[theme="dark"] .topnav .name {
  color: #c8d5e9;
  opacity: 0.84;
}

:root[theme="dark"] .nav-item {
  border-color: rgba(108, 130, 164, 0.42);
}

:root[theme="dark"] .nav-item.active {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent-soft-bg) 74%, transparent),
    rgba(255, 255, 255, 0.06)
  );
}

:global(.landing-drawer-mask) {
  background: rgba(2, 6, 23, 0.22);
}

:global(:root[theme="dark"] .landing-drawer-mask) {
  background: rgba(2, 8, 20, 0.18);
}

@media (max-width: 980px) {
  .nav {
    display: none;
  }

  .menu-btn {
    display: inline-flex;
  }

  .cta {
    display: none;
  }

  .drawer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .more-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  :global(.nav-popover) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .topnav .brand,
  .topnav .nav-item,
  .topnav .actions {
    opacity: 1;
    transform: none;
    animation: none !important;
    will-change: auto;
  }
}
</style>
