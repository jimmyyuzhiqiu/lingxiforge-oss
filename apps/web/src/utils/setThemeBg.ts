import { ref, onMounted, onUnmounted } from "vue";

export const useThemeRgba = () => {
  const rgba = ref<string>("");

  const updateRgba = (theme: string): void => {
    rgba.value =
      theme === "light" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, .8)";
  };

  const observeThemeChange = (): void => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("theme");
      if (currentTheme) {
        updateRgba(currentTheme);
      }
    });

    // 配置观察器
    observer.observe(document.documentElement, {
      attributes: true, // 只观察属性变化
      attributeFilter: ["theme"], // 只观察 theme 属性
    });

    // 初始化 rgba 值
    const initialTheme = document.documentElement.getAttribute("theme");
    if (initialTheme) {
      updateRgba(initialTheme);
    }

    // 清理观察器
    onUnmounted(() => {
      observer.disconnect();
    });
  };

  onMounted(() => {
    observeThemeChange();
  });

  return { rgba };
};
