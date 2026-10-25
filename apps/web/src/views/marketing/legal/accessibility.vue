<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiteFooter from "@/layout/components/siteFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const updatedAt = "2026-01-30";
</script>

<template>
  <div class="page marketing-page">
    <el-container>
      <el-header class="top-header">
        <Header />
      </el-header>
      <el-main class="main">
        <section class="hero glass-card">
          <h1>可访问性声明｜无障碍改进与反馈通道</h1>
          <p class="subtitle">
            最后更新：{{ updatedAt }}。我们致力于让更多用户顺畅访问与使用 Lingxi Forge（灵犀造物）网站与控制台。若你遇到无障碍问题，欢迎反馈，我们会持续修复与优化。
          </p>
          <div class="cta">
            <el-button plain @click="router.push('/contact?type=support')">可访问性反馈</el-button>
            <el-button plain @click="router.push('/trust')">信任与安全</el-button>
            <el-button plain @click="router.push('/privacy')">隐私政策</el-button>
          </div>
        </section>

        <section class="content glass-card">
          <h2>1. 适用范围与目标</h2>
          <p>
            本声明覆盖公开站（营销页面）与控制台（登录后功能）。由于控制台包含生成、上传与 3D 预览等复杂交互能力，我们将分阶段持续完善无障碍体验。
          </p>

          <h2>2. 当前改进重点</h2>
          <ul>
            <li>键盘可操作：尽量保证主要导航、按钮与表单可用键盘访问。</li>
            <li>可读性与对比度：在浅色/深色模式下保持足够的文字对比度与层级。</li>
            <li>语义化与提示：为关键区域提供明确标题、描述文本与可理解的错误反馈。</li>
            <li>图片与多媒体：为重要图片提供替代文本（alt），减少“仅靠图片传达关键信息”。</li>
          </ul>

          <h2>3. 已知限制与计划修复</h2>
          <ul>
            <li>部分 3D 预览与可视化组件在屏幕阅读器中的可访问性仍在优化中。</li>
            <li>少量第三方组件在极端缩放比例或旧浏览器下可能存在样式与交互差异。</li>
            <li>当页面内容持续扩展时，我们可能需要对信息架构与跳转锚点做进一步完善。</li>
          </ul>

          <h2>4. 反馈方式</h2>
          <p>
            如果你遇到无法完成任务、无法读取信息或键盘无法操作等情况，请通过“联系我们”页面选择“技术支持”通道反馈，并尽量提供：使用的页面地址、设备/浏览器版本、复现步骤与截图/录屏。
          </p>

          <h2>5. 迭代节奏</h2>
          <p>
            我们会优先处理阻断性问题（无法完成主要流程），并在版本更新中逐步修复与优化。若你有企业/机构级别的可访问性要求，也欢迎通过合作伙伴通道沟通。
          </p>
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
  width: min(980px, 92%);
  padding: 26px;
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

.content {
  width: min(980px, 92%);
  margin: 0 auto 18px;
  padding: 22px;

  h2 {
    margin: 18px 0 10px;
  }

  p {
    margin: 0 0 10px;
    color: var(--font-color2);
    line-height: 1.7;
  }

  ul {
    margin: 0 0 10px;
    padding-left: 18px;
    color: var(--font-color2);
    line-height: 1.7;
    display: grid;
    gap: 6px;
  }
}
</style>
