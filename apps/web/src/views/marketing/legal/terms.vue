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
          <h1>服务条款｜使用规则、权责与合规边界</h1>
          <p class="subtitle">
            最后更新：{{ updatedAt }}。本条款用于说明你在使用 Lingxi Forge（灵犀造物）公开站与控制台服务时的使用规则、权利义务、责任边界与争议处理原则。
          </p>
          <div class="cta">
            <el-button plain @click="router.push('/privacy')">隐私政策</el-button>
            <el-button plain @click="router.push('/cookies')">Cookie 政策</el-button>
            <el-button plain @click="router.push('/contact?type=sales')">商务咨询</el-button>
          </div>
        </section>

        <section class="content glass-card">
          <h2>1. 服务范围与变更</h2>
          <p>
            Lingxi Forge 提供从内容输入、生成与优化到导出与协作的工具与页面。部分功能需登录、订阅或受配额限制。我们可能基于产品演进、安全与合规对服务进行更新、下线或调整。
          </p>

          <h2>2. 账号、安全与使用规范</h2>
          <ul>
            <li>你应确保账号信息真实有效，并妥善保管登录凭证。</li>
            <li>不得通过自动化滥用、攻击、绕过限制、逆向或其他方式破坏服务稳定性与安全性。</li>
            <li>若出现异常行为、违规内容或安全风险，我们有权采取限流、冻结、下线或终止服务等措施。</li>
          </ul>

          <h2>3. 内容责任与知识产权</h2>
          <ul>
            <li>你应确保上传/使用的素材拥有合法权利（含授权范围、署名与使用限制）。</li>
            <li>你生成或导出的内容是否可商用，取决于输入素材权利状态、授权范围与适用法律法规。</li>
            <li>涉及文化 IP 场景，建议遵循“授权可验证、来源可追踪、版本可留档”的执行原则。</li>
          </ul>

          <h2>4. 费用、订阅与发票</h2>
          <p>
            订阅与计费规则以“订阅与计费方案”页面为准。企业采购、发票、合同与定制服务以双方书面协议或订单约定为准；如发生冲突，以书面协议优先。
          </p>

          <h2>5. 免责声明与责任限制</h2>
          <p>
            生成式内容存在不确定性。我们将持续优化质量与安全，但不对特定用途、特定商业结果或第三方平台可用性作绝对保证。你应在生产、上线和对外发布前完成必要审核与验证。
          </p>

          <h2>6. 适用法律、争议处理与联系</h2>
          <p>如对条款有疑问、投诉建议或需要企业合作协议，请通过“联系我们”页面提交。争议将优先协商处理，协商不成时按适用法律与有管辖权的争议解决机构处理。</p>
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
