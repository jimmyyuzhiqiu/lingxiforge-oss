import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const FORGE_TARGET_SELECTORS = [
  ".page .hero",
  ".page .section",
  ".page .glass-card",
  ".page .glass-surface",
  ".auth-page .auth-hero",
  ".auth-page .auth-card",
  ".auth-page .auth-grid > *",
  "[data-forge-motion-root] .el-main > *",
  "[data-forge-motion-root] main > *",
  "[data-forge-motion-root] section",
];

const DELAY_STEP_MS = 60;
const INITIAL_SCAN_DELAYS = [220, 540, 980, 1680];
const INITIAL_SCAN_DELAYS_INTERNAL = [180];
const MAX_TARGETS = 120;
const MAX_TARGETS_LITE = 84;
const MAX_TARGETS_INTERNAL = 48;
const MAX_TARGETS_INTERNAL_LITE = 32;
const INTERNAL_MOTION_SCENES = new Set(["home", "workbench"]);
const SECTION_WIDE_SELECTOR = "[data-forge-motion-root] section";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isInViewport = (target: HTMLElement) => {
  const rect = target.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0;
};

const collectTargets = (
  root: HTMLElement,
  {
    limit = MAX_TARGETS,
    includeWideSections = true,
  }: { limit?: number; includeWideSections?: boolean } = {}
) => {
  const unique = new Set<HTMLElement>();
  FORGE_TARGET_SELECTORS.forEach((selector) => {
    if (!includeWideSections && selector === SECTION_WIDE_SELECTOR) return;
    root.querySelectorAll<HTMLElement>(selector).forEach((target) => {
      if (!target.isConnected) return;
      unique.add(target);
    });
  });
  return Array.from(unique).slice(0, limit);
};

const resolveActiveRoot = () => {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>("[data-forge-motion-root][data-route-key]")
  );
  if (roots.length) return roots[roots.length - 1];
  return document.querySelector<HTMLElement>("[data-forge-motion-root]");
};

export function useRouteForgeMotion() {
  const route = useRoute();
  let observer: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;
  let scanRaf: number | null = null;
  let runId = 0;
  const timers = new Set<number>();

  const clearTimers = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  };

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
    if (scanRaf !== null) {
      window.cancelAnimationFrame(scanRaf);
      scanRaf = null;
    }
    clearTimers();
  };

  const runReveal = async () => {
    if (typeof window === "undefined") return;
    const currentRun = ++runId;
    cleanup();

    await nextTick();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    if (currentRun !== runId) return;

    const root = resolveActiveRoot();
    if (!root) return;

    const motionScene = (root.dataset.motionScene || "").toLowerCase();
    const isInternalScene = INTERNAL_MOTION_SCENES.has(motionScene);
    const profile = (root.dataset.motionProfile || "").toLowerCase();
    const liteMotion = profile === "lite";
    const reducedMotion = profile === "reduced" || prefersReducedMotion();
    const revealScheduled = new WeakSet<HTMLElement>();
    const initializedTargets = new WeakSet<HTMLElement>();
    const baseDelayStepMs = isInternalScene
      ? Math.round(DELAY_STEP_MS * 0.72)
      : DELAY_STEP_MS;
    const delayStepMs = liteMotion
      ? Math.round(baseDelayStepMs * 0.75)
      : baseDelayStepMs;
    const targetLimit = isInternalScene
      ? liteMotion
        ? MAX_TARGETS_INTERNAL_LITE
        : MAX_TARGETS_INTERNAL
      : liteMotion
        ? MAX_TARGETS_LITE
        : MAX_TARGETS;
    const scanDelays = isInternalScene
      ? INITIAL_SCAN_DELAYS_INTERNAL
      : liteMotion
        ? [260, 820]
        : INITIAL_SCAN_DELAYS;
    const includeWideSections = !isInternalScene;

    if (!reducedMotion && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            target.classList.add("is-revealed");
            observer?.unobserve(target);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -12% 0px",
          threshold: [0, 0.08, 0.18],
        }
      );
    }

    const scheduleReveal = (target: HTMLElement, index: number) => {
      if (target.classList.contains("is-revealed") || revealScheduled.has(target)) return;
      revealScheduled.add(target);
      const timerId = window.setTimeout(() => {
        timers.delete(timerId);
        target.classList.add("is-revealed");
      }, index * delayStepMs);
      timers.add(timerId);
    };

    const scanTargets = (reset: boolean) => {
      const targets = collectTargets(root, {
        limit: targetLimit,
        includeWideSections,
      });
      targets.forEach((target, index) => {
        if (!initializedTargets.has(target)) {
          target.classList.add("forge-motion-target");
          target.style.setProperty("--forge-delay", `${index * delayStepMs}ms`);
          initializedTargets.add(target);
        }

        if (reset) {
          target.classList.remove("is-revealed");
        }

        if (target.classList.contains("is-revealed")) return;

        if (reducedMotion || typeof IntersectionObserver === "undefined") {
          target.classList.add("is-revealed");
          return;
        }

        if (isInViewport(target)) {
          scheduleReveal(target, index);
          return;
        }

        observer?.observe(target);
      });
    };

    scanTargets(true);

    const requestScan = () => {
      if (scanRaf !== null) return;
      scanRaf = window.requestAnimationFrame(() => {
        scanRaf = null;
        if (currentRun !== runId) return;
        scanTargets(false);
      });
    };

    const needsMutationTracking =
      !liteMotion && (motionScene === "landing" || motionScene === "marketing" || motionScene === "auth");
    if (needsMutationTracking) {
      mutationObserver = new MutationObserver(requestScan);
      mutationObserver.observe(root, { childList: true, subtree: true });
    }

    scanDelays.forEach((delay) => {
      const timerId = window.setTimeout(() => {
        timers.delete(timerId);
        if (currentRun !== runId) return;
        scanTargets(false);
      }, delay);
      timers.add(timerId);
    });
  };

  onMounted(runReveal);
  watch(() => route.fullPath, runReveal, { flush: "post" });

  onUnmounted(() => {
    runId += 1;
    cleanup();
  });
}
