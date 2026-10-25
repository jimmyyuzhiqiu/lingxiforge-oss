<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const relatedLinks = [
  { label: "产品", to: "/product" },
  { label: "工作流", to: "/workflow" },
  { label: "案例", to: "/cases" },
  { label: "资源中心", to: "/resources" },
  { label: "关于我们", to: "/about" },
];
</script>

<template>
  <footer class="footer container" aria-label="页脚">
    <div class="panel glass-card">
      <div class="brand">
        <div class="logo">Lingxi Forge</div>
        <div class="desc">
          灵犀造物 · 文创赋能平台。把馆藏与文化要素转译为可交付的 3D 资产与产品方案，覆盖生成、可制造优化与履约上新全链路。
        </div>
      </div>

      <div class="related">
        <div class="k">相关页面</div>
        <div class="related-links">
          <button v-for="link in relatedLinks" :key="link.to" class="link related-link" type="button"
            @click="router.push(link.to)">{{ link.label }}</button>
        </div>
      </div>

      <div class="cols">
        <div class="col">
          <div class="k">产品</div>
          <div class="link-grid">
            <button class="link pill-link" type="button" @click="router.push('/product')">产品能力</button>
            <button class="link pill-link" type="button" @click="router.push('/workflow')">工作流</button>
            <button class="link pill-link" type="button" @click="router.push('/gallery')">3D 展品库</button>
            <button class="link pill-link" type="button" @click="router.push('/materials')">材料与质量</button>
            <button class="link pill-link" type="button" @click="router.push('/pricing')">订阅方案</button>
          </div>
        </div>
        <div class="col">
          <div class="k">内容</div>
          <div class="link-grid">
            <button class="link pill-link" type="button" @click="router.push('/showcase')">方案展示</button>
            <button class="link pill-link" type="button" @click="router.push('/cases')">案例</button>
            <button class="link pill-link" type="button" @click="router.push('/resources')">资源中心</button>
            <button class="link pill-link" type="button" @click="router.push('/newsroom')">新闻中心</button>
            <button class="link pill-link" type="button" @click="router.push('/about')">关于我们</button>
            <button class="link pill-link" type="button" @click="router.push('/faqs')">常见问题</button>
          </div>
        </div>
        <div class="col">
          <div class="k">合规</div>
          <div class="link-grid">
            <button class="link pill-link" type="button" @click="router.push('/trust')">信任与安全</button>
            <button class="link pill-link" type="button" @click="router.push('/ip')">IP 合规</button>
            <button class="link pill-link" type="button" @click="router.push('/privacy')">隐私政策</button>
            <button class="link pill-link" type="button" @click="router.push('/terms')">服务条款</button>
          </div>
        </div>
        <div class="col contact-col">
          <div class="k">联系</div>
          <div class="muted">建议通过表单提交需求，便于团队按场景分流。</div>
          <div class="cta">
            <el-button class="footer-cta-btn" type="primary" @click="router.push('/apply')">提交合作申请</el-button>
            <el-button class="footer-cta-btn" plain @click="router.push('/contact?type=support')">技术支持</el-button>
          </div>
        </div>
      </div>

      <div class="bottom">
        <span>© {{ new Date().getFullYear() }} 灵犀造物 Lingxi Forge. 保留所有权利。</span>
        <span class="sep">·</span>
        <button class="legal" type="button" @click="router.push('/cookies')">Cookie 政策</button>
        <button class="legal" type="button" @click="router.push('/accessibility')">可访问性声明</button>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding-bottom: 24px;
}

.panel {
  padding: 18px;
}

.brand {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.logo {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.4px;
}

.desc {
  color: var(--font-color2);
  line-height: 1.7;
  max-width: 82ch;
  font-size: 13px;
}

.related {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.12)
    ),
    var(--glass-bg);
  box-shadow: var(--glass-shadow);
  margin-bottom: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
}

.related .k {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  background: var(--accent-soft-bg);
  color: var(--font-color2);
  font-size: 12px;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

.related-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.cols {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 0.9fr 1.1fr;
  gap: 12px;
  align-items: start;
}

.col {
  padding: 14px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: linear-gradient(
      160deg,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.2)
    ),
    var(--glass-bg);
  display: grid;
  gap: 10px;
  min-height: 180px;
  position: relative;
  overflow: hidden;
}

.k {
  font-weight: 900;
  letter-spacing: 0.2px;
}

.link,
.legal {
  appearance: none;
  border: none;
  background: transparent;
  color: var(--font-color2);
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color var(--motion-base) var(--ease-out);
  font-size: 13px;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.pill-link {
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.5);
  color: var(--font-color1);
  font-weight: 650;
  font-size: 12px;
  padding: 7px 10px;
  border-radius: 999px;
  text-align: center;
  transition: transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out),
    color var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.pill-link:hover {
  color: var(--font-color1);
  border-color: var(--accent);
  background: var(--accent-soft-bg);
  transform: translateY(-1px);
  box-shadow:
    0 8px 18px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.pill-link:active {
  transform: translateY(0);
}

.contact-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
}

.contact-col::after {
  content: "";
  position: absolute;
  right: -40px;
  bottom: -50px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(14, 165, 233, 0.22),
    rgba(14, 165, 233, 0)
  );
  opacity: 0.9;
  pointer-events: none;
}

.related-link {
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.4);
  color: var(--font-color1);
  font-weight: 650;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  text-align: center;
  transition: transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out),
    color var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.related-link:hover {
  color: var(--font-color1);
  border-color: var(--accent);
  background: var(--accent-soft-bg);
  transform: translateY(-1px);
  box-shadow:
    0 8px 18px var(--accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.related-link:active {
  transform: translateY(0);
}

.link:hover,
.legal:hover {
  color: var(--font-color3);
}

.muted {
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.6;
}

.cta {
  display: grid;
  gap: 10px;
  margin-top: 4px;
  position: relative;
  z-index: 1;
}

.footer-cta-btn.el-button {
  height: 34px;
  border-radius: 999px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 650;
  --el-button-text-color: var(--font-color1);
  --el-button-border-color: var(--glass-border);
  --el-button-bg-color: rgba(255, 255, 255, 0.6);
  --el-button-hover-bg-color: var(--accent-soft-bg);
  --el-button-hover-border-color: var(--accent);
  --el-button-hover-text-color: var(--font-color1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.footer-cta-btn.el-button--primary {
  --el-button-border-color: transparent;
  --el-button-text-color: #fff;
  background: linear-gradient(135deg, #1aa7ff 0%, #1f6bff 100%);
  border-color: transparent;
  box-shadow:
    0 10px 22px rgba(26, 167, 255, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.footer-cta-btn.el-button--primary:hover {
  background: linear-gradient(135deg, #2bb2ff 0%, #2a76ff 100%);
}

.bottom {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--glass-border);
  color: var(--font-color4);
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.sep {
  opacity: 0.7;
}

@media (max-width: 980px) {
  .cols {
    grid-template-columns: 1fr;
  }

  .related {
    border-radius: var(--radius-lg);
    padding: 12px;
  }

  .link-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .col {
    min-height: auto;
  }
}
</style>
