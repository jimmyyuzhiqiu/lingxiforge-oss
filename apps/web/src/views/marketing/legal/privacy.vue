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
          <h1>隐私政策｜信息收集、使用与保护说明</h1>
          <p class="subtitle">
            最后更新：{{ updatedAt }}。本政策用于说明 Lingxi Forge（灵犀造物）在提供网站与控制台服务时如何收集、使用、共享、保存和保护信息，以及你可行使的权利。
          </p>
          <div class="cta">
            <el-button plain @click="router.push('/contact?type=security')">隐私/安全反馈</el-button>
            <el-button plain @click="router.push('/cookies')">Cookie 政策</el-button>
            <el-button plain @click="router.push('/terms')">服务条款</el-button>
          </div>
        </section>

        <section class="content glass-card">
          <h2>1. 我们收集的信息类型</h2>
          <ul>
            <li>账号与身份信息：注册/登录所需的昵称、联系方式与账号标识。</li>
            <li>使用与设备信息：访问日志、浏览器与设备信息、操作记录与错误日志（用于排障和稳定性优化）。</li>
            <li>内容与资产信息：你提交的提示词、参考图、生成资产与导出记录（用于完成功能与资产管理）。</li>
            <li>沟通与支持信息：你通过邮件、工单或联系页面提交的咨询、反馈与附件材料。</li>
          </ul>

          <h2>2. 信息使用目的</h2>
          <ul>
            <li>提供与改进服务：用于生成、优化、导出、协作、履约与体验改进。</li>
            <li>安全与风控：识别异常登录、滥用与攻击行为，保障平台与资产安全。</li>
            <li>沟通与支持：回复咨询请求、故障排查、合规与安全反馈处理。</li>
            <li>合规与审计：在法律法规要求或争议处理场景下留存必要记录。</li>
          </ul>

          <h2>3. 信息共享与披露</h2>
          <p>
            我们不会出售你的个人信息。仅在提供服务所必需（如履约协作）、遵守法律法规、保护合法权益或经你授权同意的情况下共享必要信息。
          </p>

          <h2>4. 数据保存期限与删除</h2>
          <p>
            我们仅在实现服务目的与满足合规义务的必要期限内保存数据。你可通过联系渠道提出导出或删除请求；涉及财务、履约或合规义务的数据可能按最短法定期限留存。
          </p>

          <h2>5. 安全措施与风险控制</h2>
          <ul>
            <li>访问控制与权限分层：公开站与控制台隔离，遵循最小权限原则。</li>
            <li>传输与存储保护：按部署环境启用 HTTPS、会话安全、访问审计与关键资产保护。</li>
            <li>事件响应机制：提供安全披露通道，对高风险问题优先处置并留档复盘。</li>
          </ul>

          <h2>6. 你的权利与联系我们</h2>
          <p>你可就查询、更正、导出、删除及撤回同意等请求联系我们。若对本政策有疑问，请通过“联系我们”页面选择“安全与负责披露”或“技术支持”通道提交。</p>
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
