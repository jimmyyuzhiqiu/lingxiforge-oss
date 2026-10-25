<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { contactChannels } from "@/data/marketingContent";

type FooterLink = { label: string; to: string };
type RelatedLink = FooterLink & { cue: string };
type FooterGroup = { title: string; links: FooterLink[] };
type RelatedSection = {
  title: string;
  desc: string;
  links: RelatedLink[];
};

const route = useRoute();
const year = computed(() => new Date().getFullYear());

const groups: FooterGroup[] = [
  {
    title: "产品",
    links: [
      { label: "产品概览", to: "/product" },
      { label: "核心工作流", to: "/workflow" },
      { label: "案例", to: "/cases" },
      { label: "方案展示", to: "/showcase" },
      { label: "3D 展品库", to: "/gallery" },
      { label: "材料与质量", to: "/materials" },
      { label: "合作伙伴", to: "/partners" },
    ],
  },
  {
    title: "资源",
    links: [
      { label: "资源中心", to: "/resources" },
      { label: "新闻中心", to: "/newsroom" },
      { label: "订阅方案", to: "/pricing" },
      { label: "常见问题", to: "/faqs" },
      { label: "关于我们", to: "/about" },
    ],
  },
  {
    title: "信任",
    links: [
      { label: "信任与安全", to: "/trust" },
      { label: "IP 合规", to: "/ip" },
      { label: "可访问性声明", to: "/accessibility" },
      { label: "隐私政策", to: "/privacy" },
      { label: "服务条款", to: "/terms" },
      { label: "Cookie 政策", to: "/cookies" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "合作申请", to: "/apply" },
      { label: "销售咨询", to: "/contact?type=sales" },
      { label: "合作伙伴", to: "/contact?type=partners" },
      { label: "技术支持", to: "/contact?type=support" },
      { label: "媒体与公关", to: "/contact?type=media" },
      { label: "安全披露", to: "/contact?type=security" },
    ],
  },
];

const normalizePath = (path: string) => path.replace(/\/$/, "") || "/";

