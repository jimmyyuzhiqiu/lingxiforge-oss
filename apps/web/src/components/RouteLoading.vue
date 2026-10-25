<script setup lang="ts">
withDefaults(
  defineProps<{
    cards?: number;
    compact?: boolean;
  }>(),
  {
    cards: 3,
    compact: false,
  }
);
</script>

<template>
  <div class="route-loading" :class="{ compact }" role="status" aria-live="polite" aria-label="页面加载中">
    <div class="skeleton-line line-title"></div>
    <div class="skeleton-line line-subtitle"></div>
    <div class="card-grid">
      <div v-for="n in cards" :key="n" class="skeleton-card">
        <div class="skeleton-line line-card-title"></div>
        <div class="skeleton-line line-card-subtitle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.route-loading {
  border-radius: 16px;
  padding: 16px;
  background: color-mix(in srgb, var(--glass-bg-strong) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--glass-border) 68%, transparent);
  box-shadow: var(--glass-shadow);
}

.route-loading.compact {
  padding: 12px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.skeleton-card {
  border-radius: 12px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--glass-border) 72%, transparent);
  background: color-mix(in srgb, var(--glass-bg) 78%, transparent);
}

.skeleton-line {
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--font-color3) 20%, transparent);
  margin-bottom: 10px;
}

.skeleton-line::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--accent) 22%, transparent) 50%,
    transparent 100%
  );
  animation: routeLoadingShimmer 1.15s ease-in-out infinite;
}

.line-title {
  width: min(320px, 70%);
  height: 18px;
}

.line-subtitle {
  width: min(460px, 92%);
  height: 12px;
  margin-bottom: 16px;
}

.line-card-title {
  width: 68%;
  height: 12px;
}

.line-card-subtitle {
  width: 88%;
  height: 10px;
  margin-bottom: 0;
}

@keyframes routeLoadingShimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