const relatedMap: Record<string, RelatedSection> = {
  "/": {
    title: "继续浏览：从首页进入完整能力链路",
    desc: "按“产品能力 → 工作流 → 案例 → 资源”顺序浏览，可快速理解 Lingxi Forge 的落地路径。",
    links: [
      { label: "产品能力", to: "/product", cue: "了解 AI 生成到可制造交付的能力模块" },
      { label: "核心工作流", to: "/workflow", cue: "查看从灵感输入到履约上新的流程拆解" },
      { label: "案例中心", to: "/cases", cue: "按主题/材质/工艺筛选可复用案例模板" },
      { label: "资源中心", to: "/resources", cue: "获取提示词、质量清单与合规模板" },
      { label: "关于我们", to: "/about", cue: "查看团队方法论与交付标准" },
    ],
  },
  "/product": {
    title: "相关主题：从能力认知到落地执行",
    desc: "如果你已了解产品能力，下一步建议进入流程、材料与案例页面完成方案评估。",
    links: [
      { label: "工作流", to: "/workflow", cue: "对齐评审、可制造优化与履约节奏" },
      { label: "材料与质量", to: "/materials", cue: "确认 print-ready 基线与质量检查清单" },
      { label: "案例中心", to: "/cases", cue: "查看不同合作场景下的交付模板" },
      { label: "方案展示", to: "/showcase", cue: "用于对外沟通的产品化叙事内容" },
      { label: "合作申请", to: "/apply", cue: "提交需求并获取落地建议" },
    ],
  },
  "/workflow": {
    title: "继续阅读：把流程做成可复用标准",
    desc: "从工作流继续查看可制造细节与真实案例，有助于缩短立项到交付时间。",
    links: [
      { label: "产品能力", to: "/product", cue: "回看能力模块与交付边界" },
      { label: "材料与质量", to: "/materials", cue: "核对壁厚/支撑/工艺路线" },
      { label: "案例中心", to: "/cases", cue: "参考不同项目的执行路径与验收口径" },
      { label: "资源中心", to: "/resources", cue: "下载流程模板与协作清单" },
    ],
  },
  "/cases": {
    title: "案例延伸：从案例拆解到可执行动作",
    desc: "案例可与方案展示、展品库和信任页联动阅读，形成“对外讲述 + 对内执行”完整闭环。",
    links: [
      { label: "方案展示", to: "/showcase", cue: "查看更完整的项目叙事结构" },
      { label: "3D 展品库", to: "/gallery", cue: "浏览可交互 GLB 展品页案例" },
      { label: "产品能力", to: "/product", cue: "回到能力模块确认实施范围" },
      { label: "信任与安全", to: "/trust", cue: "核对合规、隐私与交付标准" },
      { label: "合作申请", to: "/apply", cue: "提交你的项目需求与交付目标" },
    ],
  },
  "/gallery": {
    title: "展品库导读：把模型变成可讲述内容",
    desc: "建议与案例、方案展示和合作申请页面组合阅读，快速完成对外叙事与内部评审准备。",
    links: [
      { label: "案例中心", to: "/cases", cue: "查看展品页在真实项目中的落地方式" },
      { label: "方案展示", to: "/showcase", cue: "用更完整叙事框架呈现项目价值" },
      { label: "产品能力", to: "/product", cue: "了解模型生成与制造链路支撑" },
      { label: "合作申请", to: "/apply", cue: "提交展品化/履约协同需求" },
    ],
  },
  "/resources": {
    title: "资源关联主题：模板如何进入实际项目",
    desc: "下载资源后，可继续到 FAQ、信任与 IP 页面对齐执行细节与合规边界。",
    links: [
      { label: "常见问题", to: "/faqs", cue: "按问题类型快速定位执行答案" },
      { label: "信任与安全", to: "/trust", cue: "确认安全、隐私与交付标准" },
      { label: "IP 合规", to: "/ip", cue: "对齐授权范围与投诉处理流程" },
      { label: "新闻中心", to: "/newsroom", cue: "查看更新节奏与发布动态" },
    ],
  },
  "/showcase": {
    title: "方案展示延伸：从展示内容到执行标准",
    desc: "这组页面帮助你把方案演示内容转化为可执行流程与可交付结果。",
    links: [
      { label: "产品能力", to: "/product", cue: "回看能力模块与适用场景" },
      { label: "核心工作流", to: "/workflow", cue: "确认生成到履约的阶段产出物" },
      { label: "案例中心", to: "/cases", cue: "查看可复用的项目模板与细节" },
      { label: "3D 展品库", to: "/gallery", cue: "扩展至可交互展示与讲述页面" },
    ],
  },
  "/about": {
    title: "了解团队后可继续查看的关键页面",
    desc: "建议继续浏览信任、合规与案例内容，形成完整的合作决策信息。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "查看安全基线与交付标准" },
      { label: "IP 合规", to: "/ip", cue: "了解授权范围与留档机制" },
      { label: "案例中心", to: "/cases", cue: "参考落地项目与复用模板" },
      { label: "合作申请", to: "/apply", cue: "提交需求进入具体对接流程" },
    ],
  },
  "/materials": {
    title: "质量标准关联阅读",
    desc: "材料与质量页建议和工作流、FAQ、产品页组合阅读，以降低打样返工风险。",
    links: [
      { label: "核心工作流", to: "/workflow", cue: "定位质量检查在流程中的阶段位置" },
      { label: "产品能力", to: "/product", cue: "回看可制造优化与交付能力" },
      { label: "常见问题", to: "/faqs", cue: "快速排查模型和打印问题" },
      { label: "资源中心", to: "/resources", cue: "下载 print-ready 速查清单" },
    ],
  },
  "/partners": {
    title: "合作入口与决策信息",
    desc: "可先查看信任/合规页面，再进入申请与联系页面，提升多方协作效率。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "核对安全、隐私与交付基线" },
      { label: "IP 合规", to: "/ip", cue: "确认授权边界与处理流程" },
      { label: "合作申请", to: "/apply", cue: "提交角色化需求与交付目标" },
      { label: "联系我们", to: "/contact", cue: "按任务分流进入对应沟通通道" },
    ],
  },
  "/newsroom": {
    title: "媒体与发布相关链接",
    desc: "配合资源中心与信任页面阅读，可快速获取对外沟通所需的完整信息。",
    links: [
      { label: "资源中心", to: "/resources", cue: "获取模板、素材与更新文档" },
      { label: "信任与安全", to: "/trust", cue: "查看对外披露的标准与边界" },
      { label: "关于我们", to: "/about", cue: "了解团队定位与方法论" },
      { label: "联系我们", to: "/contact?type=media", cue: "媒体采访与资料申请入口" },
    ],
  },
  "/trust": {
    title: "信任体系相关页面",
    desc: "安全与合规信息建议联合阅读，可更完整理解平台风险控制与执行标准。",
    links: [
      { label: "隐私政策", to: "/privacy", cue: "查看数据收集与处理边界" },
      { label: "服务条款", to: "/terms", cue: "了解服务规则与责任边界" },
      { label: "IP 合规", to: "/ip", cue: "核对授权、留档与下架机制" },
      { label: "安全披露", to: "/contact?type=security", cue: "提交漏洞或风险反馈" },
    ],
  },
  "/ip": {
    title: "IP 合规关联阅读",
    desc: "授权执行与风险处理通常与信任标准、FAQ 及沟通流程同步推进。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "查看合规在整体风险框架中的位置" },
      { label: "常见问题", to: "/faqs", cue: "定位合规与交付常见问题答案" },
      { label: "联系我们", to: "/contact?type=partners", cue: "对接合作方合规沟通入口" },
      { label: "合作申请", to: "/apply", cue: "提交项目并同步授权范围" },
    ],
  },
  "/contact": {
    title: "联系前可先了解的决策信息",
    desc: "先看合作申请、信任与计费内容，再进入联系通道，能显著提升对接效率。",
    links: [
      { label: "合作申请", to: "/apply", cue: "提交标准化需求信息并进入分流流程" },
      { label: "信任与安全", to: "/trust", cue: "核对安全与合规边界" },
      { label: "订阅与计费", to: "/pricing", cue: "了解预算结构与 SLA 口径" },
      { label: "常见问题", to: "/faqs", cue: "先排查通用问题再进入人工沟通" },
    ],
  },
  "/pricing": {
    title: "计费方案相关页面",
    desc: "结合产品能力、资源模板与申请页面，可更快完成预算评估与方案落地。",
    links: [
      { label: "产品能力", to: "/product", cue: "确认不同方案对应的能力范围" },
      { label: "资源中心", to: "/resources", cue: "下载模板用于预算与流程对齐" },
      { label: "合作申请", to: "/apply", cue: "提交规模与周期，获取报价建议" },
      { label: "联系我们", to: "/contact?type=sales", cue: "与销售沟通采购与对公流程" },
    ],
  },
  "/faqs": {
    title: "FAQ 相关主题导航",
    desc: "当问题涉及具体项目时，建议继续浏览流程、材料、合规与联系页面。",
    links: [
      { label: "核心工作流", to: "/workflow", cue: "查看阶段产出物与执行顺序" },
      { label: "材料与质量", to: "/materials", cue: "定位 print-ready 与工艺建议" },
      { label: "IP 合规", to: "/ip", cue: "核对授权与投诉处理机制" },
      { label: "联系我们", to: "/contact", cue: "提交复杂问题获取人工支持" },
    ],
  },
  "/privacy": {
    title: "隐私与法务相关导航",
    desc: "隐私、条款与 Cookie 建议联动阅读，并结合信任中心理解整体边界。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "查看平台安全与交付基线" },
      { label: "服务条款", to: "/terms", cue: "阅读使用规则与责任说明" },
      { label: "Cookie 政策", to: "/cookies", cue: "了解存储类型与管理方式" },
    ],
  },
  "/terms": {
    title: "服务条款相关导航",
    desc: "条款内容通常需结合隐私与 Cookie 政策共同解读。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "查看公开的安全与合规基线" },
      { label: "隐私政策", to: "/privacy", cue: "了解数据处理与用户权利说明" },
      { label: "Cookie 政策", to: "/cookies", cue: "核对存储与偏好管理机制" },
    ],
  },
  "/cookies": {
    title: "Cookie 与隐私相关导航",
    desc: "建议配合隐私政策与服务条款阅读，确保边界理解一致。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "理解平台整体安全与透明策略" },
      { label: "隐私政策", to: "/privacy", cue: "查看信息收集与使用范围" },
      { label: "服务条款", to: "/terms", cue: "了解使用规则与权责关系" },
    ],
  },
  "/accessibility": {
    title: "可访问性相关导航",
    desc: "无障碍改进建议结合信任与反馈入口持续迭代。",
    links: [
      { label: "信任与安全", to: "/trust", cue: "查看质量与体验改进基线" },
      { label: "隐私政策", to: "/privacy", cue: "了解用户权益与数据边界" },
      { label: "联系我们", to: "/contact", cue: "提交可访问性反馈与改进建议" },
    ],
  },
  "/apply": {
    title: "提交申请前后的关键页面",
    desc: "申请前建议看案例与流程，提交后可通过联系页与信任页补充协作信息。",
    links: [
      { label: "案例中心", to: "/cases", cue: "参考近似项目路径与交付成果" },
      { label: "核心工作流", to: "/workflow", cue: "确认阶段产出与时间预期" },
      { label: "信任与安全", to: "/trust", cue: "同步授权、隐私与风险边界" },
      { label: "联系我们", to: "/contact", cue: "按任务通道继续对接" },
    ],
  },
};

const relatedSection = computed(() => {
  const current = normalizePath(route.path);
  const key = current.startsWith("/cases/") ? "/cases" : current;
  return relatedMap[key] || relatedMap["/"];
});
</script>

<template>
  <footer class="site-footer">
    <div class="inner glass-card">
      <section class="related" v-if="relatedSection.links.length" aria-labelledby="footer-related-title">
        <h2 id="footer-related-title" class="related-title">{{ relatedSection.title }}</h2>
        <p class="related-desc">{{ relatedSection.desc }}</p>
        <nav class="related-nav" :aria-label="`${relatedSection.title} 内链导航`">
          <ul class="related-links">
            <li v-for="link in relatedSection.links" :key="link.to">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
              <span class="related-cue">{{ link.cue }}</span>
            </li>
          </ul>
        </nav>
      </section>
      <div class="top">
        <div class="brand">
          <div class="name">Lingxi Forge</div>
          <div class="tagline">AI + 3D 文创赋能平台</div>
          <p class="desc">
            从提示词/参考图到可展示 GLB、可打印 STL，再到打印履约交付。把“好看”变成“能生产、能售卖”。
          </p>
          <div class="cta" aria-label="页脚快速入口">
            <RouterLink class="cta-link cta-link--primary" to="/apply">提交合作申请</RouterLink>
            <RouterLink class="cta-link" to="/workbench/Text-To-3D">免费开始</RouterLink>
          </div>
        </div>

        <div class="cols">
          <div class="col" v-for="group in groups" :key="group.title">
            <div class="title">{{ group.title }}</div>
            <ul class="links">
              <li v-for="link in group.links" :key="link.to">
                <RouterLink :to="link.to">{{ link.label }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="bottom">
        <div class="left">
          <span>© {{ year }} Lingxi Forge 灵犀造物</span>
          <span class="dot">·</span>
          <span>ICP备案：待申请</span>
          <span class="dot">·</span>
          <span>公安备案：待申请</span>
        </div>
        <div class="right">
          <span class="chip" v-for="c in contactChannels" :key="c.key">
            <a :href="`mailto:${c.email}`" :title="c.desc">{{ c.title }}：{{ c.email }}</a>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  width: min(1180px, 92%);
  margin: 26px auto 0;
  padding-bottom: 26px;
}

.inner {
  padding: 22px;
}

.related {
  display: grid;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  margin-bottom: 16px;
}

.related-title {
  font-weight: 800;
  font-size: 15px;
  margin: 0;
  line-height: 1.45;
}

.related-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--font-color2);
}

.related-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;

  li {
    display: grid;
    gap: 2px;
  }

  a {
    color: var(--font-color2);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.35;
    transition: color var(--motion-base) var(--ease-out);

    &:hover {
      color: var(--font-color3);
    }
  }
}

.related-cue {
  color: var(--font-color4);
  font-size: 12px;
  line-height: 1.45;
}

.top {
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 18px;
}

.brand {
  .name {
    font-family: "Space Grotesk", "Inter", system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    font-weight: 800;
    letter-spacing: 0.06em;
    font-size: 22px;
  }

  .tagline {
    margin-top: 6px;
    color: var(--font-color2);
  }

  .desc {
    margin-top: 12px;
    color: var(--font-color2);
    line-height: 1.6;
    font-size: 13px;
  }

  .cta {
    margin-top: 14px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--font-color1);
    transition:
      transform var(--motion-base) var(--ease-out),
      border-color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);

    &:hover {
      transform: translateY(-1px);
      border-color: color-mix(in srgb, var(--landing-accent, #5f7ee8) 56%, transparent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--landing-accent, #5f7ee8) 16%, transparent);
    }
  }

  .cta-link--primary {
    color: #f8fbff;
    border-color: transparent;
    background: linear-gradient(135deg, var(--landing-accent, #5f7ee8), var(--landing-accent-strong, #3f63d8));
  }
}


.cols {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.col {
  .title {
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 10px;
  }
}

.links {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;

  a {
    color: var(--font-color2);
    font-size: 13px;
    line-height: 1.2;
    transition: color 0.2s ease;

    &:hover {
      color: var(--font-color3);
    }
  }
}

.divider {
  height: 1px;
  background: var(--glass-border);
  margin: 18px 0 14px;
}

.bottom {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  .left {
    color: var(--font-color4);
    font-size: 12px;
  }

  .dot {
    margin: 0 8px;
    opacity: 0.65;
  }

  .right {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .chip {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 12px;

    a {
      color: var(--font-color2);
    }
  }
}

@media (max-width: 980px) {
  .related-links {
    grid-template-columns: 1fr;
  }

  .top {
    grid-template-columns: 1fr;
  }

  .cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
